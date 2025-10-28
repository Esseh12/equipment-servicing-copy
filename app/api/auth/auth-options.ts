import { AuthOptions, DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ADMiddlewareService } from '@/app/services/ad-middlewareService';
import AzureAD from 'next-auth/providers/azure-ad';
import { UserRoles } from '../models/models';
import logger from '@/utils/logger';
import { sessionManager } from '@/lib/sessionManager';

interface UserBranchData {
	branchName: string | null;
	subZone: string | null;
	zone: string | null;
	bullionHub: string | null;
}

declare module 'next-auth' {
	interface Session {
		accessToken?: string;
		userId?: string;
		sessionId?: string;
		browserFingerprint?: string;
		bvnToken?: string;
		user: {
			nt: string;
			email: string;
			name: string;
			role?: UserRoles[];
			branchCode?: string;
			flexcubeId?: string;
			tokenValidated: boolean | null | undefined;
			branch?: UserBranchData;
			image?: string;
			adGroups: string[];
		} & DefaultSession['user'];
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		accessToken?: string;
		bvnToken?: string;
		nt?: string;
		image?: string;
		email?: string;
		name?: string;
		role?: UserRoles[];
		branchCode?: string | null;
		branch?: UserBranchData;
		flexcubeId?: string;
		entrustValidated: boolean | null | undefined;
		adGroups: string[];
		browserFingerprint?: string;
		userId?: string;
		sessionId?: string;
		error?: string;
	}
}

interface _Profile {
	preferred_username?: string;
	name?: string;
}

type Profile<T> = _Profile & T;

const AzureADProvider = AzureAD({
	clientId: process.env.AZURE_AD_CLIENT_ID as string,
	clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
	tenantId: process.env.AZURE_AD_TENANT_ID,
	authorization: {
		params: {
			scope: 'openid profile email',
		},
	},
	profile(profile: any) {
		return {
			id: profile.sub,
			name: profile.name,
			email: profile.email,
			image: null,
		};
	},
});

const TestProvider = CredentialsProvider({
	id: 'mock-credentials',
	name: 'Test credentials',
	credentials: {
		username: { label: 'Username', type: 'text' },
		password: { label: 'Password', type: 'password' },
	},
	async authorize(credentials) {
		try {
			// Check if credentials are provided
			if (!credentials?.username || !credentials?.password) {
				return null;
			}

			const adMiddlewareService = new ADMiddlewareService();

			const allRoles = new Set<UserRoles>([]);

			let adUser;
			let adGroups: string[] = [];
			try {
				adUser = await adMiddlewareService.getUserDetailsByNT(
					credentials.username
				);

				if (adUser?.data?.memberof && Array.isArray(adUser.data.memberof)) {
					adGroups = adUser.data.memberof;

					if (adGroups && Array.isArray(adGroups)) {
						adGroups.forEach((role: any) => {
							const roleArray = ADMiddlewareService.determineUserRole(role);
							roleArray.forEach((r) => allRoles.add(r));
						});
					}
				}
			} catch (adError) {
				// This is now a critical error
				logger.error('Failed to fetch AD user details:', adError);
				throw new Error('Unable to verify credentials');
			}

			let userData = null;
			let token = null;

			try {
				const flexcubeResponse =
					await adMiddlewareService.getFlexcubeUserDetailsByNT({
						userNT: credentials.username,
					});

				if (flexcubeResponse?.result?.userData) {
					userData = flexcubeResponse.result.userData;
					token = flexcubeResponse.result.accessToken;

					if (userData.roles && Array.isArray(userData.roles)) {
						userData.roles.forEach((role: any) => {
							const roleArray = ADMiddlewareService.determineUserRole(role);
							roleArray.forEach((r) => allRoles.add(r));
						});
					}
				}
			} catch (flexcubeError) {
				logger.warn(
					'Failed to fetch Flexcube user details, continuing with AD only:',
					flexcubeError
				);
			}

			const userRoles = Array.from(allRoles);
			console.log(adUser);

			return {
				id:
					userData?.userId || adUser?.data?.employeeID || credentials.username,
				nt: credentials.username,
				username: credentials.username,
				name:
					userData?.userName ||
					adUser?.data?.displayname ||
					credentials.username,
				email:
					userData?.userEmail ||
					adUser?.data?.email ||
					`${credentials.username}@accessbankplc.com`,
				flexcubeRole: userRoles,
				branchCode:
					userData?.branchCode ||
					(adUser.data.branchCode &&
						adUser.data.branchCode?.replace(/\s/g, '')) ||
					null,
				branchName: userData?.branchName || adUser?.data?.branchName || null,
				adGroups: adGroups,
				flexcubeData: userData,
				accessToken: token,
			};
		} catch (error) {
			logger.error('Error in Test Provider:', error);
			throw error;
		}
	},
});

const EntrustProvider = CredentialsProvider({
	id: 'entrust',
	name: 'Access bank',
	credentials: {
		nt: { label: 'nt', type: 'text' },
		token: { label: 'token', type: 'text' },
		adSession: { label: 'session', type: 'text' },
	},
	async authorize(credentials) {
		let user: any;
		let entrustResponse: any;

		if (process.env.NEXT_PUBLIC_CREDENTIALS_MODE === 'production') {
			try {
				entrustResponse = await new ADMiddlewareService().validateEntrust({
					userId: credentials?.nt || '',
					token: credentials?.token || '',
				});

				if (!entrustResponse.success) {
					const errorMessage =
						entrustResponse.responseMessage ||
						entrustResponse.responseDescription ||
						'Token validation failed';

					throw new Error(errorMessage);
				}

				user = entrustResponse;
			} catch (error) {
				logger.error(`[EntrustProvider] Error validating Entrust: ${error}`);

				// If the error is already formatted as an entrustError, rethrow it
				if (error instanceof Error && error.message.includes('entrustError')) {
					throw error;
				}

				// Otherwise, create a generic error
				throw new Error(error as string);
			}
		} else {
			user = true;
		}

		if (user) {
			return {
				...user,
				entrustValidated: true,
				...JSON.parse(credentials?.adSession || ''),
			};
		}

		throw new Error(
			JSON.stringify({
				message: 'Unable to validate token',
				status: 'error',
				entrustError: true,
			})
		);
	},
});

const MiddlewareProvider = CredentialsProvider({
	id: 'middleware-credentials',
	name: 'Access bank',
	credentials: {
		username: { label: 'Username', type: 'text' },
		password: { label: 'Password', type: 'password' },
	},
	async authorize(credentials) {
		try {
			if (!credentials?.username || !credentials?.password) {
				logger.error('Missing username or password');
				throw new Error('Username and password are required');
			}

			const adMiddlewareService = new ADMiddlewareService();

			// First authenticate the user
			const isUser = await adMiddlewareService.authenticateUser({
				username: credentials.username,
				password: credentials.password,
			});

			if (!isUser) {
				logger.error(`Authentication failed for user: ${credentials.username}`);
				throw new Error('Unable to verify credentials');
			}

			const allRoles = new Set<UserRoles>([]); // Start with default staff role

			let adUser;
			let adGroups: string[] = [];

			try {
				adUser = await adMiddlewareService.getUserDetailsByNT(
					credentials.username
				);

				if (adUser?.data?.memberof && Array.isArray(adUser.data.memberof)) {
					adGroups = adUser.data.memberof;

					adGroups.forEach((role: string) => {
						const roleArray = ADMiddlewareService.determineUserRole(role);
						roleArray.forEach((r) => allRoles.add(r));
					});
				}
			} catch (adError) {
				logger.error('Failed to fetch AD user details:', adError);
				throw new Error(
					'Unable to retrieve user information from Active Directory'
				);
			}

			let flexcubeUser = null;
			let token = null;

			try {
				const flexcubeResponse =
					await adMiddlewareService.getFlexcubeUserDetailsByNT({
						userNT: credentials.username,
					});

				if (flexcubeResponse?.result?.userData) {
					flexcubeUser = flexcubeResponse.result.userData;
					token = flexcubeResponse.result.accessToken;

					if (flexcubeUser.roles && Array.isArray(flexcubeUser.roles)) {
						flexcubeUser.roles.forEach((role: string) => {
							const roleArray = ADMiddlewareService.determineUserRole(role);
							roleArray.forEach((r) => allRoles.add(r));
						});
					}
				}
			} catch (flexcubeError) {
				// Log but continue - Flexcube is not required
				logger.warn(
					'Failed to fetch Flexcube user details, continuing with AD only:',
					flexcubeError
				);
			}

			// Convert Set back to array for final user roles
			const userRoles = Array.from(allRoles);

			// Combine information from both sources
			return {
				// Basic user info - prioritize Flexcube data when available
				id:
					adUser?.data?.employeeID ||
					flexcubeUser?.userId ||
					credentials.username,
				nt: credentials.username,
				name:
					flexcubeUser?.userName ||
					adUser?.data?.displayname ||
					credentials.username,
				email:
					flexcubeUser?.userEmail ||
					adUser?.data?.email ||
					`${credentials.username}@accessbankplc.com`,
				image: adUser?.data?.image || null,

				// Specific AD info - now required
				adGroups: adGroups,
				memberof: adGroups, // Keep original field name for compatibility
				department: adUser?.data?.department || null,
				jobTitle: adUser?.data?.jobTitle || null,

				// Combined roles from both AD and Flexcube
				flexcubeRole: userRoles,
				branchCode:
					flexcubeUser?.branchCode ||
					// (adUser.data.branchCode &&
					//   adUser.data.branchCode?.replace(/\s/g, "")) ||
					null,
				branchName: flexcubeUser?.branchName || null,
				// flexcubeUser?.branchName || adUser?.data?.branchName || null,
				flexcubeId: flexcubeUser?.userId || null,

				// Full objects for reference if needed
				adData: adUser?.data || null,
				flexcubeData: flexcubeUser || null,
				accessToken: token,
			};
		} catch (error) {
			logger.error('MiddlewareProvider authorization error:', error);
			throw error; // Re-throw to let NextAuth handle it
		}
	},
});

export const authOptions: AuthOptions = {
	providers: [
		TestProvider,
		MiddlewareProvider,
		AzureADProvider,
		EntrustProvider,
	],
	secret: process.env.NEXTAUTH_SECRET as string,
	debug: true,
	logger: {
		error: (code, metadata) => {
			console.error('NextAuth Error:', code, metadata);
		},
		warn: (code) => {
			console.warn('NextAuth Warning:', code);
		},
		debug: (code, metadata) => {
			console.log('NextAuth Debug:', code, metadata);
		},
	},
	callbacks: {
		async redirect({ url, baseUrl }) {
			// Handle OAuth callback errors
			if (url.includes('error=OAuthCallback')) {
				logger.error('OAuth callback error detected, redirecting to signin');
				return `${baseUrl}/signin?error=oauth_callback_error`;
			}

			// Handle Azure AD callback - but check for errors first
			if (url.includes('/api/auth/callback/azure-ad')) {
				// Check if there were any authentication errors
				if (url.includes('error=')) {
					logger.error('Azure AD callback error, redirecting to signin');
					return `${baseUrl}/signin?error=azure_ad_error`;
				}

				logger.info('Successful Azure AD callback, redirecting to entrust');
				return `${baseUrl}/entrust`;
			}

			// Default redirects
			if (url === `${baseUrl}/`) {
				return url;
			}
			if (url.startsWith(baseUrl)) {
				return url;
			}

			return `${baseUrl}/entrust`;
		},

		async signIn({ account, profile }) {
			if (account?.provider === 'azure-ad') {
				try {
					const azureProfile = profile as Profile<typeof profile>;
					const ntUsername = azureProfile?.preferred_username?.split('@')[0];

					if (!ntUsername) {
						logger.error('Azure AD: No NT username found in profile', {
							profile,
						});
						return false;
					}

					const adMiddlewareService = new ADMiddlewareService();
					try {
						const adUser = await adMiddlewareService.getUserDetailsByNT(
							ntUsername
						);
						if (!adUser?.data) {
							logger.error(
								`Azure AD: Unable to fetch AD details for user: ${ntUsername}`
							);
							return false;
						}
					} catch (error) {
						logger.error('Azure AD: Pre-validation failed', {
							error,
							ntUsername,
						});
						return false;
					}

					logger.info(
						`Azure AD: Sign-in validation successful for ${ntUsername}`
					);
					return true;
				} catch (error) {
					logger.error('Azure AD: Sign-in validation error', error);
					return false;
				}
			}

			return true;
		},

		async jwt({ token, account, user, profile, trigger }) {
			if (user) {
				token.sessionId = crypto.randomUUID();
				token.userId = user.id;
			}

			if (trigger === 'update' && token.sessionId) {
				const isValid = await sessionManager.isSessionValid(token.sessionId);
				const isUserValid = await sessionManager.isUserValid(
					token.userId as string
				);

				if (!isValid || !isUserValid) {
					return { ...token, error: 'RefreshAccessTokenError' };
				}
			}

			if (token.error) {
				return token;
			}

			if (account) {
				if (account.provider === 'azure-ad') {
					try {
						const ntUsername = (
							profile as Profile<typeof profile>
						)?.preferred_username?.split('@')[0];

						if (!ntUsername) {
							logger.error(
								'Azure AD JWT: No NT username extracted from profile'
							);
							return { ...token, error: 'NoNTUsername' };
						}

						token.nt = ntUsername;
						logger.info(
							`Azure AD JWT: Processing token for user ${ntUsername}`
						);

						const adMiddlewareService = new ADMiddlewareService();

						let adUser = null;
						let adGroups: string[] = [];
						let userData = null;
						let userRoles: UserRoles[] = [];

						try {
							adUser = await adMiddlewareService.getUserDetailsByNT(ntUsername);

							if (!adUser?.data) {
								throw new Error('No AD data returned');
							}

							if (adUser.data.memberof && Array.isArray(adUser.data.memberof)) {
								adGroups = adUser.data.memberof;
								token.adGroups = adGroups;

								const allRoles = new Set<UserRoles>();
								adGroups.forEach((group: string) => {
									const roleArray =
										ADMiddlewareService.determineUserRole(group);
									roleArray.forEach((r) => allRoles.add(r));
								});
								userRoles = Array.from(allRoles);
							}

							logger.info(
								`Azure AD JWT: Successfully fetched AD details for ${ntUsername}`
							);
						} catch (adError) {
							logger.error(
								`Azure AD JWT: Failed to fetch AD details for ${ntUsername}:`,
								adError
							);
							return { ...token, error: 'ADFetchFailed' };
						}

						try {
							const flexcubePromise =
								adMiddlewareService.getFlexcubeUserDetailsByNT({
									userNT: ntUsername,
								});

							const timeoutPromise = new Promise((_, reject) =>
								setTimeout(() => reject(new Error('Flexcube timeout')), 5000)
							);

							const flexcubeResponse = (await Promise.race([
								flexcubePromise,
								timeoutPromise,
							])) as any;

							if (flexcubeResponse?.result?.userData) {
								userData = flexcubeResponse.result.userData;
								logger.info(
									`Azure AD JWT: Successfully fetched Flexcube details for ${ntUsername}`
								);

								if (userData.roles && Array.isArray(userData.roles)) {
									const flexRoles = new Set(userRoles);
									userData.roles.forEach((role: any) => {
										const roleArray =
											ADMiddlewareService.determineUserRole(role);
										roleArray.forEach((r) => flexRoles.add(r));
									});
									userRoles = Array.from(flexRoles);
								}
							}
						} catch (flexError) {
							logger.warn(
								`Azure AD JWT: Failed to fetch Flexcube details for ${ntUsername}, continuing with AD only:`,
								flexError
							);
						}

						token.name =
							userData?.userName ||
							adUser.data.displayname ||
							profile?.name ||
							ntUsername;
						token.email =
							userData?.userEmail ||
							adUser.data.email ||
							`${ntUsername}@accessbankplc.com`;
						token.branchCode =
							userData?.branchCode ||
							(adUser.data.branchCode &&
								adUser.data.branchCode?.replace(/\s/g, '')) ||
							null;
						token.flexcubeId = userData?.userId || '';
						token.role = userRoles;

						// Branch information
						token.branch = {
							branchName: userData?.branchName || adUser.data.branchName || '',
							subZone: '',
							zone: '',
							bullionHub: '',
						};

						logger.info(
							`Azure AD JWT: Token populated successfully for ${ntUsername}`,
							{
								hasEmail: !!token.email,
								hasName: !!token.name,
								roleCount: userRoles.length,
								hasBranchCode: !!token.branchCode,
								hasFlexcubeId: !!token.flexcubeId,
							}
						);
					} catch (error) {
						logger.error(
							'Azure AD JWT: Critical error processing token:',
							error
						);
						return { ...token, error: 'TokenProcessingFailed' };
					}
				}

				// Handle other providers (unchanged)
				if (account.provider === 'middleware-credentials') {
					// console.log("USER IN JWT-middleware", user)
					token.nt = (user as any).nt;
					token.name = (user as any).name;
					token.email = (user as any).email;
					token.role = (user as any).flexcubeRole;
					token.branchCode = (user as any).branchCode;
					token.flexcubeId = (user as any).flexcubeId;
					token.adGroups = (user as any).adGroups;
					token.accessToken = (user as any).accessToken;

					token.branch = {
						branchName: (user as any).branchName || null,
						subZone: '',
						zone: '',
						bullionHub: '',
					};
				}

				if (account.provider === 'entrust') {
					// console.log("USER IN JWT-entrust", user);

					if (user) {
						token.nt = (user as any).user.nt;
						token.email = (user as any).user.email;
						token.name = (user as any).user.name;
						token.role = (user as any).user.role;
						token.branchCode = (user as any).user.branchCode;
						token.branch = (user as any).user.branch;
						token.flexcubeId = (user as any).user.flexcubeId;
						token.adGroups = (user as any).user.adGroups;
						token.entrustValidated = (user as any).entrustValidated;
						token.accessToken = (user as any).accessToken;
						token.sessionId = (user as any).sessionId;
						token.userId = (user as any).userId;
					}
				}

				if (account.provider === 'mock-credentials') {
					token.nt = (user as any).nt;
					token.name = (user as any).name;
					token.email = (user as any).email;
					token.branchCode = (user as any).branchCode;
					token.flexcubeId = (user as any).id;
					token.role = (user as any).flexcubeRole;
					token.accessToken = (user as any).accessToken;

					if ((user as any).adGroups) {
						token.adGroups = (user as any).adGroups;
					}

					token.branch = {
						branchName: (user as any).branchName || null,
						subZone: '',
						zone: '',
						bullionHub: '',
					};
				}

				// Handle token expiration
				if (
					token.expiresAt &&
					typeof token.expiresAt === 'number' &&
					Date.now() > token.expiresAt
				) {
					return { ...token, error: 'TokenExpired' };
				}
			}

			// Clean up token
			if (token.picture) {
				delete token.picture;
			}

			return token;
		},

		async session({ session, token }) {
			// console.log("TOKEN IN SESSION", token);

			// Handle token errors by throwing an error to force re-authentication
			if (token.error) {
				logger.error('Session callback: Token has error', {
					error: token.error,
				});
				throw new Error(`Authentication error: ${token.error}`);
			}

			if (token) {
				session.userId = token.userId;
				session.sessionId = token.sessionId;

				// Validate session
				const isValid = await sessionManager.isSessionValid(
					token.sessionId || ''
				);
				const isUserValid = await sessionManager.isUserValid(
					token.userId || ''
				);

				if (!isValid || !isUserValid) {
					throw new Error('Session has been invalidated');
				}

				// Populate session
				session.browserFingerprint = token.browserFingerprint;
				session.accessToken = token.accessToken as string;

				session.user = {
					...session.user,
					nt: token.nt as string,
					email: token.email as string,
					name: token.name as string,
					branchCode: token.branchCode as string,
					flexcubeId: token.flexcubeId as string,
					tokenValidated: token.entrustValidated as boolean,
					image: '',
					role: token.role as UserRoles[],
					branch: token.branch as UserBranchData,
					adGroups: token.adGroups || [],
				};
			}

			return session;
		},
	},
	events: {
		signOut: async ({ token }) => {
			if (token?.sessionId) {
				await sessionManager.invalidateSession(token.sessionId);
			}
		},
	},
	session: {
		strategy: 'jwt',
		maxAge: Number(process.env.NEXT_SESSION_DURATION || 900),
	},
	pages: {
		signIn: '/signin',
		error: '/signin', // Consider creating a dedicated error page
	},
};
