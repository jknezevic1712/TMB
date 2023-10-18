import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// types
import type { TaskForApp } from "../types/tasks";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedDate(date?: number) {
  let currentDate;

  if (date) {
    currentDate = new Date(date);
  } else {
    currentDate = new Date();
  }

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export function setColorByTaskPriority(priority: number) {
  if (priority === 2) return "text-red-600";
  else if (priority === 1) return "text-yellow-600";
  return "text-green-600";
}

export function sortTasks(tasks: TaskForApp[]): TaskForApp[] {
  tasks.sort((a, b) => {
    if (a.priority < b.priority) {
      return 1;
    } else if (a.priority > b.priority) {
      return -1;
    }
    return +a.dateCreated >= +b.dateCreated ? -1 : 1;
  });

  return tasks;
}

export type TaskStateData = {
  description: string;
  assignee: string | null;
  priority: number | null;
  dueDate: number | null;
};
export function filterTasks(filters: TaskStateData, tasks: TaskForApp[]) {
  return [...tasks].filter(
    (task) =>
      (filters.description.length > 0
        ? task.description
            .toLowerCase()
            .includes(filters.description.toLowerCase())
        : true) &&
      (filters.assignee ? task.assignee.includes(filters.assignee) : true) &&
      (filters.dueDate ? +task.dueDate >= filters.dueDate : true) &&
      (filters.priority ? task.priority === filters.priority : true),
  );
}
