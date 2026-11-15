import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Home, Map, Satellite, Sprout, CloudLightning, Layers, Droplets, Bug, Coins, FileText, HelpCircle, Settings, UserRound, Menu, X, Lightbulb } from "lucide-react";
import farmer from "@/assets/farmer.png";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Inicio", Icon: Home },
  { to: "/parcela", label: "Mi parcela", Icon: Map },
  { to: "/datos-nasa", label: "Datos NASA", Icon: Satellite },
  { to: "/simulador", label: "Simulador agrícola", Icon: Sprout },
  { to: "/eventos", label: "Eventos climáticos", Icon: CloudLightning },
  { to: "/suelo", label: "Análisis del suelo", Icon: Layers },
  { to: "/riego", label: "Riego inteligente", Icon: Droplets },
  { to: "/ecoguard", label: "EcoGuard", Icon: Bug },
  { to: "/economico", label: "Simulador económico", Icon: Coins },
  { to: "/reportes", label: "Reportes", Icon: FileText },
] as const;

const tips = [
  "Rota la papa con haba o arveja: las leguminosas devuelven nitrógeno al suelo.",
  "Cubre el suelo con rastrojo para conservar la humedad en época seca.",
  "Revisa el envés de las hojas de papa cada semana para detectar rancha a tiempo.",
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 48 48" className="h-11 w-11" aria-hidden>
        <circle cx="24" cy="24" r="23" fill="var(--cream)" />
        <circle cx="33" cy="15" r="5" fill="var(--harvest)" />
        <path d="M4 34 L17 17 L25 27 L31 20 L44 34 Z" fill="var(--moss)" />
        <path d="M8 38 Q24 30 40 38 L40 42 Q24 46 8 42 Z" fill="var(--sage)" />
        <path d="M10 40 Q24 34 38 40" stroke="var(--earth)" strokeWidth="1.5" fill="none" />
      </svg>
      <div>
        <p className="font-serif text-xl font-bold leading-none tracking-wide text-warm">PACHA PULSE</p>
        <p className="mt-1 text-[11px] text-sage">Conectando la tierra con el futuro</p>
      </div>
    </div>
  );
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [tip] = useState(() => tips[new Date().getDate() % tips.length]!);
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto bg-forest p-4 text-warm">
      <Logo />
      <p className="rounded-xl bg-moss/40 px-3 py-2 text-sm">🌄 Bienvenido a tu parcela</p>
      <nav aria-label="Navegación principal">
        <ul className="space-y-1">
          {nav.map(({ to, label, Icon }) => {
            const active = path === to;
            return (
              <li key={to}>
                <Link to={to} onClick={onNavigate} aria-current={active ? "page" : undefined}
                  className={cn("flex min-h-11 items-center gap-3 rounded-xl px-3 text-[15px] font-semibold transition-colors",
                    active ? "bg-cream text-forest shadow-[0_3px_0_var(--sage)]" : "text-leaf hover:bg-moss/50")}>
                  <span className={cn("grid h-8 w-8 place-items-center rounded-lg", active ? "bg-leaf" : "bg-moss/40")}><Icon className="h-4 w-4" aria-hidden /></span>
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto space-y-1 border-t border-moss pt-3">
        {[["Ayuda", HelpCircle], ["Configuración", Settings], ["Perfil del agricultor", UserRound]].map(([l, I]: any) => (
          <button key={l} type="button" className="flex min-h-10 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-leaf hover:bg-moss/50"><I className="h-4 w-4" aria-hidden />{l}</button>
        ))}
      </div>
      <div className="relative rounded-2xl bg-cream p-3 pt-2 text-forest">
        <img src={farmer} alt="Ilustración de una agricultora andina" width={816} height={816} loading="lazy" className="float-soft mx-auto -mt-2 h-28 w-28 object-contain" />
        <p className="flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-earth"><Lightbulb className="h-3.5 w-3.5" aria-hidden />Consejo del día</p>
        <p className="mt-1 text-sm leading-snug">{tip}</p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setOpen(false), [path]);
  return (
    <div className="min-h-screen w-full lg:pl-72">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 lg:block"><Sidebar /></aside>
      <div className="sticky top-0 z-30 flex items-center justify-between bg-forest px-4 py-2 lg:hidden">
        <Logo />
        <button type="button" onClick={() => setOpen(true)} aria-label="Abrir menú" className="grid h-11 w-11 place-items-center rounded-xl bg-moss text-warm"><Menu /></button>
      </div>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-forest/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw]">
            <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar menú" className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-xl bg-moss text-warm"><X /></button>
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
      <main className="mx-auto max-w-[1400px] space-y-5 p-4 md:p-6">{children}</main>
    </div>
  );
}
