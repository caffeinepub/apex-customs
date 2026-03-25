import { Link } from "@tanstack/react-router";
import { Mail, Zap } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      style={{
        background: "#080C11",
        borderTop: "1px solid rgba(24,230,255,0.15)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={20} className="cyan-text" />
              <span
                className="font-racing text-lg tracking-widest"
                style={{ color: "#18E6FF" }}
              >
                APEX CUSTOMS
              </span>
            </div>
            <p
              className="text-sm mb-4"
              style={{ color: "#A7B0BA", lineHeight: 1.7 }}
            >
              London&apos;s premier performance tuning workshop. Specialising in
              ECU remapping, forced induction, and bespoke performance builds
              for discerning drivers.
            </p>
            <div className="flex gap-3">
              {["FB", "IG", "YT", "TW"].map((s) => (
                <div
                  key={s}
                  className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold cursor-pointer transition-all duration-200 hover:scale-110"
                  style={{
                    border: "1px solid rgba(24,230,255,0.3)",
                    color: "#A7B0BA",
                    background: "rgba(24,230,255,0.05)",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-racing text-sm tracking-widest mb-4"
              style={{ color: "#18E6FF" }}
            >
              QUICK LINKS
            </h4>
            <ul className="space-y-2">
              {[
                { label: "The Garage", to: "/garage" },
                { label: "Project Archive", to: "/projects" },
                { label: "Parts Shop", to: "/shop" },
                { label: "Book a Session", to: "/booking" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    data-ocid="footer.link"
                    className="text-sm transition-colors duration-200 hover:text-[#18E6FF]"
                    style={{ color: "#A7B0BA" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              className="font-racing text-sm tracking-widest mb-4"
              style={{ color: "#18E6FF" }}
            >
              NEWSLETTER
            </h4>
            <p className="text-xs mb-3" style={{ color: "#A7B0BA" }}>
              Build updates and exclusive offers.
            </p>
            {subscribed ? (
              <p
                className="text-sm font-mono-data"
                style={{ color: "#18E6FF" }}
              >
                &gt; SUBSCRIBED_OK
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  data-ocid="footer.input"
                  className="flex-1 text-xs px-3 py-2 rounded outline-none"
                  style={{
                    background: "rgba(24,230,255,0.05)",
                    border: "1px solid rgba(24,230,255,0.2)",
                    color: "#F2F6F8",
                  }}
                />
                <button
                  type="submit"
                  data-ocid="footer.submit_button"
                  className="px-3 py-2 rounded text-xs font-bold uppercase tracking-wider"
                  style={{ background: "#18E6FF", color: "#0B0F14" }}
                >
                  <Mail size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs"
          style={{
            borderTop: "1px solid rgba(24,230,255,0.1)",
            color: "#A7B0BA",
          }}
        >
          <p>
            &copy; {year}. Built with &hearts; using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#18E6FF] transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p
            className="font-mono-data"
            style={{ color: "rgba(24,230,255,0.5)" }}
          >
            APEX CUSTOMS &bull; LONDON, UK &bull; EST. 2019
          </p>
        </div>
      </div>
    </footer>
  );
}
