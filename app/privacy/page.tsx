export default function TechnicalReviewLanding() {
  const features = [
    ["01", "Acceso simple", "Un recorrido claro desde cualquier dispositivo."],
    ["02", "Experiencia rápida", "Interfaz ligera y optimizada para pantallas pequeñas."],
    ["03", "Comunidad privada", "Un espacio organizado para participar y compartir."],
  ];

  return (
    <main className="min-h-[100dvh] overflow-x-hidden bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between">
          <a href="#inicio" className="flex min-h-11 items-center gap-3" aria-label="Inicio">
            <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-sm font-bold">P</span>
            <span className="text-sm font-semibold tracking-wide">Palace</span>
          </a>
          <a href="#acceso" className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 text-sm font-semibold hover:bg-white/10">Acceder</a>
        </header>

        <section id="inicio" aria-labelledby="hero-title" className="grid flex-1 items-center gap-10 py-12 sm:py-16 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">Comunidad privada</p>
            <h1 id="hero-title" className="text-balance text-[clamp(2.25rem,9.5vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight">Todo en un solo lugar.</h1>
            <p className="mt-5 max-w-md text-pretty text-base leading-7 text-white/70 sm:text-lg">Una experiencia simple, rápida y optimizada para cualquier dispositivo.</p>
            <div id="acceso" className="mt-8 flex flex-col gap-2 sm:flex-row sm:gap-3">
              <a href="#comenzar" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-7 text-base font-bold text-neutral-950 transition-transform hover:bg-white/90 active:scale-[0.99]">Comenzar</a>
              <a href="#info" className="inline-flex min-h-12 items-center justify-center rounded-xl px-5 text-base font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline">Ver información</a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5 sm:p-6">
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_60%)]" />
              <div className="relative flex h-full flex-col justify-end">
                <p className="text-lg font-bold">Experiencia optimizada.</p>
                <p className="mt-1 text-sm leading-6 text-white/70">Diseño responsive, navegación clara y rendimiento cuidado.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="info" aria-labelledby="info-title" className="scroll-mt-4 pb-12">
          <h2 id="info-title" className="sr-only">Características</h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            {features.map(([number, title, text]) => (
              <li key={number} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <span className="text-xs font-bold tracking-[0.15em] text-white/30">{number}</span>
                <h3 className="mt-4 text-base font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">{text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="comenzar" aria-labelledby="final-title" className="mb-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center sm:p-10">
          <h2 id="final-title" className="text-balance text-2xl font-bold sm:text-3xl">¿Listo para continuar?</h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/70">Seguí el próximo paso para continuar.</p>
          <a href="#acceso" className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-7 text-base font-bold text-neutral-950 hover:bg-white/90 sm:w-auto">Continuar</a>
        </section>

        <footer className="pb-5 pt-2 text-center text-xs text-white/50">© {new Date().getFullYear()} Palace. Todos los derechos reservados.</footer>
      </div>
    </main>
  );
}
