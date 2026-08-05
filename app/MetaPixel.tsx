// app/MetaPixel.tsx
'use client'

import { useEffect } from 'react'
import MetaPixel from "./MetaPixel";

const PIXEL_ID = '1383716853246156'

function getOrCreateExternalId(): string {
  try {
    const existing = localStorage.getItem('palace_uid')
    if (existing) return existing

    const id = crypto.randomUUID()
    localStorage.setItem('palace_uid', id)
    return id
  } catch {
    return crypto.randomUUID()
  }
}

export default function MetaPixel() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Evita inicializar el Pixel más de una vez
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
  }, [])

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  )
}