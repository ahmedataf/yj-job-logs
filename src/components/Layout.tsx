import { Outlet } from "react-router-dom";
import { TopNavigation } from "@/components/TopNavigation";
import { Toaster } from "@/components/ui/toaster";

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <main className="p-6">
        <TopNavigation />
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}