"use client";

import { useToolQuery } from "@/tools/client";
import { useState } from "react";
import { LoginForm } from "./login-form";
import { VerifyForm } from "./verify-form";
import { VerifiedUserEmpty } from "@/components/user/verified-user-empty";
import { Spinner } from "../ui/spinner";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const userRetrieveQuery = useToolQuery("user_retrieve", {});

  const [email, setEmail] = useState<string | null>(null);

  if (userRetrieveQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!userRetrieveQuery.data) {
    return (
      <div className="h-screen w-full max-w-md mx-auto flex items-center justify-center p-4">
        {email ? (
          <VerifyForm params={{ email, token: "" }} className="w-full" />
        ) : (
          <LoginForm params={{ email: "" }} className="w-full" onSuccess={(data) => setEmail(data.email)} />
        )}
      </div>
    );
  }

  if (!userRetrieveQuery.data.verified) {
    return <VerifiedUserEmpty />;
  }

  // User is authenticated, show children
  return <>{children}</>;
}

