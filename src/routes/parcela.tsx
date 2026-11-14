import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Mountain, Ruler, TrendingUp, Layers, Sprout, History, Droplets, Satellite } from "lucide-react";
import ndvi from "@/assets/ndvi-map.jpg";
import parcelMap from "@/assets/parcel-map.jpg";
import { Panel, PageBanner, Demo } from "@/components/kit";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/parcela")({ head: pageHead("Mi parcela", "Visualiza tu terreno: mapa satelital, superficie, altitud, suelo y agua."), component: Page });

const facts = [
  [MapPin, "Ubicación", "Concepción, Junín · -11.92°, -75.31°"], [Ruler, "Superficie", "2.4 hectáreas"],
  [Mountain, "Altitud", "3 320 m s. n. m."], [TrendingUp, "Pendiente", "8 % · ligera"],
  [Layers, "Tipo de suelo", "Franco arcilloso"], [Sprout, "Cultivo actual", "Papa nativa"],
  [History, "Cultivo anterior", "Haba"], [Droplets, "Disponibilidad de agua", "Media · canal comunal"],
] as const;

function Page() {
  const [view, setView] = useState<"sat" | "ilu">("sat");
  return (
    <>
      <PageBanner emoji="🗺️" title="Mi parcela: Chacra Los Alisos" subtitle="Mira tu terreno desde el cielo y conoce sus características." />
      <div className="grid gap-5 xl:grid-cols-3">
        <Panel title="Mapa de la parcela" icon={<Satellite className="h-5 w-5" />} className="xl:col-span-2" action={<Demo>Imagen simulada</Demo>}>
          <div className="mb-3 flex gap-2" role="tablist">
            <button role="tab" aria-selected={view === "sat"} onClick={() => setView("sat")} className={view === "sat" ? "btn-cozy" : "btn-soft"}>🛰️ Vista satelital</button>
            <button role="tab" aria-selected={view === "ilu"} onClick={() => setView("ilu")} className={view === "ilu" ? "btn-cozy" : "btn-soft"}>🎨 Vista ilustrada</button>
          </div>
          <div className="relative overflow-hidden rounded-xl border-4 border-warm">
            <img src={view === "sat" ? ndvi : parcelMap} alt={view === "sat" ? "Vista tipo satelital del valle del Mantaro" : "Mapa ilustrado de la parcela"} width={1280} height={896} className="w-full" />
            {view === "sat" && <div className="absolute left-[38%] top-[35%] h-[22%] w-[20%] rounded-lg border-[3px] border-dashed border-harvest" aria-label="Límite de la parcela" />}
            <span className="absolute bottom-2 left-2 rounded-full bg-forest px-3 py-1 text-xs font-bold text-warm">{view === "sat" ? "📡 Mapa satelital (representación)" : "🎨 Ilustración decorativa"}</span>
          </div>
        </Panel>
        <Panel title="Ficha del terreno" icon={<MapPin className="h-5 w-5" />}>
          <dl className="space-y-2">
            {facts.map(([I, k, v]) => (
              <div key={k} className="panel-inner flex items-center gap-3 p-3">
                <I className="h-5 w-5 text-moss" aria-hidden />
                <div><dt className="text-xs font-bold uppercase text-muted-foreground">{k}</dt><dd className="font-semibold">{v}</dd></div>
              </div>
            ))}
          </dl>
        </Panel>
      </div>
      <Panel title="Conoce tu terreno" icon={<Sprout className="h-5 w-5" />}>
        <div className="grid gap-4 md:grid-cols-4">
          {[["⛰️", "Ladera suave", "La pendiente ligera favorece el drenaje, pero cuida la erosión con surcos en curva."], ["🌡️", "Clima frío templado", "Días soleados y noches frías: atención a heladas entre junio y agosto."], ["🪱", "Suelo vivo", "El suelo franco arcilloso retiene bien el agua y los nutrientes."], ["💧", "Agua compartida", "Tu turno de riego del canal comunal es cada 8 días."]].map(([e, t, d]) => (
            <div key={t} className="panel-inner p-4"><p className="text-3xl" aria-hidden>{e}</p><h3 className="mt-2 font-bold text-forest">{t}</h3><p className="text-sm text-muted-foreground">{d}</p></div>
          ))}
        </div>
      </Panel>
    </>
  );
}
