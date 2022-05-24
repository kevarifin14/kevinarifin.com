import { DashboardPage } from "components/DashboardPage";
import { getLayout } from "components/Layout";

export default function Dashboard() {
  return <DashboardPage />;
}

Dashboard.getLayout = getLayout;
