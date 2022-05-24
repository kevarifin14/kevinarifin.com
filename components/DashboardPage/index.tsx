import { useSession } from "next-auth/react";

import { Container } from "components/Container";

type DashboardPageProps = {
  className?: string;
};

export function DashboardPage({ className }: DashboardPageProps) {
  const session = useSession();

  return <Container>{session.status}</Container>;
}
