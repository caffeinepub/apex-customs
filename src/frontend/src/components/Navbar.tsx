import { useCartStore } from "@/store/cartStore";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingCart, X, Zap } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "HOME", to: "/" },
  { label: "THE GARAGE", to: "/garage" },
  { label: "PROJECTS", to: "/projects" },
  { label: "PARTS", to: "/shop" },
  { label: "BOOKING", to: "/booking" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartItems } = useCartStore();
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backdropFilter: "blur(12px)",
        background: "rgba(15,20,28,0.55)",
        borderBottom: "1px solid rgba(24,230,255,0.2)",
        boxShadow: "0 2px 20px rgba(24,230,255,0.1)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" data-ocid="nav.link" className="flex items-center gap-2">
            <Zap size={22} className="cyan-text" />
            <span
              className="font-racing text-xl tracking-widest"
              style={{
                color: "#18E6FF",
                textShadow: "0 0 10px rgba(24,230,255,0.6)",
              }}
            >
              APEX CUSTOMS
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = currentPath === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid="nav.link"
                  className="text-xs font-medium uppercase tracking-widest transition-all duration-200"
                  style={{
                    color: isActive ? "#18E6FF" : "#A7B0BA",
                    textShadow: isActive
                      ? "0 0 8px rgba(24,230,255,0.8)"
                      : "none",
                    borderBottom: isActive
                      ? "1px solid #18E6FF"
                      : "1px solid transparent",
                    paddingBottom: "2px",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/shop" data-ocid="nav.link" className="relative">
              <ShoppingCart size={20} style={{ color: "#A7B0BA" }} />
              {cartItems.length > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{ background: "#18E6FF", color: "#0B0F14" }}
                >
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link
              to="/booking"
              data-ocid="nav.primary_button"
              className="hidden sm:block text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-200"
              style={{
                background: "rgba(24,230,255,0.15)",
                border: "1px solid #18E6FF",
                color: "#18E6FF",
                boxShadow: "0 0 10px rgba(24,230,255,0.2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(24,230,255,0.3)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 20px rgba(24,230,255,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(24,230,255,0.15)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 10px rgba(24,230,255,0.2)";
              }}
            >
              LOGIN
            </Link>
            <button
              type="button"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: "#A7B0BA" }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav
            className="md:hidden pb-4 pt-2 border-t"
            style={{ borderColor: "rgba(24,230,255,0.15)" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                className="block py-2 text-sm uppercase tracking-widest"
                style={{ color: "#A7B0BA" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
