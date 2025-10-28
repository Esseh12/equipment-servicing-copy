import axios from 'axios';
import { middlewareHeaders } from './headers.service';
import { UserRoles } from '@/app/api/models/models';
// import logger from "@/utils/logger";
interface FlexcubeUserData {
	userId: string;
	branchCode: string;
	branchName: string;
	userName: string;
	userEmail: string | null;
	userLanguage: string;
	userStatus: string;
	startDate: string;
	roles: string[];
}
interface FlexcubeUserResponse {
	statusCode: number;
	displayMessage: string;
	result:
		| {
				userData: FlexcubeUserData;
				accessToken: string;
				userRole: string;
		  }
		| undefined;
}
interface AuthResponse {
	status: string;
	message: string;
	data: any;
}
export class ADMiddlewareService {
	constructor() {}
	private http = axios.create({
		// baseURL: `${process.env.NEXT_SECRET_API_BASE_URL as string}`,
		baseURL: `${process.env.NEXT_SECRET_FCUBS as string}`,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-cache',
			'X-Client-Id': 'Info-pool',
			'X-Client-Secret': process.env.NEXT_INFOPOOL_SECRET_KEY as string,
			'X-Powered-By': 'unknown',
		},
	});
	private base = axios.create({
		baseURL: process.env.MIDDLEWARE_API_BASE_URL as string,
		headers: middlewareHeaders,
	});

	// Helper method to safely stringify objects (avoids circular reference errors)
	private safeStringify(obj: any): string {
		try {
			return JSON.stringify(obj, (key, value) => {
				// Skip circular references and large objects that cause issues
				if (
					key === 'request' ||
					key === 'response' ||
					key === 'config' ||
					key === 'res' ||
					key === 'req'
				) {
					return '[Circular Reference Removed]';
				}
				return value;
			});
		} catch (error: any) {
			console.error('[safeStringify] Error stringifying object:', error);
			return '[Unable to stringify object]';
		}
	}

	// Helper method to redact sensitive information from payloads
	private redactSensitiveData(payload: any): any {
		const redacted = { ...payload };
		if (redacted.password) {
			redacted.password = '[REDACTED]';
		}
		if (redacted.token) {
			redacted.token = '[REDACTED]';
		}
		return redacted;
	}

	async authenticateUser(payload: {
		username: string;
		password: string;
	}): Promise<boolean> {
		try {
			const url = '/ad/v2/Authenticate';
			// const fullUrl = `${process.env.MIDDLEWARE_API_BASE_URL}${url}`;
			const requestPayload = {
				appId: 'SSIGNON',
				...payload,
			};
			console.log(`[authenticateUser] Sending request to AD Authenticate`);
			console.log(
				`[authenticateUser] Request payload: ${JSON.stringify(
					this.redactSensitiveData(requestPayload)
				)}`
			);
			const response = await this.base.post<AuthResponse>(url, requestPayload);
			console.log(`[authenticateUser] Response status: ${response.status}`);
			console.log(
				`[authenticateUser] Response data: ${this.safeStringify(response.data)}`
			);
			return response.data.status === 'success';
		} catch (error) {
			console.error('[authenticateUser] Authentication error:', error);
			if (axios.isAxiosError(error)) {
				console.error(
					`[authenticateUser] Error details: ${this.safeStringify({
						status: error.response?.status,
						statusText: error.response?.statusText,
						data: error.response?.data,
						message: error.message,
					})}`
				);
			}
			return false;
		}
	}
	async getUserDetailsByNT(ntId: string) {
		try {
			const url = '/ad/v2/UserByNT';
			// const fullUrl = `${process.env.MIDDLEWARE_API_BASE_URL}${url}`;
			const requestPayload = {
				appId: 'SSIGNON',
				username: ntId,
			};
			console.log(`[getUserDetailsByNT] Sending request to AD UserByNT`);
			// console.log(
			//   `[getUserDetailsByNT] Request payload: ${JSON.stringify(
			//     requestPayload
			//   )}`
			// );

			const response = await this.base.post(url, requestPayload);
			console.log(`[getUserDetailsByNT] Response status: ${response.status}`);
			console.log(
				`[getUserDetailsByNT] Response data: ${this.safeStringify(
					response.data
				)}`
			);
			return response.data;
		} catch (error) {
			console.error('[getUserDetailsByNT] Error fetching user details:', error);
			if (axios.isAxiosError(error)) {
				console.error(
					`[getUserDetailsByNT] Error details: ${this.safeStringify({
						status: error.response?.status,
						statusText: error.response?.statusText,
						data: error.response?.data,
						message: error.message,
					})}`
				);
			}
			return null;
		}
	}
	async validateEntrust(payload: { userId: string; token: string }) {
		try {
			const url = '/entrust/v1/Authenticate';
			// const fullUrl = `${process.env.MIDDLEWARE_API_BASE_URL}${url}`;
			const requestPayload = {
				appId: 'SSIGNON',
				requestId: crypto.randomUUID(),
				userId: payload.userId,
				group: 'ACCESSUSERS',
				token: payload.token,
			};
			const headers = {
				...middlewareHeaders,
				'Subscription-Key': process.env.NEXTAUTH_SECRET_MIDDLEWARE,
			};
			console.log(`[validateEntrust] Sending request to Entrust validation`);
			console.log(
				`[validateEntrust] Request payload: ${JSON.stringify(
					this.redactSensitiveData(requestPayload)
				)}`
			);
			console.log(
				`[validateEntrust] Request headers: ${JSON.stringify(headers)}`
			);
			const response = await this.base.post(url, requestPayload, { headers });
			console.log(`[validateEntrust] Response status: ${response.status}`);
			console.log(
				`[validateEntrust] Response data: ${this.safeStringify(response.data)}`
			);
			if (response.data.responseCode !== '00') {
				// console.warn(
				//   `[validateEntrust] Authentication failed with code: ${response.data.responseCode}`
				// );
				// console.warn(
				//   `[validateEntrust] Error message: ${response.data.responseMessage}`
				// );
				return {
					...response.data,
					success: false,
				};
			}
			return {
				...response.data,
				success: true,
			};
		} catch (error) {
			console.error('[validateEntrust] Error validating Entrust:', error);
			if (axios.isAxiosError(error)) {
				console.error(
					`[validateEntrust] Error details: ${this.safeStringify({
						status: error.response?.status,
						statusText: error.response?.statusText,
						data: error.response?.data,
						message: error.message,
					})}`
				);
			}
			return {
				success: false,
				responseCode: 'ERROR',
				responseMessage: 'Error occurred during Entrust validation',
				responseDescription:
					error instanceof Error ? error.message : 'Unknown error',
			};
		}
	}
	async getFlexcubeUserDetailsByNT(payload: {
		userNT: string;
	}): Promise<FlexcubeUserResponse> {
		try {
			// const url = "/api/general/login";
			// const url = "/LoginUser";
			const url = process.env.NEXT_SECRET_FCUBS_URL as string;
			// const fullUrl = `${process.env.NEXT_SECRET_FCUBS}${url}`;
			// if (payload.userNT === "adanikino" || payload.userNT === "tochukwuo") {
			//   return {
			//     statusCode: 200,
			//     displayMessage: "success",
			//     result: {
			//       userData: {
			//         userId: "EBOHBL",
			//         branchCode: "119",
			//         branchName: "OJODU BERGER BRANCH",
			//         userName: "Oluwasikemi Adanikin",
			//         userEmail: null,
			//         userLanguage: "ENG",
			//         userStatus: "ENABLED",
			//         startDate: "2024-05-01T00:00:00",
			//         roles: [
			//           "CCO_BRANCH"
			//         ]
			//       },
			//       accessToken: '',
			//       userRole: ''
			//   }
			// }
			// }
			console.log(
				`[getFlexcubeUserDetailsByNT] Sending request to: Infopool LoginUser`
			);
			console.log(
				`[getFlexcubeUserDetailsByNT] Request payload: ${JSON.stringify(
					payload
				)}`
			);
			console.log(
				`[getFlexcubeUserDetailsByNT] Request headers: ${JSON.stringify(
					middlewareHeaders
				)}`
			);
			const response = await this.http.post<FlexcubeUserResponse>(
				url,
				payload,
				{
					timeout: 10000,
				}
			);
			console.log(
				`[getFlexcubeUserDetailsByNT] Response status: ${response.status}`
			);
			console.log(
				`[getFlexcubeUserDetailsByNT] Response data: ${this.safeStringify(
					response.data
				)}`
			);
			return response.data;
		} catch (error: any) {
			console.error(
				'[getFlexcubeUserDetailsByNT] Error fetching Flexcube user details'
			);
			if (axios.isAxiosError(error)) {
				console.error(
					`[getFlexcubeUserDetailsByNT] Error details: ${this.safeStringify({
						status: error.response?.status,
						statusText: error.response?.statusText,
						data: error.response?.data,
						message: error.message,
						config: {
							url: error.config?.url,
							method: error.config?.method,
							headers: error.config?.headers,
							data: error.config?.data,
						},
					})}`
				);
				return {
					statusCode: error.response?.status || 400,
					displayMessage:
						error.response?.data?.message || 'Failed to authenticate user',
					result: undefined,
				};
			} else {
				console.error(
					`[getFlexcubeUserDetailsByNT] Non-Axios error: ${
						error.message || 'Unknown error'
					}`
				);
				return {
					statusCode: 400,
					displayMessage: error.message || 'Failed to authenticate user',
					result: undefined,
				};
			}
		}
	}
	static determineUserRole(role: string): UserRoles[] {
		// console.log(`[determineUserRole] Determining roles for: ${role}`);
		const tellerRoles = process.env.NEXT_TELLER_GROUP as string;
		const branchManagerRole = process.env.NEXT_MANAGER_GROUP as string;
		const reviewer = 'BVNDESK_INPUT';
		const cco = process.env.NEXT_CCO as string;
		const ninValidation = process.env.NEXT_NIN_GROUP as string;
		const ninCompGroup = process.env.NEXT_NIN_COMP_GROUP as string;
		const admin = process.env.NEXT_ADMIN as string;

		const bvnRequestGroup = process.env.NEXT_BVN_REQUEST_GROUP as string;
		const bvnCCORequestGroup = process.env.NEXT_BVN_CCO_REQUEST_GROUP as string;
		const bvnAuthorizerGroup = process.env.NEXT_BVN_AUTHORIZER_GROUP as string;
		const bvnCompleteRequestGroup = process.env
			.NEXT_BVN_COMPLETE_REQUEST_GROUP as string;

		console.log('bvnCCORequestGroup', bvnCCORequestGroup);
		// const zonalHeadAut = "ZONAL_HEAD_AUT";
		// const bvndeskAuth = "BVNDESK_AUTH";
		// const cdmsInput = "CDMS_INPUT";
		// const cdmsAuth = "CDMS_AUTH";
		// const complianceInp = "COMPLIANCE_INP";
		// const complianceAuth = "COMPLIANCE_AUTH";
		// const intauditInput = "INTAUDIT_INPUT";
		// const bvnReviwer = "BVN_REVIWER";
		// console.log(`[determineUserRole] Environment variables:
		//   NEXT_TELLER_GROUP: ${tellerRoles}
		//   NEXT_MANAGER_GROUP: ${branchManagerRole}
		//   NEXT_REVIEWER: ${reviewer}
		//   NEXT_CCO: ${cco}
		//   NEXT_NIN_GROUP: ${ninValidation}
		//   NEXT_ZONAL_HEAD_AUT: ${zonalHeadAut}
		//   NEXT_BVNDESK_AUTH: ${bvndeskAuth}
		//   NEXT_CDMS_INPUT: ${cdmsInput}
		//   NEXT_CDMS_AUTH: ${cdmsAuth}
		//   NEXT_COMPLIANCE_INP: ${complianceInp}
		//   NEXT_COMPLIANCE_AUTH: ${complianceAuth}
		//   NEXT_INTAUDIT_INPUT: ${intauditInput}
		//   NEXT_BVN_REVIEWER: ${bvnReviwer}

		// `);
		const flexcubeRoles: UserRoles[] = [];
		const normalizedRole = role.toLowerCase().trim();
		// console.log(`[determineUserRole] Normalized role: ${normalizedRole}`);
		if (tellerRoles?.toLowerCase().includes(normalizedRole)) {
			flexcubeRoles.push(UserRoles.teller);
		}
		if (branchManagerRole?.toLowerCase().includes(normalizedRole)) {
			flexcubeRoles.push(UserRoles.branchManager);
		}
		if (reviewer?.toLowerCase().includes(normalizedRole)) {
			flexcubeRoles.push(UserRoles.reviewer);
		}
		if (cco?.toLowerCase().includes(normalizedRole)) {
			flexcubeRoles.push(UserRoles.cco);
		}
		if (ninValidation?.toLowerCase().includes(normalizedRole)) {
			flexcubeRoles.push(UserRoles.ninValidator);
		}
		if (admin?.toLowerCase().includes(normalizedRole)) {
			flexcubeRoles.push(UserRoles.admin);
		}
		if (normalizedRole.includes('chqmgmt_input')) {
			flexcubeRoles.push(UserRoles.chqMgmt);
		}
		//new
		if (normalizedRole.includes('zonal_head_aut')) {
			flexcubeRoles.push(UserRoles.zonalHeadAut);
		}

		if (normalizedRole.includes('bvndesk_auth')) {
			flexcubeRoles.push(UserRoles.bvndeskAuth);
		}

		if (normalizedRole.includes('cdms_input')) {
			flexcubeRoles.push(UserRoles.cdmsInput);
		}

		if (normalizedRole.includes('cdms_auth')) {
			flexcubeRoles.push(UserRoles.cdmsAuth);
		}

		if (normalizedRole.includes('compliance_inp')) {
			flexcubeRoles.push(UserRoles.complianceInp);
		}

		if (normalizedRole.includes('compliance_auth')) {
			flexcubeRoles.push(UserRoles.complianceAuth);
		}

		if (normalizedRole.includes('intaudit_input')) {
			flexcubeRoles.push(UserRoles.intauditInput);
		}
		if (normalizedRole.includes('bvn_reviewer')) {
			flexcubeRoles.push(UserRoles.bvnReviewer);
		}

		if (ninCompGroup?.toLowerCase().includes(normalizedRole)) {
			flexcubeRoles.push(UserRoles.ninCompGroup);
		}
		// bvn group
		if (bvnRequestGroup?.toLowerCase().includes(normalizedRole)) {
			flexcubeRoles.push(UserRoles.bvnRequestGroup);
		}
		if (bvnCCORequestGroup?.toLowerCase().includes(normalizedRole)) {
			flexcubeRoles.push(UserRoles.bvnCCORequestGroup);
		}
		if (bvnAuthorizerGroup?.toLowerCase().includes(normalizedRole)) {
			flexcubeRoles.push(UserRoles.bvnAuthorizerGroup);
		}
		if (bvnCompleteRequestGroup?.toLowerCase().includes(normalizedRole)) {
			flexcubeRoles.push(UserRoles.bvnCompleteRequestGroup);
		}

		const finalRoles = [...new Set([...flexcubeRoles])];
		// console.log(
		//   `[determineUserRole] Assigned roles: ${JSON.stringify(finalRoles)}`
		// );
		return finalRoles;
	}
}
