import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DELETE /api/tasks/:id
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Task deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}

// GET /api/tasks/:id
export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const task = await prisma.task.findUnique({
      where: { id },
      include: { comments: true },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
  }
}

// PUT /api/tasks/:id
export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const data = await request.json();

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

// PATCH /api/tasks/:id
export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const updates = await request.json();

    const updatedTask = await prisma.task.update({
      where: { id },
      data: updates,
    });

    return NextResponse.json(updatedTask); // ✅ Trebuie să returnezi un JSON valid
  } catch (error) {
    return NextResponse.json({ error: "Failed to patch task" }, { status: 500 });
  }
}
