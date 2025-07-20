// /api/attendance/route.js
import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { eq, like, and } from "drizzle-orm";
import { NextResponse } from "next/server";

/** ✅ GET: Attendance per Grade and Month */
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const grade = searchParams.get("grade");
  const month = searchParams.get("month"); // MM/YYYY

  try {
    const result = await db
      .select({
        name: STUDENTS.name,
        present: ATTENDANCE.present,
        day: ATTENDANCE.day,
        date: ATTENDANCE.date,
        grade: STUDENTS.grade,
        StudentId: STUDENTS.id,
        attendanceId: ATTENDANCE.id,
      })
      .from(STUDENTS)
      .leftJoin(
        ATTENDANCE,
        and(
          eq(STUDENTS.id, ATTENDANCE.StudentId),
          like(ATTENDANCE.date, `${month}%`) // ✅ Fixed: match start of date with MM/YYYY
        )
      )
      .where(eq(STUDENTS.grade, grade));

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET Attendance error", error);
    return NextResponse.json(
      { error: "Failed to fetch attendance" },
      { status: 500 }
    );
  }
}

/** ✅ POST: Mark as Present (Upsert) */
export async function POST(req) {
  const data = await req.json();

  try {
    // Delete existing record for this student-date-day (if exists)
    await db
      .delete(ATTENDANCE)
      .where(
        and(
          eq(ATTENDANCE.StudentId, data.StudentId),
          eq(ATTENDANCE.day, data.day),
          eq(ATTENDANCE.date, data.date)
        )
      );

    // Insert new record with present = true
    const result = await db.insert(ATTENDANCE).values({
      StudentId: data.StudentId,
      present: true,
      day: data.day,
      date: data.date,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("POST Attendance error", error);
    return NextResponse.json(
      { error: "Failed to mark attendance" },
      { status: 500 }
    );
  }
}

/** ✅ DELETE: Mark as Absent (delete record) */
export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams;
  const StudentId = searchParams.get("StudentId");
  const date = searchParams.get("date");
  const day = searchParams.get("day");

  try {
    const result = await db
      .delete(ATTENDANCE)
      .where(
        and(
          eq(ATTENDANCE.StudentId, StudentId),
          eq(ATTENDANCE.day, day),
          eq(ATTENDANCE.date, date)
        )
      );

    return NextResponse.json(result);
  } catch (error) {
    console.error("DELETE Attendance error", error);
    return NextResponse.json(
      { error: "Failed to delete attendance" },
      { status: 500 }
    );
  }
}
