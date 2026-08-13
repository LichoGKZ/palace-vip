'use client'

import { useEffect, useState } from 'react'

const DISCORD_INVITE = 'https://discord.gg/yGeXXUXu2w'

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

  useEffect(() => {
    sendLog('visita')
  }, [])

  const entrarDiscord = async () => {
    if (loading) return

    setLoading(true)

    await sendLog('discord_click')

    window.location.href = DISCORD_INVITE
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

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5">

        <h1 className="mb-8 text-center text-3xl font-black text-white drop-shadow-lg">
          Entra al servidor
        </h1>

        <button
          type="button"
          onClick={entrarDiscord}
          disabled={loading}
          className="w-full max-w-[325px] rounded-[10px] bg-[#5865F2] px-6 py-4 text-[22px] font-bold text-white shadow-[0_10px_30px_rgba(88,101,242,0.5)] transition-transform hover:scale-[1.03] hover:bg-[#4752C4] active:scale-[0.98] disabled:opacity-70"
        >
          {loading ? 'Ingresando...' : 'Ir al Discord'}
        </button>

      </div>

    </main>
  )
}
