import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// types
import type { User } from "firebase/auth";

interface AppState {
  user: User | null;
}

interface AppActions {
  setUser: (newUser: User | null) => void;
}

const useStore = create<AppState & AppActions>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (newUser) => set(() => ({ user: newUser })),
      }),
      { name: "tmbStore" },
    ),
  ),
);

export default useStore;
