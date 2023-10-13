import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerAuthSession } from "@/server/auth";
import Head from "next/head";

import Tasks from "@/components/organisms/tasks";

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
      <main className="w-full">
        <Tasks />
      </main>
    </>
  );
}
