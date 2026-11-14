import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Thermometer, CloudRain, Droplets, Leaf, Activity, CalendarDays, Bell, Map, Sprout, ListChecks, ArrowRight } from "lucide-react";
import panorama from "@/assets/panorama.jpg";
import farmer from "@/assets/farmer.png";
import parcelMap from "@/assets/parcel-map.jpg";
import { Panel, Demo, Risk, Bar, crops, CropBadge, type Level } from "@/components/kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inicio · PACHA PULSE" },
      { name: "description", content: "Tu parcela andina de un vistazo: clima, cultivos, alertas y calendario agrícola." },
      { property: "og:title", content: "PACHA PULSE — Inicio" },
      { property: "og:description", content: "Conectando la tierra con el futuro: dashboard agrícola para la sierra de Junín." },
    ],
  }),
  component: Index,
});

const stats = [
  { Icon: Thermometer, label: "Temperatura", value: "14.2", unit: "°C", note: "Templado para papa", level: "bajo" as Level },
  { Icon: CloudRain, label: "Precipitación", value: "42", unit: "mm/sem", note: "Lluvias de temporada", level: "bajo" as Level },
  { Icon: Droplets, label: "Humedad del suelo", value: "23", unit: "%", note: "Algo seco", level: "medio" as Level },
  { Icon: Leaf, label: "NDVI", value: "0.62", unit: "índice", note: "Vegetación sana", level: "bajo" as Level },
  { Icon: Activity, label: "Estrés ambiental", value: "Moderado", unit: "", note: "Vigilar riego", level: "medio" as Level },
];

const alerts = [
  { cat: "Agua", title: "Posible estrés hídrico en la parcela norte", level: "medio" as Level, icon: "💧" },
  { cat: "Heladas", title: "Riesgo potencial de helada el jueves de madrugada", level: "alto" as Level, icon: "❄️" },
  { cat: "Sanidad", title: "Humedad favorable para rancha (tizón tardío)", level: "medio" as Level, icon: "🍂" },
  { cat: "Vegetación", title: "Cambio anormal de NDVI en el lote de arveja", level: "bajo" as Level, icon: "🛰️" },
];

const events: Record<number, { e: string; l: string }> = {
  3: { e: "🌱", l: "Siembra" }, 6: { e: "🔍", l: "Monitoreo" }, 10: { e: "🧺", l: "Fertilización" },
  14: { e: "🌿", l: "Crecimiento" }, 17: { e: "🔍", l: "Monitoreo" }, 21: { e: "💧", l: "Riego" },
  24: { e: "🧺", l: "Fertilización" }, 28: { e: "🔍", l: "Monitoreo" }, 30: { e: "🥔", l: "Cosecha" },
};

function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => { setNow(new Date()); const t = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(t); }, []);
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-warm/90 px-4 py-2 shadow-[var(--shadow-cozy)]">
      <div className="text-right text-sm leading-tight">
        <p className="font-bold capitalize text-forest">{now ? now.toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long" }) : "—"}</p>
        <p className="text-muted-foreground">🌧️ Campaña grande · temporada de lluvias</p>
        <p className="font-semibold text-moss">{now ? now.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" }) : "--:--"}</p>
      </div>
      <img src={farmer} alt="Avatar de la agricultora" width={816} height={816} className="h-14 w-14 rounded-full bg-leaf object-cover object-top ring-2 ring-sage" />
    </div>
  );
}

function Index() {
  return (
    <>
      <div className="panel relative overflow-hidden">
        <img src={panorama} alt="Paisaje ilustrado de la sierra de Junín con terrazas de papa y quinua" width={1920} height={640} className="h-[300px] w-full object-cover md:h-[340px]" />
        <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-8" style={{ background: "var(--gradient-sky)" }}>
          <div className="flex justify-end"><Clock /></div>
          <div className="max-w-lg">
            <h1 className="text-3xl font-bold text-forest md:text-4xl">¡Bienvenido de nuevo a PACHA PULSE!</h1>
            <p className="mt-2 text-base text-foreground/85 md:text-lg">Tu tierra tiene mucho que contar. Descubre cómo está tu parcela y prepara tu próxima cosecha.</p>
          </div>
        </div>
      </div>

      <Panel title="Resumen ambiental" icon={<Leaf className="h-5 w-5" />} action={<Demo />}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
          {stats.map(({ Icon, label, value, unit, note, level }) => (
            <div key={label} className="panel-inner p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground"><span className="grid h-8 w-8 place-items-center rounded-full bg-leaf text-moss"><Icon className="h-4 w-4" aria-hidden /></span>{label}</div>
              <p className="mt-3 font-serif text-3xl font-bold text-forest">{value}<span className="ml-1 font-sans text-sm font-semibold text-muted-foreground">{unit}</span></p>
              <p className="mb-2 text-sm">{note}</p>
              <Risk level={level} label={level === "bajo" ? "Normal" : "Atención"} />
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid gap-5 xl:grid-cols-3">
        <Panel title="Mi calendario agrícola" icon={<CalendarDays className="h-5 w-5" />} className="xl:col-span-2" action={<span className="font-serif font-semibold text-earth">Noviembre 2026</span>}>
          <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-muted-foreground">
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => <div key={d}>{d}</div>)}
            {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
              const ev = events[d];
              return (
                <div key={d} className={`min-h-16 rounded-xl border p-1.5 text-left ${ev ? "border-sage bg-leaf" : "bg-warm"} ${d === 14 ? "ring-2 ring-harvest" : ""}`}>
                  <span className="text-foreground">{d}</span>
                  {ev && <p className="mt-0.5 text-[11px] leading-tight text-forest"><span aria-hidden className="text-base">{ev.e}</span><br className="hidden sm:block" /><span className="hidden sm:inline">{ev.l}</span></p>}
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel title="Alertas agrícolas" icon={<Bell className="h-5 w-5" />}>
          <ul className="space-y-3">
            {alerts.map((a) => (
              <li key={a.title} className="panel-inner flex gap-3 p-3">
                <span aria-hidden className="text-2xl">{a.icon}</span>
                <div className="space-y-1">
                  <p className="text-xs font-extrabold uppercase tracking-wide text-earth">{a.cat}</p>
                  <p className="text-sm font-semibold leading-snug">{a.title}</p>
                  <Risk level={a.level} label={`Prioridad ${a.level}`} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Panel title="Mi parcela" icon={<Map className="h-5 w-5" />}>
          <div className="relative overflow-hidden rounded-xl">
            <img src={parcelMap} alt="Mapa ilustrado de la parcela con lotes de papa, quinua, maíz y cebada" width={1280} height={896} loading="lazy" className="w-full" />
            <span className="absolute left-2 top-2 rounded-full bg-warm/90 px-2 py-0.5 text-xs font-bold">📍 Concepción, Junín · 3 320 m</span>
            <span className="absolute bottom-2 right-2 rounded-full bg-forest px-2 py-0.5 text-xs font-bold text-warm">NDVI 0.62 · sano</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Ilustración decorativa, no es imagen satelital.</p>
          <Link to="/parcela" className="btn-cozy mt-3 w-full">Explorar mi parcela <ArrowRight className="h-4 w-4" /></Link>
        </Panel>

        <Panel title="Mis cultivos" icon={<Sprout className="h-5 w-5" />}>
          <div className="grid grid-cols-2 gap-3">
            {crops.map((c) => (
              <div key={c.id} className="panel-inner flex flex-col items-center p-3 text-center">
                <CropBadge emoji={c.emoji} />
                <p className="mt-2 font-serif font-bold text-forest">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.season}</p>
                <p className="mt-1 text-xs font-bold text-moss">{c.status}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Actividades y progreso" icon={<ListChecks className="h-5 w-5" />}>
          <div className="space-y-4">
            <Bar label="🪓 Preparación del terreno" value={100} />
            <Bar label="🔍 Monitoreo de cultivos" value={65} tone="harvest" />
            <Bar label="💧 Revisión de humedad" value={40} tone="water" />
            <Bar label="🧺 Planificación de cosecha" value={20} tone="earth" />
          </div>
          <div className="mt-5 rounded-xl bg-leaf p-3 text-sm">
            <p className="font-bold text-forest">🏅 Racha de cuidado: 12 días</p>
            <p className="text-muted-foreground">Registraste observaciones toda la semana.</p>
          </div>
        </Panel>
      </div>
    </>
  );
}
