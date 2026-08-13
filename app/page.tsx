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

      <div className="absolute inset-0 flex flex-col justify-center gap-3 opacity-40">

        {Array.from({ length: 9 }).map((_, row) => (
          <div
            key={row}
            className="flex w-max gap-2"
          >
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

      <div className="absolute inset-0 bg-[#1e1f22]/65" />

      {/* Contenido */}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-10 sm:py-12">
        <div className="flex w-full max-w-[650px] translate-y-6 flex-col items-center sm:translate-y-0">

        {/* BOTÓN PRINCIPAL */}

        <button
          type="button"
          onClick={entrarDiscord}
          disabled={loading}
          className="w-full max-w-[325px] rounded-[10px] bg-[#5865F2] px-6 py-4 text-[22px] font-bold text-white shadow-[0_10px_30px_rgba(88,101,242,0.5)] transition-all hover:scale-[1.03] hover:bg-[#4752C4] active:scale-[0.98] disabled:opacity-70"
        >
          {loading ? 'Ingresando...' : 'Ir al Discord'}
        </button>

        {/* ADVERTENCIA / COPIAR INVITACIÓN */}

        <button
          type="button"
          onClick={copiarInvitacion}
          className="mt-4 w-full max-w-[325px] rounded-[12px] border border-yellow-400/20 bg-yellow-400/[0.08] px-5 py-4 text-center transition-all hover:border-yellow-400/40 hover:bg-yellow-400/[0.13] active:scale-[0.98]"
        >
          <div className="text-[15px] font-extrabold text-yellow-300">
            ¿No te deja entrar?
          </div>

          <div className="mt-1 text-[13px] font-medium text-white/80">
            ¡Toca este cuadro y segui los pasos!
          </div>

          <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-black/25 px-3 py-1.5 font-mono text-[14px] font-bold text-yellow-200">
            {copied ? (
              <>
                <span>✓</span>
                ¡Copiado!
              </>
            ) : (
              <>
                <span>📋</span>
                {DISCORD_INVITE_TEXT}
              </>
            )}
          </div>
        </button>

        {/* TUTORIAL */}

        <div className="mt-8 w-full">

          <div className="mb-4 text-center">
            <h2 className="text-lg font-extrabold text-white">
              Si el botón no funciona, seguí estos 3 pasos
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-5">
          
            {/* PASO 1 */}
            <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#2b2d31]/80 shadow-lg">
              <div className="flex w-full items-center justify-center bg-black/20 p-1.5 sm:p-2">
                <Image
                  src="/paso1.jpeg"
                  alt="Paso 1 - Añadir un servidor en Discord"
                  width={500}
                  height={900}
                  className="h-auto max-h-[260px] sm:max-h-[520px] w-full object-contain"
                />
              </div>
          
              <div className="px-1 py-2 sm:px-3 sm:py-3 text-center">
                <div className="text-[9px] sm:text-xs font-black text-[#5865F2]">
                  PASO 1
                </div>
                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-sm font-semibold text-white/80">
                  Tocá el +
                </p>
              </div>
            </div>
          
            {/* PASO 2 */}
            <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#2b2d31]/80 shadow-lg">
              <div className="flex w-full items-center justify-center bg-black/20 p-1.5 sm:p-2">
                <Image
                  src="/paso2.jpeg"
                  alt="Paso 2 - Crear o unirse a un servidor"
                  width={500}
                  height={900}
                  className="h-auto max-h-[260px] sm:max-h-[520px] w-full object-contain"
                />
              </div>
          
              <div className="px-1 py-2 sm:px-3 sm:py-3 text-center">
                <div className="text-[9px] sm:text-xs font-black text-[#5865F2]">
                  PASO 2
                </div>
                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-sm font-semibold text-white/80">
                  Tocá Unirte
                </p>
              </div>
            </div>
          
            {/* PASO 3 */}
            <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#2b2d31]/80 shadow-lg">
              <div className="flex w-full items-center justify-center bg-black/20 p-1.5 sm:p-2">
                <Image
                  src="/paso3.jpeg"
                  alt="Paso 3 - Pegar la invitación de Discord"
                  width={500}
                  height={900}
                  className="h-auto max-h-[260px] sm:max-h-[520px] w-full object-contain"
                />
              </div>
          
              <div className="px-1 py-2 sm:px-3 sm:py-3 text-center">
                <div className="text-[9px] sm:text-xs font-black text-[#5865F2]">
                  PASO 3
                </div>
                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-sm font-semibold text-white/80">
                  Pegá la invitación
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
