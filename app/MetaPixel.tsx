// app/MetaPixel.tsx
'use client'
import { useEffect } from 'react'

<<<<<<< HEAD



const PIXEL_ID = '2140688816493036'

function getOrCreateExternalId(): string {
  try {
    const existing = localStorage.getItem('palace_uid')
    if (existing) return existing
    const id = crypto.randomUUID()
    localStorage.setItem('palace_uid', id)
    return id
  } catch {
    // localStorage puede fallar en modo privado/incógnito o SSR raro
    return crypto.randomUUID()
  }
}

export default function MetaPixel() {
  useEffect(() => {
    // Evita doble inicialización si el componente se monta más de una vez
    // (ej. navegación client-side, StrictMode en dev)
    if (typeof window === 'undefined' || (window as any).fbq) return

    const externalId = getOrCreateExternalId()

=======
export default function MetaPixel() {
  useEffect(() => {
>>>>>>> 9c6c5b50da503261352c11dedc74fca17e90cb52
    const script = document.createElement('script')
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
      s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}
      (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
<<<<<<< HEAD

      fbq('init', '${PIXEL_ID}', { external_id: '${externalId}' });
      fbq('track', 'PageView');
    `
    document.head.appendChild(script)

    return () => {
      // no removemos el script del head a propósito: fbq debe persistir
      // durante toda la sesión de navegación, no solo mientras el componente
      // está montado
    }
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
=======
      fbq('init', '1383716853246156', {
        external_id: localStorage.getItem('palace_uid') || (() => {
          const id = crypto.randomUUID();
          localStorage.setItem('palace_uid', id);
          return id;
        })()
      });
      
      fbq('track', 'PageView');
    `
    document.head.appendChild(script)
  }, [])
  return null
>>>>>>> 9c6c5b50da503261352c11dedc74fca17e90cb52
}
