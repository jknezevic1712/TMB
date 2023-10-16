import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// types
import type { User } from "firebase/auth";
import type { TaskForApp } from "@/lib/types/tasks";

const initialData = {
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
}

const useStore = create<AppState & AppActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialData,
        setUser: (user) => set(() => ({ user })),
        setTasks: (tasks) => set(() => ({ tasks })),
      }),
      { name: "tmbStore" },
    ),
  ),
);

export default useStore;
