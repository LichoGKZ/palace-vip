import { NextRequest, NextResponse } from 'next/server'

const WEBHOOKS = {
  visita:
    'https://discord.com/api/webhooks/1509394578317381653/lwrIJ30cEm2iEIkTo2EjgnTF-dyzamlNFLg8vR5MgZq_xekrS5fGzkxrR-W3Dm-CCEyL',

  preview:
    'https://discord.com/api/webhooks/1509394718713319495/FxoDmuCvRW4B8CnGdkSmFRYNl44v-9nSSnlCKxCAYE2RGdU2YUrTJy2pzss8eKsX42rs',

  checkout:
    'https://discord.com/api/webhooks/1509394840100540537/LttKVCLkll2ni1xyC5NNtuXQVrz_wpi7WTGUEhUgDgOHBTsBqSA-2TtnsVdpgZJ6Z-vJ',

  pago:
    'https://discord.com/api/webhooks/1509394950729760828/Ii0solHUKx97IT_8l5kyLeVA2TJCMD4K-JObcKbAnixTCku0ER7_v4TRPoRw3Ml4-KFk',

  purchase:
    'https://discord.com/api/webhooks/1509395052865130536/8wJXEeVSCa_1HT5jTs64-UciN7rK9IhXz7C9R2e0m7CiPlDXdO-oABnguGMJS6YDgTey',

  errore:
    'https://discord.com/api/webhooks/1509395176186052752/Bn-kmnL244-5qvi3n5Ms2vgFv5hDF9P99FcVeH72T8QgXK4ywxiToEtxy7zZL07XmuUV',
}

const COLORS: any = {
  visita: 5814783,
  preview: 15844367,
  checkout: 16753920,
  pago: 5763719,
  purchase: 3066993,
  error: 15548997,
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      type,
      email,
      channel,
      eventId,
      userAgent,
      language,
      platform,
      screen,
      timezone,
      url,
      referrer,
    } = body

    const ip =
      req.headers.get('x-forwarded-for') ||
      req.headers.get('cf-connecting-ip') ||
      'unknown'

    const embed = {
      title: `📡 Nuevo evento: ${type}`,
      color: COLORS[type] || 16777215,

      fields: [
        {
          name: '🌍 URL',
          value: url || 'unknown',
          inline: false,
        },

        {
          name: '📌 Referrer',
          value: referrer || 'direct',
          inline: false,
        },

        {
          name: '📧 Email',
          value: email || 'no-email',
          inline: true,
        },

        {
          name: '🧠 Canal',
          value: channel || 'none',
          inline: true,
        },

        {
          name: '🆔 Event ID',
          value: eventId || 'none',
          inline: false,
        },

        {
          name: '🌐 IP',
          value: ip,
          inline: true,
        },

        {
          name: '💻 Plataforma',
          value: platform || 'unknown',
          inline: true,
        },

        {
          name: '🖥 Resolución',
          value: screen || 'unknown',
          inline: true,
        },

        {
          name: '🗣 Idioma',
          value: language || 'unknown',
          inline: true,
        },

        {
          name: '⏰ Timezone',
          value: timezone || 'unknown',
          inline: true,
        },

        {
          name: '📱 User Agent',
          value: userAgent?.slice(0, 1000) || 'unknown',
          inline: false,
        },
      ],

      timestamp: new Date().toISOString(),

      footer: {
        text: 'PALACE TRACKING SYSTEM',
      },
    }

    let webhook = WEBHOOKS.visita

    if (type === 'preview') webhook = WEBHOOKS.preview
    if (type === 'checkout') webhook = WEBHOOKS.checkout
    if (type === 'pago') webhook = WEBHOOKS.pago
    if (type === 'purchase') webhook = WEBHOOKS.purchase
    if (type === 'error') webhook = WEBHOOKS.errore

    await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    })

    return NextResponse.json({
      success: true,
    })
  } catch (err: any) {
    console.error(err)

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    )
  }
}