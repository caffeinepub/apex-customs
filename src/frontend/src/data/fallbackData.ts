import type { Part, Project, Service } from "../backend.d";

export const fallbackProjects: Project[] = [
  {
    id: BigInt(1),
    carMake: "Nissan",
    carModel: "GT-R R35",
    carYear: BigInt(2020),
    bhp: 650,
    torqueNm: 780,
    zeroToSixty: 2.6,
    stageLevel: BigInt(3),
    tags: ["JDM"],
    description:
      "Full Stage 3 build with upgraded twin turbos, forged internals, and carbon widebody. Track-ready beast delivering 650 BHP on pump fuel.",
    isFeatured: true,
    timestamp: BigInt(0),
  },
  {
    id: BigInt(2),
    carMake: "Toyota",
    carModel: "Supra A90",
    carYear: BigInt(2021),
    bhp: 520,
    torqueNm: 610,
    zeroToSixty: 3.4,
    stageLevel: BigInt(2),
    tags: ["JDM"],
    description:
      "Stage 2 ECU remap with custom intake, downpipe, and intercooler upgrade. Pushing well beyond factory limits in a refined package.",
    isFeatured: false,
    timestamp: BigInt(0),
  },
  {
    id: BigInt(3),
    carMake: "BMW",
    carModel: "M3 G80 Competition",
    carYear: BigInt(2022),
    bhp: 580,
    torqueNm: 700,
    zeroToSixty: 2.9,
    stageLevel: BigInt(3),
    tags: ["Euro"],
    description:
      "Stage 3 S58 engine build with upgraded port injection, Eventuri intake, and full Akrapovic exhaust. Street-legal race machine.",
    isFeatured: false,
    timestamp: BigInt(0),
  },
  {
    id: BigInt(4),
    carMake: "Porsche",
    carModel: "911 GT3",
    carYear: BigInt(2022),
    bhp: 510,
    torqueNm: 490,
    zeroToSixty: 2.7,
    stageLevel: BigInt(1),
    tags: ["Euro"],
    description:
      "Precision GT3 track setup with custom suspension geometry, aero tuning, and ECU optimisation. Apex lap time machine.",
    isFeatured: false,
    timestamp: BigInt(0),
  },
  {
    id: BigInt(5),
    carMake: "Honda",
    carModel: "Civic Type R FL5",
    carYear: BigInt(2023),
    bhp: 380,
    torqueNm: 450,
    zeroToSixty: 4.2,
    stageLevel: BigInt(2),
    tags: ["JDM"],
    description:
      "Stage 2 turbo upgrade with custom manifold, intercooler, and ECU map. Significant gains over the already impressive factory output.",
    isFeatured: false,
    timestamp: BigInt(0),
  },
  {
    id: BigInt(6),
    carMake: "Lamborghini",
    carModel: "Huracán EVO",
    carYear: BigInt(2021),
    bhp: 720,
    torqueNm: 690,
    zeroToSixty: 2.5,
    stageLevel: BigInt(3),
    tags: ["Euro"],
    description:
      "Bespoke Stage 3 Huracán build with full exhaust system, custom ECU calibration, and aerodynamic widebody conversion. Pinnacle of performance.",
    isFeatured: false,
    timestamp: BigInt(0),
  },
];

export const fallbackServices: Service[] = [
  {
    name: "ECU Remapping",
    description:
      "Precision-engineered software calibration for your engine management system. Our Stage 2 maps deliver up to +185 BHP and +220 Nm over stock. Custom dyno-tuned to your exact specification.",
    priceTiers: { stage1: 450, stage2: 850, stage3: 1400 },
    category: "Engine",
  },
  {
    name: "Suspension Geometry",
    description:
      "Full four-wheel alignment and suspension setup using the latest Hunter Engineering equipment. Includes camber, caster, and toe adjustments for optimal handling dynamics.",
    priceTiers: { stage1: 350, stage2: 650, stage3: 1100 },
    category: "Chassis",
  },
  {
    name: "Forced Induction",
    description:
      "Turbocharger and supercharger installation and upgrade packages. From bolt-on kits delivering +200 BHP to full bespoke twin-turbo conversions. All builds dyno-verified.",
    priceTiers: { stage1: 2500, stage2: 4500, stage3: 8500 },
    category: "Engine",
  },
  {
    name: "Aesthetic Widebody Kits",
    description:
      "Carbon fibre and polyurethane widebody conversion kits. Engineered for aerodynamic function, not just aesthetics. Includes full respray in your chosen finish.",
    priceTiers: { stage1: 3500, stage2: 6500, stage3: 12000 },
    category: "Aero",
  },
];

export const fallbackParts: Part[] = [
  {
    name: "Garrett GTX3582R Turbocharger",
    description:
      "High-flow ball-bearing turbo. 600+ BHP capable. Direct replacement for OEM units.",
    category: "TURBOS",
    price: 1850,
    inStock: true,
  },
  {
    name: "HKS Hi-Power Exhaust System",
    description:
      "Full titanium cat-back system. +22 BHP gain, weight saving 8.4 kg vs OEM. Single exit.",
    category: "EXHAUSTS",
    price: 895,
    inStock: true,
  },
  {
    name: 'BBS CH-R Alloy Wheels 18"',
    description:
      "Forged aluminium race-spec rim. Centre-lock compatible. Available in 5 finishes.",
    category: "WHEELS",
    price: 2200,
    inStock: true,
  },
  {
    name: "BC Racing BR Coilovers",
    description:
      "30-way damper adjustment. Spring rate: 8K/6K. Lower ride height by 40-80mm.",
    category: "SUSPENSION",
    price: 1100,
    inStock: true,
  },
  {
    name: "Turbosmart BOV Kompact",
    description:
      "Dual-port blow-off valve. 200 BHP rated. CNC billet aluminium construction.",
    category: "TURBOS",
    price: 285,
    inStock: false,
  },
  {
    name: "Milltek Sport Cat-Back Exhaust",
    description:
      "T304 stainless. Non-resonated race spec. 63mm primary, 76mm secondary.",
    category: "EXHAUSTS",
    price: 1450,
    inStock: true,
  },
];

export const SERVICE_ICONS: Record<string, string> = {
  "ECU Remapping": "⚡",
  "Suspension Geometry": "🔧",
  "Forced Induction": "💨",
  "Aesthetic Widebody Kits": "🏎️",
};

export const PROJECT_IMAGES: Record<string, string> = {
  "GT-R R35": "/assets/generated/car-gtr-r35.dim_800x500.jpg",
  "Supra A90": "/assets/generated/car-supra-a90.dim_800x500.jpg",
  "M3 G80 Competition": "/assets/generated/car-bmw-m3.dim_800x500.jpg",
  "911 GT3": "/assets/generated/car-porsche-gt3.dim_800x500.jpg",
  "Civic Type R FL5": "/assets/generated/car-civic-type-r.dim_800x500.jpg",
  "Huracán EVO": "/assets/generated/car-huracan.dim_800x500.jpg",
};

export const PART_IMAGES: Record<string, string> = {
  TURBOS: "/assets/generated/part-turbo.dim_600x400.jpg",
  EXHAUSTS: "/assets/generated/part-exhaust.dim_600x400.jpg",
  WHEELS: "/assets/generated/part-wheel.dim_600x400.jpg",
  SUSPENSION: "/assets/generated/part-coilover.dim_600x400.jpg",
};
