import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Task Management Board</title>
        <meta name="description" content="task overview application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>Task Management Board</h1>
      </main>
    </>
  );
}
