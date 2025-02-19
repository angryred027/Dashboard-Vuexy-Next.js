import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const adminRoutes = ["/admin",];
const subscriptionRoutes = ["/dashboard", "/search",];

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;
  req.headers.set('Cache-Control', 'no-store');
  console.log("Middleware is running for : ", pathname);
  // const session = await getSession({ req });
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET, // Ensure this is set correctly
  });
  console.log("Token: ", token);

  if (!token) {
    console.log("No token found! Redirecting to login.");
    return NextResponse.redirect(new URL(`/login?redirect=${pathname}`,
      req.nextUrl.origin));
  }

  if (adminRoutes.some((route) =>
    pathname.includes(route)) && token?.role !== "admin") {
    console.log("Redirecting to '/notpermitted'");
    return NextResponse.redirect(new URL("/notpermitted", req.nextUrl.origin));
  }

  if (token?.subscription || (token?.subscription?.status !== 'active' &&
    subscriptionRoutes.some((route) => pathname.includes(route)))) {
    console.log("Redirecting to '/subscription'");
    return NextResponse.redirect(new URL("/subscription", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/en/admin/:path*", '/en/search',],
};
