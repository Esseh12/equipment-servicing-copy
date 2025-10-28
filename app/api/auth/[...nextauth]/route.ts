import { authOptions } from '@/app/api/auth/auth-options';
import NextAuth from 'next-auth';

// Create handler for each HTTP method required by NextAuth
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
// Add other HTTP methods that NextAuth may need
export const PUT = NextAuth(authOptions);
export const DELETE = NextAuth(authOptions);
export const PATCH = NextAuth(authOptions);