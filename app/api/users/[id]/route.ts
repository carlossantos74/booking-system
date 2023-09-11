import { db } from "@/lib/prisma";
import { GetIdParams } from "@/utils/global.types";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: GetIdParams) {
  const { id } = params;

  try {  
    const user = await db.user.findUnique({
      where: {
        id,
      }
    });

    if(!user) {
      return NextResponse.json({
        statusText: 'Not Found'
      }, 
      { status: 404 });
    }

    return NextResponse.json<User>(user);
  } catch (error) {
    
  }
}