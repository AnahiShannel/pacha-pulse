import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Satellite, LineChart as LC } from "lucide-react";
import ndvi from "@/assets/ndvi-map.jpg";
import { Panel, PageBanner, Demo } from "@/components/kit";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/datos-nasa")({ head: pageHead("Datos NASA", "Temperatura, lluvia, humedad del suelo y NDVI explicados de forma sencilla."), component: Page });

const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const data = months.map((m, i) => ({ m, temp: +(12 + 3 * Math.cos((i - 1) / 1.9)).toFixed(1), lluvia: Math.round(20 + 110 * Math.max(0, Math.cos((i - 1) / 2.1))), humedad: Math.round(18 + 18 * Math.max(0, Math.cos((i - 1.5) / 2.2))), ndvi: +(0.35 + 0.3 * Math.max(0, Math.cos((i - 2) / 2.3))).toFixed(2) }));
const tabs = [
  { k: "temp", l: "🌡️ Temperatura", u: "°C", src: "NASA POWER", c: "var(--clay)" },
  { k: "lluvia", l: "🌧️ Precipitación", u: "mm", src: "GPM IMERG", c: "var(--water)" },
  { k: "humedad", l: "💧 Humedad del suelo", u: "%", src: "SMAP", c: "var(--earth)" },
  { k: "ndvi", l: "🌿 NDVI", u: "", src: "Landsat 8/9 · MODIS", c: "var(--moss)" },
] as const;

function Page() {
  const [t, setT] = useState<(typeof tabs)[number]>(tabs[0]);
  return (
    <>
      <PageBanner emoji="🛰️" title="Datos NASA" subtitle="Información de satélites traducida a lo que importa en tu chacra." />
      <Panel title="Variables históricas" icon={<LC className="h-5 w-5" />} action={<Demo />}>
        <div className="mb-4 flex flex-wrap gap-2" role="tablist">
          {tabs.map((x) => <button key={x.k} role="tab" aria-selected={t.k === x.k} onClick={() => setT(x)} className={t.k === x.k ? "btn-cozy" : "btn-soft"}>{x.l}</button>)}
        </div>
        <div className="panel-inner h-72 p-3">
          <ResponsiveContainer>
            <AreaChart data={data}><CartesianGrid stroke="var(--border)" strokeDasharray="4 4" /><XAxis dataKey="m" stroke="var(--muted-foreground)" /><YAxis stroke="var(--muted-foreground)" unit={t.u} /><Tooltip /><Area type="monotone" dataKey={t.k} stroke={t.c} fill={t.c} fillOpacity={0.25} strokeWidth={3} /></AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Fuente ilustrativa: <b>{t.src}</b> · Periodo 2016–2026 (promedio mensual ficticio)</p>
      </Panel>
      <div className="grid gap-5 xl:grid-cols-2">
        <Panel title="Mapa de vegetación (Landsat)" icon={<Satellite className="h-5 w-5" />} action={<Demo>Representación</Demo>}>
          <img src={ndvi} alt="Mapa de vegetación tipo NDVI del valle" width={1280} height={896} loading="lazy" className="w-full rounded-xl" />
          <div className="mt-3 flex items-center gap-2 text-xs font-bold"><span>Poca vegetación</span><div className="h-3 flex-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--earth), var(--harvest), var(--moss), var(--forest))" }} /><span>Mucha vegetación</span></div>
        </Panel>
        <Panel title="Estrés vegetal y variaciones" icon={<LC className="h-5 w-5" />} action={<Demo />}>
          <div className="panel-inner h-56 p-3"><ResponsiveContainer><BarChart data={data}><XAxis dataKey="m" stroke="var(--muted-foreground)" /><YAxis stroke="var(--muted-foreground)" /><Tooltip /><Bar dataKey="humedad" name="Humedad %" fill="var(--sage)" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div>
          <div className="panel-inner mt-3 h-40 p-3"><ResponsiveContainer><LineChart data={data}><XAxis dataKey="m" stroke="var(--muted-foreground)" /><Tooltip /><Line dataKey="ndvi" name="NDVI" stroke="var(--forest)" strokeWidth={3} dot={{ fill: "var(--harvest)" }} /></LineChart></ResponsiveContainer></div>
        </Panel>
      </div>
      <Panel title="Lo que nos cuentan los satélites" icon={<Satellite className="h-5 w-5" />}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {tabs.map((x) => (
            <article key={x.k} className="panel-inner p-4 text-sm">
              <h3 className="text-lg font-bold text-forest">{x.l}</h3>
              <dl className="mt-2 space-y-1">
                <div><dt className="inline font-bold">Fuente: </dt><dd className="inline">{x.src}</dd></div>
                <div><dt className="inline font-bold">Fecha del dato: </dt><dd className="inline">10 nov 2026</dd></div>
                <div><dt className="inline font-bold">Periodo: </dt><dd className="inline">Últimos 30 días</dd></div>
              </dl>
              <p className="mt-2 text-muted-foreground">{{ temp: "Las noches están más frías que el promedio: protege brotes jóvenes.", lluvia: "Las lluvias llegaron a tiempo esta campaña.", humedad: "La tierra se está secando más rápido que otros años.", ndvi: "Tus plantas están verdes y crecen bien." }[x.k]}</p>
            </article>
          ))}
        </div>
      </Panel>
    </>
  );
}
