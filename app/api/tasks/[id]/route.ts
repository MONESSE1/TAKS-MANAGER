import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Context = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, context: Context) {
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
  } catch {
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: Context) {
  const { id } = context.params;

  try {
    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Task deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: Context) {
  const { id } = context.params;
  const data = await req.json();

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedTask);
  } catch {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: Context) {
  const { id } = context.params;
  const updates = await req.json();

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: updates,
    });

    return NextResponse.json(updatedTask);
  } catch {
    return NextResponse.json({ error: "Failed to patch task" }, { status: 500 });
  }
}
