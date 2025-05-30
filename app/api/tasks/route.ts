import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET /api/tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: { comments: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

// POST /api/tasks
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, dueDate, important = false, assignedTo = null } = body;

    // Validare de bază
    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description: description || "",
        dueDate: dueDate ? new Date(dueDate) : null,
        important,
        assignedTo,
        completed: false, // default
      },
    });

    return NextResponse.json(newTask);
  } catch (error) {
    console.error("POST /api/tasks error:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
