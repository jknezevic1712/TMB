import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/server/firebase/firebase";

// types
import type { TaskForDB } from "@/lib/types/tasks";

export default function useFirebaseDB() {
  const currentUser = auth.currentUser;
  // const fetchTasks = async () => {

  // }

  const addNewTask = async (description: string) => {
    console.log("addNewTask render");
    const taskData: TaskForDB = {
      dateCreated: Date.now().toString(),
      description: description,
      status: "To Do",
    };

    await addDoc(
      collection(db, `users/${currentUser?.uid}/tasks`),
      taskData,
    ).catch((e) => console.log("Error adding new task: ", e));
  };

  return {
    // fetchTasks,
    addNewTask,
  };
}
