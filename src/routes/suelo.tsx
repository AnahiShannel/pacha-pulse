import { createFileRoute } from "@tanstack/react-router";
import { Layers, AlertTriangle, Sprout } from "lucide-react";
import { Panel, PageBanner, Demo, Risk, Bar, type Level } from "@/components/kit";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/suelo")({ head: pageHead("Análisis del suelo", "Textura, pH, carbono orgánico, humedad y erosión de tu suelo."), component: Page });

const ind: [string, string, string, string, Level][] = [
  ["🧱", "Textura", "Franco arcillosa", "Buena retención", "bajo"], ["⚗️", "pH", "5.8", "Ligeramente ácido", "medio"],
  ["🍂", "Carbono orgánico", "2.1 %", "Aceptable", "bajo"], ["💧", "Humedad", "23 %", "Algo seco", "medio"],
  ["⛰️", "Riesgo de erosión", "Moderado", "Pendiente 8 %", "medio"], ["🌿", "Necesidades nutricionales", "N medio", "Requiere análisis", "medio"],
];
const recs = [["🪱", "Compostaje", "Prepara compost con estiércol y restos de cosecha."], ["🌾", "Cobertura vegetal", "Siembra avena o vicia entre campañas."], ["🔄", "Rotación de cultivos", "Alterna papa con leguminosas."], ["🐑", "Abonos orgánicos", "Usa guano de corral bien descompuesto."], ["🧪", "Mediciones adicionales", "Lleva una muestra al laboratorio."]];

function Page() {
  return (
    <>
      <PageBanner emoji="🪱" title="Análisis del suelo y nutrientes" subtitle="Un suelo sano, lleno de raíces, lombrices y microorganismos, da mejores cosechas." />
      <Panel title="Indicadores del suelo" icon={<Layers className="h-5 w-5" />} action={<Demo />}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {ind.map(([e, k, v, n, l]) => <div key={k} className="panel-inner flex gap-3 p-4"><span className="text-3xl" aria-hidden>{e}</span><div><p className="text-sm font-bold text-muted-foreground">{k}</p><p className="font-serif text-2xl font-bold text-forest">{v}</p><p className="mb-1 text-sm">{n}</p><Risk level={l} label={l === "bajo" ? "Bien" : "Atención"} /></div></div>)}
        </div>
      </Panel>
      <div className="grid gap-5 xl:grid-cols-3">
        <Panel title="Perfil de tu suelo" icon={<Layers className="h-5 w-5" />}>
          <div className="overflow-hidden rounded-xl border-2" aria-label="Ilustración del perfil del suelo">
            <div className="bg-sage p-3 text-center text-2xl">🌱🥔🌱🌿🌱</div>
            <div className="bg-earth/60 p-4 text-center text-xl">🪱 · 〰️ raíces · 🦠</div>
            <div className="bg-earth p-4 text-center text-xl text-warm">🍂 compost · 🪱</div>
            <div className="bg-forest/70 p-4 text-center text-sm font-bold text-warm">Subsuelo · roca madre</div>
          </div>
          <div className="mt-4 space-y-3"><Bar label="Arena" value={30} tone="harvest" /><Bar label="Limo" value={35} tone="earth" /><Bar label="Arcilla" value={35} tone="clay" /></div>
        </Panel>
        <Panel title="¿Qué necesita mi suelo?" icon={<Sprout className="h-5 w-5" />} className="xl:col-span-2">
          <div className="grid gap-3 sm:grid-cols-2">{recs.map(([e, t, d]) => <div key={t} className="panel-inner flex gap-3 p-4"><span className="text-3xl" aria-hidden>{e}</span><div><h3 className="font-bold text-forest">{t}</h3><p className="text-sm text-muted-foreground">{d}</p></div></div>)}</div>
          <div role="note" className="mt-4 flex gap-3 rounded-2xl border-2 border-dashed border-harvest bg-harvest/20 p-4">
            <AlertTriangle className="h-6 w-6 shrink-0 text-earth" aria-hidden />
            <p className="text-sm"><b>Importante:</b> nutrientes como el <b>fósforo (P)</b> y el <b>potasio (K)</b> no pueden medirse directamente con satélites convencionales. Necesitan un <b>análisis de suelo en laboratorio</b>.</p>
          </div>
        </Panel>
      </div>
    </>
  );
}
