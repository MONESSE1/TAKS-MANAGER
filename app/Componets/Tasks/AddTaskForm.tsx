"use client";

import React, { useState } from "react";
import styled from "styled-components";

interface Task {
  id?: string;
  title: string;
  description: string;
  dueDate?: string;
  important: boolean;
}

interface AddTaskFormProps {
  onTaskAdded?: () => void;
  existingTask?: Task;
}

export default function AddTaskForm({ onTaskAdded, existingTask }: AddTaskFormProps) {
  const [task, setTask] = useState<Task>(
    existingTask || {
      title: "",
      description: "",
      dueDate: "",
      important: false,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    setTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = existingTask ? `/api/tasks/${existingTask.id}` : "/api/tasks";
    const method = existingTask ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!existingTask) {
      setTask({ title: "", description: "", dueDate: "", important: false });
    }

    onTaskAdded?.();
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={task.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate?.slice(0, 10) || ""}
        onChange={handleChange}
      />
      <label>
        <input
          type="checkbox"
          name="important"
          checked={task.important}
          onChange={handleChange}
        />
        Important
      </label>
      <button type="submit">
        {existingTask ? "Save Changes" : "Add Task"}
      </button>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input,
  textarea {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
  }

  button {
    background-color: #22c55e;
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: bold;
  }
`;
