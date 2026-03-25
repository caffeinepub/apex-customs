import { SERVICE_ICONS, fallbackServices } from "@/data/fallbackData";
import { useGetServices } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";

export default function GaragePage() {
  const { data: services } = useGetServices();
  const displayServices =
    services && services.length > 0 ? services : fallbackServices;

  return (
    <div className="pt-16">
      <section
        className="relative py-24 flex items-center justify-center"
        style={{
          background: `linear-gradient(to right, rgba(11,15,20,0.98) 0%, rgba(11,15,20,0.8) 50%, rgba(11,15,20,0.98) 100%), url('/assets/generated/carbon-fiber-bg.dim_800x600.jpg') center/cover`,
          borderBottom: "1px solid rgba(24,230,255,0.2)",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="font-mono-data text-xs uppercase tracking-[0.4em] mb-3"
              style={{ color: "#18E6FF" }}
            >
              &gt; APEX CUSTOMS &bull; SERVICES
            </p>
            <h1
              className="font-racing text-5xl sm:text-7xl"
              style={{ color: "#F2F6F8", letterSpacing: "0.05em" }}
            >
              THE{" "}
              <span
                style={{
                  color: "#18E6FF",
                  textShadow: "0 0 30px rgba(24,230,255,0.8)",
                }}
              >
                GARAGE
              </span>
            </h1>
            <p
              className="mt-4 text-sm max-w-lg mx-auto"
              style={{ color: "#A7B0BA" }}
            >
              Every build starts here. Choose your performance path and let our
              engineers push your vehicle to its true limits.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {displayServices.map((service, i) => (
            <ServiceCard key={service.name} service={service} index={i} />
          ))}
        </div>
      </section>

      <section
        className="py-16"
        style={{
          background:
            "linear-gradient(135deg, rgba(24,230,255,0.05) 0%, rgba(11,15,20,1) 100%)",
          borderTop: "1px solid rgba(24,230,255,0.15)",
          borderBottom: "1px solid rgba(24,230,255,0.15)",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2
            className="font-racing text-3xl sm:text-4xl mb-4"
            style={{ color: "#F2F6F8" }}
          >
            READY TO BUILD?
          </h2>
          <p className="mb-8 text-sm" style={{ color: "#A7B0BA" }}>
            Book a consultation with our expert tuners and get a bespoke quote
            for your vehicle.
          </p>
          <Link
            to="/booking"
            data-ocid="garage.primary_button"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300"
            style={{
              background: "#18E6FF",
              color: "#0B0F14",
              boxShadow: "0 0 30px rgba(24,230,255,0.4)",
            }}
          >
            BOOK A CONSULTATION
          </Link>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({
  service,
  index,
}: { service: (typeof fallbackServices)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const tierNames = ["Stage 1", "Stage 2", "Stage 3"] as const;
  const tierKeys = ["stage1", "stage2", "stage3"] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      data-ocid={`garage.item.${index + 1}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-8 rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: "#121821",
        border: `1px solid ${hovered ? "rgba(24,230,255,0.6)" : "rgba(24,230,255,0.15)"}`,
        boxShadow: hovered ? "0 0 30px rgba(24,230,255,0.2)" : "none",
      }}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-4xl mb-3">
            {SERVICE_ICONS[service.name] ?? "⚙️"}
          </div>
          <h3
            className="font-racing text-2xl uppercase tracking-wider"
            style={{ color: "#F2F6F8" }}
          >
            {service.name}
          </h3>
          <span
            className="font-mono-data text-xs px-2 py-0.5 rounded uppercase tracking-wider mt-2 inline-block"
            style={{
              background: "rgba(24,230,255,0.1)",
              color: "#18E6FF",
              border: "1px solid rgba(24,230,255,0.2)",
            }}
          >
            {service.category}
          </span>
        </div>
      </div>

      <p className="text-sm mb-6" style={{ color: "#A7B0BA", lineHeight: 1.7 }}>
        {service.description}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {tierKeys.map((key, ti) => {
          const price = service.priceTiers[key];
          if (!price) return null;
          return (
            <div
              key={key}
              className="text-center p-3 rounded-lg"
              style={{
                background: "rgba(24,230,255,0.05)",
                border: "1px solid rgba(24,230,255,0.15)",
              }}
            >
              <div
                className="font-racing text-xs mb-1 uppercase"
                style={{ color: "#A7B0BA" }}
              >
                {tierNames[ti]}
              </div>
              <div
                className="font-mono-data text-base font-bold"
                style={{ color: "#18E6FF" }}
              >
                &pound;{price.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>

      {hovered && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-6"
        >
          <div
            className="p-4 rounded-lg"
            style={{
              background: "rgba(24,230,255,0.05)",
              border: "1px solid rgba(24,230,255,0.1)",
            }}
          >
            <div
              className="font-mono-data text-[10px] uppercase tracking-widest mb-2"
              style={{ color: "#18E6FF" }}
            >
              SPEC DATA
            </div>
            <div
              className="grid grid-cols-2 gap-2 text-xs font-mono-data"
              style={{ color: "#A7B0BA" }}
            >
              <span>&gt; STAGE 1: ENTRY TUNE</span>
              <span style={{ color: "#18E6FF" }}>+85 BHP / +120 Nm</span>
              <span>&gt; STAGE 2: FULL MAP</span>
              <span style={{ color: "#18E6FF" }}>+185 BHP / +220 Nm</span>
              <span>&gt; STAGE 3: TRACK SPEC</span>
              <span style={{ color: "#18E6FF" }}>+300+ BHP</span>
            </div>
          </div>
        </motion.div>
      )}

      <Link
        to="/booking"
        data-ocid={`garage.item.${index + 1}.button`}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300"
        style={{
          background: hovered ? "#18E6FF" : "rgba(24,230,255,0.1)",
          color: hovered ? "#0B0F14" : "#18E6FF",
          border: "1px solid rgba(24,230,255,0.4)",
        }}
      >
        GET A QUOTE
      </Link>
    </motion.div>
  );
}
