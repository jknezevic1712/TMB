// components
import { Button } from "@/components/atoms/Button";
import Avatar from "@/components/molecules/avatar";
// hooks
import useFirebaseActions from "@/lib/hooks/firebase";
import useStore from "@/lib/hooks/store";

export default function Auth() {
  const currentUser = useStore((state) => state.user);
  const { signInUser, signOutUser } = useFirebaseActions();

  if (currentUser) {
    return (
      <div className="flex items-center justify-center gap-2">
        <Button variant="destructive" onClick={() => signOutUser()}>
          Sign Out
        </Button>

        <Avatar src={currentUser.photoURL!} />
      </div>
    );
  }
  return (
    <Button variant="success" onClick={() => signInUser()}>
      Sign In
    </Button>
  );
}
