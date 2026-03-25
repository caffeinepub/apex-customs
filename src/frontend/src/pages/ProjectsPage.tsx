import { PROJECT_IMAGES, fallbackProjects } from "@/data/fallbackData";
import { useGetProjects } from "@/hooks/useQueries";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Project } from "../backend.d";

const FILTERS = ["ALL", "JDM", "Euro", "Muscle"] as const;
type Filter = (typeof FILTERS)[number];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("ALL");
  const { data: projects } = useGetProjects();
  const allProjects =
    projects && projects.length > 0 ? projects : fallbackProjects;
  const filtered =
    activeFilter === "ALL"
      ? allProjects
      : allProjects.filter((p) => p.tags.includes(activeFilter));

  return (
    <div className="pt-16">
      <section
        className="py-24 text-center"
        style={{
          background: "linear-gradient(180deg, #0d1117 0%, #0B0F14 100%)",
          borderBottom: "1px solid rgba(24,230,255,0.15)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[1200px] mx-auto px-6"
        >
          <p
            className="font-mono-data text-xs uppercase tracking-[0.4em] mb-3"
            style={{ color: "#18E6FF" }}
          >
            &gt; 500+ COMPLETED BUILDS
          </p>
          <h1
            className="font-racing text-5xl sm:text-7xl"
            style={{ color: "#F2F6F8" }}
          >
            PROJECT{" "}
            <span
              style={{
                color: "#18E6FF",
                textShadow: "0 0 30px rgba(24,230,255,0.8)",
              }}
            >
              ARCHIVE
            </span>
          </h1>
        </motion.div>
      </section>

      <section className="py-16 max-w-[1200px] mx-auto px-6">
        <div className="flex gap-3 mb-10 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              data-ocid="projects.filter.tab"
              onClick={() => setActiveFilter(f)}
              className="px-5 py-2 rounded-full font-mono-data text-xs uppercase tracking-widest transition-all duration-200"
              style={{
                background:
                  activeFilter === f ? "#18E6FF" : "rgba(24,230,255,0.05)",
                color: activeFilter === f ? "#0B0F14" : "#A7B0BA",
                border: `1px solid ${activeFilter === f ? "#18E6FF" : "rgba(24,230,255,0.2)"}`,
                boxShadow:
                  activeFilter === f ? "0 0 15px rgba(24,230,255,0.4)" : "none",
              }}
            >
              {f}
            </button>
          ))}
          <span
            className="font-mono-data text-xs px-4 py-2 rounded-full"
            style={{ color: "rgba(24,230,255,0.5)" }}
          >
            {filtered.length} RESULTS
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) => (
              <ProjectArchiveCard
                key={Number(project.id)}
                project={project}
                index={i}
              />
            ))}
            {filtered.length === 0 && (
              <div
                data-ocid="projects.empty_state"
                className="col-span-full py-20 text-center"
              >
                <p
                  className="font-mono-data text-sm"
                  style={{ color: "#A7B0BA" }}
                >
                  &gt; NO RESULTS FOUND FOR FILTER: {activeFilter}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}

function ProjectArchiveCard({
  project,
  index,
}: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const imgSrc =
    PROJECT_IMAGES[project.carModel] ??
    "/assets/generated/car-gtr-r35.dim_800x500.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      data-ocid={`projects.item.${index + 1}`}
      className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
      style={{
        border: `1px solid ${hovered ? "rgba(24,230,255,0.6)" : "rgba(24,230,255,0.2)"}`,
        boxShadow: hovered ? "0 0 25px rgba(24,230,255,0.25)" : "none",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={imgSrc}
        alt={`${project.carMake} ${project.carModel}`}
        className="w-full h-full object-cover transition-transform duration-500"
        style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to top, rgba(11,15,20,0.95) 0%, transparent 100%)",
          opacity: hovered ? 0 : 1,
        }}
      >
        <h3 className="font-racing text-xl" style={{ color: "#F2F6F8" }}>
          {project.carMake} {project.carModel}
        </h3>
        <div className="flex items-center gap-3 mt-1">
          <span className="font-mono-data text-xs" style={{ color: "#A7B0BA" }}>
            {project.carYear.toString()}
          </span>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono-data text-[10px] px-2 py-0.5 rounded"
              style={{ background: "rgba(24,230,255,0.15)", color: "#18E6FF" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex flex-col justify-between p-5"
            style={{
              backdropFilter: "blur(10px)",
              background: "rgba(11,15,20,0.85)",
            }}
          >
            <div>
              <h3
                className="font-racing text-2xl mb-1"
                style={{ color: "#F2F6F8" }}
              >
                {project.carMake} {project.carModel}
              </h3>
              <p
                className="font-mono-data text-xs mb-4"
                style={{ color: "#18E6FF" }}
              >
                {project.carYear.toString()} &bull; STAGE{" "}
                {project.stageLevel.toString()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "HORSEPOWER", value: `${project.bhp} BHP` },
                { label: "TORQUE", value: `${project.torqueNm} Nm` },
                { label: "0-60 MPH", value: `${project.zeroToSixty}s` },
                {
                  label: "STAGE LEVEL",
                  value: `STAGE ${project.stageLevel.toString()}`,
                },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="p-2.5 rounded-lg"
                  style={{
                    background: "rgba(24,230,255,0.1)",
                    border: "1px solid rgba(24,230,255,0.2)",
                  }}
                >
                  <div
                    className="font-mono-data text-[9px] uppercase tracking-wider mb-0.5"
                    style={{ color: "#A7B0BA" }}
                  >
                    {spec.label}
                  </div>
                  <div
                    className="font-mono-data text-base font-bold"
                    style={{ color: "#18E6FF" }}
                  >
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            <p
              className="text-xs mt-3"
              style={{ color: "#A7B0BA", lineHeight: 1.5 }}
            >
              {project.description.slice(0, 100)}...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
