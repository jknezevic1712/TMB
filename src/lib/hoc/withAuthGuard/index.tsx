import { useRouter } from "next/router";
import { useEffect } from "react";
// custom hooks
import useStore from "@/lib/hooks/useStore";
import { useToast } from "@/lib/hooks/useToast";

export default function withAuthGuard(
  Component: (props: any) => React.ReactNode,
) {
  return function AuthGuardComponent(props: any) {
    const { user } = useStore();
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
      if (!user) {
        router.replace("/welcome").catch((e) =>
          toast({
            title: "Error while rerouting to welcome page",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{e}</code>
              </pre>
            ),
          }),
        );
      } else {
        router.replace("/").catch((e) =>
          toast({
            title: "Error while rerouting to index page",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{e}</code>
              </pre>
            ),
          }),
        );
      }
    }, [user]);

    return <Component {...props} />;
  };
}
