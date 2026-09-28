import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Palace",
};

export default function TermsPage() {
  return (
    <main className="page-x min-h-svh pt-[max(2.5rem,env(safe-area-inset-top))] pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:pt-20 sm:pb-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-6 inline-flex min-h-11 items-center text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline"
        >
          Volver al inicio
        </Link>

        <h1 className="mb-8 text-balance text-3xl font-black sm:mb-10 sm:text-5xl">
          Términos y Condiciones
        </h1>

        <div className="space-y-6 leading-relaxed text-zinc-300">
          <p>El acceso al servicio es personal e intransferible.</p>

          <p>
            El usuario acepta utilizar la plataforma bajo su propia
            responsabilidad.
          </p>

          <p>
            Nos reservamos el derecho de modificar contenido, accesos o
            funcionalidades en cualquier momento.
          </p>

          <p>No garantizamos disponibilidad permanente del servicio.</p>

          <p>Al utilizar este sitio aceptás estos términos y condiciones.</p>

          <p>Última actualización: Mayo 2026</p>
        </div>
      </div>
    </main>
  );
}
