import { registerUser } from "@/lib/services/authService";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const user = await registerUser(body);

    return Response.json(user);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Registration failed";
    return new Response(message, { status: 400 });
  }
}