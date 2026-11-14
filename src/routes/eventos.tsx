import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bar as RBar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { CloudLightning, ShieldCheck } from "lucide-react";
import { Panel, PageBanner, Demo, Risk, crops, type Level } from "@/components/kit";
import { pageHead } from "@/lib/head";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/eventos")({ head: pageHead("Eventos climáticos", "Simula sequías, heladas, lluvias intensas y olas de calor en tus cultivos."), component: Page });

const evs = [
  { k: "sequia", n: "Sequía prolongada", e: "☀️🏜️", tips: ["Mulch o cobertura de rastrojo", "Riego por goteo en horas frescas", "Variedades nativas tolerantes"] },
  { k: "helada", n: "Heladas", e: "❄️🌙", tips: ["Riego ligero la tarde anterior", "Humo o cobertura con mantas", "Sembrar en laderas medias"] },
  { k: "lluvia", n: "Exceso de lluvias", e: "🌧️🌊", tips: ["Zanjas de drenaje", "Aporque alto en papa", "Monitorear rancha"] },
  { k: "calor", n: "Ola de calor", e: "🔥🌡️", tips: ["Sombra temporal para almácigos", "Aumentar frecuencia de riego", "Evitar labores al mediodía"] },
];

function Page() {
  const [ev, setEv] = useState(evs[0]);
  const [int, setInt] = useState(60);
  const [dur, setDur] = useState(15);
  const [crop, setCrop] = useState("papa");
  const loss = Math.min(90, Math.round(int * 0.6 + dur * 0.8));
  const level: Level = loss > 55 ? "alto" : loss > 30 ? "medio" : "bajo";
  const chart = [{ n: "Rendimiento (t/ha)", Habitual: 18, Extremo: +(18 * (1 - loss / 100)).toFixed(1) }, { n: "Humedad suelo (%)", Habitual: 28, Extremo: Math.round(28 * (1 - loss / 150)) }];
  return (
    <>
      <PageBanner emoji="⛈️" title="Simulador de eventos climáticos" subtitle="¿Qué pasaría si el clima se pone difícil? Prepárate con tiempo." />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {evs.map((x) => <button key={x.k} aria-pressed={ev.k === x.k} onClick={() => setEv(x)} className={cn("panel p-5 text-center", ev.k === x.k && "bg-leaf ring-4 ring-moss")}><p className="text-4xl" aria-hidden>{x.e}</p><p className="mt-2 font-serif font-bold">{x.n}</p></button>)}
      </div>
      <div className="grid gap-5 xl:grid-cols-3">
        <Panel title="Ajusta el escenario" icon={<CloudLightning className="h-5 w-5" />} action={<Demo />}>
          <label className="block font-bold">Intensidad: {int}%<input type="range" min={0} max={100} value={int} onChange={(e) => setInt(+e.target.value)} /></label>
          <label className="mt-3 block font-bold">Duración: {dur} días<input type="range" min={1} max={60} value={dur} onChange={(e) => setDur(+e.target.value)} /></label>
          <label className="mt-3 block font-bold">Cultivo
            <select value={crop} onChange={(e) => setCrop(e.target.value)} className="mt-1 h-11 w-full rounded-xl border-2 bg-warm px-3">{crops.map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}</select>
          </label>
        </Panel>
        <Panel title="Impacto potencial" icon={<CloudLightning className="h-5 w-5" />}>
          <div className={cn("rounded-2xl border-2 p-4 text-center", level === "alto" ? "border-clay bg-clay/10" : level === "medio" ? "border-harvest bg-harvest/20" : "border-sage bg-leaf")}>
            <p className="text-sm font-bold">Rendimiento estimado</p>
            <p className="font-serif text-5xl font-bold text-forest">-{loss}%</p>
            <div className="mt-2"><Risk level={level} label={`Vulnerabilidad ${level}`} /></div>
          </div>
          <div className="mt-3 h-48"><ResponsiveContainer><BarChart data={chart}><XAxis dataKey="n" tick={{ fontSize: 11 }} /><YAxis /><Tooltip /><Legend /><RBar dataKey="Habitual" fill="var(--sage)" radius={[6, 6, 0, 0]} /><RBar dataKey="Extremo" fill="var(--clay)" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </Panel>
        <Panel title="Estrategias de adaptación" icon={<ShieldCheck className="h-5 w-5" />}>
          <ul className="space-y-2">{ev.tips.map((t, i) => <li key={t} className="panel-inner flex items-center gap-3 p-3 font-semibold"><span className="grid h-8 w-8 place-items-center rounded-full bg-leaf">{i + 1}</span>{t}</li>)}</ul>
        </Panel>
      </div>
    </>
  );
}
