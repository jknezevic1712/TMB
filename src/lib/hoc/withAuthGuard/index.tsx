import { useRouter } from "next/router";
// custom hooks
import useStore from "@/lib/hooks/useStore";
import { useEffect } from "react";

export default function withAuthGuard(
  Component: (props: any) => React.ReactNode,
) {
  return function AuthGuardComponent(props: any) {
    const { user } = useStore();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router
          .replace("/welcome")
          .catch((e) =>
            console.log("Error while rerouting to welcome page, ", e),
          );
      } else {
        router
          .replace("/")
          .catch((e) =>
            console.log("Error while rerouting to welcome page, ", e),
          );
      }
    }, [user]);

    return <Component {...props} />;
  };
}
