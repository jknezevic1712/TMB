import Header from "../header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start bg-zinc-50 p-4">
      <Header />
      {children}
    </div>
  );
}
