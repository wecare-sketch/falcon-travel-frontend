import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import RouteGuard from "@/components/RouteGuard";

export default function AdminDashboardPage() {
  return (
    <RouteGuard allowedRoles={["admin"]}>
      <DashboardLayout role="admin" />
    </RouteGuard>
  );
}
