import React, { useState, useMemo } from "react";
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
  BedDouble,
  Droplet,
  AlertCircle,
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
      --ink: #223047;
      --ink-soft: #6b7a90;
      --canvas: #f5faf8;
      --mint: #bdead9;
      --mint-soft: #e3f7ef;
      --lavender: #d9cdfb;
      --lavender-soft: #efe9fe;
      --peach: #ffd7bd;
      --peach-soft: #fff1e6;
      --sky: #bfe3f8;
      --sky-soft: #eaf6fd;
      --coral: #ff6f59;
      --teal: #17a398;
    }
    .ph-root{ font-family: var(--font-body); color: var(--ink); background: var(--canvas); }
    .ph-head{ font-family: var(--font-head); }
    @media (prefers-reduced-motion: reduce){
      .ph-root *{ transition: none !important; animation: none !important; }
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

const PATIENT = { name: "Meera Das", room: "F1", condition: "Type 2 Diabetes", doctor: "Dr. Aveek Sen" };

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
      {eyebrow && <p className="text-sm font-medium text-[var(--teal)] mb-1">{eyebrow}</p>}
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
      className={`bg-white rounded-3xl shadow-[0_8px_30px_rgba(34,48,71,0.06)] border border-black/5 ${className}`}
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
      className={`w-12 h-7 rounded-full flex items-center px-1 transition-colors duration-200 ${
        checked ? "bg-[var(--teal)] justify-end" : "bg-gray-200 justify-start"
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
    { id: "diet", label: "Diet plan", icon: Utensils, tone: "sky", desc: "Personalised for Room F1" },
  ];
  return (
    <div>
      <Card className="p-8 md:p-10 mb-8 overflow-hidden relative" style={{ background: "linear-gradient(135deg, var(--mint-soft), var(--sky-soft))" }}>
        <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full opacity-60" style={{ background: "var(--peach)" }} />
        <div className="absolute right-24 bottom-[-40px] w-32 h-32 rounded-full opacity-50" style={{ background: "var(--lavender)" }} />
        <div className="relative">
          <Pill_ tone="mint">Room {PATIENT.room} · {PATIENT.condition}</Pill_>
          <h1 className="ph-head text-3xl md:text-4xl font-semibold mt-4 mb-2 text-[var(--ink)]">
            Good afternoon, {PATIENT.name.split(" ")[0]}
          </h1>
          <p className="text-[var(--ink-soft)] max-w-md mb-6">
            Your sugar trend is improving and your next dose is in 2 hours. Here's everything for today, in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => go("appointment")} className="px-5 py-2.5 rounded-full bg-[var(--coral)] text-white font-semibold text-sm shadow-md hover:brightness-105 transition">
              Book appointment
            </button>
            <button onClick={() => go("consultation")} className="px-5 py-2.5 rounded-full bg-white text-[var(--ink)] font-semibold text-sm shadow-md border-2 border-[var(--teal)] hover:bg-[var(--teal)] hover:text-white transition">
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
              className="text-left rounded-3xl p-5 bg-white shadow-[0_8px_30px_rgba(34,48,71,0.06)] border border-black/5 hover:-translate-y-0.5 transition-transform"
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
              <p className="text-sm font-semibold">{PATIENT.doctor}</p>
              <p className="text-xs text-[var(--ink-soft)]">Endocrinologist · primary care</p>
            </div>
          </div>
          <p className="text-xs text-[var(--ink-soft)] mb-3">Next follow-up</p>
          <div className="flex items-center gap-2 text-sm font-medium mb-4">
            <Clock size={16} className="text-[var(--teal)]" /> Today, 4:30 PM
          </div>
          <button onClick={() => go("consultation")} className="w-full py-2.5 rounded-full text-sm font-semibold text-white bg-[var(--teal)] shadow-md hover:brightness-105 transition">
            View consultation
          </button>
        </Card>
      </div>
    </div>
  );
}

function RemindersSection() {
  const [items, setItems] = useState([
    { id: 1, name: "Metformin 500mg", time: "8:00 AM", freq: "After breakfast", on: true },
    { id: 2, name: "Blood sugar check", time: "1:30 PM", freq: "Before lunch", on: true },
    { id: 3, name: "Glimepiride 1mg", time: "8:30 PM", freq: "After dinner", on: false },
  ]);
  const [draft, setDraft] = useState("");

  const addReminder = () => {
    if (!draft.trim()) return;
    setItems([...items, { id: Date.now(), name: draft.trim(), time: "9:00 AM", freq: "Custom", on: true }]);
    setDraft("");
  };

  return (
    <div>
      <SectionTitle eyebrow="Stay on track" title="Reminders" sub="Medicines and checks, timed around your daily routine." />
      <Card className="p-5 mb-6">
        <div className="flex gap-3">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addReminder()}
            placeholder="Add a new reminder, e.g. Vitamin D, 9 PM"
            className="flex-1 rounded-full px-4 py-2.5 text-sm bg-[var(--mint-soft)] outline-none focus:ring-2 focus:ring-[var(--teal)]"
          />
          <button onClick={addReminder} className="px-4 py-2.5 rounded-full bg-[var(--coral)] text-white flex items-center gap-1 text-sm font-semibold shadow-md hover:brightness-105 transition">
            <Plus size={16} /> Add
          </button>
        </div>
      </Card>

      <div className="space-y-3">
        {items.map((it) => (
          <Card key={it.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: it.on ? "var(--mint-soft)" : "#f1f1f1" }}>
                <Bell size={18} className={it.on ? "text-[var(--teal)]" : "text-gray-400"} />
              </div>
              <div>
                <p className="font-semibold text-sm">{it.name}</p>
                <p className="text-xs text-[var(--ink-soft)]">{it.freq} · {it.time}</p>
              </div>
            </div>
            <Toggle checked={it.on} onChange={() => setItems(items.map((x) => (x.id === it.id ? { ...x, on: !x.on } : x)))} />
          </Card>
        ))}
      </div>
    </div>
  );
}

function AppointmentSection() {
  const [doctor, setDoctor] = useState(DOCTORS[0].id);
  const [slot, setSlot] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const chosen = DOCTORS.find((d) => d.id === doctor);

  return (
    <div>
      <SectionTitle eyebrow="Plan ahead" title="Book an appointment" sub="Pick a doctor and a slot that works for you." />
      {confirmed ? (
        <Card className="p-8 text-center max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--mint-soft)" }}>
            <Check className="text-[var(--teal)]" />
          </div>
          <p className="ph-head text-xl font-semibold mb-1">Appointment booked</p>
          <p className="text-sm text-[var(--ink-soft)] mb-6">{chosen.name} · {slot} · Room {PATIENT.room}</p>
          <button onClick={() => setConfirmed(false)} className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-[var(--teal)] shadow-md hover:brightness-105 transition">Book another</button>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {DOCTORS.map((d) => (
              <Card
                key={d.id}
                className={`p-4 flex items-center justify-between cursor-pointer ${doctor === d.id ? "ring-2 ring-[var(--teal)]" : ""}`}
                onClick={() => { setDoctor(d.id); setSlot(null); }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center font-semibold" style={{ background: toneMap[d.tone].soft }}>
                    {d.name.split(" ").slice(-1)[0][0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{d.name}</p>
                    <p className="text-xs text-[var(--ink-soft)]">{d.spec}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end text-xs font-medium mb-1">
                    <Star size={13} fill="currentColor" className="text-amber-400" /> {d.rating}
                  </div>
                  <p className="text-xs text-[var(--ink-soft)]">{d.next}</p>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-5 h-fit">
            <p className="font-semibold text-sm mb-1">Available slots</p>
            <p className="text-xs text-[var(--ink-soft)] mb-4">for {chosen.name.split(" ").slice(-1)[0]}, today</p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {SLOTS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSlot(s)}
                  className={`text-xs font-semibold py-2 rounded-xl border transition ${
                    slot === s ? "bg-[var(--teal)] text-white border-[var(--teal)] shadow-sm" : "bg-[var(--sky-soft)] border-[var(--sky)] hover:border-[var(--teal)]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              disabled={!slot}
              onClick={() => setConfirmed(true)}
              className="w-full py-2.5 rounded-full text-sm font-semibold text-white bg-[var(--coral)] shadow-md hover:brightness-105 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            >
              Confirm booking
            </button>
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
      <SectionTitle eyebrow="Right now" title="Consultation" sub="Connect with your care team without leaving your room." />
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 md:p-8 text-center" style={{ background: "linear-gradient(160deg, var(--lavender-soft), var(--sky-soft))" }}>
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow">
            <Video className="text-[var(--teal)]" />
          </div>
          <p className="ph-head text-xl font-semibold mb-1">{PATIENT.doctor}</p>
          <p className="text-sm text-[var(--ink-soft)] mb-6">Endocrinologist · next slot today, 4:30 PM</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => setActive(true)} className="px-5 py-2.5 rounded-full bg-[var(--coral)] text-white text-sm font-semibold flex items-center gap-2 shadow-md hover:brightness-105 transition">
              <Video size={16} /> Start video call
            </button>
            <button className="px-5 py-2.5 rounded-full bg-white text-[var(--ink)] text-sm font-semibold flex items-center gap-2 shadow-md border-2 border-[var(--teal)] hover:bg-[var(--teal)] hover:text-white transition">
              <PhoneCall size={16} /> Voice call
            </button>
          </div>
          {active && (
            <div className="mt-6 rounded-2xl bg-white p-4 text-left flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--coral)] animate-pulse" />
              <p className="text-sm font-medium">Connecting you to {PATIENT.doctor.split(" ").slice(-1)[0]}…</p>
              <button onClick={() => setActive(false)} className="ml-auto text-xs font-semibold text-white bg-[var(--coral)] px-3 py-1.5 rounded-full shadow-sm hover:brightness-105 transition">Cancel</button>
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
            <button className="w-9 h-9 rounded-full bg-[var(--teal)] flex items-center justify-center text-white shadow-md hover:brightness-105 transition"><ChevronRight size={16} /></button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function PrescriptionsSection() {
  const meds = [
    { id: 1, name: "Metformin 500mg", dosage: "1 tablet, twice daily", refill: "5 days left", tone: "mint" },
    { id: 2, name: "Glimepiride 1mg", dosage: "1 tablet, once daily", refill: "2 days left", tone: "peach" },
    { id: 3, name: "Vitamin D3", dosage: "1 capsule, weekly", refill: "3 weeks left", tone: "sky" },
  ];
  return (
    <div>
      <SectionTitle eyebrow="Current medication" title="Prescriptions" sub={`Prescribed by ${PATIENT.doctor}, last updated 3 days ago.`} />
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
              <button className="text-xs font-semibold text-white bg-[var(--teal)] px-3 py-1.5 rounded-full shadow-sm hover:brightness-105 transition">Request refill</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ReportsSection() {
  return (
    <div>
      <SectionTitle eyebrow="Lab results" title="Reports" sub="All your recent tests, in plain language." />
      <div className="space-y-3">
        {REPORTS.map((r) => (
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
              <button className="w-9 h-9 rounded-full bg-[var(--teal)] text-white flex items-center justify-center shadow-sm hover:brightness-105 transition"><Download size={15} /></button>
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
  const [room, setRoom] = useState(PATIENT.room);
  const [condition, setCondition] = useState("Diabetes");
  const plan = DIET_PLANS[condition];

  return (
    <div>
      <SectionTitle eyebrow="Nutrition, matched to you" title="Diet recommendation" sub="Enter a room number and condition to see the day's tailored plan." />
      <Card className="p-5 mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-xs font-semibold text-[var(--ink-soft)] flex items-center gap-1 mb-1"><BedDouble size={14}/> Room</label>
          <input value={room} onChange={(e) => setRoom(e.target.value)} className="rounded-xl px-3 py-2 text-sm bg-[var(--sky-soft)] outline-none w-28" />
        </div>
        <div>
          <label className="text-xs font-semibold text-[var(--ink-soft)] flex items-center gap-1 mb-1"><Droplet size={14}/> Condition</label>
          <div className="flex gap-2">
            {Object.keys(DIET_PLANS).map((c) => (
              <button
                key={c}
                onClick={() => setCondition(c)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition border-2 ${
                  condition === c ? "bg-[var(--teal)] text-white border-[var(--teal)] shadow-sm" : "bg-white text-[var(--ink)] border-gray-200 hover:border-[var(--teal)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          {plan.meals.map((m, i) => (
            <Card key={i} className="p-5" style={{ background: toneMap[plan.tone].soft }}>
              <p className="text-xs font-semibold text-[var(--ink-soft)] mb-2">{m.time}</p>
              <p className="text-sm font-medium">{m.items}</p>
            </Card>
          ))}
        </div>
        <Card className="p-6 h-fit">
          <p className="font-semibold text-sm mb-3 flex items-center gap-2"><AlertCircle size={16} className="text-[var(--coral)]" /> Best to avoid</p>
          <ul className="space-y-2">
            {plan.avoid.map((a, i) => (
              <li key={i} className="text-sm text-[var(--ink-soft)] flex gap-2">
                <span className="text-[var(--coral)]">•</span> {a}
              </li>
            ))}
          </ul>
          <p className="text-xs text-[var(--ink-soft)] mt-5">Plan prepared for Room {room} · reviewed by {DOCTORS[3].name}</p>
        </Card>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   App shell
--------------------------------------------------------- */
export default function App() {
  const [tab, setTab] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const Section = useMemo(() => {
    switch (tab) {
      case "reminders": return RemindersSection;
      case "appointment": return AppointmentSection;
      case "consultation": return ConsultationSection;
      case "prescriptions": return PrescriptionsSection;
      case "reports": return ReportsSection;
      case "shop": return ShopSection;
      case "diet": return DietSection;
      default: return () => <HomeSection go={setTab} />;
    }
  }, [tab]);

  const goTab = (id) => { setTab(id); setMobileOpen(false); };

  return (
    <div className="ph-root min-h-screen">
      <Fonts />

      {/* Desktop sidebar */}
      <div className="flex">
        <aside className="hidden md:flex flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-black/5 bg-white/60 backdrop-blur px-5 py-6">
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-9 h-9 rounded-2xl bg-[var(--teal)] flex items-center justify-center text-white font-bold ph-head">+</div>
            <span className="ph-head font-semibold text-lg">CareHub</span>
          </div>
          <nav className="flex-1 space-y-1">
            {NAV.map((n) => {
              const Icon = n.icon;
              const isActive = tab === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => goTab(n.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition ${
                    isActive ? "bg-[var(--mint-soft)] text-[var(--ink)]" : "text-[var(--ink-soft)] hover:bg-gray-50"
                  }`}
                >
                  <Icon size={18} />
                  {n.label}
                </button>
              );
            })}
          </nav>
          <div className="rounded-2xl p-4 mt-4" style={{ background: "var(--peach-soft)" }}>
            <p className="text-xs font-semibold mb-1">Room {PATIENT.room}</p>
            <p className="text-xs text-[var(--ink-soft)]">{PATIENT.name}</p>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur border-b border-black/5 flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[var(--teal)] flex items-center justify-center text-white font-bold ph-head text-sm">+</div>
            <span className="ph-head font-semibold">CareHub</span>
          </div>
          <button onClick={() => setMobileOpen(true)}><Menu size={22} /></button>
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setMobileOpen(false)}>
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-white p-5" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-end mb-4"><button onClick={() => setMobileOpen(false)}><X size={20} /></button></div>
              <nav className="space-y-1">
                {NAV.map((n) => {
                  const Icon = n.icon;
                  return (
                    <button
                      key={n.id}
                      onClick={() => goTab(n.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium ${
                        tab === n.id ? "bg-[var(--mint-soft)]" : "text-[var(--ink-soft)]"
                      }`}
                    >
                      <Icon size={18} /> {n.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 px-4 md:px-10 py-8 pt-20 md:pt-8 max-w-6xl mx-auto w-full pb-24 md:pb-8">
          <Section />
        </main>
      </div>

      {/* Mobile bottom nav (core actions) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-black/5 flex justify-around py-2">
        {NAV.slice(0, 5).map((n) => {
          const Icon = n.icon;
          const isActive = tab === n.id;
          return (
            <button key={n.id} onClick={() => goTab(n.id)} className="flex flex-col items-center gap-0.5 px-2 py-1">
              <Icon size={19} color={isActive ? "var(--teal)" : "#94a3b8"} />
              <span className={`text-[10px] font-medium ${isActive ? "text-[var(--teal)]" : "text-gray-400"}`}>{n.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
