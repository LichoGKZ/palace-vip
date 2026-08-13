'use client'

import { useState, useEffect } from 'react'
import TextImage from './components/TextImage'
import BigTextImage from './components/BigTextImage'
import Image from 'next/image'
import lockIcon from '@/public/lock.png'

const VIPText = () => (
  <TextImage
    text="VIP"
    fontSize={48}
    color="#ffffff"
    className="md:text-[72px]"
  />
)

const PremiumText = () => (
  <TextImage text="premium" fontSize={20} color="#d4d4d8" />
)

const ContenidoText = () => (
  <TextImage text="contenido" fontSize={20} color="#d4d4d8" />
)

declare global {
  interface Window {
    fbq: any
  }
}

export default function PalaceVIPLanding() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [approved, setApproved] = useState(false)
  const [titular, setTitular] = useState('')
  const [previewOpen, setPreviewOpen] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState('')
  const [previewLocked, setPreviewLocked] = useState(false)
  const [previewTimer, setPreviewTimer] =
    useState<NodeJS.Timeout | null>(null)

  // PAYMENT STATES
  const [transferReady, setTransferReady] = useState(false)
  const [aliasCopied, setAliasCopied] = useState(false)

  const sendLog = async (type: string, extra: any = {}) => {
    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          url: window.location.href,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          language: navigator.language,
          platform: navigator.platform,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          screen: `${window.innerWidth}x${window.innerHeight}`,
          ...extra,
        }),
      })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    sendLog('visita')

    const handleError = (event: ErrorEvent) => {
      sendLog('error', {
        message: event.message,
        source: event.filename,
      })
    }

    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])

  // Espera 7 segundos cada vez que se abre la ventana de pago
  useEffect(() => {
    if (!open || approved) {
      setTransferReady(false)
      return
    }

    setTransferReady(false)

    const timer = setTimeout(() => {
      setTransferReady(true)
    }, 10000)

    return () => {
      clearTimeout(timer)
    }
  }, [open, approved])

  const copyAlias = async () => {
    try {
      await navigator.clipboard.writeText('licho380.macro')

      setAliasCopied(true)

      setTimeout(() => {
        setAliasCopied(false)
      }, 2000)
    } catch (err) {
      console.error('No se pudo copiar el alias', err)
    }
  }

  const handleAccess = async () => {
    // VALIDACIÓN DEL EMAIL
    const cleanTitular = titular.trim()
    
    if (!cleanTitular || cleanTitular.split(/\s+/).length < 2) {
      return
    }

    console.log('[META] window.fbq', window.fbq)

    if (window.fbq) {
      window.fbq('track', 'AddPaymentInfo', {
        value: 4800,
        currency: 'ARS',
        content_name: 'PALACE ' + String.fromCharCode(86, 73, 80),
        content_type: 'product',
        content_ids: ['palace-vip'],
        num_items: 1,
      })
    }

    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 5000))

    const eventId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString()

    if (typeof window !== 'undefined' && window.fbq) {
      try {
        console.log('[META] fbq existe?', !!window.fbq)
        console.log('[META] enviando Purchase...')

        window.fbq(
          'track',
          'Purchase',
          {
            value: 4800,
            currency: 'ARS',
            content_name: 'PALACE ' + String.fromCharCode(86, 73, 80),
            content_type: 'product',
            content_ids: ['palace-vip'],
            contents: [
              {
                id: 'palace-vip',
                quantity: 1,
              },
            ],
            num_items: 1,
          },
          {
            eventID: eventId,
          }
        )

        console.log('[META] Purchase enviado', eventId)
      } catch (err) {
        console.error('[META] Error enviando Purchase', err)
      }
    }

    sendLog('pago', {
      titular: cleanTitular,
    })
    
    sendLog('purchase', {
      titular: cleanTitular,
      eventId,
    })

    if (window.fbq) {
      window.fbq('track', 'CompleteRegistration')
    }

    setLoading(false)
    setApproved(true)
  }

  const fakeActivity = [
    'mati.vip desbloqueó acceso hace 2 min',
    'nuevo contenido agregado hace 6 min',
    '27 personas entraron hoy',
    '237 miembros online ahora',
  ]

  const previewImages = [
    '/preview/1.jpeg',
    '/preview/2.jpeg',
    '/preview/3.jpeg',
    '/preview/4.jpeg',
    '/preview/5.jpeg',
    '/preview/6.jpeg',
    '/preview/7.jpeg',
    '/preview/8.jpeg',
    '/preview/9.jpeg',
    '/preview/10.jpeg',
    '/preview/11.jpg',
    '/preview/12.jpg',
    '/preview/13.jpg',
    '/preview/14.jpg',
    '/preview/15.jpg',
  ]

  const testimonials = [
    {
      user: 'elmoroso',
      text: 'q locura la mikarios',
      color: 'from-fuchsia-500 to-pink-500',
    },
    {
      user: 'matut23',
      text: 'actualizan más rápido que telegram',
      color: 'from-violet-500 to-fuchsia-500',
    },
    {
      user: 'francovich',
      text: 'che realmente mucho material',
      color: 'from-pink-500 to-violet-500',
    },
    {
      user: 'natliw',
      text: 'mucho que ver..',
      color: 'from-fuchsia-400 to-violet-600',
    },
  ]

  const previewChannels = [
    '# albere',
    '# alaska',
    '# mika-rios',
    '# milica',
    '# martu-boden',
    '# tuli-acosta',
    '# kiara-tuliano',
    '# agus_anon',
    '# billie_eilish',
    '# lali',
    '# martu_boden',
    '# milica',
    '# niki_nicole',
    '# sofi_maure',
    '# sofi_oc',
    '# tuli_acosta',
    '# wanda_nara',
    '# sol-perez',
    '# agus-rozas',
    '# agus-tana',
    '# aldana-belen',
    '# angie-corine',
    '# angie-watters',
    '# arigameplays',
    '# barby-silenzi',
    '# cazzu',
    '# ccamve',
    '# clara-kush',
    '# coty-romero',
    '# daiana-hernandez',
    '# dulcinea',
    '# eloisa-hermana-de-oki',
    '# ester-exposito',
    '# floppy-tesouro',
    '# juli-castro',
    '# kiara-tuliano',
    '# la-joaqui',
    '# lua-sansat',
    '# mika-lafuente',
    '# mika-rios',
    '# pao-maldonado',
    '# pri-mora',
    '# rorodrigu',
    '# saramalacara',
    '# sasha-ferro',
    '# seleneltor',
    '# zaira-nara',
    '# cande-negri',
    '# china-suarez',
    '# jimena-baron',
    '# lia-sikora',
    '# taurozzi',
    '# bardxra69',
    '# agus-loureiro',
    '# candela-diaz',
    '# belen-negri',
    '# biei-postiglone',
    '# emilia-mernes',
    '# cande-tinelli',
    '# bri-marcos',
    '# mica-de-boe',
    '# fati-vazquez',
    '# luna-dss',
    '# magali-narvjas',
    '# maria-becerra',
    '# mica-suarez',
    '# moondays',
    '# morena-beltran',
    '# luna-castro',
    '# marti-gimenez',
    '# rocio-peralta',
    '# more-garcia',
    '# cami-lopez',
    '# cata-diaz',
    '# naiara-acosta',
    '# juana-gaitan',
    '# juli-fernandez',
    '# candela-sosa',
    '# lupe-herrera',
    '# vicky-torres',
    '# tati-morales',
    '# prisa-gomez',
    '# emi-navarro',
    '# rochi-medina',
    '# malena-ortiz',
    '# delfi-rodriguez',
    '# clara-silva',
    '# micaela-ramos',
    '# sabri-ibarra',
    '# nati-paz',
    '# magui-romero',
    '# dani-ledesma',
    '# cele-figueroa',
    '# agos-nunez',
    '# ailu-correa',
    '# barbi-quiroga',
    '# zoe-farina',
    '# guada-luna',
    '# belu-prieto',
    '# jaz-santana',
    '# camila-alvarez',
    '# mel-rojas',
    '# anto-cabrera',
    '# luli-bustos',
  ]

  const isTitularValid =
    titular.trim().split(/\s+/).length >= 2

  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        {/* BACKGROUND */}
        <div className="fixed inset-0 bg-black" />

        <div className="fixed inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-fuchsia-600/25 blur-[180px] rounded-full" />
          <div className="absolute bottom-[-30%] right-[-10%] w-[800px] h-[800px] bg-violet-700/20 blur-[200px] rounded-full" />
        </div>

        {/* TOP BAR */}
        <header className="relative z-20 border-b border-white/10 backdrop-blur-2xl bg-black/30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 blur-xl bg-fuchsia-500/50 rounded-2xl" />
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

              <div className="text-sm text-zinc-400">
                237 miembros online ahora
              </div>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-3xl leading-tight md:text-6xl font-black tracking-tight">
                El servidor de
                <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
                  {' '}
                  Discord{' '}
                </span>
                con mas{' '}
                <TextImage
                  text="contenido"
                  fontSize={32}
                  color="#ffffff"
                  className="h-[30px] md:h-[60px] w-auto"
                />{' '}
                de Argentina.
              </h1>

              <p className="mt-8 text-zinc-300 text-xl leading-relaxed max-w-xl">
                Accedé a{' '}
                <TextImage
                  text="filtraciones"
                  fontSize={20}
                  color="#d4d4d8"
                />{' '}
                exclusivas,{' '}
                <TextImage
                  text="contenido"
                  fontSize={20}
                  color="#d4d4d8"
                />{' '}
                <TextImage
                  text="premium"
                  fontSize={20}
                  color="#d4d4d8"
                />
                , actualizaciones diarias y una comunidad activa 24/7.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    sendLog('preview')

                    setPreviewOpen(true)

                    if (window.fbq) {
                      window.fbq('track', 'ViewContent', {
                        content_name:
                          'PALACE ' + String.fromCharCode(86, 73, 80),
                        content_type: 'product',
                        content_ids: ['palace-vip'],
                      })
                    }

                    setPreviewLocked(false)

                    sendLog('preview_open')

                    const timer = setTimeout(() => {
                      setPreviewLocked(true)
                    }, 4000)

                    setPreviewTimer(timer)
                  }}
                  className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-fuchsia-500 to-violet-600 px-8 py-4 text-base md:px-10 md:py-6 md:text-xl font-black shadow-[0_0_60px_rgba(217,70,239,0.35)] hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Ver contenido
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </span>
                </button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -bottom-8 -left-8">
                <div className="rounded-[2rem] border border-white/10 bg-black/60 backdrop-blur-2xl px-6 py-5 shadow-2xl">
                  <div className="text-sm text-zinc-500">
                    Último acceso desbloqueado
                  </div>

                  <div className="mt-2 font-bold text-lg">
                    hace 48 segundos
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="relative z-10 border-t border-white/10 bg-white/[0.025]">
          <div className="max-w-7xl mx-auto px-6 py-28">
            <div className="max-w-3xl">
              <div className="text-fuchsia-300 font-semibold mb-4">
                ¿Por qué PALACE?
              </div>

              <h2 className="text-4xl md:text-6xl font-black leading-[1]">
                No es cualquier discord.
                <br />
                Tiene todo el contenido de ARG.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {[
                {
                  icon: '⚡',
                  title: 'Actualizaciones constantes',
                  text: 'Contenido nuevo agregado todos los días. Nada abandonado o reciclado.',
                },
                {
                  icon: '🚀',
                  title: 'Acceso inmediato',
                  text: 'Comprás una vez y entrás automáticamente al servidor VIP.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-2xl p-8"
                >
                  <div className="text-6xl mb-6">{item.icon}</div>

                  <h3 className="text-3xl font-black leading-tight">
                    {item.title}
                  </h3>

                  <p className="mt-5 text-zinc-400 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative z-10 border-t border-white/10 py-12 text-center">
          <div className="text-zinc-500 text-sm">
            PALACE VIP
          </div>

          <div className="mt-4 flex justify-center gap-6 text-sm">
            <a
              href="/privacy"
              className="text-zinc-500 hover:text-white transition"
            >
              Privacy Policy
            </a>

            <a
              href="/terms"
              className="text-zinc-500 hover:text-white transition"
            >
              Terms & Conditions
            </a>
          </div>
        </footer>

        {/* TICKER ANIMATION */}
        <style>{`
          @keyframes ticker {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>

        {/* PREVIEW MODAL */}
        {previewOpen && (
          <div className="fixed inset-0 z-[998] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
            <div className="relative w-full max-w-6xl h-[85vh] rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-[0_0_120px_rgba(217,70,239,0.25)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.18),transparent_45%)]" />

              <button
                onClick={() => {
                  setPreviewOpen(false)
                  setPreviewLocked(false)

                  if (previewTimer) {
                    clearTimeout(previewTimer)
                    setPreviewTimer(null)
                  }
                }}
                className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 transition-all"
              >
                ✕
              </button>

              <div className="relative z-10 flex flex-col md:flex-row h-full">

                {/* CONTENT */}
                <div className="flex-1 relative overflow-hidden min-h-[60vh] md:min-h-0">
                  {previewLocked ? (
                    <div className="h-full flex flex-col items-center justify-center text-center px-10">
                      <h2 className="mt-6 md:mt-10 text-2xl md:text-5xl font-black leading-[1.05] px-2">
                        ¿Viste eso?
                        <br />
                        Imaginate lo que hay en el servidor...
                      </h2>

                      <p className="mt-4 md:mt-6 text-sm md:text-xl text-zinc-300 max-w-2xl leading-relaxed px-2">
                        Mas de 200 artistas argentinas, mas de 17mil archivos.
                        Todo en un solo lugar.
                      </p>

                      <div className="mt-8 flex flex-col items-center gap-3 text-sm text-zinc-400">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          18mil Usuarios en discord
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setPreviewOpen(false)

                          if (window.fbq) {
                            window.fbq('track', 'InitiateCheckout', {
                              value: 4800,
                              currency: 'ARS',
                            })
                          }

                          setOpen(true)
                        }}
                        className="mt-8 md:mt-10 w-full md:w-auto group relative overflow-hidden rounded-[2.2rem] bg-gradient-to-r from-fuchsia-500 to-violet-600 px-14 py-6 text-2xl font-black shadow-[0_0_90px_rgba(217,70,239,0.4)] hover:scale-[1.03] transition-all duration-300"
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <span className="relative z-10 flex items-center justify-center">
                          Entrar
                          <span className="ml-3 group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col">
                      <div className="border-b border-white/10 px-8 py-5 bg-black/30 backdrop-blur-xl flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-black">
                            {selectedChannel}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-zinc-500" />
                      </div>

                      <div className="flex-1 p-8 overflow-y-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {previewImages.map((img, i) => (
                            <div
                              key={i}
                              className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10"
                            >
                              <Image
                                src={img}
                                alt={`Preview ${i}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ACCESS MODAL */}
        {open && (
          <div className="fixed inset-0 z-[999] overflow-y-auto overscroll-contain bg-black/80 backdrop-blur-xl p-4">
            <div className="relative w-full max-w-4xl max-h-[calc(100dvh-2rem)] my-auto mx-auto overflow-y-auto overscroll-contain rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] shadow-[0_0_80px_rgba(217,70,239,0.25)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.18),transparent_45%)]" />

              <button
                onClick={() => {
                  setOpen(false)
                  setTransferReady(false)
                  setAliasCopied(false)
                }}
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-all"
              >
                ✕
              </button>

              <div className="relative z-10 p-8 md:p-10">
                <div className="text-center">
                  <h2 className="mt-6 text-4xl md:text-5xl font-black leading-[0.95]">
                    Acceder al Discord
                  </h2>
                </div>

                {!approved ? (
                  <>
                    
                    {/* PAYMENT */}
                    <div className="mt-8 rounded-[2rem] border border-fuchsia-500/20 bg-fuchsia-500/5 p-6">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div>
                          <div className="text-sm text-zinc-500">
                            Acceso al Discord
                          </div>

                          <div className="text-5xl font-black mt-2">
                            $4.800
                          </div>

                          <div className="text-fuchsia-300 text-sm mt-1">
                            Pago único • Acceso permanente
                          </div>
                        </div>
                      </div>

                      {/* ALIAS */}
                      <button
                        type="button"
                        onClick={copyAlias}
                        className="mt-5 w-full text-left rounded-2xl border border-white/10 bg-black/40 p-5 hover:bg-white/[0.06] hover:border-fuchsia-500/30 transition-all active:scale-[0.99]"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="text-sm text-zinc-500">
                              Alias de transferencia
                            </div>
                      
                            <div className="mt-2 text-2xl font-black tracking-wide">
                              licho380.macro
                            </div>
                          </div>
                      
                          {aliasCopied && (
                            <div className="shrink-0 flex items-center justify-center">
                              <svg
                                viewBox="0 0 24 24"
                                className="w-5 h-5 text-green-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="m5 12 4 4L19 6" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </button>
                    </div>
                    {/* TITULAR */}
                    <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.025] p-6">
                      <label className="text-sm text-zinc-400 block mb-2">
                        Nombre del titular de la cuenta
                      </label>
                    
                      <p className="text-xs text-zinc-500 mb-4">
                        ¿A nombre de quién has transferido?
                      </p>
                    
                      <input
                        type="text"
                        placeholder="Nombre y apellido"
                        value={titular}
                        onChange={(e) => {
                          const value = e.target.value
                    
                          // Solo letras, espacios y caracteres habituales de nombres
                          const cleaned = value.replace(
                            /[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]/g,
                            ''
                          )
                    
                          setTitular(cleaned)
                    
                          if (
                            window.fbq &&
                            cleaned.trim().split(/\s+/).length >= 2
                          ) {
                            window.fbq('track', 'Lead', {
                              content_name:
                                'PALACE ' +
                                String.fromCharCode(86, 73, 80),
                            })
                          }
                        }}
                        className={`w-full rounded-2xl border bg-white/[0.04] px-5 py-4 outline-none transition-all ${
                          titular.length > 0 && !isTitularValid
                            ? 'border-red-500/50 focus:border-red-500/70'
                            : 'border-white/10 focus:border-fuchsia-500/40'
                        }`}
                      />
                    
                      {titular.length > 0 && !isTitularValid && (
                        <p className="mt-2 text-sm text-red-400">
                          Ingresá nombre y apellido.
                        </p>
                      )}
                    </div>


                    {/* WAITING TRANSFER */}
                     <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/10 px-5 py-4">
                       <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 animate-pulse" />

                       <span className="text-fuchsia-200 font-semibold">
                         Esperando transferencia...
                      </span>
                    </div>
                    
                    {/* BUTTON AREA */}
                    <div className="mt-8">
                      {!transferReady ? (
                        <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-5 text-center">
                          <div className="flex items-center justify-center gap-3 text-zinc-400">
                            <div className="w-5 h-5 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />

                            <span className="font-semibold">
                              Esperando transferencia...
                            </span>
                          </div>

                          <p className="mt-2 text-xs text-zinc-600">
                            El botón estará disponible en unos segundos.
                          </p>
                        </div>
                      ) : (
                        <button
                          onClick={handleAccess}
                          disabled={loading || !isTitularValid}
                          className="group relative overflow-hidden w-full rounded-[2rem] bg-gradient-to-r from-fuchsia-500 to-violet-600 px-6 py-4 text-base md:px-10 md:py-6 md:text-xl font-black shadow-[0_0_60px_rgba(217,70,239,0.35)] hover:scale-[1.01] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                          <span className="relative z-10 flex items-center justify-center">
                            {loading ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                                Verificando acceso privado...
                              </>
                            ) : (
                              <>
                                Ya realicé la transferencia
                                <span className="ml-3 group-hover:translate-x-1 transition-transform">
                                  →
                                </span>
                              </>
                            )}
                          </span>
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="py-4 md:py-6">
                    {/* PAYMENT CONFIRMED / NEXT STEP */}
                    <div className="text-center">
                      <h3 className="mt-7 text-4xl md:text-5xl font-black leading-[0.95]">
                        ¡Ultimo paso!
                      </h3>

                      {/* ICON */}
                      <div className="mx-auto mt-8 w-28 h-28 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-violet-600/30 border border-fuchsia-400/40 flex items-center justify-center shadow-[0_0_60px_rgba(217,70,239,0.4)]">
                        <div className="w-16 h-16 rounded-full border-2 border-fuchsia-300/80 flex items-center justify-center">
                          <svg
                            viewBox="0 0 64 64"
                            className="w-10 h-10 text-fuchsia-200"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <rect
                              x="15"
                              y="8"
                              width="34"
                              height="44"
                              rx="5"
                            />
                            <path d="M23 20h18M23 29h18M23 38h9" />
                            <circle
                              cx="45"
                              cy="45"
                              r="10"
                              fill="#0a0a0a"
                            />
                            <path d="m40.5 45 3 3 5.5-6" />
                          </svg>
                        </div>
                      </div>

                      {/* MAIN MESSAGE */}
                      <h4 className="mt-8 text-2xl md:text-3xl font-black">
                        Ahora enviá tu{' '}
                        <span className="text-fuchsia-400">
                          comprobante
                        </span>{' '}
                        en Discord
                      </h4>

                      <p className="mt-4 text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                        Debés ingresar al servidor y enviar tu comprobante de
                        pago para que podamos verificarlo y habilitarte el
                        acceso al{' '}
                        <span className="text-fuchsia-400 font-semibold">
                          contenido VIP
                        </span>
                        .
                      </p>
                    </div>
                    {/* STEPS */}
                    <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 md:p-8">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-fuchsia-500/20" />
                    
                        <div className="text-fuchsia-300 font-bold">
                          ¿Qué sigue?
                        </div>
                    
                        <div className="h-px flex-1 bg-fuchsia-500/20" />
                      </div>
                    
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    
                        {/* STEP 1 */}
                        <div className="relative text-center min-w-0">
                          {/* NUMERO */}
                          <div className="h-7 flex items-center justify-center">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white text-xs font-black flex items-center justify-center shadow-lg">
                              1
                            </div>
                          </div>
                    
                          {/* ICONO DISCORD */}
                          <div className="mt-3 h-16 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/30 flex items-center justify-center shadow-[0_0_25px_rgba(88,101,242,0.15)]">
                              <Image
                                src="/discord.png"
                                alt="Discord"
                                width={40}
                                height={40}
                                className="object-contain"
                              />
                            </div>
                          </div>
                    
                          {/* TITULO */}
                          <h5 className="mt-5 min-h-[28px] flex items-center justify-center font-black text-lg">
                            Entrá al Discord
                          </h5>
                    
                          {/* DESCRIPCION */}
                          <p className="mt-2 min-h-[48px] text-sm text-zinc-500 leading-relaxed flex items-start justify-center">
                            Hacé clic en el botón de abajo para ingresar al servidor VIP.
                          </p>
                        </div>
                    
                        {/* STEP 2 */}
                        <div className="relative text-center min-w-0">
                          {/* NUMERO */}
                          <div className="h-7 flex items-center justify-center">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white text-xs font-black flex items-center justify-center shadow-lg">
                              2
                            </div>
                          </div>
                    
                          {/* ICONO */}
                          <div className="mt-3 h-16 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
                              <svg
                                viewBox="0 0 24 24"
                                className="w-8 h-8 text-fuchsia-300"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <rect
                                  x="5"
                                  y="3"
                                  width="14"
                                  height="18"
                                  rx="2"
                                />
                                <path d="M8 8h8M8 12h6M8 16h4" />
                                <path d="M16 16v5M13.5 18.5 16 16l2.5 2.5" />
                              </svg>
                            </div>
                          </div>
                    
                          {/* TITULO */}
                          <h5 className="mt-5 min-h-[28px] flex items-center justify-center font-black text-lg">
                            Enviá tu comprobante
                          </h5>
                    
                          {/* DESCRIPCION */}
                          <p className="mt-2 min-h-[48px] text-sm text-zinc-500 leading-relaxed flex items-start justify-center">
                            En el canal indicado, enviá tu comprobante de pago.
                          </p>
                        </div>
                    
                        {/* STEP 3 */}
                        <div className="relative text-center min-w-0">
                          {/* NUMERO */}
                          <div className="h-7 flex items-center justify-center">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white text-xs font-black flex items-center justify-center shadow-lg">
                              3
                            </div>
                          </div>
                    
                          {/* ICONO */}
                          <div className="mt-3 h-16 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
                              <svg
                                viewBox="0 0 24 24"
                                className="w-8 h-8 text-fuchsia-300"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 3 20 7v5c0 4.8-3.1 7.9-8 9-4.9-1.1-8-4.2-8-9V7l8-4Z" />
                                <path d="m8.5 12 2.3 2.3 4.8-5" />
                              </svg>
                            </div>
                          </div>
                    
                          {/* TITULO */}
                          <h5 className="mt-5 min-h-[28px] flex items-center justify-center font-black text-lg">
                            Esperá la verificación
                          </h5>
                    
                          {/* DESCRIPCION */}
                          <p className="mt-2 min-h-[48px] text-sm text-zinc-500 leading-relaxed flex items-start justify-center">
                            Verificaremos tu pago en un plazo maximo de 5 minutos.
                          </p>
                        </div>
                    
                      </div>
                    </div>
                    {/* DISCORD CTA */}
                    <div className="mt-8 rounded-[2rem] border border-green-500/20 bg-green-500/[0.04] p-6 md:p-7 text-center shadow-[0_0_40px_rgba(34,197,94,0.05)]">
                      <div className="text-sm text-zinc-400">
                        Accedé ahora
                      </div>

                      <div className="mt-4">
                        <a
                          href="https://discord.gg/UeNTdRunZ"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 px-8 py-5 text-lg md:text-xl font-black text-black shadow-[0_0_35px_rgba(34,197,94,0.25)] hover:scale-[1.02] transition-all"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="w-7 h-7"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M19.5 5.2A16.6 16.6 0 0 0 15.4 4l-.5 1.1a15.8 15.8 0 0 0-5.8 0L8.6 4a16.7 16.7 0 0 0-4.1 1.2C1.9 9.2 1.2 13 1.5 16.8a16.4 16.4 0 0 0 5 2.5l1.2-1.6a10.7 10.7 0 0 1-1.8-.9l.4-.3c3.6 1.7 7.5 1.7 11.1 0l.4.3c-.6.4-1.2.7-1.8.9l1.2 1.6a16.4 16.4 0 0 0 5-2.5c.4-4.4-.7-8.2-2.7-11.6ZM8.7 15.1c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Zm6.6 0c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Z" />
                          </svg>

                          Entrar al servidor VIP →
                        </a>
                      </div>

                      <div className="mt-5 flex items-center justify-center gap-2 text-sm text-zinc-500">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4 text-fuchsia-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M12 3 20 7v5c0 4.8-3.1 7.9-8 9-4.9-1.1-8-4.2-8-9V7l8-4Z" />
                        </svg>

                        El acceso al contenido VIP se habilita únicamente
                        después de verificar tu pago (proceso automatico, dura menos de 2 minutos).
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
