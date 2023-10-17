export default function WelcomeTemplate() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center">
      <h1 className="text-center text-4xl">
        Welcome to <span className="text-green-600">Task</span>{" "}
        <span className="text-yellow-600">Managment</span>{" "}
        <span className="text-red-600">Board</span>
      </h1>
    </div>
  );
}
