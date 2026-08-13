'use client'
import { useState } from 'react'
import { useEffect, useRef } from "react";
import TextImage from './components/TextImage'
import BigTextImage from './components/BigTextImage'

import Image from "next/image";
import lockIcon from "@/public/lock.png";
const VIPText = () => <TextImage text="VIP" fontSize={48} color="#ffffff" className="md:text-[72px]" />
const PremiumText = () => <TextImage text="premium" fontSize={20} color="#d4d4d8" />
const ContenidoText = () => <TextImage text="contenido" fontSize={20} color="#d4d4d8" />

declare global {
  interface Window {
    fbq: any
  }
}
export default function PalaceVIPLanding() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [approved, setApproved] = useState(false)
  const [email, setEmail] = useState('')
  const [previewOpen, setPreviewOpen] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState('')
  const [previewLocked, setPreviewLocked] = useState(false)
  const [previewTimer, setPreviewTimer] = useState<NodeJS.Timeout | null>(null)
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

        timezone:
          Intl.DateTimeFormat().resolvedOptions().timeZone,

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



  const handleAccess = async () => {
    console.log('[META] window.fbq', window.fbq)
    if (window.fbq) {
      window.fbq('track', 'AddPaymentInfo', {
        value: 4800,
        currency: 'ARS',
        content_name: 'PALACE ' + String.fromCharCode(86,73,80),
        content_type: 'product',
        content_ids: ['palace-vip'],
        num_items: 1
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
        
            content_name: 'PALACE ' + String.fromCharCode(86,73,80),
            content_type: 'product',
        
            content_ids: ['palace-vip'],
            contents: [
              {
                id: 'palace-vip',
                quantity: 1
              }
            ],
        
            num_items: 1
          },
          {
            eventID: eventId
          }
        )
  
        console.log('[META] Purchase enviado', eventId)
  
      } catch (err) {
        console.error('[META] Error enviando Purchase', err)
      }
    }
  
    sendLog('pago', {
      email,
    })
  
    sendLog('purchase', {
      email,
      eventId,
    })
  
    if (window.fbq) {
      window.fbq('track', 'CompleteRegistration')
    }
    
    setLoading(false)
    setApproved(true)
  }
  const fakeActivity = [
    "mati.vip desbloqueó acceso hace 2 min",
    "nuevo contenido agregado hace 6 min",
    "27 personas entraron hoy",
    "237 miembros online ahora",
  ]

  
const previewImages = [
  "/preview/1.jpeg",
  "/preview/2.jpeg",
  "/preview/3.jpeg",
  "/preview/4.jpeg",
  "/preview/5.jpeg",
  "/preview/6.jpeg",
  "/preview/7.jpeg",
  "/preview/8.jpeg",
  "/preview/9.jpeg",
  "/preview/10.jpeg",
]

  
  const testimonials = [
    
    {
      user: "elmoroso",
      text: "q locura la mikarios",
      color: "from-fuchsia-500 to-pink-500",
    },
    {
      user: "matut23",
      text: "actualizan más rápido que telegram",
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      user: "francovich",
      text: "che realmente mucho material", // cambiado a material
      color: "from-pink-500 to-violet-500",
    },
    {
      user: "natliw",
      text: "mucho que ver..", // cambiado
      color: "from-fuchsia-400 to-violet-600",
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
  return (
    <>
  
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-black" />

      <div className="fixed inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-fuchsia-600/25 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[800px] h-[800px] bg-violet-700/20 blur-[200px] rounded-full" />
      </div>

      {/* NOISE */}

      {/* TOP BAR */}
      <header className="relative z-20 border-b border-white/10 backdrop-blur-2xl bg-black/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-fuchsia-500/50 rounded-2xl" />

              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-700 flex items-center justify-center font-black text-lg shadow-2xl">
                P
              </div>
            </div>

            <div>
              <h1 className="font-black tracking-[0.2em] text-xl">
                PALACE
              </h1>

              <p className="text-xs text-zinc-500">
                comunidad privada argentina
              </p>
            </div>
          </div>

          {/* LIVE ACTIVITY */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

            <div className="text-sm text-zinc-400">
              237 miembros online ahora
            </div>
          </div>
        </div>
      </header>

      {/* LIVE TICKER */}
      <div className="relative z-10 border-b border-white/5 overflow-hidden bg-white/[0.03]">
        <div className="flex whitespace-nowrap animate-[ticker_25s_linear_infinite] py-3">
          {[...fakeActivity, ...fakeActivity].map((item, i) => (
            <div
              key={i}
              className="mx-8 text-sm text-zinc-400 flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            {/* BADGE */}
            <div className="inline-flex items-center gap-3 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 backdrop-blur-xl px-5 py-3 text-sm text-fuchsia-200 mb-8 shadow-lg shadow-fuchsia-500/10">
              <div className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
              Todas las famosas de Argentina
            </div>

            {/* TITLE */}
            <h1 className="text-3xl leading-tight md:text-6xl font-black tracking-tight">
              El servidor de
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
                {" "}
                Discord{" "}
              </span>
              con mas <TextImage text="contenido" fontSize={32} color="#ffffff" className="h-[30px] md:h-[60px] w-auto" /> de Argentina.
            </h1>

            {/* SUBTEXT */}
            <p className="mt-8 text-zinc-300 text-xl leading-relaxed max-w-xl">
              Accedé a <TextImage text="filtraciones" fontSize={20} color="#d4d4d8" /> exclusivas, <TextImage text="contenido" fontSize={20} color="#d4d4d8" /> <TextImage text="premium" fontSize={20} color="#d4d4d8" />,
              actualizaciones diarias y una comunidad activa 24/7.
            </p>

            {/* SOCIAL STATS */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6">
                <div className="text-4xl font-black">18K+</div>
                <div className="text-sm text-zinc-500 mt-2">Miembros</div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6">
                <div className="text-4xl font-black">80GB+</div>
                <div className="text-sm text-zinc-500 mt-2"><TextImage text="Contenido" fontSize={14} color="#71717a" /></div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6">
                <div className="text-4xl font-black">24/7</div>
                <div className="text-sm text-zinc-500 mt-2">Actividad</div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#checkout"
                className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-fuchsia-500 to-violet-600 px-6 py-4 text-base md:px-10 md:py-6 md:text-xl font-black shadow-[0_0_60px_rgba(217,70,239,0.35)] hover:scale-[1.02] transition-all duration-300 text-center"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <span className="relative z-10 flex items-center justify-center">
                  Obtener <TextImage text="acceso" fontSize={18} color="#ffffff" /> ahora
                  <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </a>

              <button
                onClick={() => {
                  sendLog('preview')

                  setPreviewOpen(true)
                  if (window.fbq) {
                    window.fbq('track', 'ViewContent', {
                      content_name: 'PALACE ' + String.fromCharCode(86,73,80),
                      content_type: 'product',
                      content_ids: ['palace-vip']
                    })
                  }
                  setPreviewLocked(false)

                  sendLog('preview_open')

                  // después de 2 segundos se bloquea
                  const timer = setTimeout(() => {
                    setPreviewLocked(true)
                  }, 4000)

                  setPreviewTimer(timer)
                }}
                className="group relative overflow-hidden rounded-[2rem] border border-fuchsia-500/20 bg-white/[0.04] backdrop-blur-0 px-10 py-6 text-lg font-semibold hover:bg-white/[0.08] transition-all"              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.25),transparent_60%)]" />

                <span className="relative z-10 flex items-center justify-center gap-3">
                  Ver preview
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
              </button>
            </div>

            {/* TRUST */}
            <div className="mt-7 flex flex-wrap gap-5 text-sm text-zinc-500">
              <span>✔ acceso instantáneo</span>
              <span>✔ pago seguro</span>
              <span>✔ acceso desde celular</span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="absolute inset-0 bg-fuchsia-500/20 blur-[120px] rounded-full" />

            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-2xl shadow-[0_0_80px_rgba(217,70,239,0.15)]">
              {/* DISCORD TOP */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-700 flex items-center justify-center font-black">
                    P
                  </div>

                  <div>
                    <div className="font-bold text-lg">PALACE VIP</div>
                    <div className="text-xs text-zinc-500">
                      servidor privado • acceso premium
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

                    <span className="text-sm">837 online</span>
                  </div>

                  <div className="text-xs text-zinc-500 mt-1">
                    18.482 miembros
                  </div>
                </div>
              </div>

              {/* CHANNELS */}
              <div className="flex">
                <div className="w-44 border-r border-white/5 bg-black/30 p-4 hidden md:block">
                  <div className="space-y-2 text-sm">
                    {[
                      "# albere",
                      "# milica",
                      "# mika-rios",
                      "# martu-boden",
                      "# tuli-acosta",
                      "# kiara-tuliano",
                    ].map((channel) => (
                      <div
                        key={channel}
                        className="px-3 py-2 rounded-xl text-zinc-400 hover:bg-white/5 cursor-pointer"
                      >
                        {channel}
                      </div>
                    ))}
                  </div>
                </div>

                {/* MAIN */}
                <div className="flex-1">
                  {/* PREVIEW GRID */}
                  <div className="p-5 grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="aspect-[4/5] rounded-[1.8rem] overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900 to-black relative"
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.35),transparent_45%)]" />

                        <div className="absolute inset-0 backdrop-blur-0 flex flex-col items-center justify-center">
                          <div className="text-5xl mb-3">🔒</div>

                          <div className="font-black text-lg">
                            Accede al servidor
                          </div>

                          <div className="text-xs text-zinc-500 mt-2">
                            miralo dentro del discord
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CHAT */}
                  <div className="border-t border-white/10 bg-black/30 p-5 space-y-5">
                    {testimonials.map((msg, i) => (
                      <div key={i} className="flex gap-4">
                        <div
                          className={`w-11 h-11 rounded-full bg-gradient-to-br ${msg.color}`}
                        />

                        <div>
                          <div className="flex items-center gap-2">
                            <div className="font-bold text-sm">
                              {msg.user}
                            </div>

                            <div className="text-xs text-zinc-600">
                              hoy 21:{10 + i}
                            </div>
                          </div>

                          <div className="text-zinc-300 text-sm mt-1">
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING SOCIAL */}
            <div className="absolute -bottom-8 -left-8 hidden lg:block">
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
              No es una página random.
              <br />
              Es una comunidad privada viva.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              {
                icon: "⚡",
                title: "Actualizaciones constantes",
                text: "Contenido nuevo agregado todos los días. Nada abandonado o reciclado.",
              },
              {
                icon: "🚀",
                title: "Acceso inmediato",
                text: "Comprás una vez y entrás automáticamente al servidor VIP.",
              },
              {
                icon: "👑",
                title: "Comunidad real",
                text: "Miles de miembros activos compartiendo contenido diariamente.",
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

      {/* CHECKOUT */}
      <section
        id="checkout"
        className="relative z-10 max-w-5xl mx-auto px-6 py-28"
      >
        <div className="relative overflow-hidden rounded-[3rem] border border-fuchsia-500/20 bg-gradient-to-b from-fuchsia-500/10 to-black backdrop-blur-3xl p-10 md:p-16 shadow-[0_0_100px_rgba(217,70,239,0.18)]">
          {/* GLOW */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.18),transparent_40%)]" />

          <div className="relative z-10 text-center">
            {/* BADGE */}
            <div className="inline-flex items-center gap-3 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-5 py-3 text-sm text-fuchsia-200">
              🔥 oferta activa hoy
            </div>

            {/* TITLE */}
            <h2 className="mt-8 text-5xl md:text-7xl font-black leading-[0.95]">
              Acceso <VIPText /> completo
            </h2>

            <p className="mt-6 text-zinc-300 text-xl max-w-2xl mx-auto leading-relaxed">
              Entrá ahora al servidor privado y desbloqueá acceso inmediato a
              todo el contenido premium.
            </p>

            {/* PRICE */}
            <div className="mt-12">
              <div className="text-zinc-500 line-through text-2xl">
                $19.900 ARS
              </div>

              <div className="flex items-end justify-center gap-3 mt-1">
                <div className="text-7xl md:text-8xl font-black tracking-tight">
                  $4.800
                </div>

                <div className="text-zinc-500 pb-4">ARS</div>
              </div>

              <div className="mt-3 text-fuchsia-300 text-sm">
                acceso completo • pago único
              </div>
            </div>

            {/* FEATURES */}
            <div className="mt-12 grid md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
              {[
                "Acceso inmediato al Discord " + String.fromCharCode(86,73,80), // VIP en ASCII
                "Canales " + String.fromCharCode(112,114,101,109,105,117,109) + " exclusivos", // premium
                "Material actualizado diariamente", // cambiado
              ].map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 flex items-center gap-4"
                >
                  <div className="w-7 h-7 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center text-sm">
                    ✓
                  </div>

                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* SOCIAL */}
            <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3">
                237 personas online ahora
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3">
                acceso instantáneo
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3">
                pago seguro
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12">
              <button
                onClick={() => {
                  if (window.fbq) {
                
  
                
                    window.fbq('track', 'InitiateCheckout', {
                      value: 4800,
                      currency: 'ARS',
                      content_name: 'PALACE ' + String.fromCharCode(86,73,80),
                      content_type: 'product',
                      content_ids: ['palace-vip'],
                      num_items: 1
                    })
                  }
                
                  sendLog('checkout')
                  setOpen(true)
                }}
                className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-fuchsia-500 to-violet-600 px-14 py-7 text-2xl font-black shadow-[0_0_60px_rgba(217,70,239,0.35)] hover:scale-[1.02] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <span className="relative z-10 flex items-center justify-center">
                  Comprar acceso ahora
                  <span className="ml-3 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
              </button>
            </div>

            {/* GUARANTEE */}
            <div className="mt-6 text-sm text-zinc-500">
              pago seguro • acceso automático • sin esperas
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 py-12 text-center">
        <div className="text-zinc-500 text-sm">
          PALACE VIP • comunidad privada exclusiva • acceso limitado
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

      {/* GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.18),transparent_45%)]" />

      {/* CLOSE */}
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

        {/* SIDEBAR */}
        <div className="w-full md:w-[320px] border-r md:border-r border-b md:border-b-0 border-white/10 bg-black/40 backdrop-blur-2xl p-4 md:p-5 overflow-y-auto max-h-[40vh] md:max-h-none">

          {/* SERVER */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-700 flex items-center justify-center font-black text-xl shadow-[0_0_30px_rgba(217,70,239,0.4)]">
              P
            </div>

            <div>
              <div className="font-black text-lg">
                PALACE VIP
              </div>

              <div className="text-xs text-zinc-500">
                servidor privado
              </div>
            </div>
          </div>

          {/* CATEGORY */}
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-600 mb-4">
            previews exclusivos
          </div>

          {/* CHANNELS */}
          <div
            className="space-y-2 overflow-hidden h-[500px]"
          >
            {previewChannels.map((channel) => (
              <button
                key={channel}
                onClick={() => {
                  setSelectedChannel(channel)

                  sendLog('preview', {
                    channel,
                  })
                }}
                className={`w-full text-left px-4 py-3 rounded-2xl transition-all duration-300 flex items-center gap-3 ${
                  selectedChannel === channel
                    ? 'bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 border border-fuchsia-500/20 text-white shadow-[0_0_30px_rgba(217,70,239,0.15)]'
                    : 'hover:bg-white/[0.05] text-zinc-400'
                }`}
              >
                <span className="text-zinc-500">#</span>

                <span className="font-semibold">
                  {channel.replace('# ', '')}
                </span>

                <div className="ml-auto w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
              </button>
            ))}
          </div>

        </div>

        {/* CONTENT */}
      
        <div className="flex-1 relative overflow-hidden min-h-[60vh] md:min-h-0">

          {previewLocked ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-10">

              <h2 className="mt-6 md:mt-10 text-2xl md:text-5xl font-black leading-[1.05] px-2">
                Este no es un discord mas...
                <br />
                Esto es mejor que OnlyFans.
              </h2>

              <p className="mt-4 md:mt-6 text-sm md:text-xl text-zinc-300 max-w-2xl leading-relaxed px-2">
                Mas de 200 artistas argentinas, mas de 17mil archivos. Todo en un solo lugar.
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
                  Acceder
                  <span className="ml-3 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
              </button>

              <p className="mt-5 text-xs text-zinc-500 max-w-md">
                Acceso inmediato luego del pago. Cancelable en cualquier momento.
              </p>

            </div>
          ) : (
            <div className="h-full flex flex-col">

              {/* TOP */}
              <div className="border-b border-white/10 px-8 py-5 bg-black/30 backdrop-blur-xl flex items-center justify-between">

                <div>
                  <div className="text-2xl font-black">
                    {selectedChannel}
                  </div>

                  <div className="text-sm text-zinc-500 mt-1 flex items-center gap-1">
                    <TextImage text="contenido" fontSize={14} color="#71717a" /> <TextImage text="premium" fontSize={14} color="#71717a" /> privado
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-zinc-500">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  237 viendo ahora
                </div>

              </div>

              {/* MAIN */}
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

                    <div className="absolute inset-0 flex flex-col items-center justify-center">

                      <div className="font-black text-xl flex items-center gap-2">
                        <TextImage text="Contenido" fontSize={20} color="#ffffff" /> <TextImage text="VIP" fontSize={20} color="#ffffff" />
                      </div>

                      <div className="text-sm text-zinc-300 mt-2">
                        desbloqueá acceso completo
                      </div>

                    </div>

                  </div>
                ))}

              </div>

                {/* CTA */}
                <div className="mt-12 rounded-[2.5rem] border border-fuchsia-500/20 bg-gradient-to-b from-fuchsia-500/10 to-black p-10 text-center shadow-[0_0_80px_rgba(217,70,239,0.12)]">

                  <div className="inline-flex items-center gap-3 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-5 py-3 text-sm text-fuchsia-200">
                    🔥 acceso limitado hoy
                  </div>

                  <h3 className="mt-7 text-5xl font-black leading-[0.95]">
                    Para ver el contenido completo
                    <br />
                    necesitás acceso VIP.
                  </h3>

                  <p className="mt-5 text-zinc-400 text-lg max-w-2xl mx-auto">
                    Entrá ahora al servidor privado y desbloqueá todos los canales <TextImage text="premium" fontSize={18} color="#a1a1aa" />, <TextImage text="filtraciones" fontSize={18} color="#a1a1aa" /> y <TextImage text="contenido" fontSize={18} color="#a1a1aa" /> exclusivo.
                  </p>

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
                    className="mt-10 group relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-fuchsia-500 to-violet-600 px-12 py-6 text-2xl font-black shadow-[0_0_60px_rgba(217,70,239,0.35)] hover:scale-[1.02] transition-all duration-300"
                  >

                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <span className="relative z-10 flex items-center justify-center">
                      Desbloquear acceso ahora
                      <span className="ml-3 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </span>

                  </button>

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

      {/* GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.18),transparent_45%)]" />

      {/* CLOSE */}
      <button
        onClick={() => setOpen(false)}
        className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-all"
      >
        ✕
      </button>

      <div className="relative z-10 p-8 md:p-10">

        {/* HEADER */}
        <div className="text-center">


          <h2 className="mt-6 text-4xl md:text-5xl font-black leading-[0.95]">
            Acceder al Discord
          </h2>

        </div>

        {!approved ? (
          <>
            {/* FORM */}
            <div className="mt-10 space-y-5">

              <div>
                <label className="text-sm text-zinc-400 block mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="tuemail@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                
                    if (
                      window.fbq &&
                      e.target.value.includes("@") &&
                      e.target.value.length > 5
                    ) {
                      window.fbq('track', 'Lead', {
                        content_name: 'PALACE ' + String.fromCharCode(86,73,80)
                      })
                    }
                  }}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 outline-none focus:border-fuchsia-500/40 transition-all"
                />
              </div>

            </div>

            {/* PAYMENT */}
            <div className="mt-8 rounded-[2rem] border border-fuchsia-500/20 bg-fuchsia-500/5 p-6">

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-sm text-zinc-500">
                    Acceso VIP completo
                  </div>

                  <div className="text-5xl font-black mt-2">
                    $4.800
                  </div>

                  <div className="text-fuchsia-300 text-sm mt-1">
                    pago único • acceso permanente
                  </div>
                </div>
              </div>

              {/* ALIAS */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-5">

                <div className="text-sm text-zinc-500">
                  Alias de transferencia
                </div>

                <div className="mt-2 text-2xl font-black tracking-wide">
                  licho380.macro
                </div>

              </div>

              <div className="mt-5 text-sm text-zinc-500 leading-relaxed">
                La transferencia se verifica automaticamente y el acceso es instantaneo.
              </div>

            </div>

            {/* BUTTON */}
            <button
              onClick={handleAccess}
              disabled={loading}
              className="group relative overflow-hidden mt-8 w-full rounded-[2rem] bg-gradient-to-r from-fuchsia-500 to-violet-600 px-6 py-4 text-base md:px-10 md:py-6 md:text-xl font-black shadow-[0_0_60px_rgba(217,70,239,0.35)] hover:scale-[1.01] transition-all duration-300 disabled:opacity-70"
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

            {/* SECURITY */}
            <div className="mt-6 flex flex-wrap gap-3 text-sm">

              <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-zinc-400">
                acceso automático
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-zinc-400">
                servidor privado
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-zinc-400">
                comunidad activa
              </div>

            </div>
          </>
        ) : (
          <div className="py-4 md:py-6">

            {/* PAYMENT CONFIRMED / NEXT STEP */}
            <div className="text-center">

              {/* BADGE */}


              {/* TITLE */}
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
                    <rect x="15" y="8" width="34" height="44" rx="5" />
                    <path d="M23 20h18M23 29h18M23 38h9" />
                    <circle cx="45" cy="45" r="10" fill="#0a0a0a" />
                    <path d="m40.5 45 3 3 5.5-6" />
                  </svg>
                </div>
              </div>

              {/* MAIN MESSAGE */}
              <h4 className="mt-8 text-2xl md:text-3xl font-black">
                Ahora enviá tu{" "}
                <span className="text-fuchsia-400">comprobante</span> en Discord
              </h4>

              <p className="mt-4 text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Debés ingresar al servidor y enviar tu comprobante de pago
                para que podamos verificarlo y habilitarte el acceso al{" "}
                <span className="text-fuchsia-400 font-semibold">contenido VIP</span>.
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* STEP 1 */}
                <div className="relative text-center">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-7 h-7 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white text-xs font-black flex items-center justify-center shadow-lg">
                    1
                  </div>

                  <div className="mx-auto pt-5 w-16 h-16 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-8 h-8 text-fuchsia-300"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20.3 4.7A10 10 0 0 0 3.1 5.9 10 10 0 0 0 2 10.7c0 1.9.5 3.7 1.5 5.2L2 22l6.2-1.6A10 10 0 0 0 12 21c5.5 0 10-4.5 10-10 0-2.4-.6-4.5-1.7-6.3Z"/>
                      <path d="M8.2 8.1c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 1.9c.1.3.1.4-.1.6l-.8.8c.8 1.4 1.9 2.4 3.3 3.2l.8-.8c.2-.2.4-.2.6-.1l1.9.8c.3.1.4.3.4.5v.5c0 .3-.1.6-.4.8-.3.2-.8.4-1.2.4-1.2 0-2.6-.7-4.1-2.1S9 11.7 8.6 10.5c-.2-.7-.3-1.7-.4-2.4Z" fill="#0a0a0a"/>
                    </svg>
                  </div>

                  <h5 className="mt-5 font-black text-lg">
                    Entrá al Discord
                  </h5>

                  <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
                    Hacé clic en el botón de abajo para ingresar al servidor VIP.
                  </p>
                </div>

                {/* STEP 2 */}
                <div className="relative text-center">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-7 h-7 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white text-xs font-black flex items-center justify-center shadow-lg">
                    2
                  </div>

                  <div className="mx-auto pt-5 w-16 h-16 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
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
                      <rect x="5" y="3" width="14" height="18" rx="2" />
                      <path d="M8 8h8M8 12h6M8 16h4" />
                      <path d="M16 16v5M13.5 18.5 16 16l2.5 2.5" />
                    </svg>
                  </div>

                  <h5 className="mt-5 font-black text-lg">
                    Enviá tu comprobante
                  </h5>

                  <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
                    En el canal indicado, enviá tu comprobante de pago.
                  </p>
                </div>

                {/* STEP 3 */}
                <div className="relative text-center">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-7 h-7 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white text-xs font-black flex items-center justify-center shadow-lg">
                    3
                  </div>

                  <div className="mx-auto pt-5 w-16 h-16 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
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

                  <h5 className="mt-5 font-black text-lg">
                    Esperá la verificación
                  </h5>

                  <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
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
                    <path d="M19.5 5.2A16.6 16.6 0 0 0 15.4 4l-.5 1.1a15.8 15.8 0 0 0-5.8 0L8.6 4a16.7 16.7 0 0 0-4.1 1.2C1.9 9.2 1.2 13 1.5 16.8a16.4 16.4 0 0 0 5 2.5l1.2-1.6a10.7 10.7 0 0 1-1.8-.9l.4-.3c3.6 1.7 7.5 1.7 11.1 0l.4.3c-.6.4-1.2.7-1.8.9l1.2 1.6a16.4 16.4 0 0 0 5-2.5c.4-4.4-.7-8.2-2.7-11.6ZM8.7 15.1c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Zm6.6 0c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Z"/>
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
                El acceso al contenido VIP se habilita únicamente después de verificar tu pago (no demora mas de 5 minutos).
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
