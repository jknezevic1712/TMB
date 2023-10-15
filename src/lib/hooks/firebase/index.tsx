import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, db, googleProvider } from "@/server/firebase/firebase";

// types
import type { TaskForApp, TaskForDB } from "@/lib/types/tasks";
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

  const fetchTasks = async () => {
    console.log("fetchTasks RENDER");
    let tasks: TaskForApp[] = [];

    const querySnapshot = await getDocs(
      collection(db, `users/${user?.uid}/tasks`),
    );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      tasks = [
        ...tasks,
        {
          id: doc.id,
          ...(doc.data() as TaskForDB),
        },
      ];
    });

    return tasks;
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
    fetchTasks,
    addNewTask,
  };
}
