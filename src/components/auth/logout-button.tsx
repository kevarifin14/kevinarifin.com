"use client";

import { useToolMutation } from "@/tools/client";
import { authLogoutSchema } from "@/tools/auth/logout/schema";
import { userRetrieveSchema } from "@/tools/user/retrieve/schema";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const authLogoutMutation = useToolMutation(authLogoutSchema, {
    invalidateQueries: [userRetrieveSchema],
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
