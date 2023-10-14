import { Button } from "@/components/atoms/Button";
import Avatar from "@/components/molecules/avatar";
import { auth, googleProvider } from "@/server/firebase/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export default function Auth() {
  const currentUser = auth.currentUser;

  console.log("USER ", currentUser);

  if (currentUser) {
    return (
      <div className="flex items-center justify-center gap-2">
        <Button variant="destructive" onClick={() => signOut(auth)}>
          Sign Out
        </Button>

        <Avatar src={currentUser.photoURL!} />
      </div>
    );
  }
  return (
    <Button
      variant="success"
      onClick={() => signInWithPopup(auth, googleProvider)}
    >
      Sign In
    </Button>
  );
}
