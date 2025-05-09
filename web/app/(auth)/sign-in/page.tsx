import { LoginForm } from "@/feature/auth/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

const page = () => {
  return (
    <div className="mx-auto flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
};

export default page;
