import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminDashboard from "./components/AdminDashboard";

export default function AdminPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/login");
    } else {
      setReady(true);
    }
  }, []);

  if (!ready) return null;

  return <AdminDashboard />;
}
