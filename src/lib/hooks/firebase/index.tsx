import { useSession } from "next-auth/react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import db from "@/server/firebase/firebase";

// types
import type { TaskForDB } from "@/lib/types/tasks";

export default function useFirebaseDB() {
  const { data: session } = useSession();
  // const fetchTasks = async () => {

  // }

  const addNewTask = async (description: string) => {
    console.log("addNewTask render");
    const taskData: TaskForDB = {
      dateCreated: Date.now().toString(),
      description: description,
      status: "To Do",
    };

    // const userRef = doc(db, 'tasks', userData.id);
    await addDoc(collection(db, `users/${session?.user.id}/tasks`), taskData);
  };

  return {
    // fetchTasks,
    addNewTask,
  };
}
