import { db } from "@/utils";
import { STUDENTS } from "@/utils/schema";
import { NextResponse } from "next/server";
import {eq} from "drizzle-orm"
// Handle POST request – Add a new student
export async function POST(req) {
  try {
    const data = await req.json();

    const result = await db.insert(STUDENTS).values({
      name: data?.name,
      grade: data?.grade,
      address: data?.address,
      contact: data?.contact,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}

// ✅ Handle GET request – Fetch all students
export async function GET() {
  try {
    const students = await db.select().from(STUDENTS);
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to fetch students", details: error.message },
      { status: 500 }
    );
  }
}


// export async function DELETE(req){
//     const searchParams=req.nextUrl.searchParams;
//     const id=searchParams.get('id');

//     const result=await db.delete(STUDENTS)
//     .where(eq(STUDENTS.id, id));

//     return NextResponse.json(result);
// }

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url); // ✅ correctly extract searchParams
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const result = await db.delete(STUDENTS).where(eq(STUDENTS.id, Number(id))); // ✅ ensure id is number

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete", details: error.message },
      { status: 500 }
    );
  }
}
