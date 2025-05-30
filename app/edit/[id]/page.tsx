"use client";

import AddTaskForm from "@/app/Componets/Tasks/AddTaskForm";
import { useEffect, useState } from "react";

export default function EditPage({ params }: { params: { id: string } }) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch(`/api/tasks/${params.id}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch task");
      return res.json();
    })
    .then(setTask)
    .catch((error) => {
      console.error(error);
      setTask(null);
    })
    .finally(() => setLoading(false));
}, [params.id]);


  if (loading) return <p>Loading...</p>;
  if (!task) return <p>Task not found.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Edit Task</h1>
      <AddTaskForm existingTask={task} />
    </div>
  );
}
