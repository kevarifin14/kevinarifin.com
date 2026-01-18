"use client";

import { useToolQuery } from "@/tools/client";
import { userRetrieveSchema } from "@/tools/user/retrieve/schema";
import { useState } from "react";
import { LoginForm } from "./login-form";
import { VerifyForm } from "./verify-form";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const userRetrieveQuery = useToolQuery(userRetrieveSchema, {});

  const [email, setEmail] = useState<string | null>(null);

  // Show loading state while checking auth
  if (userRetrieveQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Show auth forms if not authenticated
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

  // User is authenticated, show children
  return <>{children}</>;
}

