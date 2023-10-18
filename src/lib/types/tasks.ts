export interface TaskForDB {
  author: string;
  assignee: string;
  dateCreated: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
  dueDate: string;
  priority: number;
}

export interface TaskForApp extends TaskForDB {
  id: string;
}
