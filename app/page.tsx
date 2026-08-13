'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const DISCORD_INVITE = 'https://discord.gg/yGeXXUXu2w'
const DISCORD_INVITE_TEXT = 'discord.gg/yGeXXUXu2w'

const canales = [
  'sol-perez',
  'arigameplays',
  'bri-marcos',
  'niki_nicole',
  'maria-becerra',
  'alaska',
  'taurozzi',
  'wanda_nara',
  'candela-diaz',
  'la-joaqui',
  'seleneitor',
  'agus-rozas',
  'zaira-nara',
  'sasha-ferro',
  'fati-vazquez',
  'mika-rios',
  'belen-negri',
  'tuli_acosta',
  'cande-negri',
  'lali',
  'morena-beltran',
  'milica',
  'daiana-hernandez',
  'cande-tinelli',
  'agus-tana',
  'ester-exposito',
  'mika-lafuente',
  'jimena-baron',
  'saramalacara',
  'agus-loureiro',
  'kiara-tuliano',
]

async function sendLog(type: 'visita' | 'discord_click') {
  try {
    await fetch('/api/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      keepalive: true,
      body: JSON.stringify({
        type,
        url: window.location.href,
        referrer: document.referrer || 'Directo',
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen: `${window.screen.width}x${window.screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        devicePixelRatio: window.devicePixelRatio,
        cores: navigator.hardwareConcurrency || null,
        touchPoints: navigator.maxTouchPoints || 0,
        online: navigator.onLine,
        timestamp: new Date().toISOString(),
      }),
    })
  } catch {
    // No bloqueamos la página si falla el log
  }
}

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    sendLog('visita')
  }, [])

  const entrarDiscord = async () => {
    if (loading) return

    setLoading(true)

    await sendLog('discord_click')

    window.location.href = DISCORD_INVITE
  }

  const copiarInvitacion = async () => {
    try {
      await navigator.clipboard.writeText(DISCORD_INVITE)

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2500)
    } catch {
      // Fallback para navegadores que no permiten clipboard
      const textarea = document.createElement('textarea')
      textarea.value = DISCORD_INVITE
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'

      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()

      try {
        document.execCommand('copy')
        setCopied(true)

        setTimeout(() => {
          setCopied(false)
        }, 2500)
      } finally {
        document.body.removeChild(textarea)
      }
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#1e1f22] text-white">

      {/* Fondo */}

      <div className="absolute inset-0 flex flex-col justify-center gap-3 opacity-30">
        {Array.from({ length: 9 }).map((_, row) => (
          <div key={row} className="flex w-max gap-2">
            {[...canales, ...canales].map((canal, index) => (
              <div
                key={`${row}-${index}`}
                className="shrink-0 rounded-lg border border-white/10 bg-[#2b2d31] px-4 py-2 text-sm font-bold text-[#b5bac1]"
              >
                🔥 #{canal}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Oscurecer fondo */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#1e1f22]/80 via-[#1e1f22]/90 to-[#1e1f22]" />

      {/* Contenido */}

      <div className="relative z-10 flex min-h-screen flex-col items-center px-4 py-8 sm:justify-center sm:py-12">
        <div className="flex w-full max-w-[440px] flex-col items-center">

          {/* ENCABEZADO */}

          <div className="mb-6 flex flex-col items-center text-center sm:mb-8">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5865F2]/15 ring-1 ring-[#5865F2]/30 sm:h-16 sm:w-16">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-[#5865F2] sm:h-8 sm:w-8">
                <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.078.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.01c.12.099.246.197.373.291a.077.077 0 0 1-.006.128c-.598.35-1.22.645-1.873.892a.076.076 0 0 0-.04.106c.36.698.772 1.362 1.225 1.994a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.662a.06.06 0 0 0-.031-.028ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
              </svg>
            </div>
            <h1 className="text-[22px] font-extrabold leading-tight sm:text-2xl">
              Unite a nuestro Discord
            </h1>
            <p className="mt-1 text-[14px] text-white/60 sm:text-[15px]">
              Comunidad de Albion Online
            </p>
          </div>

          {/* BOTÓN PRINCIPAL */}

          <button
            type="button"
            onClick={entrarDiscord}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#5865F2] px-6 py-4 text-[18px] font-bold text-white shadow-[0_10px_30px_rgba(88,101,242,0.4)] transition-all hover:scale-[1.02] hover:bg-[#4752C4] active:scale-[0.98] disabled:opacity-70 sm:text-[20px]"
          >
            {loading ? (
              'Ingresando...'
            ) : (
              <>
                Ir al Discord
                <span aria-hidden="true">→</span>
              </>
            )}
          </button>

          {/* ADVERTENCIA / COPIAR INVITACIÓN */}

          <button
            type="button"
            onClick={copiarInvitacion}
            className="mt-3 w-full rounded-[12px] border border-yellow-400/25 bg-yellow-400/[0.07] px-5 py-3.5 text-center transition-all hover:border-yellow-400/40 hover:bg-yellow-400/[0.12] active:scale-[0.98]"
          >
            <div className="text-[14px] font-extrabold text-yellow-300">
              ¿No te deja entrar?
            </div>
            <div className="mt-0.5 text-[12.5px] font-medium text-white/70">
              Tocá acá y copiá el enlace manualmente
            </div>
            <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-black/25 px-3 py-1.5 font-mono text-[13px] font-bold text-yellow-200">
              {copied ? (
                <>
                  <span aria-hidden="true">✓</span>
                  ¡Copiado!
                </>
              ) : (
                <>
                  <span aria-hidden="true">📋</span>
                  {DISCORD_INVITE_TEXT}
                </>
              )}
            </div>
          </button>

          {/* SEPARADOR */}

          <div className="mt-8 flex w-full items-center gap-3 sm:mt-10">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] font-semibold uppercase tracking-wide text-white/40">
              Si el botón no funciona
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* TUTORIAL */}

          <div className="mt-5 flex w-full flex-col gap-3">
            {[
              { src: '/paso1.jpeg', alt: 'Paso 1 - Añadir un servidor en Discord', num: 1, titulo: 'Tocá el botón +', desc: 'En la barra lateral izquierda de Discord' },
              { src: '/paso2.jpeg', alt: 'Paso 2 - Unirse a un servidor', num: 2, titulo: 'Elegí "Unirse a un servidor"', desc: 'Se va a abrir un cuadro para pegar el enlace' },
              { src: '/paso3.jpeg', alt: 'Paso 3 - Pegar la invitación de Discord', num: 3, titulo: 'Pegá la invitación', desc: 'Y tocá "Unirse" para entrar' },
            ].map((paso) => (
              <div
                key={paso.num}
                className="flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-[#2b2d31]/70 p-2.5 sm:gap-4 sm:p-3"
              >
                <div className="relative shrink-0 overflow-hidden rounded-lg bg-black/20">
                  <Image
                    src={paso.src}
                    alt={paso.alt}
                    width={200}
                    height={360}
                    className="h-[86px] w-[64px] object-cover object-top sm:h-[100px] sm:w-[74px]"
                  />
                  <div className="absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#5865F2] text-[11px] font-black text-white">
                    {paso.num}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-bold leading-snug text-white sm:text-[14.5px]">
                    {paso.titulo}
                  </p>
                  <p className="mt-0.5 text-[12px] leading-snug text-white/55 sm:text-[12.5px]">
                    {paso.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
