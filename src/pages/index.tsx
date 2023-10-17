import Head from "next/head";

// components
import TasksTemplate from "@/components/templates/tasks";
// hooks
import { useEffect } from "react";
import useFirebaseActions from "@/lib/hooks/useFirebaseActions";
import useStore from "@/lib/hooks/useStore";
// types
import { type Unsubscribe } from "firebase/auth";
import withAuthGuard from "@/lib/hoc/withAuthGuard";

function HomePage() {
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
      <main className="w-full max-w-7xl">
        <TasksTemplate />
      </main>
    </>
  );
}

const HomePageWithAuthGuard = withAuthGuard(HomePage);
export default HomePageWithAuthGuard;
