import Link from "next/link";

import Auth from "@/components/molecules/auth/Auth";

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between pb-4">
      <Link href={"/"} className="text-2xl font-bold italic">
        <span>TMB</span>
      </Link>
      <Auth />
    </header>
  );
}
