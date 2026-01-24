"use client";

import { useToolMutation } from "@/tools/client";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const authLogoutMutation = useToolMutation("auth_logout", {
    invalidate: ["user_retrieve"],
    onSuccess: () => {
      window.location.href = '/';
    },
  });

  return (
    <Button
      onClick={() => authLogoutMutation.mutate({})}
      disabled={authLogoutMutation.isPending}
      variant="outline"
    >
      {authLogoutMutation.isPending ? <Spinner /> : <LogOut />}
    </Button>
  );
}
