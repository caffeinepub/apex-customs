import {
  PROJECT_IMAGES,
  SERVICE_ICONS,
  fallbackProjects,
  fallbackServices,
} from "@/data/fallbackData";
import {
  useGetFeaturedProject,
  useGetProjects,
  useGetStats,
} from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Gauge, Zap } from "lucide-react";
import { motion } from "motion/react";

const TICKER_STATS = [
  "500+ BUILDS COMPLETED",
  "AVG +187 BHP GAIN",
  "0-60 IN 2.8s",
  "1,200 Nm PEAK TORQUE",
  "STAGE 2 CERTIFIED TUNERS",
  "12 DYNO CELLS",
  "RACE-PROVEN ECU MAPS",
  "NATIONWIDE WARRANTY",
];

// Pre-generate doubled ticker items with stable unique keys
const TICKER_ITEMS = [
  ...TICKER_STATS.map((s, i) => ({ id: `a${i}`, text: s })),
  ...TICKER_STATS.map((s, i) => ({ id: `b${i}`, text: s })),
];

const CARBON_BG =
  "repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 8px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 8px), linear-gradient(180deg, #0d1117 0%, #121821 100%)";

export default function HomePage() {
  const { data: stats } = useGetStats();
  const { data: featuredProject } = useGetFeaturedProject();
  const { data: projects } = useGetProjects();

  const displayProjects = (
    projects && projects.length > 0 ? projects : fallbackProjects
  ).slice(0, 3);
  const featured = featuredProject ?? fallbackProjects[0];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, rgba(11,15,20,0.7) 0%, rgba(11,15,20,0.5) 50%, rgba(11,15,20,0.95) 100%), url('/assets/generated/hero-dyno.dim_1920x1080.jpg') center/cover no-repeat`,
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, #18E6FF, transparent)",
              opacity: 0.4,
            }}
          />
          <div
            className="absolute top-1/3 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(24,230,255,0.2), transparent)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p
              className="font-mono-data text-xs uppercase tracking-[0.4em] mb-4"
              style={{ color: "#18E6FF" }}
            >
              &gt; APEX CUSTOMS &bull; LONDON, UK
            </p>
            <h1
              className="font-racing text-5xl sm:text-7xl lg:text-8xl mb-6 leading-none"
              style={{
                color: "#F2F6F8",
                textShadow:
                  "0 0 60px rgba(24,230,255,0.3), 0 4px 30px rgba(0,0,0,0.8)",
                letterSpacing: "0.05em",
              }}
            >
              UNLEASH
              <br />
              <span
                style={{
                  color: "#18E6FF",
                  textShadow: "0 0 30px rgba(24,230,255,0.8)",
                }}
              >
                THE BEAST.
              </span>
            </h1>
            <p
              className="text-lg mb-8 max-w-lg mx-auto"
              style={{ color: "#A7B0BA", lineHeight: 1.7 }}
            >
              London&apos;s most technical performance workshop. ECU remapping,
              forced induction, and bespoke tuning that pushes the limits of
              what&apos;s possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                data-ocid="home.primary_button"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300"
                style={{
                  background: "#18E6FF",
                  color: "#0B0F14",
                  boxShadow: "0 0 30px rgba(24,230,255,0.5)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 50px rgba(24,230,255,0.8)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 30px rgba(24,230,255,0.5)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              >
                <Gauge size={18} /> BOOK YOUR BUILD
              </Link>
              <Link
                to="/projects"
                data-ocid="home.secondary_button"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300"
                style={{
                  background: "rgba(24,230,255,0.05)",
                  border: "1px solid rgba(24,230,255,0.4)",
                  color: "#18E6FF",
                }}
              >
                VIEW PROJECTS <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-3 gap-6 mt-20 max-w-lg mx-auto"
          >
            {[
              {
                label: "TOTAL BUILDS",
                value: stats ? String(stats.totalBuilds) : "500+",
              },
              {
                label: "AVG BHP GAIN",
                value: stats ? `+${stats.avgBhpGain}` : "+187",
              },
              {
                label: "HAPPY CLIENTS",
                value: stats ? String(stats.customerCount) : "450+",
              },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="font-mono-data text-2xl font-bold mb-1"
                  style={{
                    color: "#18E6FF",
                    textShadow: "0 0 15px rgba(24,230,255,0.5)",
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="font-mono-data text-[10px] uppercase tracking-widest"
                  style={{ color: "#A7B0BA" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div
            className="font-mono-data text-[10px] tracking-widest"
            style={{ color: "rgba(24,230,255,0.5)" }}
          >
            SCROLL
          </div>
          <div
            className="w-px h-12 rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, rgba(24,230,255,0.6), transparent)",
            }}
          />
        </div>
      </section>

      {/* Stats Ticker */}
      <section
        className="py-4 overflow-hidden"
        style={{
          background: "rgba(24,230,255,0.05)",
          borderTop: "1px solid rgba(24,230,255,0.2)",
          borderBottom: "1px solid rgba(24,230,255,0.2)",
        }}
      >
        <div className="ticker-track">
          {TICKER_ITEMS.map((item) => (
            <span
              key={item.id}
              className="font-mono-data text-xs uppercase tracking-widest px-6 flex items-center gap-4"
              style={{ color: "#18E6FF", whiteSpace: "nowrap" }}
            >
              <Zap size={12} className="inline" />
              {item.text}
            </span>
          ))}
        </div>
      </section>

      {/* Build of the Month */}
      <section className="py-20 max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="font-mono-data text-xs uppercase tracking-[0.4em] mb-2"
            style={{ color: "#18E6FF" }}
          >
            &gt; SPOTLIGHT
          </p>
          <h2
            className="font-racing text-4xl sm:text-5xl mb-12"
            style={{ color: "#F2F6F8" }}
          >
            BUILD OF THE MONTH
          </h2>
        </motion.div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden"
          style={{
            border: "1px solid rgba(24,230,255,0.3)",
            boxShadow: "0 0 40px rgba(24,230,255,0.1)",
          }}
        >
          <div
            className="aspect-video lg:aspect-auto min-h-64"
            style={{
              background: `url('${PROJECT_IMAGES[featured.carModel] ?? "/assets/generated/car-gtr-r35.dim_800x500.jpg"}') center/cover no-repeat`,
            }}
          />
          <div className="p-8" style={{ background: "#121821" }}>
            <div className="flex items-center gap-2 mb-4">
              <Award size={16} style={{ color: "#18E6FF" }} />
              <span
                className="font-mono-data text-xs uppercase tracking-widest"
                style={{ color: "#18E6FF" }}
              >
                FEATURED BUILD
              </span>
            </div>
            <h3
              className="font-racing text-3xl mb-2"
              style={{ color: "#F2F6F8" }}
            >
              {featured.carMake} {featured.carModel}
            </h3>
            <p
              className="font-mono-data text-xs mb-6"
              style={{ color: "#A7B0BA" }}
            >
              {featured.carYear.toString()} &bull; STAGE{" "}
              {featured.stageLevel.toString()}
            </p>
            <p
              className="text-sm mb-8"
              style={{ color: "#A7B0BA", lineHeight: 1.7 }}
            >
              {featured.description}
            </p>
            <div
              className="grid grid-cols-2 gap-3 p-4 rounded-lg"
              style={{
                background: "rgba(24,230,255,0.05)",
                border: "1px solid rgba(24,230,255,0.15)",
              }}
            >
              {[
                { label: "BHP", value: `${featured.bhp} BHP` },
                { label: "TORQUE", value: `${featured.torqueNm} Nm` },
                { label: "0-60 MPH", value: `${featured.zeroToSixty}s` },
                {
                  label: "STAGE",
                  value: `STAGE ${featured.stageLevel.toString()}`,
                },
              ].map((spec) => (
                <div key={spec.label}>
                  <div
                    className="font-mono-data text-[10px] uppercase tracking-wider mb-0.5"
                    style={{ color: "#A7B0BA" }}
                  >
                    {spec.label}
                  </div>
                  <div
                    className="font-mono-data text-lg font-bold"
                    style={{
                      color: "#18E6FF",
                      textShadow: "0 0 10px rgba(24,230,255,0.4)",
                    }}
                  >
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section
        className="py-20"
        style={{
          backgroundImage: CARBON_BG,
          borderTop: "1px solid rgba(24,230,255,0.1)",
          borderBottom: "1px solid rgba(24,230,255,0.1)",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p
              className="font-mono-data text-xs uppercase tracking-[0.4em] mb-2"
              style={{ color: "#18E6FF" }}
            >
              &gt; CORE SERVICES
            </p>
            <h2
              className="font-racing text-4xl sm:text-5xl"
              style={{ color: "#F2F6F8" }}
            >
              THE GARAGE
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {fallbackServices.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-ocid={`services.item.${i + 1}`}
                className="group p-6 rounded-2xl cursor-pointer transition-all duration-300"
                style={{
                  background: "#121821",
                  border: "1px solid rgba(24,230,255,0.15)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(24,230,255,0.6)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 20px rgba(24,230,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(24,230,255,0.15)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div className="text-3xl mb-4">
                  {SERVICE_ICONS[service.name] ?? "⚙️"}
                </div>
                <h3
                  className="font-racing text-lg mb-2 uppercase tracking-wider"
                  style={{ color: "#F2F6F8" }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-xs mb-4"
                  style={{ color: "#A7B0BA", lineHeight: 1.6 }}
                >
                  {service.description.slice(0, 90)}...
                </p>
                <div
                  className="font-mono-data text-xs"
                  style={{ color: "#18E6FF" }}
                >
                  FROM &pound;{service.priceTiers.stage1.toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/garage"
              data-ocid="home.garage_button"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300"
              style={{
                border: "1px solid rgba(24,230,255,0.4)",
                color: "#18E6FF",
                background: "rgba(24,230,255,0.05)",
              }}
            >
              VIEW ALL SERVICES <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-20 max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p
            className="font-mono-data text-xs uppercase tracking-[0.4em] mb-2"
            style={{ color: "#18E6FF" }}
          >
            &gt; RECENT WORK
          </p>
          <h2
            className="font-racing text-4xl sm:text-5xl"
            style={{ color: "#F2F6F8" }}
          >
            PROJECT ARCHIVE
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {displayProjects.map((project, i) => (
            <ProjectCard key={Number(project.id)} project={project} index={i} />
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/projects"
            data-ocid="home.projects_button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest"
            style={{
              border: "1px solid rgba(24,230,255,0.4)",
              color: "#18E6FF",
              background: "rgba(24,230,255,0.05)",
            }}
          >
            FULL ARCHIVE <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: { project: (typeof fallbackProjects)[0]; index: number }) {
  const imgSrc =
    PROJECT_IMAGES[project.carModel] ??
    "/assets/generated/car-gtr-r35.dim_800x500.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      data-ocid={`projects.item.${index + 1}`}
      className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
      style={{ border: "1px solid rgba(24,230,255,0.2)" }}
    >
      <img
        src={imgSrc}
        alt={`${project.carMake} ${project.carModel}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to top, rgba(11,15,20,0.9) 0%, rgba(11,15,20,0.3) 60%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 flex flex-col justify-center items-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          backdropFilter: "blur(8px)",
          background: "rgba(11,15,20,0.8)",
        }}
      >
        <div className="grid grid-cols-2 gap-3 w-full">
          {[
            { label: "BHP", value: `${project.bhp}` },
            { label: "Nm", value: `${project.torqueNm}` },
            { label: "0-60", value: `${project.zeroToSixty}s` },
            { label: "STAGE", value: `S${project.stageLevel}` },
          ].map((s) => (
            <div
              key={s.label}
              className="text-center p-2 rounded"
              style={{
                background: "rgba(24,230,255,0.1)",
                border: "1px solid rgba(24,230,255,0.2)",
              }}
            >
              <div
                className="font-mono-data text-[10px] uppercase"
                style={{ color: "#A7B0BA" }}
              >
                {s.label}
              </div>
              <div
                className="font-mono-data text-lg font-bold"
                style={{ color: "#18E6FF" }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-racing text-lg" style={{ color: "#F2F6F8" }}>
          {project.carMake} {project.carModel}
        </h3>
        <span className="font-mono-data text-xs" style={{ color: "#18E6FF" }}>
          {project.carYear.toString()}
        </span>
      </div>
    </motion.div>
  );
}
