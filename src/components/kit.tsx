import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, CircleAlert, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";
import panorama from "@/assets/panorama.jpg";

export function Panel({ title, icon, action, children, className }: { title?: string; icon?: ReactNode; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("panel p-5", className)} aria-label={title}>
      {title && (
        <header className="mb-4 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-forest">
            {icon && <span className="grid h-9 w-9 place-items-center rounded-full bg-leaf text-moss">{icon}</span>}
            {title}
          </h2>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

export function PageBanner({ title, subtitle, emoji }: { title: string; subtitle: string; emoji?: string }) {
  return (
    <div className="panel relative overflow-hidden">
      <img src={panorama} alt="" aria-hidden width={1920} height={640} className="absolute inset-0 h-full w-full object-cover object-[50%_70%]" />
      <div className="relative px-6 py-8 md:px-10" style={{ background: "var(--gradient-sky)" }}>
        <p className="text-sm font-bold uppercase tracking-widest text-moss">{emoji} PACHA PULSE</p>
        <h1 className="mt-1 max-w-xl text-3xl font-semibold text-forest md:text-4xl">{title}</h1>
        <p className="mt-2 max-w-xl text-base text-foreground/80">{subtitle}</p>
      </div>
    </div>
  );
}

export function Demo({ children = "Datos de ejemplo" }: { children?: ReactNode }) {
  return <span className="tag-demo"><FlaskConical className="h-3 w-3" aria-hidden />{children}</span>;
}

export type Level = "bajo" | "medio" | "alto";
const levelMap = {
  bajo: { cls: "bg-leaf text-forest border-sage", Icon: CheckCircle2, label: "Riesgo bajo" },
  medio: { cls: "bg-harvest/30 text-accent-foreground border-harvest", Icon: CircleAlert, label: "Riesgo medio" },
  alto: { cls: "bg-clay/15 text-clay border-clay", Icon: AlertTriangle, label: "Riesgo alto" },
};
export function Risk({ level, label }: { level: Level; label?: string }) {
  const m = levelMap[level];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-bold", m.cls)}>
      <m.Icon className="h-3.5 w-3.5" aria-hidden />{label ?? m.label}
    </span>
  );
}

export function Bar({ value, label, tone = "moss" }: { value: number; label: string; tone?: "moss" | "harvest" | "clay" | "water" | "earth" }) {
  const bg = { moss: "bg-moss", harvest: "bg-harvest", clay: "bg-clay", water: "bg-water", earth: "bg-earth" }[tone];
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm font-semibold"><span>{label}</span><span>{value}%</span></div>
      <div className="h-3 overflow-hidden rounded-full bg-beige" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div className={cn("h-full rounded-full", bg)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export const crops = [
  { id: "papa", name: "Papa", emoji: "🥔", season: "Oct – Abr", status: "Floración", level: "bajo" as Level },
  { id: "quinua", name: "Quinua", emoji: "🌾", season: "Sep – May", status: "Crecimiento", level: "medio" as Level },
  { id: "maiz", name: "Maíz", emoji: "🌽", season: "Sep – Jun", status: "Siembra", level: "bajo" as Level },
  { id: "cebada", name: "Cebada", emoji: "🌱", season: "Dic – May", status: "Planificado", level: "bajo" as Level },
  { id: "haba", name: "Haba", emoji: "🫛", season: "Oct – Mar", status: "Crecimiento", level: "medio" as Level },
  { id: "arveja", name: "Arveja", emoji: "🟢", season: "Nov – Mar", status: "Germinación", level: "alto" as Level },
];

export function CropBadge({ emoji, size = "md" }: { emoji: string; size?: "md" | "lg" }) {
  return (
    <span aria-hidden className={cn("grid place-items-center rounded-full bg-leaf ring-4 ring-warm", size === "lg" ? "h-16 w-16 text-4xl" : "h-12 w-12 text-2xl")}>{emoji}</span>
  );
}
