import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const adminRoutes = ["/admin"];
const subscriptionRoutes = ["/dashboard", "/search"];

export async function middleware(req) {
  const { pathname, origin } = req.nextUrl;
  req.headers.set("Cache-Control", "no-store");

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, origin));

  if (adminRoutes.some((route) => pathname.includes(route)) && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/notpermitted", origin));
  }

  if (
    token?.role === "user" &&
    (!token?.subscription || token.subscription.status !== "active") &&
    subscriptionRoutes.some((route) => pathname.includes(route))
  ) {
    return NextResponse.redirect(new URL("/subscription", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/en/admin/:path*", "/en/search",],
};
