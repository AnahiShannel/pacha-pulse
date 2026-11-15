import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Legend } from "recharts";
import { Sprout, Check } from "lucide-react";
import { Panel, PageBanner, Demo, crops, CropBadge, Bar } from "@/components/kit";
import { pageHead } from "@/lib/head";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/simulador")({ head: pageHead("Simulador agrícola", "Experimenta con alternativas de siembra y rotación de cultivos."), component: Page });

const steps = ["Seleccionar parcela", "Seleccionar cultivo", "Simular escenarios", "Comparar resultados"];
const parcels = [["Los Alisos", "2.4 ha · 3 320 m"], ["Pampa Alta", "1.1 ha · 3 580 m"], ["Quebrada Verde", "0.8 ha · 3 150 m"]];
const scen = [
  { n: "A · Papa → Haba → Cebada", c: "var(--moss)", v: [85, 60, 80, 75, 80, 30] },
  { n: "B · Quinua → Arveja → Papa", c: "var(--harvest)", v: [75, 80, 70, 80, 90, 45] },
  { n: "C · Papa continua", c: "var(--clay)", v: [70, 55, 45, 60, 20, 75] },
];
const axes = ["Clima", "Agua (ahorro)", "Suelo", "Beneficio", "Diversidad", "Riesgo"];

function Page() {
  const [step, setStep] = useState(0);
  const [parcel, setParcel] = useState(0);
  const [sel, setSel] = useState<string[]>(["papa", "haba"]);
  const radar = axes.map((a, i) => ({ a, A: scen[0]!.v[i]!, B: scen[1]!.v[i]!, C: scen[2]!.v[i]! }));
  return (
    <>
      <PageBanner emoji="🌱" title="Simulador agrícola" subtitle="Prueba distintas siembras antes de mover la tierra." />
      <ol className="grid grid-cols-2 gap-2 md:grid-cols-4" aria-label="Etapas">
        {steps.map((s, i) => (
          <li key={s}><button onClick={() => setStep(i)} aria-current={step === i ? "step" : undefined} className={cn("panel flex w-full items-center gap-3 p-3 text-left", step === i && "ring-4 ring-harvest")}>
            <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full font-bold", i < step ? "bg-moss text-warm" : step === i ? "bg-harvest" : "bg-beige")}>{i < step ? <Check className="h-4 w-4" /> : i + 1}</span>
            <span className="text-sm font-bold">Etapa {i + 1}<br /><span className="font-semibold text-muted-foreground">{s}</span></span>
          </button></li>
        ))}
      </ol>
      <Panel title={steps[step]!} icon={<Sprout className="h-5 w-5" />} action={<Demo />}>
        {step === 0 && <div className="grid gap-3 md:grid-cols-3">{parcels.map(([n, d], i) => (
          <button key={n} onClick={() => setParcel(i)} aria-pressed={parcel === i} className={cn("panel-inner p-5 text-left", parcel === i && "ring-4 ring-moss")}><p className="text-3xl" aria-hidden>🏞️</p><p className="mt-2 font-serif text-lg font-bold">{n}</p><p className="text-sm text-muted-foreground">{d}</p></button>))}</div>}
        {step === 1 && <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">{crops.map((c) => {
          const on = sel.includes(c.id);
          return <button key={c.id} aria-pressed={on} onClick={() => setSel(on ? sel.filter((x) => x !== c.id) : [...sel, c.id])} className={cn("panel-inner flex flex-col items-center p-4", on && "bg-leaf ring-4 ring-moss")}><CropBadge emoji={c.emoji} size="lg" /><p className="mt-2 font-serif font-bold">{c.name}</p><p className="text-xs text-muted-foreground">{c.season}</p><p className="mt-1 text-xs font-bold">{on ? "✔ Elegido" : "Tocar para elegir"}</p></button>;
        })}</div>}
        {step === 2 && <div className="grid gap-4 md:grid-cols-3">{scen.map((s) => (
          <div key={s.n} className="panel-inner p-4"><p className="font-serif text-lg font-bold">{s.n}</p>
            <div className="mt-3 flex items-center justify-between gap-1 text-2xl" aria-label="Rotación por campañas">{s.n.split("·")[1]!.split("→").map((x, i) => <span key={i} className="flex-1 rounded-lg bg-leaf py-2 text-center text-sm font-bold">{x.trim()}</span>)}</div>
            <p className="mt-2 text-xs text-muted-foreground">Campaña 2026 → 2027 → 2028</p></div>))}</div>}
        {step === 3 && <div className="grid gap-5 xl:grid-cols-2">
          <div className="panel-inner h-80 p-2"><ResponsiveContainer><RadarChart data={radar}><PolarGrid stroke="var(--border)" /><PolarAngleAxis dataKey="a" tick={{ fill: "var(--foreground)", fontSize: 12 }} />{(["A", "B", "C"] as const).map((k, i) => <Radar key={k} name={`Escenario ${k}`} dataKey={k} stroke={scen[i]!.c} fill={scen[i]!.c} fillOpacity={0.15} strokeWidth={2} />)}<Legend /></RadarChart></ResponsiveContainer></div>
          <div className="grid gap-3">{scen.map((s, i) => (
            <div key={s.n} className="panel-inner p-4"><p className="mb-2 font-bold">{["🏆 ", "🌾 ", "⚠️ "][i]}{s.n}</p><div className="grid grid-cols-2 gap-x-4 gap-y-2">{axes.map((a, j) => <Bar key={a} label={a} value={s.v[j]!} tone={j === 5 ? "clay" : "moss"} />)}</div></div>))}</div>
        </div>}
        <div className="mt-5 flex justify-between">
          <button className="btn-soft" disabled={step === 0} onClick={() => setStep(step - 1)}>← Atrás</button>
          <button className="btn-cozy" disabled={step === 3} onClick={() => setStep(step + 1)}>Siguiente →</button>
        </div>
      </Panel>
    </>
  );
}
