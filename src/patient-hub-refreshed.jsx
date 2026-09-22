import React, { useState, useEffect, useMemo } from "react";
import {
  Home,
  Bell,
  CalendarCheck,
  Stethoscope,
  Pill,
  FileText,
  ShoppingBag,
  Utensils,
  ChevronRight,
  Plus,
  Check,
  Clock,
  MapPin,
  Star,
  Download,
  X,
  Menu,
  Search,
  Video,
  PhoneCall,
  MessageSquare,
  Droplet,
  AlertCircle,
  UserRound,
  ShieldCheck,
  Save,
  LogOut,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------------------------------------------------------
   Fonts + design tokens
   Heading: Baloo 2 (rounded, warm, approachable)
   Body: Inter (clean, legible)
   Palette: pastel mint / lavender / peach / sky with two
   bright accents (coral + teal) for actions and status.
--------------------------------------------------------- */
const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
    :root{
      --font-head: 'Baloo 2', sans-serif;
      --font-body: 'Inter', sans-serif;
      --ink: #07122f;
      --ink-soft: #5f6b86;
      --canvas: #f8f7f7;
      --mint: #f3d9dc;
      --mint-soft: #f9ecee;
      --lavender: #ddd6e8;
      --lavender-soft: #f3eff7;
      --peach: #e9a08f;
      --peach-soft: #fae3de;
      --sky: #d9dce8;
      --sky-soft: #eef0f5;
      --coral: #e47766;
      --teal: #922347;
      --navy: #07122f;
      --burgundy: #922347;
      --red: #c52f48;
    }
    .ph-root{ font-family: var(--font-body); color: var(--ink); background: var(--canvas); }
    .ph-head{ font-family: var(--font-head); }

    /* ---------- Professional UI/UX motion system ---------- */
    .ph-root {
      --motion-fast: 180ms;
      --motion-base: 280ms;
      --motion-slow: 560ms;
      --ease-out: cubic-bezier(.22,1,.36,1);
      --ease-standard: cubic-bezier(.2,.8,.2,1);
      scroll-behavior: smooth;
    }

    /* Smooth page/section transitions */
    .ph-root .ph-page {
      animation: phPageIn var(--motion-slow) var(--ease-out) both;
      will-change: opacity, transform;
    }

    /* Cards: subtle lift, not flashy */
    .ph-root .ph-card {
      transform: translateZ(0);
      backface-visibility: hidden;
      transition:
        transform var(--motion-base) var(--ease-out),
        box-shadow var(--motion-base) var(--ease-standard),
        border-color var(--motion-base) ease;
    }

    .ph-root .ph-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 18px 42px rgba(7,18,47,.12);
    }

    /* Dashboard cards enter one after another */
    .ph-root .ph-stagger {
      opacity: 0;
      animation: phStaggerIn 560ms var(--ease-out) forwards;
    }

    /* Buttons */
    .ph-root .ph-button {
      position: relative;
      overflow: hidden;
      isolation: isolate;
      transform: translateZ(0);
      transition:
        transform var(--motion-fast) var(--ease-out),
        box-shadow var(--motion-fast) var(--ease-out),
        background-color var(--motion-fast) ease;
    }

    .ph-root .ph-button::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        105deg,
        transparent 25%,
        rgba(255,255,255,.22) 50%,
        transparent 75%
      );
      transform: translateX(-130%);
      transition: transform 600ms var(--ease-out);
      pointer-events: none;
    }

    .ph-root .ph-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 24px rgba(7,18,47,.16);
    }

    .ph-root .ph-button:hover::after {
      transform: translateX(130%);
    }

    .ph-root .ph-button:active {
      transform: translateY(1px) scale(.985);
    }

    /* Sidebar / mobile navigation */
    .ph-root .ph-nav-item {
      position: relative;
      transition:
        transform var(--motion-fast) var(--ease-out),
        background-color var(--motion-fast) ease,
        color var(--motion-fast) ease;
    }

    .ph-root .ph-nav-item:hover {
      transform: translateX(4px);
    }

    .ph-root .ph-nav-item.ph-active::before {
      content: "";
      position: absolute;
      left: 0;
      top: 20%;
      bottom: 20%;
      width: 3px;
      border-radius: 99px;
      background: var(--burgundy);
      animation: phIndicatorIn 260ms var(--ease-out) both;
    }

    .ph-root .ph-nav-icon {
      transition: transform var(--motion-base) var(--ease-out);
    }

    .ph-root .ph-nav-item:hover .ph-nav-icon,
    .ph-root .ph-nav-item.ph-active .ph-nav-icon {
      transform: translateY(-1px) scale(1.06);
    }

    /* Hero decorative motion */
    .ph-root .ph-brand-dot {
      animation: phBrandBreath 3.2s ease-in-out infinite;
    }

    .ph-root .ph-hero-orb {
      animation: phOrbFloat 8s ease-in-out infinite;
    }

    .ph-root .ph-hero-orb-2 {
      animation: phOrbFloat 9s ease-in-out 1.2s infinite reverse;
    }

    /* Charts */
    .ph-root .ph-chart {
      animation: phChartReveal 850ms var(--ease-out) 100ms both;
      transform-origin: left center;
    }

    /* Login screen */
    .ph-root .ph-login-card {
      animation: phLoginCardIn 650ms var(--ease-out) both;
    }

    .ph-root .ph-login-logo {
      animation: phLoginLogoIn 700ms var(--ease-out) 100ms both;
    }

    .ph-root .ph-login-field {
      animation: phFieldIn 450ms var(--ease-out) both;
    }

    .ph-root .ph-login-field:nth-child(2) { animation-delay: 70ms; }
    .ph-root .ph-login-field:nth-child(3) { animation-delay: 140ms; }

    /* Form inputs */
    .ph-root input,
    .ph-root textarea,
    .ph-root select {
      transition:
        border-color 180ms ease,
        background-color 180ms ease,
        box-shadow 180ms ease,
        transform 180ms var(--ease-out);
    }

    .ph-root input:focus,
    .ph-root textarea:focus,
    .ph-root select:focus {
      transform: translateY(-1px);
      box-shadow: 0 0 0 4px rgba(146,35,71,.08);
    }

    /* Save/success feedback */
    .ph-root .ph-success {
      animation: phSuccessIn 420ms var(--ease-out) both;
    }

    /* Mobile drawer */
    .ph-root .ph-menu-enter {
      animation: phDrawerIn 360ms var(--ease-out) both;
    }

    .ph-root .ph-overlay-enter {
      animation: phOverlayIn 220ms ease both;
      backdrop-filter: blur(2px);
    }

    .ph-root .ph-modal-backdrop {
      background:
        radial-gradient(circle at 15% 20%, rgba(228,119,102,.28), transparent 24%),
        radial-gradient(circle at 85% 18%, rgba(146,35,71,.22), transparent 25%),
        radial-gradient(circle at 78% 82%, rgba(221,214,232,.65), transparent 28%),
        linear-gradient(135deg, rgba(7,18,47,.62), rgba(146,35,71,.34));
      backdrop-filter: blur(10px) saturate(115%);
      -webkit-backdrop-filter: blur(10px) saturate(115%);
      overflow: hidden;
    }
    .ph-root .ph-modal-decor {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
    }
    .ph-root .ph-modal-decor::before,
    .ph-root .ph-modal-decor::after {
      content: "";
      position: absolute;
      border-radius: 999px;
      filter: blur(2px);
      animation: phModalFloat 7s ease-in-out infinite;
    }
    .ph-root .ph-modal-decor::before {
      width: 230px; height: 230px; left: -70px; bottom: -70px;
      background: rgba(228,119,102,.20);
    }
    .ph-root .ph-modal-decor::after {
      width: 280px; height: 280px; right: -90px; top: -90px;
      background: rgba(221,214,232,.24); animation-delay: -2s;
    }
    .ph-root .ph-modal-decor span {
      position: absolute;
      font-family: var(--font-head);
      color: rgba(255,255,255,.25);
      font-size: 28px;
      animation: phModalFloat 6s ease-in-out infinite;
    }
    .ph-root .ph-modal-decor span:nth-child(1){left:12%;top:18%;}
    .ph-root .ph-modal-decor span:nth-child(2){right:14%;top:28%;font-size:38px;animation-delay:-1s;}
    .ph-root .ph-modal-decor span:nth-child(3){left:22%;bottom:18%;font-size:22px;animation-delay:-3s;}
    .ph-root .ph-modal-decor span:nth-child(4){right:24%;bottom:14%;animation-delay:-4s;}
    .ph-root .ph-modal-decor span:nth-child(5){left:50%;top:9%;font-size:16px;animation-delay:-2s;}
    .ph-root .ph-modal-backdrop > .ph-modal-enter { position: relative; z-index: 2; }
    @keyframes phModalFloat { 0%,100%{transform:translate3d(0,0,0) rotate(0deg)} 50%{transform:translate3d(0,-12px,0) rotate(3deg)} }

    /* Accessible keyboard focus */
    .ph-root button:focus-visible,
    .ph-root a:focus-visible,
    .ph-root input:focus-visible,
    .ph-root textarea:focus-visible,
    .ph-root select:focus-visible {
      outline: 3px solid rgba(197,47,72,.24);
      outline-offset: 3px;
    }

    @keyframes phPageIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes phStaggerIn {
      from { opacity: 0; transform: translateY(14px) scale(.985); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes phIndicatorIn {
      from { opacity: 0; transform: scaleY(0); }
      to { opacity: 1; transform: scaleY(1); }
    }

    @keyframes phBrandBreath {
      0%,100% { box-shadow: 0 0 0 0 rgba(146,35,71,.18); transform: scale(1); }
      50% { box-shadow: 0 0 0 7px rgba(146,35,71,0); transform: scale(1.025); }
    }

    @keyframes phOrbFloat {
      0%,100% { transform: translate3d(0,0,0); }
      50% { transform: translate3d(0,-11px,0); }
    }

    @keyframes phChartReveal {
      from { opacity: 0; transform: scaleX(.88); }
      to { opacity: 1; transform: scaleX(1); }
    }

    @keyframes phLoginCardIn {
      from { opacity: 0; transform: translateY(24px) scale(.975); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes phLoginLogoIn {
      from { opacity: 0; transform: translateY(-10px) scale(.9); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes phFieldIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes phSuccessIn {
      from { opacity: 0; transform: translateY(-6px) scale(.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes phDrawerIn {
      from { opacity: 0; transform: translateX(28px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes phOverlayIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @media (prefers-reduced-motion: reduce) {
      .ph-root *,
      .ph-root *::before,
      .ph-root *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
      }
    }
  `}</style>
);

/* ---------------------------------------------------------
   Static data
--------------------------------------------------------- */
const NAV = [
  { id: "home", label: "Home", icon: Home },
  { id: "reminders", label: "Reminders", icon: Bell },
  { id: "appointment", label: "Book Visit", icon: CalendarCheck },
  { id: "consultation", label: "Consultation", icon: Stethoscope },
  { id: "prescriptions", label: "Prescriptions", icon: Pill },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "shop", label: "Where to Buy", icon: ShoppingBag },
  { id: "diet", label: "Diet Plan", icon: Utensils },
];

const DEFAULT_PATIENT = {
  name: "Meera Das",
  condition: "Diabetes",
  doctor: "Dr. Aveek Sen",
  email: "patient@carehub.demo",
  password: "patient123",
  diet: "",
  medications: [
    { id: 1, name: "Metformin 500mg", dosage: "1 tablet, twice daily", refill: "5 days left", tone: "mint" },
    { id: 2, name: "Glimepiride 1mg", dosage: "1 tablet, once daily", refill: "2 days left", tone: "peach" },
    { id: 3, name: "Vitamin D3", dosage: "1 capsule, weekly", refill: "3 weeks left", tone: "sky" },
  ],
  reports: [
    { id: 1, name: "Fasting Blood Sugar", date: "12 Sep 2026", status: "Improved", value: "112 mg/dL" },
    { id: 2, name: "HbA1c Panel", date: "02 Sep 2026", status: "Stable", value: "6.4%" },
    { id: 3, name: "Blood Pressure Log", date: "12 Sep 2026", status: "Improved", value: "118/76" },
    { id: 4, name: "Lipid Profile", date: "24 Aug 2026", status: "Needs review", value: "LDL 132" },
  ],
};

function normalizePatient(value) {
  const raw = value && typeof value === "object" && !Array.isArray(value) ? value : {};

  const medications = Array.isArray(raw.medications)
    ? raw.medications.map((m, i) => ({
      id: m?.id ?? i + 1,
      name: typeof m?.name === "string" && m.name.trim() ? m.name.trim() : "Medicine",
      dosage: typeof m?.dosage === "string" && m.dosage.trim() ? m.dosage.trim() : "As prescribed",
      refill: typeof m?.refill === "string" && m.refill.trim() ? m.refill.trim() : "Review with doctor",
      tone: toneMapSafe(m?.tone, i),
    }))
    : DEFAULT_PATIENT.medications.map((m) => ({ ...m }));

  const reports = Array.isArray(raw.reports)
    ? raw.reports.map((r, i) => ({
      id: r?.id ?? i + 1,
      name: typeof r?.name === "string" && r.name.trim() ? r.name.trim() : "Medical report",
      date: typeof r?.date === "string" && r.date.trim() ? r.date.trim() : "Not specified",
      status: typeof r?.status === "string" && r.status.trim() ? r.status.trim() : "Pending review",
      value: typeof r?.value === "string" && r.value.trim() ? r.value.trim() : "See report",
    }))
    : DEFAULT_PATIENT.reports.map((r) => ({ ...r }));

  return {
    name: typeof raw.name === "string" && raw.name.trim() ? raw.name.trim() : DEFAULT_PATIENT.name,
    condition: typeof raw.condition === "string" && raw.condition.trim() ? raw.condition.trim() : DEFAULT_PATIENT.condition,
    doctor: typeof raw.doctor === "string" && raw.doctor.trim() ? raw.doctor.trim() : DEFAULT_PATIENT.doctor,
    email: typeof raw.email === "string" && raw.email.trim() ? raw.email.trim().toLowerCase() : DEFAULT_PATIENT.email,
    password: typeof raw.password === "string" && raw.password ? raw.password : DEFAULT_PATIENT.password,
    diet: typeof raw.diet === "string" ? raw.diet : "",
    medications,
    reports,
  };
}

function toneMapSafe(tone, index = 0) {
  const tones = ["mint", "peach", "sky", "lavender"];
  return tones.includes(tone) ? tone : tones[index % tones.length];
}

function getStoredPatient() {
  try {
    const saved = localStorage.getItem("carehub_patient");
    if (!saved) return normalizePatient(DEFAULT_PATIENT);
    return normalizePatient(JSON.parse(saved));
  } catch (error) {
    console.warn("CareHub: invalid saved patient data. Using demo data.", error);
    return normalizePatient(DEFAULT_PATIENT);
  }
}

function saveStoredPatient(patient) {
  const safePatient = normalizePatient(patient);
  try {
    localStorage.setItem("carehub_patient", JSON.stringify(safePatient));
    // Let the patient UI know that admin data changed in the same tab.
    window.dispatchEvent(new CustomEvent("carehub:patient-updated", { detail: safePatient }));
    return safePatient;
  } catch (error) {
    console.error("CareHub: unable to save patient record.", error);
    return null;
  }
}


const DOCTORS = [
  { id: 1, name: "Dr. Aveek Sen", spec: "Endocrinologist", rating: 4.9, next: "Today, 4:30 PM", tone: "mint" },
  { id: 2, name: "Dr. Priya Nair", spec: "General Physician", rating: 4.8, next: "Tomorrow, 10:00 AM", tone: "sky" },
  { id: 3, name: "Dr. Ken Marak", spec: "Cardiologist", rating: 4.7, next: "Wed, 2:15 PM", tone: "lavender" },
  { id: 4, name: "Dr. Ibarisha Lyngdoh", spec: "Dietician", rating: 4.9, next: "Thu, 11:30 AM", tone: "peach" },
];

const SLOTS = ["9:00 AM", "9:30 AM", "10:30 AM", "11:00 AM", "1:00 PM", "2:30 PM", "3:15 PM", "4:30 PM"];

const VITALS = [
  { day: "Mon", sugar: 142, bp: 128 },
  { day: "Tue", sugar: 138, bp: 126 },
  { day: "Wed", sugar: 130, bp: 124 },
  { day: "Thu", sugar: 121, bp: 122 },
  { day: "Fri", sugar: 118, bp: 120 },
  { day: "Sat", sugar: 115, bp: 119 },
  { day: "Sun", sugar: 112, bp: 118 },
];

const REPORTS = [
  { id: 1, name: "Fasting Blood Sugar", date: "12 Sep 2026", status: "Improved", value: "112 mg/dL" },
  { id: 2, name: "HbA1c Panel", date: "02 Sep 2026", status: "Stable", value: "6.4%" },
  { id: 3, name: "Blood Pressure Log", date: "12 Sep 2026", status: "Improved", value: "118/76" },
  { id: 4, name: "Lipid Profile", date: "24 Aug 2026", status: "Needs review", value: "LDL 132" },
];

const STORES = [
  { id: 1, name: "GreenLeaf Pharmacy", distance: "0.4 km", stock: "In stock", hours: "Open · closes 10 PM" },
  { id: 2, name: "CityCare Chemists", distance: "1.1 km", stock: "In stock", hours: "Open · closes 9 PM" },
  { id: 3, name: "Wellness Point", distance: "1.8 km", stock: "Low stock", hours: "Open · closes 11 PM" },
  { id: 4, name: "Hospital Pharmacy (F-Block)", distance: "In building", stock: "In stock", hours: "Open 24 hours" },
];

const DIET_PLANS = {
  Diabetes: {
    tone: "mint",
    avoid: ["Refined sugar & sweets", "White rice, maida", "Sweetened juices & sodas"],
    meals: [
      { time: "Breakfast · 7:30 AM", items: "Steamed vegetable poha, 1 boiled egg, unsweetened green tea" },
      { time: "Lunch · 1:00 PM", items: "Brown rice (1 cup), dal, sautéed greens, cucumber salad" },
      { time: "Snack · 4:30 PM", items: "Roasted chana or a small guava" },
      { time: "Dinner · 7:30 PM", items: "Multigrain roti (2), lauki sabzi, curd (unsweetened)" },
    ],
  },
  Hypertension: {
    tone: "sky",
    avoid: ["Added salt & pickles", "Processed/packaged snacks", "Red meat, excess caffeine"],
    meals: [
      { time: "Breakfast · 7:30 AM", items: "Oats porridge with banana, handful of almonds" },
      { time: "Lunch · 1:00 PM", items: "Brown rice, low-salt dal, steamed beans, beetroot salad" },
      { time: "Snack · 4:30 PM", items: "Coconut water or fresh fruit bowl" },
      { time: "Dinner · 7:30 PM", items: "Vegetable khichdi, sautéed spinach, buttermilk" },
    ],
  },
  General: {
    tone: "peach",
    avoid: ["Deep-fried food", "Late-night heavy meals", "Sugary beverages"],
    meals: [
      { time: "Breakfast · 7:30 AM", items: "Vegetable upma, seasonal fruit, herbal tea" },
      { time: "Lunch · 1:00 PM", items: "Rice or roti, mixed dal, seasonal sabzi, salad" },
      { time: "Snack · 4:30 PM", items: "Sprouts chaat or nuts" },
      { time: "Dinner · 7:30 PM", items: "Light khichdi or soup with whole-grain toast" },
    ],
  },
};

const toneMap = {
  mint: { soft: "var(--mint-soft)", solid: "var(--mint)" },
  sky: { soft: "var(--sky-soft)", solid: "var(--sky)" },
  lavender: { soft: "var(--lavender-soft)", solid: "var(--lavender)" },
  peach: { soft: "var(--peach-soft)", solid: "var(--peach)" },
};

/* ---------------------------------------------------------
   Small building blocks
--------------------------------------------------------- */
function SectionTitle({ eyebrow, title, sub }) {
  return (
    <div className="mb-6">
      {eyebrow && <p className="text-sm font-medium text-[var(--burgundy)] mb-1">{eyebrow}</p>}
      <h2 className="ph-head text-2xl md:text-3xl font-semibold text-[var(--ink)]">{title}</h2>
      {sub && <p className="text-[var(--ink-soft)] mt-1 max-w-xl">{sub}</p>}
    </div>
  );
}

function Pill_({ tone = "mint", children }) {
  const t = toneMap[tone] || toneMap.mint;
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-[var(--ink)]"
      style={{ background: t.soft }}
    >
      {children}
    </span>
  );
}

function Card({ children, className = "", style = {} }) {
  return (
    <div
      className={`ph-card bg-white rounded-3xl shadow-[0_8px_30px_rgba(7,18,47,0.06)] border border-black/5 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`w-12 h-7 rounded-full flex items-center px-1 transition-colors duration-200 ${checked ? "bg-[var(--burgundy)] justify-end" : "bg-gray-200 justify-start"
        }`}
      aria-pressed={checked}
    >
      <span className="w-5 h-5 bg-white rounded-full shadow" />
    </button>
  );
}

/* ---------------------------------------------------------
   Sections
--------------------------------------------------------- */
function HomeSection({ go }) {
  const quick = [
    { id: "appointment", label: "Book a visit", icon: CalendarCheck, tone: "mint", desc: "See available doctors & slots" },
    { id: "reminders", label: "Today's reminders", icon: Bell, tone: "peach", desc: "3 medicines due today" },
    { id: "prescriptions", label: "Prescriptions", icon: Pill, tone: "lavender", desc: "2 active, 1 refill due" },
    { id: "diet", label: "Diet plan", icon: Utensils, tone: "sky", desc: "Personalised for your condition" },
  ];
  return (
    <div>
      <Card className="p-8 md:p-10 mb-8 overflow-hidden relative" style={{ background: "linear-gradient(135deg, var(--mint-soft), var(--sky-soft))" }}>
        <div className="ph-hero-orb absolute -right-10 -top-10 w-56 h-56 rounded-full opacity-60" style={{ background: "var(--peach)" }} />
        <div className="ph-hero-orb-2 absolute right-24 bottom-[-40px] w-32 h-32 rounded-full opacity-50" style={{ background: "var(--lavender)" }} />
        <div className="relative">
          <Pill_ tone="mint">{getStoredPatient().condition}</Pill_>
          <h1 className="ph-head text-3xl md:text-4xl font-semibold mt-4 mb-2 text-[var(--ink)]">
            Good afternoon, {getStoredPatient().name.split(" ")[0]}
          </h1>
          <p className="text-[var(--ink-soft)] max-w-md mb-6">
            Your sugar trend is improving and your next dose is in 2 hours. Here's everything for today, in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => go("appointment")} className="ph-button px-5 py-2.5 rounded-full bg-[var(--coral)] text-white font-semibold text-sm shadow-md hover:brightness-110 transition">
              Book appointment
            </button>
            <button onClick={() => go("consultation")} className="ph-button px-5 py-2.5 rounded-full bg-white text-[var(--ink)] font-semibold text-sm shadow-md border-2 border-[var(--teal)] hover:bg-[var(--burgundy)] hover:text-white transition">
              Talk to a doctor
            </button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quick.map((q) => {
          const Icon = q.icon;
          const t = toneMap[q.tone];
          return (
            <button
              key={q.id}
              onClick={() => go(q.id)}
              className="ph-card ph-animate text-left rounded-3xl p-5 bg-white shadow-[0_8px_30px_rgba(7,18,47,0.06)] border border-black/5 hover:-translate-y-0.5 transition-transform"
            >
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ background: t.soft }}>
                <Icon size={20} color="var(--ink)" />
              </div>
              <p className="font-semibold text-sm mb-1">{q.label}</p>
              <p className="text-xs text-[var(--ink-soft)]">{q.desc}</p>
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        <Card className="p-6 md:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold text-sm">Blood sugar, this week</p>
              <p className="text-xs text-[var(--ink-soft)]">mg/dL, fasting reading</p>
            </div>
            <Pill_ tone="mint">Trending down</Pill_>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={VITALS} margin={{ left: -20, right: 10, top: 10 }}>
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "var(--ink-soft)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "var(--ink-soft)" }} axisLine={false} tickLine={false} domain={[100, 150]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }} />
                <Line type="monotone" dataKey="sugar" stroke="#17a398" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 md:col-span-2">
          <p className="font-semibold text-sm mb-4">Care team</p>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-full flex items-center justify-center font-semibold" style={{ background: "var(--lavender-soft)" }}>AS</div>
            <div>
              <p className="text-sm font-semibold">{getStoredPatient().doctor}</p>
              <p className="text-xs text-[var(--ink-soft)]">Endocrinologist · primary care</p>
            </div>
          </div>
          <p className="text-xs text-[var(--ink-soft)] mb-3">Next follow-up</p>
          <div className="flex items-center gap-2 text-sm font-medium mb-4">
            <Clock size={16} className="text-[var(--burgundy)]" /> Today, 4:30 PM
          </div>
          <button onClick={() => go("consultation")} className="ph-button w-full py-2.5 rounded-full text-sm font-semibold text-white bg-[var(--burgundy)] shadow-md hover:brightness-110 transition">
            View consultation
          </button>
        </Card>
      </div>
    </div>
  );
}

function RemindersSection() {
  const DEFAULT_REMINDERS = [
    { id: 1, name: "Metformin 500mg", time: "8:00 AM", meal: "After food", on: true },
    { id: 2, name: "Blood sugar check", time: "1:30 PM", meal: "Before food", on: true },
    { id: 3, name: "Glimepiride 1mg", time: "8:30 PM", meal: "After food", on: false },
  ];

  const readReminders = () => {
    try {
      const saved = localStorage.getItem("carehub_reminders");
      if (!saved) return DEFAULT_REMINDERS;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_REMINDERS;
    } catch {
      return DEFAULT_REMINDERS;
    }
  };

  const [items, setItems] = useState(readReminders);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", time: "", meal: "After food" });

  useEffect(() => {
    try { localStorage.setItem("carehub_reminders", JSON.stringify(items)); } catch { }
  }, [items]);

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: "", time: "", meal: "After food" });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({ name: item.name, time: item.time, meal: item.meal || "After food" });
    setModalOpen(true);
  };

  const saveReminder = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.time) return;
    if (editingId !== null) {
      setItems(items.map((item) => item.id === editingId ? { ...item, ...form, name: form.name.trim() } : item));
    } else {
      setItems([...items, { id: Date.now(), name: form.name.trim(), time: form.time, meal: form.meal, on: true }]);
    }
    setModalOpen(false);
  };

  const deleteReminder = (id) => {
    if (window.confirm("Delete this reminder?")) setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <SectionTitle eyebrow="Stay on track" title="Reminders" sub="Medicines and checks, timed around your daily routine." />

      <Card className="p-5 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-sm">Medicine reminders</p>
            <p className="text-xs text-[var(--ink-soft)] mt-1">Add, edit or remove reminders whenever your schedule changes.</p>
          </div>
          <button onClick={openAdd} className="ph-button px-5 py-2.5 rounded-full bg-[var(--coral)] text-white flex items-center gap-2 text-sm font-semibold shadow-md hover:brightness-110 transition">
            <Plus size={17} /> ADD
          </button>
        </div>
      </Card>

      <div className="space-y-3">
        {items.length === 0 && (
          <Card className="p-8 text-center text-sm text-[var(--ink-soft)]">No reminders added yet. Click ADD to create one.</Card>
        )}
        {items.map((it) => (
          <Card key={it.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-11 h-11 shrink-0 rounded-2xl flex items-center justify-center" style={{ background: it.on ? "var(--mint-soft)" : "#f1f1f1" }}>
                <Bell size={18} className={it.on ? "text-[var(--burgundy)]" : "text-gray-400"} />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{it.name}</p>
                <p className="text-xs text-[var(--ink-soft)] mt-1">{it.time} · {it.meal}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <Toggle checked={it.on} onChange={() => setItems(items.map((x) => x.id === it.id ? { ...x, on: !x.on } : x))} />
              <button onClick={() => openEdit(it)} title="Edit reminder" className="px-3 py-2 rounded-xl text-xs font-semibold bg-[var(--sky-soft)] hover:bg-[var(--lavender-soft)] transition">Edit</button>
              <button onClick={() => deleteReminder(it.id)} title="Delete reminder" className="px-3 py-2 rounded-xl text-xs font-semibold text-[var(--red)] bg-[#fff0f2] hover:bg-[#ffe2e7] transition">Delete</button>
            </div>
          </Card>
        ))}
      </div>

      {modalOpen && (
        <div className="ph-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4" onMouseDown={(e) => e.target === e.currentTarget && setModalOpen(false)}>
          <div className="ph-modal-decor" aria-hidden="true"><span>+</span><span>♡</span><span>✦</span><span>+</span><span>•</span></div>
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-black/5 p-6 ph-modal-enter">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="ph-head text-xl font-bold">{editingId !== null ? "Edit reminder" : "Add reminder"}</p>
                <p className="text-xs text-[var(--ink-soft)] mt-1">Set the medicine and when it should be taken.</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="w-9 h-9 rounded-full bg-[var(--sky-soft)] flex items-center justify-center hover:bg-[var(--lavender-soft)]"><X size={18} /></button>
            </div>
            <form onSubmit={saveReminder} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[var(--ink-soft)] block mb-1.5">Medicine name</label>
                <input autoFocus value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Metformin 500mg" className="w-full rounded-xl px-4 py-3 text-sm bg-[var(--sky-soft)] outline-none border border-transparent focus:border-[var(--burgundy)] focus:bg-white transition" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--ink-soft)] block mb-1.5">Time</label>
                <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full rounded-xl px-4 py-3 text-sm bg-[var(--sky-soft)] outline-none border border-transparent focus:border-[var(--burgundy)] focus:bg-white transition" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--ink-soft)] block mb-1.5">When should it be taken?</label>
                <select value={form.meal} onChange={(e) => setForm({ ...form, meal: e.target.value })} className="w-full rounded-xl px-4 py-3 text-sm bg-[var(--sky-soft)] outline-none border border-transparent focus:border-[var(--burgundy)] focus:bg-white transition">
                  <option>Before food</option>
                  <option>After food</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-3 rounded-xl text-sm font-semibold bg-[var(--sky-soft)] hover:bg-[var(--lavender-soft)] transition">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-xl text-sm font-semibold text-white bg-[var(--burgundy)] hover:brightness-110 transition">{editingId !== null ? "Save changes" : "Add reminder"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AppointmentSection() {
  const CAPACITY = 5;
  const MORNING_SLOTS = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM"];
  const AFTERNOON_SLOTS = ["1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"];
  const [doctor, setDoctor] = useState(DOCTORS[0].id);
  const [slot, setSlot] = useState(null);
  const [confirmed, setConfirmed] = useState(null);
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("carehub_bookings") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem("carehub_bookings", JSON.stringify(bookings)); } catch { }
  }, [bookings]);

  const chosen = DOCTORS.find((d) => d.id === doctor);
  const patientEmail = getStoredPatient().email;
  const countForSlot = (time) => bookings.filter((b) => b.doctorId === doctor && b.time === time).length;
  const alreadyBooked = (time) => bookings.some((b) => b.doctorId === doctor && b.time === time && b.patientEmail === patientEmail);

  const selectDoctor = (id) => { setDoctor(id); setSlot(null); setConfirmed(null); };

  const confirmBooking = () => {
    if (!slot) return;
    const currentCount = countForSlot(slot);
    if (alreadyBooked(slot)) {
      alert("You have already booked this time slot. Please choose another time.");
      return;
    }
    if (currentCount >= CAPACITY) {
      alert("This time slot is full. Please choose another slot.");
      return;
    }

    const token = currentCount + 1;
    const bookingId = `CH-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const booking = {
      id: bookingId,
      token,
      doctorId: doctor,
      doctorName: chosen.name,
      time: slot,
      session: MORNING_SLOTS.includes(slot) ? "Morning" : "Afternoon",
      sessionRange: MORNING_SLOTS.includes(slot) ? "9:00 AM – 11:00 AM" : "1:00 PM – 4:00 PM",
      patientEmail,
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    };
    setBookings([...bookings, booking]);
    setConfirmed(booking);
  };

  const SlotButton = ({ time }) => {
    const count = countForSlot(time);
    const full = count >= CAPACITY;
    const mine = alreadyBooked(time);
    const disabled = full || mine;
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={() => setSlot(time)}
        className={`text-left rounded-2xl border p-3 transition-all duration-200 ${slot === time ? "bg-[var(--burgundy)] text-white border-[var(--burgundy)] shadow-md -translate-y-0.5" :
            disabled ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-75" :
              "bg-white border-[var(--sky)] hover:border-[var(--burgundy)] hover:-translate-y-0.5 hover:shadow-sm"
          }`}
      >
        <p className="text-sm font-bold">{time}</p>
        <p className={`text-[10px] mt-1 ${slot === time ? "text-white/80" : "text-[var(--ink-soft)]"}`}>
          {mine ? "Already booked" : full ? "Full" : `${CAPACITY - count} seat${CAPACITY - count === 1 ? "" : "s"} available`}
        </p>
      </button>
    );
  };

  return (
    <div className="ph-page">
      <SectionTitle eyebrow="Plan ahead" title="Book an appointment" sub="Choose your doctor and reserve a convenient time slot." />
      {confirmed ? (
        <Card className="p-8 text-center max-w-xl mx-auto ph-success">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--mint-soft)" }}>
            <Check className="text-[var(--burgundy)]" size={30} />
          </div>
          <p className="ph-head text-2xl font-bold mb-1">Appointment booking successful!</p>
          <p className="text-sm text-[var(--ink-soft)] mb-6">Your appointment has been reserved successfully.</p>
          <div className="grid grid-cols-2 gap-3 text-left mb-6">
            <div className="rounded-2xl bg-[var(--sky-soft)] p-4"><p className="text-[10px] uppercase tracking-wider text-[var(--ink-soft)]">Booking ID</p><p className="font-bold text-sm mt-1 break-all">{confirmed.id}</p></div>
            <div className="rounded-2xl bg-[var(--mint-soft)] p-4"><p className="text-[10px] uppercase tracking-wider text-[var(--ink-soft)]">Token number</p><p className="font-bold text-xl mt-1">#{confirmed.token}</p></div>
            <div className="rounded-2xl bg-[var(--lavender-soft)] p-4"><p className="text-[10px] uppercase tracking-wider text-[var(--ink-soft)]">Expected time</p><p className="font-bold text-sm mt-1">{confirmed.time}</p></div>
            <div className="rounded-2xl bg-[var(--peach-soft)] p-4"><p className="text-[10px] uppercase tracking-wider text-[var(--ink-soft)]">Session</p><p className="font-bold text-xs mt-1">{confirmed.session} · {confirmed.sessionRange}</p></div>
          </div>
          <p className="text-xs text-[var(--ink-soft)] mb-5">Doctor: <span className="font-semibold text-[var(--ink)]">{confirmed.doctorName}</span> · Date: <span className="font-semibold text-[var(--ink)]">{confirmed.date}</span></p>
          <button type="button" onClick={() => { setConfirmed(null); setSlot(null); }} className="ph-button px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[var(--burgundy)] shadow-md hover:brightness-110 transition">View available slots</button>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="p-5">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <p className="font-semibold text-sm">Choose your doctor</p>
                <p className="text-xs text-[var(--ink-soft)] mt-1">Swipe across on smaller screens.</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[10px] font-semibold text-[var(--ink-soft)]"><Star size={13} className="text-amber-400" fill="currentColor" /> Rated doctors</div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
              {DOCTORS.map((d) => (
                <button type="button" key={d.id} className={`w-[310px] shrink-0 text-left rounded-2xl border p-4 snap-start transition-all duration-200 ${doctor === d.id ? "border-[var(--burgundy)] ring-2 ring-[var(--burgundy)]/10 bg-[var(--mint-soft)]" : "border-[var(--sky)] bg-white hover:border-[var(--burgundy)] hover:-translate-y-0.5"}`} onClick={() => selectDoctor(d.id)}>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center font-semibold" style={{ background: toneMap[d.tone].soft }}>{d.name.split(" ").slice(-1)[0][0]}</div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm leading-5 whitespace-normal break-words">{d.name}</p>
                      <p className="text-xs text-[var(--ink-soft)] mt-0.5 leading-4 whitespace-normal">{d.spec}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center gap-1 text-xs font-medium"><Star size={12} fill="currentColor" className="text-amber-400" /> {d.rating}</span>
                        <span className="text-[10px] text-[var(--ink-soft)]">{d.next}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-5 items-start">
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div><p className="font-semibold text-sm">Morning</p><p className="text-xs text-[var(--ink-soft)]">9:00 AM – 11:00 AM</p></div>
                <span className="rounded-full px-3 py-1 text-[10px] font-bold" style={{ background: "var(--mint-soft)", color: "var(--burgundy)" }}>5 seats / time</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{MORNING_SLOTS.map((time) => <SlotButton key={time} time={time} />)}</div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div><p className="font-semibold text-sm">Afternoon</p><p className="text-xs text-[var(--ink-soft)]">1:00 PM – 4:00 PM</p></div>
                <span className="rounded-full px-3 py-1 text-[10px] font-bold" style={{ background: "var(--peach-soft)", color: "var(--burgundy)" }}>5 seats / time</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{AFTERNOON_SLOTS.map((time) => <SlotButton key={time} time={time} />)}</div>
            </Card>
          </div>

          <Card className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[var(--navy)] text-white border-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center"><CalendarCheck size={19} /></div>
              <div><p className="font-semibold text-sm">{slot ? `Selected: ${slot}` : "Select a time slot"}</p><p className="text-xs text-white/65 mt-1">{chosen.name} · Today</p></div>
            </div>
            <button type="button" disabled={!slot} onClick={confirmBooking} className="ph-button w-full sm:w-auto px-7 py-3 rounded-full text-sm font-semibold text-white bg-[var(--coral)] shadow-md hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none">Confirm booking</button>
          </Card>
        </div>
      )}
    </div>
  );
}

function ConsultationSection() {
  const [active, setActive] = useState(false);
  return (
    <div>
      <SectionTitle eyebrow="Right now" title="Consultation" sub="Connect with your care team from anywhere." />
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 md:p-8 text-center" style={{ background: "linear-gradient(160deg, var(--lavender-soft), var(--sky-soft))" }}>
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow">
            <Video className="text-[var(--burgundy)]" />
          </div>
          <p className="ph-head text-xl font-semibold mb-1">{getStoredPatient().doctor}</p>
          <p className="text-sm text-[var(--ink-soft)] mb-6">Endocrinologist · next slot today, 4:30 PM</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => setActive(true)} className="ph-button px-5 py-2.5 rounded-full bg-[var(--coral)] text-white text-sm font-semibold flex items-center gap-2 shadow-md hover:brightness-110 transition">
              <Video size={16} /> Start video call
            </button>
            <button className="ph-button px-5 py-2.5 rounded-full bg-white text-[var(--ink)] text-sm font-semibold flex items-center gap-2 shadow-md border-2 border-[var(--teal)] hover:bg-[var(--burgundy)] hover:text-white transition">
              <PhoneCall size={16} /> Voice call
            </button>
          </div>
          {active && (
            <div className="mt-6 rounded-2xl bg-white p-4 text-left flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--coral)] animate-pulse" />
              <p className="text-sm font-medium">Connecting you to {getStoredPatient().doctor.split(" ").slice(-1)[0]}…</p>
              <button onClick={() => setActive(false)} className="ml-auto text-xs font-semibold text-white bg-[var(--coral)] px-3 py-1.5 rounded-full shadow-sm hover:brightness-110 transition">Cancel</button>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <p className="font-semibold text-sm mb-4 flex items-center gap-2"><MessageSquare size={16} /> Message the team</p>
          <div className="space-y-3 mb-4 text-sm">
            <div className="rounded-2xl px-3 py-2 bg-[var(--mint-soft)] max-w-[85%]">Your sugar readings this week look great — keep it up!</div>
            <div className="rounded-2xl px-3 py-2 bg-gray-100 max-w-[85%] ml-auto text-right">Should I still avoid rice at dinner?</div>
          </div>
          <div className="flex gap-2">
            <input placeholder="Type a message…" className="flex-1 rounded-full px-4 py-2 text-sm bg-gray-100 outline-none" />
            <button className="ph-button w-9 h-9 rounded-full bg-[var(--burgundy)] flex items-center justify-center text-white shadow-md hover:brightness-110 transition"><ChevronRight size={16} /></button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function PrescriptionsSection() {
  const meds = getStoredPatient().medications?.length ? getStoredPatient().medications : DEFAULT_PATIENT.medications;
  return (
    <div>
      <SectionTitle eyebrow="Current medication" title="Prescriptions" sub={`Prescribed by ${getStoredPatient().doctor}, last updated 3 days ago.`} />
      <div className="grid md:grid-cols-3 gap-5">
        {meds.map((m) => (
          <Card key={m.id} className="p-6">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ background: toneMap[m.tone].soft }}>
              <Pill size={20} />
            </div>
            <p className="font-semibold mb-1">{m.name}</p>
            <p className="text-sm text-[var(--ink-soft)] mb-4">{m.dosage}</p>
            <div className="flex items-center justify-between">
              <Pill_ tone={m.tone}>{m.refill}</Pill_>
              <button className="ph-button text-xs font-semibold text-white bg-[var(--burgundy)] px-3 py-1.5 rounded-full shadow-sm hover:brightness-110 transition">Request refill</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ReportsSection() {
  const reports = getStoredPatient().reports?.length ? getStoredPatient().reports : REPORTS;
  return (
    <div>
      <SectionTitle eyebrow="Lab results" title="Reports" sub="All your recent tests, in plain language." />
      <div className="space-y-3">
        {reports.map((r) => (
          <Card key={r.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[var(--sky-soft)]">
                <FileText size={18} />
              </div>
              <div>
                <p className="font-semibold text-sm">{r.name}</p>
                <p className="text-xs text-[var(--ink-soft)]">{r.date} · {r.value}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Pill_ tone={r.status === "Needs review" ? "peach" : "mint"}>{r.status}</Pill_>
              <button className="ph-button w-9 h-9 rounded-full bg-[var(--burgundy)] text-white flex items-center justify-center shadow-sm hover:brightness-110 transition"><Download size={15} /></button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ShopSection() {
  const [q, setQ] = useState("");
  return (
    <div>
      <SectionTitle eyebrow="Get your medicines" title="Where to buy" sub="Nearby pharmacies with your prescriptions in stock." />
      <Card className="p-3 mb-6 flex items-center gap-2">
        <Search size={16} className="ml-2 text-[var(--ink-soft)]" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search medicine or store name"
          className="flex-1 outline-none text-sm py-1.5"
        />
      </Card>
      <div className="grid md:grid-cols-2 gap-4">
        {STORES.filter((s) => s.name.toLowerCase().includes(q.toLowerCase())).map((s) => (
          <Card key={s.id} className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[var(--lavender-soft)]">
                <MapPin size={18} />
              </div>
              <div>
                <p className="font-semibold text-sm">{s.name}</p>
                <p className="text-xs text-[var(--ink-soft)]">{s.distance} · {s.hours}</p>
              </div>
            </div>
            <Pill_ tone={s.stock === "In stock" ? "mint" : "peach"}>{s.stock}</Pill_>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DietSection() {
  const conditionKey =
    getStoredPatient().condition?.toLowerCase().includes("diabet") ? "Diabetes" :
      getStoredPatient().condition?.toLowerCase().includes("hypertension") ? "Hypertension" :
        "General";

  const plan = DIET_PLANS[conditionKey] || DIET_PLANS.General;
  const customDiet = (getStoredPatient().diet || "").trim();

  return (
    <div>
      <SectionTitle
        eyebrow="Nutrition, matched to you"
        title="Diet recommendation"
        sub={`A care plan based on the patient's condition: ${getStoredPatient().condition}.`}
      />

      <Card className="p-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[var(--mint-soft)]">
            <Droplet size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--ink-soft)]">Patient condition</p>
            <p className="text-lg font-semibold">{getStoredPatient().condition}</p>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="p-6 lg:col-span-2">
          <p className="text-sm font-semibold mb-4">Today's meals</p>
          {customDiet ? (
            <div className="space-y-3">
              {customDiet.split(/\r?\n/).filter(Boolean).map((meal, i) => (
                <div key={i} className="rounded-2xl bg-[var(--sky-soft)] p-4 flex gap-3">
                  <span className="font-bold text-[var(--burgundy)]">{i + 1}</span>
                  <p className="text-sm text-[var(--ink-soft)] whitespace-pre-wrap">{meal}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {plan.meals.map((m) => (
                <div key={m.time} className="rounded-2xl bg-[var(--sky-soft)] p-4">
                  <p className="text-sm font-semibold mb-1">{m.time}</p>
                  <p className="text-sm text-[var(--ink-soft)]">{m.items}</p>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <p className="text-sm font-semibold mb-3">Recommended to avoid</p>
          <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
            {plan.avoid.map((a) => (
              <li key={a} className="flex items-start gap-2">
                <span className="text-[var(--coral)]">•</span> {a}
              </li>
            ))}
          </ul>
          <p className="text-xs text-[var(--ink-soft)] mt-5">
            Plan prepared for {getStoredPatient().condition} · reviewed by {DOCTORS[3].name}
          </p>
        </Card>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Admin patient registration
--------------------------------------------------------- */
function AdminSection({ onLogout }) {
  const [current, setCurrent] = useState(() => getStoredPatient());
  const [activeView, setActiveView] = useState("dashboard");
  const [form, setForm] = useState({
    name: current.name || "",
    email: current.email || "",
    password: current.password || "",
    condition: current.condition || "General",
    doctor: current.doctor || "",
    diet: current.diet || "",
    medications: (current.medications || []).map((m) => `${m.name} | ${m.dosage} | ${m.refill}`).join("\n"),
    reports: (current.reports || []).map((r) => `${r.name} | ${r.date} | ${r.status} | ${r.value}`).join("\n"),
  });
  const [saved, setSaved] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const goHome = () => setActiveView("dashboard");
    window.addEventListener("carehub:admin-home", goHome);
    return () => window.removeEventListener("carehub:admin-home", goHome);
  }, []);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const savePatient = (e) => {
    e?.preventDefault();

    const medications = String(form.medications || "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, i) => {
        const [name, dosage = "As prescribed", refill = "Review with doctor"] =
          line.split("|").map((v) => v.trim());
        return {
          id: i + 1,
          name,
          dosage,
          refill,
          tone: ["mint", "peach", "sky", "lavender"][i % 4],
        };
      });

    const reports = String(form.reports || "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, i) => {
        const [name, date = "Not specified", status = "Pending review", value = "See report"] =
          line.split("|").map((v) => v.trim());
        return { id: i + 1, name, date, status, value };
      });

    const patient = {
      name: form.name.trim() || "Unnamed patient",
      email: form.email.trim() || "patient@example.com",
      password: form.password || "Temporary password",
      condition: form.condition.trim() || "General",
      doctor: form.doctor.trim() || "Care team not assigned",
      diet: form.diet.trim(),
      medications,
      reports,
    };

    const savedPatient = saveStoredPatient(patient);
    if (!savedPatient) {
      alert("The patient record could not be saved in this browser. Please check browser storage permissions.");
      return;
    }

    setCurrent(savedPatient);
    setSaved(true);
    setTimeout(() => setSaved(false), 2600);
    setActiveView("patients");
  };

  const navItems = [
    { id: "dashboard", label: "Overview", icon: Home },
    { id: "patients", label: "Patients", icon: UserRound },
    { id: "register", label: "Register patient", icon: Plus },
    { id: "reports", label: "Medical records", icon: FileText },
  ];

  const stats = [
    { label: "Registered patients", value: "01", detail: "Active demo record", icon: UserRound, tone: "mint" },
    { label: "Active medicines", value: String(current.medications?.length || 0).padStart(2, "0"), detail: "Currently prescribed", icon: Pill, tone: "lavender" },
    { label: "Medical reports", value: String(current.reports?.length || 0).padStart(2, "0"), detail: "Records on file", icon: FileText, tone: "sky" },
    { label: "Care status", value: "Active", detail: current.condition || "General", icon: Check, tone: "peach" },
  ];

  const inputClass =
    "w-full rounded-xl px-4 py-3 text-sm bg-[var(--sky-soft)] outline-none border border-transparent focus:border-[var(--burgundy)] focus:bg-white transition";
  const labelClass = "text-xs font-semibold text-[var(--ink-soft)] block mb-1.5";

  const PatientCard = () => (
    <Card className="p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[var(--burgundy)] text-white flex items-center justify-center ph-head text-lg font-bold">
            {(current.name || "P").split(" ").map((x) => x[0]).slice(0, 2).join("")}
          </div>
          <div>
            <p className="font-bold">{current.name}</p>
            <p className="text-xs text-[var(--ink-soft)]">{current.email}</p>
          </div>
        </div>
        <Pill_ tone="mint">Active patient</Pill_>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mt-5">
        <div className="rounded-2xl bg-[var(--mint-soft)] p-4">
          <p className="text-xs text-[var(--ink-soft)]">Condition</p>
          <p className="font-semibold mt-1">{current.condition}</p>
        </div>
        <div className="rounded-2xl bg-[var(--lavender-soft)] p-4">
          <p className="text-xs text-[var(--ink-soft)]">Care team</p>
          <p className="font-semibold mt-1">{current.doctor || "Not assigned"}</p>
        </div>
        <div className="rounded-2xl bg-[var(--peach-soft)] p-4">
          <p className="text-xs text-[var(--ink-soft)]">Last update</p>
          <p className="font-semibold mt-1">Today</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-5">
        <button
          onClick={() => setActiveView("register")}
          className="ph-button px-4 py-2.5 rounded-xl bg-[var(--burgundy)] text-white text-sm font-semibold flex items-center gap-2"
        >
          <FileText size={16} /> Edit patient
        </button>
        <button
          onClick={() => setActiveView("reports")}
          className="px-4 py-2.5 rounded-xl bg-[var(--sky-soft)] text-[var(--ink)] text-sm font-semibold hover:bg-white transition"
        >
          View records
        </button>
      </div>
    </Card>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-[var(--burgundy)]">Administrator overview</p>
        <h1 className="ph-head text-3xl md:text-4xl font-bold mt-1">Good evening, Admin</h1>
        <p className="text-sm text-[var(--ink-soft)] mt-1">Manage patient care information from one secure workspace.</p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-5 ph-stagger" style={{ animationDelay: `${i * 70}ms` }}>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ background: toneMap[s.tone].soft }}>
                <Icon size={20} />
              </div>
              <p className="text-xs text-[var(--ink-soft)]">{s.label}</p>
              <p className="ph-head text-2xl font-bold mt-1">{s.value}</p>
              <p className="text-xs text-[var(--ink-soft)] mt-1">{s.detail}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[1.35fr_.65fr] gap-5">
        <PatientCard />
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-[var(--peach-soft)] flex items-center justify-center">
              <Clock size={19} />
            </div>
            <div>
              <p className="font-semibold">Quick actions</p>
              <p className="text-xs text-[var(--ink-soft)]">Common admin tasks</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              ["register", "Update patient profile", UserRound],
              ["reports", "Review medical records", FileText],
              ["register", "Update medicines", Pill],
            ].map(([id, label, Icon]) => (
              <button
                key={label}
                onClick={() => setActiveView(id)}
                className="w-full flex items-center justify-between rounded-xl px-3 py-3 bg-[var(--sky-soft)] hover:bg-[var(--mint-soft)] transition group"
              >
                <span className="flex items-center gap-3 text-sm font-medium">
                  <Icon size={17} /> {label}
                </span>
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <p className="font-semibold">Recent activity</p>
            <p className="text-xs text-[var(--ink-soft)]">Latest changes to the patient record</p>
          </div>
          <Pill_ tone="sky">Live prototype</Pill_>
        </div>
        <div className="space-y-3">
          {[
            ["Patient record available", "Profile and care information are ready for review."],
            [`${current.medications?.length || 0} medicines on file`, "Prescription information is connected to the patient dashboard."],
            [`${current.reports?.length || 0} reports on file`, "Medical records are available in one place."],
          ].map(([title, detail], i) => (
            <div key={title} className="flex gap-3 items-start">
              <div className="mt-1 w-2.5 h-2.5 rounded-full bg-[var(--burgundy)] shrink-0" />
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-[var(--ink-soft)] mt-0.5">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const Patients = () => {
    const matches = current.name.toLowerCase().includes(query.toLowerCase()) ||
      current.email.toLowerCase().includes(query.toLowerCase()) ||
      current.condition.toLowerCase().includes(query.toLowerCase());

    return (
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[var(--burgundy)]">Patient management</p>
          <h1 className="ph-head text-3xl font-bold mt-1">Patients</h1>
          <p className="text-sm text-[var(--ink-soft)] mt-1">Search and manage registered patient information.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-soft)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email or condition..."
              className={`${inputClass} pl-11 bg-white`}
            />
          </div>
          <button
            onClick={() => setActiveView("register")}
            className="ph-button px-5 py-3 rounded-xl bg-[var(--burgundy)] text-white font-semibold flex items-center justify-center gap-2"
          >
            <Plus size={17} /> Add patient
          </button>
        </div>

        {matches ? <PatientCard /> : (
          <Card className="p-10 text-center">
            <Search size={30} className="mx-auto mb-3 text-[var(--ink-soft)]" />
            <p className="font-semibold">No patient found</p>
            <p className="text-sm text-[var(--ink-soft)] mt-1">Try another search term.</p>
          </Card>
        )}
      </div>
    );
  };

  const Register = () => (
    <form onSubmit={savePatient} className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-[var(--burgundy)]">Patient records</p>
        <h1 className="ph-head text-3xl font-bold mt-1">Register patient</h1>
        <p className="text-sm text-[var(--ink-soft)] mt-1">Enter the patient's information once and connect it to their CareHub dashboard.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-[var(--mint-soft)] flex items-center justify-center"><UserRound size={20} /></div>
            <div><p className="font-semibold">Patient profile</p><p className="text-xs text-[var(--ink-soft)]">Identity and access</p></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelClass}>Patient name</label>
              <input value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} placeholder="e.g. Meera Das" required />
            </div>
            <div>
              <label className={labelClass}>Patient email</label>
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} placeholder="patient@example.com" required />
            </div>
            <div>
              <label className={labelClass}>Login password</label>
              <input type="text" value={form.password} onChange={(e) => update("password", e.target.value)} className={inputClass} placeholder="Temporary password" required />
            </div>
            <div>
              <label className={labelClass}>Condition</label>
              <select value={form.condition} onChange={(e) => update("condition", e.target.value)} className={inputClass}>
                <option>Diabetes</option>
                <option>Hypertension</option>
                <option>General</option>
                <option>Heart condition</option>
                <option>Asthma</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Care team doctor</label>
              <input value={form.doctor} onChange={(e) => update("doctor", e.target.value)} className={inputClass} placeholder="e.g. Dr. Aveek Sen" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-[var(--peach-soft)] flex items-center justify-center"><Utensils size={20} /></div>
            <div><p className="font-semibold">Diet & care plan</p><p className="text-xs text-[var(--ink-soft)]">Personalized instructions</p></div>
          </div>
          <label className={labelClass}>Diet instructions</label>
          <textarea value={form.diet} onChange={(e) => update("diet", e.target.value)} placeholder={"Breakfast | Oats and eggs\nLunch | Brown rice, dal and vegetables\nDinner | Roti and vegetables"} rows={10} className={`${inputClass} resize-none`} />
          <p className="text-xs text-[var(--ink-soft)] mt-2">Use one meal or instruction per line. These are displayed as supportive care guidance.</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-[var(--lavender-soft)] flex items-center justify-center"><Pill size={20} /></div>
            <div><p className="font-semibold">Medicines</p><p className="text-xs text-[var(--ink-soft)]">Current prescriptions</p></div>
          </div>
          <textarea value={form.medications} onChange={(e) => update("medications", e.target.value)} placeholder={"Medicine | dosage | refill information\nMetformin 500mg | 1 tablet twice daily | 5 days left"} rows={9} className={`${inputClass} resize-none`} />
          <p className="text-xs text-[var(--ink-soft)] mt-2">Format: Name | Dosage | Refill status</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-[var(--sky-soft)] flex items-center justify-center"><FileText size={20} /></div>
            <div><p className="font-semibold">Medical reports</p><p className="text-xs text-[var(--ink-soft)]">Latest test results</p></div>
          </div>
          <textarea value={form.reports} onChange={(e) => update("reports", e.target.value)} placeholder={"Report | date | status | value\nHbA1c | 12 Sep 2026 | Stable | 6.4%"} rows={9} className={`${inputClass} resize-none`} />
          <p className="text-xs text-[var(--ink-soft)] mt-2">Format: Report | Date | Status | Value</p>
        </Card>
      </div>

      <div className="sticky bottom-4 z-10 rounded-2xl bg-white/90 backdrop-blur border border-black/5 shadow-lg p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ShieldCheck size={19} className="text-[var(--burgundy)]" />
          <div>
            <p className="text-sm font-semibold">Ready to save patient record?</p>
            <p className="text-xs text-[var(--ink-soft)]">The dashboard will use the saved information.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {saved && <Pill_ tone="mint"><Check size={14} className="inline mr-1" /> Saved successfully</Pill_>}
          <button type="button" onClick={() => setActiveView("dashboard")} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[var(--ink-soft)] hover:bg-[var(--sky-soft)] transition">Cancel</button>
          <button type="submit" className="ph-button px-5 py-2.5 rounded-xl bg-[var(--burgundy)] text-white font-semibold flex items-center gap-2">
            <Save size={17} /> Save patient
          </button>
        </div>
      </div>
    </form>
  );

  const Records = () => (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-[var(--burgundy)]">Clinical records</p>
        <h1 className="ph-head text-3xl font-bold mt-1">Medical records</h1>
        <p className="text-sm text-[var(--ink-soft)] mt-1">A quick view of the patient's current care information.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div><p className="font-semibold">Medicines</p><p className="text-xs text-[var(--ink-soft)]">{current.medications?.length || 0} on file</p></div>
            <button onClick={() => setActiveView("register")} className="text-xs font-semibold text-[var(--burgundy)] hover:underline">Edit</button>
          </div>
          <div className="space-y-3">
            {(current.medications || []).map((m) => (
              <div key={m.id} className="rounded-2xl bg-[var(--sky-soft)] p-4 flex items-start justify-between gap-3">
                <div><p className="font-semibold text-sm">{m.name}</p><p className="text-xs text-[var(--ink-soft)] mt-1">{m.dosage}</p></div>
                <Pill_ tone={m.tone || "mint"}>{m.refill}</Pill_>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div><p className="font-semibold">Reports</p><p className="text-xs text-[var(--ink-soft)]">{current.reports?.length || 0} on file</p></div>
            <button onClick={() => setActiveView("register")} className="text-xs font-semibold text-[var(--burgundy)] hover:underline">Edit</button>
          </div>
          <div className="space-y-3">
            {(current.reports || []).map((r) => (
              <div key={r.id} className="rounded-2xl bg-[var(--sky-soft)] p-4 flex items-start justify-between gap-3">
                <div><p className="font-semibold text-sm">{r.name}</p><p className="text-xs text-[var(--ink-soft)] mt-1">{r.date}</p></div>
                <div className="text-right"><p className="text-sm font-bold">{r.value}</p><p className="text-xs text-[var(--ink-soft)] mt-1">{r.status}</p></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const view =
    activeView === "patients"
      ? Patients()
      : activeView === "register"
        ? Register()
        : activeView === "reports"
          ? Records()
          : Dashboard();
  return (
    <div className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-4 md:gap-5 items-start w-full">
      <aside className="lg:sticky lg:top-6">
        <div className="bg-white rounded-3xl border border-black/5 shadow-[0_12px_35px_rgba(7,18,47,.06)] p-3">
          <p className="text-[10px] uppercase tracking-[.18em] font-bold text-[var(--ink-soft)] px-3 py-2">Workspace</p>
          <nav className="space-y-1">
            {navItems.map((n) => {
              const Icon = n.icon;
              const active = activeView === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setActiveView(n.id)}
                  className={`ph-nav-item w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold ${active ? "ph-active bg-[var(--mint-soft)] text-[var(--ink)]" : "text-[var(--ink-soft)] hover:bg-[var(--sky-soft)]"
                    }`}
                >
                  <Icon size={18} className="ph-nav-icon" />
                  {n.label}
                </button>
              );
            })}
          </nav>
          <div className="mt-4 pt-4 border-t border-black/5 px-2">
            <div className="rounded-2xl bg-[var(--sky-soft)] p-3">
              <p className="text-xs font-semibold">Current patient</p>
              <p className="text-sm font-bold mt-1 truncate">{current.name}</p>
              <p className="text-xs text-[var(--ink-soft)] mt-0.5">{current.condition}</p>
            </div>
          </div>
        </div>
      </aside>

      <section className="min-w-0">
        <div key={activeView} className="ph-page">
          {view}
        </div>
      </section>
    </div>
  );
}
/* ---------------------------------------------------------
   Login
--------------------------------------------------------- */
function LoginPage({ onLogin }) {
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [patient, setPatient] = useState(() => getStoredPatient());

  useEffect(() => {
    const refreshPatient = () => setPatient(getStoredPatient());
    window.addEventListener("storage", refreshPatient);
    window.addEventListener("carehub:patient-updated", refreshPatient);
    return () => {
      window.removeEventListener("storage", refreshPatient);
      window.removeEventListener("carehub:patient-updated", refreshPatient);
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const latestPatient = getStoredPatient();
    setPatient(latestPatient);
    const patientEmail = String(latestPatient.email || "").trim().toLowerCase();
    const patientPassword = String(latestPatient.password || "");
    const ok = role === "admin"
      ? email.trim().toLowerCase() === "admin@carehub.demo" && password === "admin123"
      : email.trim().toLowerCase() === patientEmail && password === patientPassword;

    if (!ok) {
      setError(role === "admin"
        ? "Use the demo admin credentials shown below."
        : "Incorrect patient email or password.");
      return;
    }
    setError("");
    onLogin(role);
  };

  return (
    <div className="ph-root min-h-screen flex items-center justify-center p-5 bg-[var(--canvas)]">
      <Fonts />
      <div className="w-full max-w-md ph-login-card">
        <div className="text-center mb-8">
          <div className="ph-login-logo mx-auto w-14 h-14 rounded-2xl bg-[var(--burgundy)] flex items-center justify-center text-white text-2xl font-bold ph-head ph-brand-dot">+</div>
          <h1 className="ph-head text-3xl font-bold mt-4">CareHub</h1>
          <p className="text-sm text-[var(--ink-soft)] mt-1">One connected place for patient care.</p>
        </div>

        <Card className="p-6 md:p-7">
          <div className="flex p-1 bg-[var(--sky-soft)] rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => { setRole("patient"); setError(""); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${role === "patient" ? "bg-white shadow-sm text-[var(--ink)]" : "text-[var(--ink-soft)]"}`}
            >
              <UserRound size={16} className="inline mr-2" /> Patient
            </button>
            <button
              type="button"
              onClick={() => { setRole("admin"); setError(""); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${role === "admin" ? "bg-white shadow-sm text-[var(--ink)]" : "text-[var(--ink-soft)]"}`}
            >
              <ShieldCheck size={16} className="inline mr-2" /> Admin
            </button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="ph-login-field">
              <label className="text-xs font-semibold text-[var(--ink-soft)] block mb-1">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder={role === "admin" ? "admin@carehub.demo" : "patient@carehub.demo"} className="w-full rounded-xl px-4 py-3 text-sm bg-[var(--sky-soft)] outline-none border border-transparent focus:border-[var(--burgundy)] transition" />
            </div>
            <div className="ph-login-field">
              <label className="text-xs font-semibold text-[var(--ink-soft)] block mb-1">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="Enter password" className="w-full rounded-xl px-4 py-3 text-sm bg-[var(--sky-soft)] outline-none border border-transparent focus:border-[var(--burgundy)] transition" />
            </div>

            {error && <p className="text-sm text-[var(--red)] bg-[var(--peach-soft)] rounded-xl px-3 py-2">{error}</p>}

            <button type="submit" className="ph-button w-full py-3 rounded-xl bg-[var(--burgundy)] text-white font-semibold">
              Log in as {role === "admin" ? "Admin" : "Patient"}
            </button>
          </form>

          <div className="mt-5 rounded-2xl bg-[var(--mint-soft)] p-4 text-xs text-[var(--ink-soft)]">
            <p className="font-semibold text-[var(--ink)] mb-1">Demo access</p>
            {role === "admin" ? (
              <p>Admin: <span className="font-semibold">admin@carehub.demo</span> · <span className="font-semibold">admin123</span></p>
            ) : (
              <p>Patient: <span className="font-semibold">{patient.email}</span> · <span className="font-semibold">{patient.password}</span></p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}



class CareHubErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || "Unknown UI error" };
  }

  componentDidCatch(error, info) {
    console.error("CareHub UI error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8f7f7]">
          <div className="max-w-md w-full bg-white rounded-3xl p-7 shadow-xl border border-black/5 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-[#922347] text-white flex items-center justify-center text-xl font-bold">!</div>
            <h1 className="text-xl font-bold mt-4">CareHub encountered an error</h1>
            <p className="text-sm text-gray-500 mt-2">The page hit an unexpected UI error. Your saved patient record is kept in this browser.</p>
            {this.state.message && <p className="mt-3 text-xs text-[var(--red)] bg-[var(--peach-soft)] rounded-xl px-3 py-2 break-words">{this.state.message}</p>}
            <button onClick={() => { window.location.reload(); }} className="mt-5 px-5 py-3 rounded-xl bg-[#922347] text-white font-semibold">Reload CareHub</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ---------------------------------------------------------
   App shell
--------------------------------------------------------- */
function App() {
  const [role, setRole] = useState(null);
  const [tab, setTab] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [patientVersion, setPatientVersion] = useState(0);

  useEffect(() => {
    const refresh = () => setPatientVersion((v) => v + 1);
    window.addEventListener("carehub:patient-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("carehub:patient-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  // Reading the record here intentionally keeps the patient dashboard tied to the latest admin save.
  const activePatient = useMemo(() => getStoredPatient(), [patientVersion, role]);

  if (!role) {
    return <LoginPage onLogin={setRole} />;
  }

  if (role === "admin") {
    return (
      <div className="ph-root min-h-screen">
        <Fonts />
        <div className="w-full max-w-none px-3 md:px-5 lg:px-6 py-4 md:py-5">
          <header className="flex items-center justify-between mb-6 md:mb-8 bg-white/75 backdrop-blur rounded-3xl border border-black/5 px-4 md:px-5 py-3 shadow-[0_10px_30px_rgba(7,18,47,.05)]">
            <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("carehub:admin-home"))} className="flex items-center gap-3 text-left group">
              <div className="w-10 h-10 shrink-0 rounded-2xl bg-[var(--burgundy)] flex items-center justify-center text-white font-bold ph-head ph-brand-dot group-hover:scale-105 transition">+</div>
              <div>
                <p className="ph-head text-xl font-bold">CareHub</p>
                <p className="text-xs text-[var(--ink-soft)]">Administrator workspace</p>
              </div>
            </button>
            <div className="flex items-center gap-2">
              <Pill_ tone="mint"><ShieldCheck size={13} className="inline mr-1" /> Admin</Pill_>
              <button onClick={() => setRole(null)} className="px-3 py-2 rounded-xl text-sm font-semibold text-[var(--ink-soft)] hover:bg-[var(--sky-soft)] transition flex items-center gap-2">
                <LogOut size={16} /> <span className="hidden sm:inline">Log out</span>
              </button>
            </div>
          </header>
          <AdminSection onLogout={() => setRole(null)} />
        </div>
      </div>
    );
  }

  // Keep section selection as a plain value so App never conditionally calls hooks.
  // This prevents the "Rendered more hooks than during the previous render" error
  // when switching from Admin/Login to the Patient dashboard.
  let Section;
  switch (tab) {
    case "reminders": Section = RemindersSection; break;
    case "appointment": Section = AppointmentSection; break;
    case "consultation": Section = ConsultationSection; break;
    case "prescriptions": Section = PrescriptionsSection; break;
    case "reports": Section = ReportsSection; break;
    case "shop": Section = ShopSection; break;
    case "diet": Section = DietSection; break;
    default: Section = () => <HomeSection go={setTab} />;
  }

  const goTab = (id) => { setTab(id); setMobileOpen(false); };

  return (
    <div className="ph-root min-h-screen" data-patient-email={activePatient.email}>
      <Fonts />

      <div className="flex">
        <aside className="hidden md:flex flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-black/5 bg-white/60 backdrop-blur px-5 py-6">
          <button type="button" onClick={() => goTab("home")} className="flex items-center gap-2 mb-8 px-2 text-left group">
            <div className="w-9 h-9 rounded-2xl bg-[var(--burgundy)] flex items-center justify-center text-white font-bold ph-head ph-brand-dot group-hover:scale-105 transition">+</div>
            <span className="ph-head font-semibold text-lg">CareHub</span>
          </button>
          <nav className="flex-1 space-y-1">
            {NAV.map((n) => {
              const Icon = n.icon;
              const isActive = tab === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => goTab(n.id)}
                  className={`ph-nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition ${isActive ? "ph-active bg-[var(--mint-soft)] text-[var(--ink)]" : "text-[var(--ink-soft)] hover:bg-gray-50"
                    }`}
                >
                  <Icon size={18} className="ph-nav-icon" />
                  {n.label}
                </button>
              );
            })}
          </nav>
          <div className="rounded-2xl p-4 mt-4" style={{ background: "var(--peach-soft)" }}>
            <p className="text-xs font-semibold mb-1">Patient</p>
            <p className="text-sm font-semibold">{getStoredPatient().name}</p>
            <p className="text-xs text-[var(--ink-soft)] mt-1">{getStoredPatient().condition}</p>
          </div>
          <button onClick={() => setRole(null)} className="mt-3 px-3 py-2 rounded-xl text-xs font-semibold text-[var(--ink-soft)] hover:bg-white transition flex items-center gap-2">
            <LogOut size={15} /> Log out
          </button>
        </aside>

        <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur border-b border-black/5 flex items-center justify-between px-4 py-3">
          <button type="button" onClick={() => goTab("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[var(--burgundy)] flex items-center justify-center text-white font-bold ph-head text-sm">+</div>
            <span className="ph-head font-semibold">CareHub</span>
          </button>
          <button onClick={() => setMobileOpen(true)}><Menu size={22} /></button>
        </div>

        {mobileOpen && (
          <div className="ph-overlay-enter fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setMobileOpen(false)}>
            <div className="ph-menu-enter absolute right-0 top-0 bottom-0 w-64 bg-white p-5" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-end mb-4"><button onClick={() => setMobileOpen(false)}><X size={20} /></button></div>
              <nav className="space-y-1">
                {NAV.map((n) => {
                  const Icon = n.icon;
                  return (
                    <button key={n.id} onClick={() => goTab(n.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium ${tab === n.id ? "bg-[var(--mint-soft)]" : "text-[var(--ink-soft)]"}`}>
                      <Icon size={18} /> {n.label}
                    </button>
                  );
                })}
              </nav>
              <button onClick={() => setRole(null)} className="mt-5 w-full px-3 py-2 rounded-xl text-sm font-semibold text-[var(--ink-soft)] hover:bg-gray-50 flex items-center gap-2">
                <LogOut size={16} /> Log out
              </button>
            </div>
          </div>
        )}

        <main className="flex-1 px-4 md:px-10 py-8 pt-20 md:pt-8 max-w-6xl mx-auto w-full pb-24 md:pb-8">
          <div key={tab} className="ph-page"><Section /></div>
        </main>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-black/5 flex justify-around py-2">
        {NAV.slice(0, 5).map((n) => {
          const Icon = n.icon;
          const isActive = tab === n.id;
          return (
            <button key={n.id} onClick={() => goTab(n.id)} className="flex flex-col items-center gap-0.5 px-2 py-1">
              <Icon size={19} color={isActive ? "var(--burgundy)" : "#94a3b8"} />
              <span className={`text-[10px] font-medium ${isActive ? "text-[var(--burgundy)]" : "text-gray-400"}`}>{n.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CareHubApp() {
  return (
    <CareHubErrorBoundary>
      <App />
    </CareHubErrorBoundary>
  );
}
