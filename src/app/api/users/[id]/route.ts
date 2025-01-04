import { NextResponse } from "next/server";

import { User } from "@/models/User";
import { loadUser, NotFoundError, removeUser } from "@/services/UserService";
import { Props } from "@/types";

export async function GET(req: Request, props: Props ) {
  if (!props.params)
    return new NextResponse(null, {
      status: 400,
    });

  const id = (await props.params).id;

  const user: User | null = await loadUser(id);

  return new NextResponse(JSON.stringify(user), {
      status: 200,
  });
}

export async function DELETE(req: Request, props: Props ) {
  if (!props.params)
    return new NextResponse(null, {
      status: 400,
    });

  const id = (await props.params).id;

  try {
    await removeUser(id);
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
      status: 204,
  });
}