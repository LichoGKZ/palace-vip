'use client'

import { useEffect } from 'react'

const PIXEL_ID = '1758290612089722'

function getOrCreateExternalId(): string {
  try {
    const existing = localStorage.getItem('palace_uid')

    if (existing) {
      return existing
    }

    const id = crypto.randomUUID()
    localStorage.setItem('palace_uid', id)

    return id
  } catch {
    return crypto.randomUUID()
  }
}

function saveMetaAttribution() {
  try {
    const params = new URLSearchParams(window.location.search)

    // Guardar fbclid si el usuario llegó desde Meta
    const fbclid = params.get('fbclid')

    if (fbclid) {
      localStorage.setItem('palace_fbclid', fbclid)

      // Formato fbc utilizado por Meta
      const fbc = `fb.1.${Date.now()}.${fbclid}`
      localStorage.setItem('palace_fbc', fbc)
    }

    // Guardar el fbp que Meta ya haya generado
    const cookies = document.cookie.split(';')

    const fbpCookie = cookies
      .map(cookie => cookie.trim())
      .find(cookie => cookie.startsWith('_fbp='))

    if (fbpCookie) {
      const fbp = fbpCookie.substring(5)
      localStorage.setItem('palace_fbp', fbp)
    }
  } catch (error) {
    console.error('[META] Error guardando attribution:', error)
  }
}

export default function MetaPixel() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Guardar/recuperar la atribución antes de inicializar Meta
    saveMetaAttribution()

    // Evitar inicializar el Pixel más de una vez
    if ((window as any).fbq) return

    const externalId = getOrCreateExternalId()

    const script = document.createElement('script')

    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;
      n.push=n;
      n.loaded=!0;
      n.version='2.0';
      n.queue=[];
      t=b.createElement(e);
      t.async=!0;
      t.src=v;
      s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}
      (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

      fbq('init', '${PIXEL_ID}', {
        external_id: '${externalId}'
      });

      fbq('track', 'PageView');
    `

    document.head.appendChild(script)

    console.log('[META] Pixel inicializado')
    console.log('[META] external_id:', externalId)
    console.log('[META] fbp:', localStorage.getItem('palace_fbp'))
    console.log('[META] fbc:', localStorage.getItem('palace_fbc'))
    console.log('[META] fbclid:', localStorage.getItem('palace_fbclid'))

  }, [])

  return (
    <img
      height="1"
      width="1"
      style={{ display: 'none' }}
      src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
      alt=""
    />
  )
}
