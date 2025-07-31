import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import RouteGuard from "@/components/RouteGuard";

export default function UserDashboardPage() {
  return (
    <RouteGuard allowedRoles={["user"]}>
      <DashboardLayout role="user" />
    </RouteGuard>
  );
}
