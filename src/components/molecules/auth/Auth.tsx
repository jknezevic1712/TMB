import { useSession, signIn, signOut } from "next-auth/react";

import { Button } from "@/components/atoms/button";

export default function Auth() {
  const { data: session } = useSession();

  if (session) {
    return <Button onClick={() => signOut()}>Sign Out</Button>;
  }
  return <Button onClick={() => signIn()}>Sign In</Button>;
}
