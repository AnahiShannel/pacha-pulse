import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bar as RBar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { Droplets } from "lucide-react";
import { Panel, PageBanner, Demo, Risk, type Level } from "@/components/kit";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/riego")({ head: pageHead("Riego inteligente", "Simula qué pasa con tus cultivos si dispones de menos agua."), component: Page });

const demand = [["🥔 Papa", 450], ["🌾 Quinua", 300], ["🌽 Maíz", 500], ["🌱 Cebada", 320], ["🫛 Haba", 380]] as const;

function Page() {
  const [water, setWater] = useState(70);
  const rain = 220, irrigation = Math.round(300 * water / 100);
  const data = demand.map(([n, d]) => ({ n, Demanda: d, Disponible: rain + irrigation, Déficit: Math.max(0, d - rain - irrigation) }));
  const papaDef = Math.max(0, 450 - rain - irrigation);
  const level: Level = papaDef > 120 ? "alto" : papaDef > 30 ? "medio" : "bajo";
  return (
    <>
      <PageBanner emoji="💧" title="Simulador de riego inteligente" subtitle="Cada gota cuenta. Descubre cómo repartir mejor tu agua." />
      <div className="grid gap-5 xl:grid-cols-3">
        <Panel title="¿Qué pasaría si dispongo de menos agua?" icon={<Droplets className="h-5 w-5" />} action={<Demo />}>
          <label className="block font-bold">Disponibilidad hídrica: {water}%<input type="range" min={0} max={100} value={water} onChange={(e) => setWater(+e.target.value)} /></label>
          <button className="btn-soft mt-2 w-full" onClick={() => setWater(70)}>💡 Probar: 30% menos de agua</button>
          <div className="mt-4 grid grid-cols-2 gap-3 text-center">
            {[["☁️", "Precipitación", `${rain} mm`], ["🚿", "Agua de riego", `${irrigation} mm`], ["🥔", "Demanda papa", "450 mm"], ["📉", "Déficit estimado", `${papaDef} mm`]].map(([e, k, v]) => <div key={k} className="panel-inner p-3"><p className="text-2xl" aria-hidden>{e}</p><p className="text-xs font-bold text-muted-foreground">{k}</p><p className="font-serif text-xl font-bold">{v}</p></div>)}
          </div>
          <div className="mt-3"><Risk level={level} label={`Estrés hídrico ${level}`} /></div>
        </Panel>
        <Panel title="Comparación entre cultivos" icon={<Droplets className="h-5 w-5" />} className="xl:col-span-2">
          <div className="h-80"><ResponsiveContainer><BarChart data={data}><XAxis dataKey="n" /><YAxis unit="mm" /><Tooltip /><Legend /><RBar dataKey="Demanda" fill="var(--sage)" radius={[6, 6, 0, 0]} /><RBar dataKey="Disponible" fill="var(--water)" radius={[6, 6, 0, 0]} /><RBar dataKey="Déficit" fill="var(--clay)" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div>
          <p className="mt-2 text-sm text-muted-foreground">🌾 Con menos agua, la quinua y la cebada sufren menos que el maíz.</p>
        </Panel>
      </div>
    </>
  );
}
