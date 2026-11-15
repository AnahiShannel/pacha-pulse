import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bug, Upload, Leaf, ClipboardList } from "lucide-react";
import { Panel, PageBanner, Demo, Risk, type Level } from "@/components/kit";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/ecoguard")({ head: pageHead("EcoGuard", "Prevención natural de plagas y enfermedades con manejo integrado."), component: Page });

const pests: [string, string, string, Level][] = [["🐛", "Gorgojo de los Andes", "Papa", "alto"], ["🦋", "Polilla de la papa", "Papa", "medio"], ["🪲", "Pulguilla", "Papa, haba", "bajo"], ["🐜", "Pulgones", "Haba, arveja", "medio"]];
const diseases: [string, string, string, Level][] = [["🍂", "Rancha (tizón tardío)", "Papa", "alto"], ["🟤", "Mildiu", "Quinua", "medio"], ["🟠", "Roya", "Cebada, haba", "bajo"], ["⚫", "Mancha chocolate", "Haba", "medio"]];

function Page() {
  const [tab, setTab] = useState<"p" | "e">("p");
  const [file, setFile] = useState<string | null>(null);
  const list = tab === "p" ? pests : diseases;
  return (
    <>
      <PageBanner emoji="🐞" title="EcoGuard — Plagas y enfermedades" subtitle="Protege tu cultivo naturalmente, usando pesticidas solo cuando es necesario." />
      <div className="grid gap-5 xl:grid-cols-3">
        <Panel title="Catálogo ilustrado" icon={<Bug className="h-5 w-5" />} className="xl:col-span-2">
          <div className="mb-3 flex gap-2" role="tablist"><button role="tab" aria-selected={tab === "p"} onClick={() => setTab("p")} className={tab === "p" ? "btn-cozy" : "btn-soft"}>🐛 Plagas</button><button role="tab" aria-selected={tab === "e"} onClick={() => setTab("e")} className={tab === "e" ? "btn-cozy" : "btn-soft"}>🍂 Enfermedades</button></div>
          <div className="grid gap-3 sm:grid-cols-2">{list.map(([e, n, c, l]) => <div key={n} className="panel-inner flex gap-3 p-4"><span className="grid h-14 w-14 place-items-center rounded-xl bg-leaf text-3xl" aria-hidden>{e}</span><div><p className="font-serif font-bold text-forest">{n}</p><p className="text-sm text-muted-foreground">Afecta: {c}</p><Risk level={l} label={`Alerta ${l}`} /></div></div>)}</div>
        </Panel>
        <Panel title="Identificar con foto" icon={<Upload className="h-5 w-5" />} action={<Demo>Ilustrativo</Demo>}>
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-sage bg-warm p-6 text-center">
            <span className="text-4xl" aria-hidden>📷🌿</span><span className="font-bold">Sube una foto de tu planta</span><span className="text-xs text-muted-foreground">La identificación con IA estará disponible pronto</span>
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => setFile(e.target.files?.[0]?.name ?? null)} />
          </label>
          <div className="panel-inner mt-3 p-4">
            <p className="text-xs font-bold uppercase text-earth">Resultado de ejemplo {file && `· ${file}`}</p>
            <p className="mt-1 font-serif text-lg font-bold">🍂 Rancha de la papa</p><p className="text-sm"><i>Phytophthora infestans</i> · coincidencia 87% (ficticia)</p>
            <p className="mt-2 text-xs text-muted-foreground">⚠️ Resultado ilustrativo. Confirma con un técnico agrícola.</p>
          </div>
        </Panel>
      </div>
      <Panel title="Protege tu cultivo naturalmente" icon={<Leaf className="h-5 w-5" />}>
        <div className="grid gap-3 md:grid-cols-4">{[["🐞", "Control biológico", "Mariquitas y hongos benéficos contra pulgones y gorgojos."], ["🪤", "Trampas", "Trampas amarillas y de feromonas para polilla."], ["🔄", "Manejo cultural", "Rotación, semilla sana y aporque oportuno."], ["🔔", "Alertas preventivas", "Aviso cuando la humedad favorece la rancha."]].map(([e, t, d]) => <div key={t} className="panel-inner p-4"><p className="text-3xl" aria-hidden>{e}</p><h3 className="mt-1 font-bold text-forest">{t}</h3><p className="text-sm text-muted-foreground">{d}</p></div>)}</div>
      </Panel>
      <Panel title="Registro de observaciones" icon={<ClipboardList className="h-5 w-5" />} action={<Demo />}>
        <ul className="divide-y">{[["12 nov", "Lote papa", "Manchas oscuras en 3 hojas"], ["9 nov", "Lote haba", "Pulgones en brotes"], ["5 nov", "Trampa 2", "14 polillas capturadas"]].map(([d, l, o]) => <li key={d} className="flex flex-wrap gap-3 py-2 text-sm"><b className="w-16">{d}</b><span className="w-24 text-moss">{l}</span><span>{o}</span></li>)}</ul>
      </Panel>
    </>
  );
}
