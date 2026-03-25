import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#0B0F14" }}
    >
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  ),
});
