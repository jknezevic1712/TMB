import Link from "next/link";

import AuthActions from "@/components/organisms/authActions/AuthActions";
import { Button } from "@/components/atoms/Button/Button";

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between pb-4">
      <Link href={"/"}>
        <Button variant="link" className="text-2xl font-bold italic">
          TMB
        </Button>
      </Link>
      <AuthActions />
    </header>
  );
}
