'use client'

import { useEffect, useState } from 'react'

const DISCORD_INVITE = 'https://discord.gg/yGeXXUXu2w'

type LogType = 'visita' | 'discord_click'

async function sendLog(type: LogType) {
  try {
    const data = {
      type,
      url: window.location.href,
      referrer: document.referrer || 'Directo',
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages,
      platform: navigator.platform,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      devicePixelRatio: window.devicePixelRatio,
      cores: navigator.hardwareConcurrency || null,
      memory:
        'deviceMemory' in navigator
          ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory
          : null,
      touchPoints: navigator.maxTouchPoints || 0,
      online: navigator.onLine,
      timestamp: new Date().toISOString(),
    }

    await fetch('/api/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      keepalive: true,
    })
  } catch (error) {
    console.error('Error enviando log:', error)
  }
}

const canales = [
  'emilia-mernes',
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
  'albere',
  'angie-corine',
  'tamara-bella',
  'agus_anon',
  'martu_boden',
  'angie-watters',
  'nati-jota',
  'coty-romero',
  'china-suarez',
  'pri-mora',
  'mika-suarez',
  'sofi_maure',
]

export default function PalaceVIPLanding() {
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Marca la visita apenas entra alguien
    sendLog('visita')

    // Animación de entrada
    const timer = setTimeout(() => {
      setVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const handleDiscord = async () => {
    if (loading) return

    setLoading(true)

    // Marca exactamente el click en "Ir al Discord"
    await sendLog('discord_click')

    // Pequeña espera para darle tiempo al request keepalive
    setTimeout(() => {
      window.location.href = DISCORD_INVITE
    }, 250)
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#1e1f22] font-sans text-white">

      {/* =========================================================
          FONDO DE CANALES
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 z-0 flex flex-col justify-center gap-[14px] overflow-hidden opacity-[0.44] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
        {Array.from({ length: 9 }).map((_, row) => (
          <div
            key={row}
            className={`flex w-max gap-[10px] ${
              row % 2 === 0
                ? 'animate-[scrollLeft_52s_linear_infinite]'
                : 'animate-[scrollRight_52s_linear_infinite]'
            }`}
          >
            {[...canales, ...canales].map((canal, index) => (
              <span
                key={`${row}-${index}`}
                className="flex shrink-0 items-center gap-[6px] whitespace-nowrap rounded-[8px] border border-[#43464d] bg-[#2b2d31] px-[14px] py-[8px] text-[13px] font-bold text-[#b4b6bd]"
              >
                🔥 #{canal}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* =========================================================
          OVERLAY
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(30,31,34,0.41)_0%,rgba(30,31,34,0.69)_70%)]" />

      {/* =========================================================
          CONTENIDO PRINCIPAL
      ========================================================= */}

      <div
        className={`
          relative z-[2]
          flex min-h-screen w-full
          flex-col items-center justify-center
          px-5 text-center
          transition-all duration-700 ease-out
          ${
            visible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[15px] opacity-0'
          }
        `}
      >

        {/* TEXTO */}

        <h1 className="mb-7 text-[28px] font-black leading-[1.25] tracking-[1px] text-white drop-shadow-[0_0_15px_rgba(88,101,242,0.6)] sm:text-[32px]">
          Entra al servidor
        </h1>

        {/* BOTÓN */}

        <button
          type="button"
          onClick={handleDiscord}
          disabled={loading}
          className="
            group
            w-full max-w-[325px]
            rounded-[10px]
            border-0
            bg-[#5865F2]
            px-0 py-4
            text-[22px]
            font-bold
            text-white
            shadow-[0_10px_30px_rgba(88,101,242,0.5)]
            transition-all duration-200
            hover:scale-[1.03]
            hover:bg-[#4752C4]
            hover:shadow-[0_15px_40px_rgba(88,101,242,0.7)]
            active:scale-[0.98]
            disabled:cursor-default
            disabled:opacity-70
            disabled:hover:scale-100
          "
        >
          {loading ? 'Ingresando...' : 'Ir al Discord'}
        </button>
      </div>

      {/* =========================================================
          ANIMACIONES
      ========================================================= */}

      <style jsx global>{`
        @keyframes scrollLeft {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollRight {
          from {
            transform: translateX(-50%);
          }

          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </main>
  )
}
