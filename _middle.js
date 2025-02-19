import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const adminRoutes = ["/admin",];
const subscriptionRoutes = ["/dashboard", "/search",];

export async function middleware(req) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  req.headers.set('Cache-Control', 'no-store');
  console.log("Middleware is running for : ", req.nextUrl.pathname);
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    console.log("No token found! Redirecting to login.");
    return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, req.url));
  }
  console.log("Token: ", token);

  if (adminRoutes.some((route) =>
    pathname.indexOf(route)) && token.role !== "admin") {
    console.log("Redirecting to '/unauthorized'");
    return NextResponse.redirect(new URL("/unauthorized", req.nextUrl.origin));
  }

  if (token.subscription || (token.subscription.status !== 'active' &&
    subscriptionRoutes.some((route) => pathname.indexOf(route)))) {
    console.log("Redirecting to '/subscription'");
    return NextResponse.redirect(new URL("/subscription", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard", "/search"],
};
