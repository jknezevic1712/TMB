import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerAuthSession } from "@/server/auth";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

import { useSession, signIn, signOut } from "next-auth/react"
function Component() {
  const { data: session } = useSession()

  async function handleAuth() {
    if (session) {
      await signOut()
      return;
    }

    await signIn();
  }

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google")}>Sign in</button>
    </>
  )
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getServerAuthSession({
//     req: context.req,
//     res: context.res
//   })

//   console.log("session ", session)

//   // if (!session) {
//   //   return {
//   //     redirect: {
//   //       destination: '/',
//   //       permanent: false,
//   //     },
//   //   }
//   // }

//   return {
//     props: {
//       session,
//     },
//   }
// }

export default function Home() {
  // console.log("Home session ",session)
// const authData = async () => {
  // await getServerAuthSession({req, res}).then((data) => console.log(data)).catch(e => console.log(e))
// }
  // useEffect(() => {
  //   await getServerAuthSession().then((data) => console.log(data)).catch(e => console.log(e))
  // }, [])

  return (
    <>
      <Head>
        <title>Task Management Board</title>
        <meta name="description" content="task overview application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>Task Management Board</h1>
        <Link href={"/api/auth"}>Login</Link>
        <div className="p-4">
        <Component />
        </div>
      </main>
    </>
  );
}
