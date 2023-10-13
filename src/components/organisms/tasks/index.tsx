import { Button } from "@/components/atoms/Button";

export default function Tasks() {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-2">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold">Tasks</h1>
        <Button variant="default">Create New</Button>
      </div>

      {/* TODO: Table with tasks */}
    </div>
  );
}
