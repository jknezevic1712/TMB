import Head from "next/head";

import Tasks from "@/components/templates/tasks";
// hooks
import { useEffect } from "react";
import useFirebaseActions from "@/lib/hooks/firebase";

export default function Home() {
  const { fetchTasks, unsubscribeFetchTasks } = useFirebaseActions();

  useEffect(() => {
    fetchTasks();

    const unsubscribe = unsubscribeFetchTasks.current;
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Task Management Board</title>
        <meta name="description" content="task overview application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full max-w-7xl">
        <Tasks />
      </main>
    </>
  );
}
