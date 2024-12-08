import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { NextURL } from 'next/dist/server/web/next-url'
import {cookies} from "next/headers";

export default async function middleware(request: NextRequest) {
    const cookieStore = await cookies()
    const isLoggedIn = cookieStore.has('currentUser');

    if (isLoggedIn && !request.nextUrl.pathname.startsWith('/home')) {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    if (!isLoggedIn && !request.nextUrl.pathname.startsWith('/auth/login') && !request.nextUrl.pathname.startsWith('/auth/register')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/about/:path*', '/home/:path*', '/auth/login', '/auth/register'], // Define paths where middleware should run
}

