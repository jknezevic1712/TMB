import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, db, googleProvider } from "@/server/firebase/firebase";

// types
import type { TaskForDB } from "@/lib/types/tasks";
import useStore from "../store";

export default function useFirebaseActions() {
  const { user, setUser } = useStore();

  const signInUser = async () => {
    console.log("signInUser RENDER");
    await signInWithPopup(auth, googleProvider)
      .then((userCredentials) => setUser(userCredentials.user))
      .catch((e) => console.log("Error signing in, ", e));
  };

  const signOutUser = async () => {
    console.log("signOutUser RENDER");
    await signOut(auth)
      .then(() => setUser(null))
      .catch((e) => console.log("Error signing out, ", e));
  };

  const addNewTask = async (description: string) => {
    console.log("addNewTask RENDER");
    const taskData: TaskForDB = {
      dateCreated: Date.now().toString(),
      description: description,
      status: "To Do",
    };

    await addDoc(collection(db, `users/${user?.uid}/tasks`), taskData).catch(
      (e) => console.log("Error adding new task, ", e),
    );
  };

  return {
    signInUser,
    signOutUser,
    addNewTask,
  };
}
