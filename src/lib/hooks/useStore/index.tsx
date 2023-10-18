import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// types
import type { User } from "firebase/auth";
import type { TaskForApp } from "@/lib/types/tasks";

const initialState = {
  user: null,
  tasks: null,
};

interface AppState {
  user: User | null;
  tasks: TaskForApp[] | null;
}
interface AppActions {
  setUser: (D: User | null) => void;
  setTasks: (D: TaskForApp[]) => void;
  resetState: () => void;
}

function sortTasksByPriority(tasks: TaskForApp[]): TaskForApp[] {
  tasks.sort((a, b) => {
    if (a.priority < b.priority) {
      return 1;
    }
    if (a.priority > b.priority) {
      return -1;
    }
    return 0;
  });

  return tasks;
}

const useStore = create<AppState & AppActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setUser: (user) => set(() => ({ user })),
        setTasks: (tasks) => set(() => ({ tasks: sortTasksByPriority(tasks) })),
        resetState: () => set(initialState),
      }),
      { name: "tmbStore" },
    ),
  ),
);

export default useStore;
