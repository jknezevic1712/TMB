export interface TaskForDB {
  author: string;
  assignee: string;
  dateCreated: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
  dueDate: string;
  priority: "Low" | "Medium" | "High";
}

export interface TaskForApp extends TaskForDB {
  id: string;
}
