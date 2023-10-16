import Link from "next/link";
import dynamic from "next/dynamic";

import { Button } from "@/components/atoms/1Button";

const AuthActions = dynamic(
  () => import("@/components/organisms/authActions"),
  { ssr: false },
);

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between pb-8">
      <Link href={"/"}>
        <Button variant="link" className="text-2xl font-bold italic">
          TMB
        </Button>
      </Link>
      <AuthActions />
    </header>
  );
}
