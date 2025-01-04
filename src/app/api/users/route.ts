import { NextRequest, NextResponse } from "next/server";
import { loadUsers, saveUser } from "@/services/UserService";
import { User } from "@/models/User";
import { NewUserSchema } from "@/helpers/validation";
import { ZodError } from "zod";

export async function GET() {
  try {
    const users: User[] = await loadUsers();
    return new NextResponse(JSON.stringify(users), {
        status: 200,
    });
  } catch(e) {
    console.log(e);
    return new NextResponse(null, {
      status: 500,
    });
  }
}

export const POST = async(req: NextRequest) => {
  const user = await req.json();

  try {
    NewUserSchema.parse(user);
  }
  catch(e) {
    if (e instanceof ZodError) {
      return new NextResponse(JSON.stringify({ errors: e.formErrors.fieldErrors }), {
        status: 400,
      });  
    }
  }

  try {
    await saveUser(user);
  } catch(e) {
    console.log(e);
  }

  return new NextResponse(null, {
    status: 201,
  });    
} 