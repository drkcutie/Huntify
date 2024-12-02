import type { NextRequest } from 'next/server'
import {NextResponse} from "next/server";
import {NextURL} from "next/dist/server/web/next-url";
    


export default function middleware(request:  NextRequest){
    // provide logic for authorization
    const isLoggedIn = false
    const currentUser = request.cookies.get('currentUser')?.value

    if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
        return Response.redirect(new URL('/home', request.url))
    }

    if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/login', request.url))
    }
    
}


export const config = {
    matcher: '/about/:path*',
}