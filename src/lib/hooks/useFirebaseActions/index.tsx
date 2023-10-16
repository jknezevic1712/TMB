import {
  addDoc,
  collection,
  query,
  onSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";
import { type Unsubscribe, signInWithPopup, signOut } from "firebase/auth";
import { auth, db, googleProvider } from "@/server/firebase/firebase";

// types
import type { TaskForApp, TaskForDB } from "@/lib/types/tasks";
import useStore from "../useStore";
import { type MutableRefObject, useRef } from "react";

export default function useFirebaseActions() {
  const { user, setUser, setTasks } = useStore();
  const unsubscribeFetchTasks: MutableRefObject<Unsubscribe | undefined> =
    useRef();

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

  const fetchTasks = () => {
    console.log("fetchTasks RENDER");

    const q = query(collection(db, `users/${user?.uid}/tasks`));
    unsubscribeFetchTasks.current = onSnapshot(
      q,
      (querySnapshot) => {
        const data: Record<string, TaskForApp> = {};

        querySnapshot.forEach((doc) => {
          data[doc.id] = doc.data() as TaskForApp;
        });

        const structuredData: TaskForApp[] = Object.entries(data).map(
          (res) => ({
            id: res[0],
            author: res[1].author,
            assignee: res[1].assignee,
            dateCreated: res[1].dateCreated,
            description: res[1].description,
            status: res[1].status,
            dueDate: res[1].dueDate,
            priority: res[1].priority,
          }),
        );

        setTasks(structuredData);

        return;
      },
      (queryError) =>
        console.log("Error fetching the tasks, ", queryError.name),
    );
  };

  const addNewTask = async (
    data: Omit<TaskForDB, "author" | "dateCreated" | "status">,
  ) => {
    console.log("addNewTask RENDER");
    const { assignee, description, dueDate, priority } = data;
    const taskData: TaskForDB = {
      author: user?.displayName ?? "Unknown author",
      assignee,
      dateCreated: Date.now().toString(),
      description: description,
      status: "To Do",
      dueDate,
      priority,
    };

    await addDoc(collection(db, `users/${user?.uid}/tasks`), taskData).catch(
      (e) => console.log("Error adding new task, ", e),
    );
  };

  const editTask = (task: TaskForApp) => {
    console.log("editTask RENDER");
    const { id, ...otherTaskData } = task;

    const taskRef = doc(db, `users/${user?.uid}/tasks`, id);
    setDoc(taskRef, { ...otherTaskData }, { merge: true }).catch((e) =>
      console.log("Error editing task, ", e),
    );
  };

  const switchTaskStatus = (newStatus: string, taskID: string) => {
    console.log("switchTaskStatus RENDER");

    function setNewTaskStatus(): "To Do" | "In Progress" | "Completed" {
      if (newStatus === "toDoTable") return "To Do";
      else if (newStatus === "inProgressTable") return "In Progress";
      return "Completed";
    }

    const taskRef = doc(db, "users", user!.uid, "tasks", taskID);
    setDoc(taskRef, { status: setNewTaskStatus() }, { merge: true }).catch(
      (e) => console.log("Error switching task status, ", e),
    );
  };

  return {
    signInUser,
    signOutUser,
    fetchTasks,
    unsubscribeFetchTasks,
    addNewTask,
    editTask,
    switchTaskStatus,
  };
}