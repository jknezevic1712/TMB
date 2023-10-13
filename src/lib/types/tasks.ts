export interface TaskForDB {
  dateCreated: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
}

export interface TaskForApp extends TaskForDB {
  id: string;
}
