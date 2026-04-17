import { loginUser } from "@/lib/services/authService";
import { cookies } from "next/headers";
import Link from 'next/link';
import { redirect } from 'next/navigation';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await loginUser(body);
    const token = result?.token;

    if (!token) {
      return new Response("No token returned", { status: 401 });
    }

    const cookieStore = await cookies(); 

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json(result); 

    redirect('/dashboard');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Login failed";
    return new Response(message, { status: 400 });
  }
}