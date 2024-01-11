import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const paths = ['/dashboard', '/dashboard/quiz']
    const token = await getToken({req: req})

    const { pathname } = req.nextUrl

    if (!token && paths.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}