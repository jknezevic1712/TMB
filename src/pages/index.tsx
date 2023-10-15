import Head from "next/head";

import Tasks from "@/components/templates/tasks";

export default function Home() {
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
