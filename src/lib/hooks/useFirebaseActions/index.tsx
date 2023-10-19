import {
  addDoc,
  collection,
  query,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { type Unsubscribe, signInWithPopup, signOut } from "firebase/auth";
import { auth, db, googleProvider } from "@/server/firebase/firebase";
// custom hooks
import useStore from "@/lib/hooks/useStore";
import { useToast } from "@/lib/hooks/useToast";
// types
import type { TaskForApp, TaskForDB } from "@/lib/types/tasks";
import { type MutableRefObject, useRef } from "react";

export default function useFirebaseActions() {
  const { user, setUser, setTasks, resetState } = useStore();
  const { toast } = useToast();
  const unsubscribeFetchTasks: MutableRefObject<Unsubscribe | undefined> =
    useRef();

  const signInUser = async () => {
    await signInWithPopup(auth, googleProvider)
      .then((userCredentials) => {
        setUser(userCredentials.user);
        toast({
          title: "Successfully signed in",
        });
      })
      .catch((e) =>
        toast({
          title: "Error signing in",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{e}</code>
            </pre>
          ),
        }),
      );
  };

  const signOutUser = async () => {
    await signOut(auth)
      .then(() => {
        resetState();

        toast({
          title: "Successfully signed out",
        });
      })
      .catch((e) =>
        toast({
          title: "Error signing out",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{e}</code>
            </pre>
          ),
        }),
      );
  };

  const fetchTasks = () => {
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
        toast({
          title: "Error fetching the tasks",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{queryError.name}</code>
            </pre>
          ),
        }),
    );
  };

  const addNewTask = async (
    data: Omit<TaskForDB, "author" | "dateCreated" | "status">,
  ) => {
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

    await addDoc(collection(db, `users/${user?.uid}/tasks`), taskData)
      .then(() =>
        toast({
          title: "Successfully added the task",
        }),
      )
      .catch((e) =>
        toast({
          title: "Error adding new task",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{e}</code>
            </pre>
          ),
        }),
      );
  };

  const editTask = (taskID: string, data: Partial<TaskForApp>) => {
    const taskRef = doc(db, `users/${user?.uid}/tasks`, taskID);
    setDoc(taskRef, { ...data }, { merge: true })
      .then(() =>
        toast({
          title: "Successfully edited the task",
        }),
      )
      .catch((e) =>
        toast({
          title: "Error editing task",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{e}</code>
            </pre>
          ),
        }),
      );
  };

  const switchTaskStatus = (newStatus: string, taskID: string) => {
    function setNewTaskStatus(): "To Do" | "In Progress" | "Completed" {
      if (newStatus === "toDoTable") return "To Do";
      else if (newStatus === "inProgressTable") return "In Progress";
      return "Completed";
    }

    const taskRef = doc(db, "users", user!.uid, "tasks", taskID);
    setDoc(taskRef, { status: setNewTaskStatus() }, { merge: true })
      .then(() =>
        toast({
          title: `Successfully switched the task to '${setNewTaskStatus()}' table`,
        }),
      )
      .catch((e) =>
        toast({
          title: "Error switching task status",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{e}</code>
            </pre>
          ),
        }),
      );
  };

  const deleteTask = (taskID: string) => {
    deleteDoc(doc(db, "users", user!.uid, "tasks", taskID))
      .then(() =>
        toast({
          title: "Successfully deleted the task",
        }),
      )
      .catch((e) =>
        toast({
          title: "Error deleting task",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{e}</code>
            </pre>
          ),
        }),
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
    deleteTask,
  };
}
