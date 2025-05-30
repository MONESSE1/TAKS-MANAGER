"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TaskCard from "./TaskCard";
import AddTaskForm from "./AddTaskForm";

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

interface TasksProps {
  show?: "completed" | "incomplete";
}

function Tasks({ show }: TasksProps) {
  const { theme } = useGlobalState();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const oneDay = 24 * 60 * 60 * 1000;
  const now = new Date().getTime();

  const filteredTasks = tasks.filter((task) => {
    if (show === "completed") return task.completed;
    if (show === "incomplete") return !task.completed;
    if (task.completed) {
      const updated = new Date(task.updatedAt).getTime();
      return now - updated < oneDay;
    }
    return true;
  });

  return (
    <TaskLayout theme={theme}>
      <TaskContainer theme={theme}>
        <h2 className="section-title">All Tasks</h2>

        <TaskList>
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onTaskUpdate={fetchTasks} />
          ))}

          <AddCard onClick={() => setShowForm(true)}>+ Add New Task</AddCard>
        </TaskList>

        {showForm && (
          <ModalOverlay onClick={() => setShowForm(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <AddTaskForm
                onTaskAdded={() => {
                  fetchTasks();
                  setShowForm(false);
                }}
              />
            </ModalContent>
          </ModalOverlay>
        )}
      </TaskContainer>
    </TaskLayout>
  );
}

const TaskLayout = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colorBg};
`;

const TaskContainer = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: ${(props) => props.theme.colorBg2};
  height: 100%;
  overflow-y: auto;
  border-radius: 1rem;
  border: 2px solid ${(props) => props.theme.borderColor2};
  margin: 1rem;

  .section-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1.5rem;
  }
`;

const TaskList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const AddCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #444;
  border-radius: 0.75rem;
  min-height: 160px;
  font-weight: bold;
  color: #888;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: #ccc;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #222;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 500px;
`;

export default Tasks;
