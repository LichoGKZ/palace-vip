import CtaLink from "./components/CtaLink";
import StickyCta from "./components/StickyCta";

const HERO_CTA_ID = "acceso";
const FINAL_CTA_ID = "comenzar";

const features = [
  {
    number: "01",
    title: "Acceso simple",
    text: "Un recorrido claro desde cualquier dispositivo.",
  },
  {
    number: "02",
    title: "Experiencia rápida",
    text: "Interfaz ligera y optimizada para pantallas pequeñas.",
  },
  {
    number: "03",
    title: "Comunidad privada",
    text: "Un espacio organizado para participar y compartir.",
  },
] as const;

export default function TechnicalReviewLanding() {
  return (
    <main className="bg-neutral-950 pb-[calc(5rem+env(safe-area-inset-bottom))] text-white md:pb-0">
      <div className="page-x mx-auto flex w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between pt-[max(1.5rem,env(safe-area-inset-top))]">
          <a
            href="#inicio"
            aria-label="Palace, inicio"
            className="flex min-h-11 items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-sm font-bold"
            >
              P
            </span>
            <span className="text-sm font-semibold tracking-wide">Palace</span>
          </a>
          <CtaLink href={`#${HERO_CTA_ID}`} variant="outline">
            Acceder
          </CtaLink>
        </header>

        <section
          id="inicio"
          aria-labelledby="hero-title"
          className="grid items-center gap-10 py-10 sm:py-16 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-2 lg:gap-16"
        >
          <div>
            <p className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/60">
              Comunidad privada
            </p>
            <h1
              id="hero-title"
              className="text-balance text-[clamp(2.25rem,9.5vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight"
            >
              Todo en un solo lugar.
            </h1>
            <p className="mt-5 max-w-md text-pretty text-base leading-7 text-white/70 sm:text-lg">
              Una experiencia simple, rápida y optimizada para cualquier
              dispositivo.
            </p>
            <div
              id={HERO_CTA_ID}
              className="mt-8 flex scroll-mt-4 flex-col gap-2 sm:flex-row sm:gap-3"
            >
              <CtaLink href={`#${FINAL_CTA_ID}`}>Comenzar</CtaLink>
              <CtaLink href="#info" variant="secondary">
                Ver información
              </CtaLink>
            </div>
          </div>

          <div className="hero-in mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative min-h-44 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5 sm:min-h-56 sm:p-6 lg:aspect-[4/5] lg:min-h-0">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_60%)]"
              />
              <div className="relative flex h-full min-h-32 flex-col justify-end">
                <p className="text-lg font-bold">Experiencia optimizada.</p>
                <p className="mt-1 text-sm leading-6 text-white/70">
                  Diseño responsive, navegación clara y rendimiento cuidado.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="info"
          aria-labelledby="info-title"
          className="scroll-mt-4 pb-12"
        >
          <h2 id="info-title" className="sr-only">
            Características
          </h2>
          <ul role="list" className="grid gap-3 sm:grid-cols-3">
            {features.map(({ number, title, text }) => (
              <li
                key={number}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <span
                  aria-hidden="true"
                  className="text-xs font-bold tracking-[0.15em] text-white/50"
                >
                  {number}
                </span>
                <h3 className="mt-4 text-base font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">{text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          id={FINAL_CTA_ID}
          aria-labelledby="final-title"
          className="mb-6 scroll-mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center sm:p-10"
        >
          <h2
            id="final-title"
            className="text-balance text-2xl font-bold sm:text-3xl"
          >
            ¿Listo para continuar?
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/70">
            Seguí el próximo paso para continuar.
          </p>
          <CtaLink
            href={`#${HERO_CTA_ID}`}
            className="mt-6 w-full sm:w-auto"
          >
            Continuar
          </CtaLink>
        </section>

        <footer className="pb-5 pt-2 text-center text-xs text-white/60 md:pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          © {new Date().getFullYear()} Palace. Todos los derechos reservados.
        </footer>
      </div>

      <StickyCta
        href={`#${FINAL_CTA_ID}`}
        label="Comenzar"
        hideWhileVisible={[HERO_CTA_ID, FINAL_CTA_ID]}
      />
    </main>
  );
}
