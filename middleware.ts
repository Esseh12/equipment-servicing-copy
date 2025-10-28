// import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { parseExpiration } from "./utils/helpers";

// const tokenStorageName = "initiateBvnToken";

// SECURITY: Define allowed redirect paths to prevent open redirect attacks
const ALLOWED_REDIRECT_PATHS = [
	'/module-disabled',
	'/unauthorized',
	'/login',
	'/',
] as const;

// SECURITY: Get base URL from environment with fallback
const getBaseUrl = (): string => {
	// Use NEXTAUTH_URL if available (recommended for production)
	if (process.env.NEXTAUTH_URL) {
		return process.env.NEXTAUTH_URL;
	}

	// Production fallback with your specific domain
	if (process.env.NODE_ENV === 'production') {
		return 'https://account-svc-pilot.app.accessbankplc.com';
	}

	// Development fallback
	return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';
};

// SECURITY: Safe redirect function that prevents open redirect attacks
const createSecureRedirect = (
	path: string,
	request: NextRequest
): NextResponse => {
	try {
		// Validate that the redirect path is in our allowlist
		if (!ALLOWED_REDIRECT_PATHS.includes(path as any)) {
			console.warn(`Attempted redirect to unauthorized path: ${path}`);
			path = '/unauthorized'; // Default to unauthorized page
		}

		// Use base URL from environment instead of request URL
		const baseUrl = getBaseUrl();
		const redirectUrl = new URL(path, baseUrl);

		// SECURITY: Additional validation - ensure we're redirecting to our own domain
		const requestUrl = new URL(request.url);
		if (
			redirectUrl.hostname !== requestUrl.hostname &&
			process.env.NODE_ENV === 'production'
		) {
			console.warn(
				`Cross-domain redirect attempt blocked: ${redirectUrl.href}`
			);
			return NextResponse.redirect(new URL('/unauthorized', baseUrl));
		}

		return NextResponse.redirect(redirectUrl);
	} catch (error) {
		console.error('Error creating secure redirect:', error);
		// Fallback to a safe internal redirect
		return NextResponse.redirect(new URL('/unauthorized', getBaseUrl()));
	}
};

export async function middleware(req: NextRequest) {
	try {
		// console.log("Middleware triggered for:", req.url);

		// Parse the request path to identify which module is being accessed
		const path = req.nextUrl.pathname;

		const moduleBVN = path.startsWith('/biometric-authorization');
		const moduleCHQ = path.startsWith('/check-book-request');
		const moduleNIN = path.startsWith('/nin-validation');
		const moduleTKNA = path.startsWith('/token-activation');

		const enabledModules = (process.env.NEXT_MODS || '').split(',');

		if (
			(moduleBVN && !enabledModules.includes('BVN')) ||
			(moduleCHQ && !enabledModules.includes('CHQ')) ||
			(moduleNIN && !enabledModules.includes('NIN')) ||
			(moduleTKNA && !enabledModules.includes('TKNA'))
		) {
			// console.warn(`Access attempt to disabled module path: ${path}`);
			// const redirectUrl = req.nextUrl.clone();
			// redirectUrl.pathname = "/module-disabled";
			// return NextResponse.redirect(redirectUrl);
			return NextResponse.redirect(new URL('/module-disabled', req.url));
		}

		// try {
		//   // Get the session token from NextAuth
		//   const token = await getToken({
		//     req,
		//     secret: process.env.NEXTAUTH_SECRET
		//   });

		//   console.log("token", token);

		//   // If no token exists, redirect to unauthorized
		//   if (!token) {
		//     console.log("No token found, redirecting to /unauthorized");
		//     // SECURITY: Use secure redirect function
		//     return createSecureRedirect("/unauthorized", req);
		//   }

		//   // Create the next response
		//   const response = NextResponse.next();

		//   // If we have an accessToken in the JWT, set it as a cookie
		//   if (token.accessToken) {
		//     response.cookies.set({
		//       name: tokenStorageName,
		//       value: token.accessToken as string,
		//       httpOnly: false,
		//       secure: process.env.NODE_ENV === "production",
		//       sameSite: "strict",
		//       path: "/",
		//       maxAge: parseExpiration("24h"),
		//     });

		//     // console.log("Access token cookie set successfully");
		//   } else {
		//     // console.log("No access token found in JWT");
		//   }

		//   return response;
		// } catch (error) {
		//   console.error("Middleware error:", error);
		//   // In case of an error, redirect to unauthorized
		//   const redirectUrl = req.nextUrl.clone();
		//   redirectUrl.pathname = "/unauthorized";
		//   return NextResponse.redirect(redirectUrl);
		// }

		// Return NextResponse.next() if no redirect is needed
		return NextResponse.next();
	} catch (error) {
		console.error('Middleware error:', error);
		// In case of an error, redirect to unauthorized
		return createSecureRedirect('/unauthorized', req);
	}
}

// Update the matcher to include all protected module routes
export const config = {
	matcher: [
		'/biometric-authorization/:path*',
		'/cheque-book-request/:path*',
		'/nin-validation/:path*',
	],
};
