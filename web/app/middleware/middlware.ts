import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) { 
    
    const token = req.cookies.get("token")?.value;
  
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }