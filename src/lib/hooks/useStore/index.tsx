import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// utils
import { sortTasks } from "@/lib/utils";
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

const useStore = create<AppState & AppActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setUser: (user) => set(() => ({ user })),
        setTasks: (tasks) => set(() => ({ tasks: sortTasks(tasks) })),
        resetState: () => set(initialState),
      }),
      { name: "tmbStore" },
    ),
  ),
);

export default useStore;
