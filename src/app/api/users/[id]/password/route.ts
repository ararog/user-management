import { NextResponse } from "next/server";
import { NotFoundError, updatePassword } from "@/services/UserService";
import { Props } from "@/types";
import { UpdatePasswordSchema } from "@/helpers/validation";
import { ZodError } from "zod";

export async function PUT(req: Request, props: Props ) {
  if (!props.params)
    return new NextResponse(null, {
      status: 400,
    });

  const payload = await req.json();
  
  try {
    UpdatePasswordSchema.parse(payload);
  }
  catch(e) {
    if (e instanceof ZodError) {
      return new NextResponse(JSON.stringify({ errors: e.formErrors.fieldErrors }), {
        status: 400,
      });  
    }
  }    

  const id = (await props.params).id;
  try {
    await updatePassword(id, payload.password);
  }
  catch (e) {
    if (e instanceof NotFoundError) {
      return new NextResponse(null, {
        status: 404,
      });
    } else {
      return new NextResponse(null, {
        status: 500,
      });      
    }
  }  

  return new NextResponse(null, {
      status: 200,
  });
}