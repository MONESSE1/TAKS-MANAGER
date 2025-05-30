"use client";

import React from "react";
import styled from "styled-components";
import { FaCheck, FaUndo, FaTrash } from "react-icons/fa";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  important: boolean;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

interface TaskCardProps {
  task: Task;
  onTaskUpdate?: () => void;
}

const TaskCard = ({ task, onTaskUpdate }: TaskCardProps) => {
  const handleComplete = async () => {
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (res.ok) {
        onTaskUpdate?.();
      }
    } catch (error) {
      console.error("Eroare la schimbarea statusului taskului:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Ești sigur că vrei să ștergi acest task?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onTaskUpdate?.();
      }
    } catch (error) {
      console.error("Eroare la ștergere task:", error);
    }
  };

  return (
    <CardStyled $completed={task.completed}>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        {task.dueDate && (
          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        )}
        {task.important && <strong>⭐ Important</strong>}
      </div>

      <ButtonGroup>
        <IconBtn onClick={handleComplete} title={task.completed ? "Undo" : "Complete"}>
          {task.completed ? <FaUndo /> : <FaCheck />}
        </IconBtn>
        <IconBtn onClick={handleDelete} title="Delete">
          <FaTrash />
        </IconBtn>
      </ButtonGroup>
    </CardStyled>
  );
};

const CardStyled = styled.div<{ $completed?: boolean }>`
  background-color: ${({ $completed, theme }) =>
    $completed ? "lightgreen" : theme.colorBg3};
  color: white;
  padding: 1.2rem;
  border-radius: 0.75rem;
  min-height: 160px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3,
  p,
  span,
  strong {
    color: white;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const IconBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: white;

  &:hover {
    opacity: 0.8;
  }
`;

export default TaskCard;
