import { LoginCard } from "@/widgets/login-card";

export default function LoginPage() {
  return (
    <main className="bg-background flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-[420px]">
        <LoginCard />
      </div>
    </main>
  );
}
