import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download } from "lucide-react";
import farmer from "@/assets/farmer.png";
import { Panel, PageBanner, Demo, Bar } from "@/components/kit";
import { pageHead } from "@/lib/head";

export const Route = createFileRoute("/reportes")({ head: pageHead("Reportes", "Informes de tu parcela: ambiente, suelo, economía y recomendaciones."), component: Page });

const sections = ["🌤️ Resumen ambiental", "📜 Historial de cultivos", "🔄 Comparación de rotaciones", "⛈️ Escenarios climáticos", "🪱 Salud del suelo", "🪙 Análisis económico", "⚠️ Riesgos agrícolas", "💡 Recomendaciones"];

function Page() {
  return (
    <>
      <PageBanner emoji="📄" title="Reportes" subtitle="Todo lo que sabes de tu parcela, en un informe para compartir." />
      <div className="grid gap-5 xl:grid-cols-3">
        <Panel title="Secciones del informe" icon={<FileText className="h-5 w-5" />}>
          <ul className="space-y-2">{sections.map((s) => <li key={s}><label className="panel-inner flex min-h-11 items-center gap-3 px-3 font-semibold"><input type="checkbox" defaultChecked className="h-5 w-5 accent-[var(--moss)]" />{s}</label></li>)}</ul>
          <button className="btn-cozy mt-4 w-full"><Download className="h-4 w-4" />Descargar PDF (demo)</button>
        </Panel>
        <Panel title="Vista previa" icon={<FileText className="h-5 w-5" />} className="xl:col-span-2" action={<Demo />}>
          <article className="mx-auto max-w-2xl rounded-md bg-warm p-8 shadow-[var(--shadow-cozy)] ring-1 ring-border">
            <header className="flex items-center justify-between border-b-2 border-sage pb-4">
              <div><p className="text-xs font-bold uppercase tracking-widest text-moss">PACHA PULSE · Informe de parcela</p><h2 className="text-2xl font-bold text-forest">Chacra Los Alisos</h2><p className="text-sm text-muted-foreground">Concepción, Junín · Campaña 2026–2027</p></div>
              <img src={farmer} alt="" aria-hidden width={816} height={816} loading="lazy" className="h-20 w-20 object-contain" />
            </header>
            <section className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">{[["14.2 °C", "Temp. media"], ["0.62", "NDVI"], ["S/ 6 200", "Margen est."]].map(([v, k]) => <div key={k} className="rounded-lg bg-leaf p-2"><p className="font-serif text-lg font-bold">{v}</p><p className="text-xs">{k}</p></div>)}</section>
            <section className="mt-4 space-y-2"><h3 className="font-bold text-forest">Salud de la parcela</h3><Bar label="Suelo" value={72} /><Bar label="Agua" value={55} tone="water" /><Bar label="Sanidad" value={64} tone="harvest" /></section>
            <section className="mt-4"><h3 className="font-bold text-forest">Recomendaciones</h3><ul className="mt-1 list-disc pl-5 text-sm"><li>Rotar papa con haba la próxima campaña.</li><li>Instalar trampas para polilla en diciembre.</li><li>Tomar muestra de suelo para fósforo y potasio.</li></ul></section>
            <footer className="mt-6 border-t pt-2 text-[11px] text-muted-foreground">Datos ficticios para demostración · NASA Space Apps Challenge 2026</footer>
          </article>
        </Panel>
      </div>
    </>
  );
}
