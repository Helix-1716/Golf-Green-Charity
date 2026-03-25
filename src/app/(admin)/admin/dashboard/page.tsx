// /admin/dashboard redirects to /admin (the main admin overview)
// This alias ensures the middleware redirect target resolves correctly
import { redirect } from "next/navigation";

export default function AdminDashboardRedirect() {
  redirect("/admin");
}
