import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bar as RBar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { Coins } from "lucide-react";
import { Panel, PageBanner, Demo } from "@/components/kit";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/economico")({ head: pageHead("Simulador económico", "Evalúa costos, ingresos y margen antes de sembrar."), component: Page });

const init = { Semillas: 3500, Fertilizantes: 2200, "Mano de obra": 4000, Riego: 800, Transporte: 900 };

function Page() {
  const [c, setC] = useState(init);
  const [yieldT, setYield] = useState(18);
  const [price, setPrice] = useState(1.2);
  const cost = Object.values(c).reduce((a, b) => a + b, 0);
  const sc = [["Desfavorable", 0.7], ["Moderado", 1], ["Optimista", 1.25]].map(([n, f]) => ({ n: n as string, Margen: Math.round(yieldT * 1000 * price * (f as number) - cost) }));
  const income = yieldT * 1000 * price;
  return (
    <>
      <PageBanner emoji="🪙" title="Simulador económico" subtitle="¿Conviene sembrar? Ajusta tus precios y costos locales." />
      <div className="grid gap-5 xl:grid-cols-3">
        <Panel title="Costos de producción (S/ por ha)" icon={<Coins className="h-5 w-5" />} action={<Demo />}>
          <div className="space-y-2">{Object.entries(c).map(([k, v]) => <label key={k} className="flex items-center justify-between gap-3 font-semibold">{k}<input type="number" value={v} onChange={(e) => setC({ ...c, [k]: +e.target.value })} className="h-11 w-28 rounded-xl border-2 bg-warm px-3 text-right" /></label>)}</div>
          <label className="mt-4 block font-bold">Rendimiento esperado: {yieldT} t/ha<input type="range" min={5} max={35} value={yieldT} onChange={(e) => setYield(+e.target.value)} /></label>
          <label className="block font-bold">Precio de venta: S/ {price.toFixed(2)} /kg<input type="range" min={0.4} max={3} step={0.05} value={price} onChange={(e) => setPrice(+e.target.value)} /></label>
        </Panel>
        <Panel title="Resultado estimado" icon={<Coins className="h-5 w-5" />}>
          <div className="grid grid-cols-2 gap-3 text-center">{[["Costo total", cost], ["Ingresos", income], ["Margen", income - cost]].map(([k, v]) => <div key={k as string} className="panel-inner p-3"><p className="text-xs font-bold text-muted-foreground">{k}</p><p className="font-serif text-xl font-bold">S/ {Math.round(v as number).toLocaleString("es-PE")}</p></div>)}
            <div className="panel-inner p-3"><p className="text-xs font-bold text-muted-foreground">Punto de equilibrio</p><p className="font-serif text-xl font-bold">{(cost / price / 1000).toFixed(1)} t/ha</p></div></div>
          <p className="mt-3 rounded-xl bg-leaf p-3 text-sm font-semibold">{income > cost ? "✅ Con estos valores, la siembra sería rentable." : "⚠️ Con estos valores, podrías perder dinero."}</p>
        </Panel>
        <Panel title="Escenarios" icon={<Coins className="h-5 w-5" />}>
          <div className="h-72"><ResponsiveContainer><BarChart data={sc}><XAxis dataKey="n" /><YAxis /><Tooltip /><RBar dataKey="Margen" radius={[8, 8, 0, 0]}>{sc.map((s) => <Cell key={s.n} fill={s.Margen < 0 ? "var(--clay)" : s.n === "Optimista" ? "var(--moss)" : "var(--harvest)"} />)}</RBar></BarChart></ResponsiveContainer></div>
        </Panel>
      </div>
    </>
  );
}
