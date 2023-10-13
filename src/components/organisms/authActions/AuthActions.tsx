import { useSession, signIn, signOut } from "next-auth/react";

import { Button } from "@/components/atoms/Button/Button";
import Avatar from "@/components/molecules/avatar/Avatar";

export default function Auth() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center justify-center gap-2">
        <Button variant="destructive" onClick={() => signOut()}>
          Sign Out
        </Button>

        <Avatar src={session.user.image!} />
      </div>
    );
  }
  return (
    <Button variant="success" onClick={() => signIn()}>
      Sign In
    </Button>
  );
}
