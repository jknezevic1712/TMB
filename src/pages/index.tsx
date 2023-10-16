import Head from "next/head";

// components
import Tasks from "@/components/templates/tasks";
import Welcome from "@/components/templates/welcome";
// hooks
import { useEffect } from "react";
import useFirebaseActions from "@/lib/hooks/useFirebaseActions";
import useStore from "@/lib/hooks/useStore";
// types
import { type Unsubscribe } from "firebase/auth";

export default function Home() {
  const { user } = useStore();
  const { fetchTasks, unsubscribeFetchTasks } = useFirebaseActions();

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;

    if (user) {
      fetchTasks();

      unsubscribe = unsubscribeFetchTasks.current;
    }
    return () => {
      unsubscribe?.();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Task Management Board</title>
        <meta name="description" content="task overview application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full max-w-7xl">{user ? <Tasks /> : <Welcome />}</main>
    </>
  );
}
