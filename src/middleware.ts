import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  'https://appusermanagementararog.loclx.io', 
  'https://app.usermanagement.training', 
  'http://microblog-prometheus.default.svc.cluster.local', 
];

export async function middleware(req:NextRequest) {
  const res = NextResponse.next();

  const origin = req.headers.get("origin");
  if (! origin)
    return res;

  // if the origin is an allowed one,
  // add it to the 'Access-Control-Allow-Origin' header
  if (allowedOrigins.includes(origin)) {
    res.headers.append('Access-Control-Allow-Origin', origin);
  }

  // add the remaining CORS headers to the response
  res.headers.append('Access-Control-Allow-Credentials', "true")
  res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
  res.headers.append(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  return res;
}

// specify the path regex to apply the middleware to
export const config = {
  matcher: '/api/:path*',
}