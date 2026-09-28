// components/BigTextImage.tsx
'use client'

import { useState, useEffect } from 'react'

const cache: Record<string, string> = {}

export default function BigTextImage({ text, className = '' }: { text: string, className?: string }) {
  const [dataUrl, setDataUrl] = useState<string>('')

  useEffect(() => {
    if (cache[text]) {
      setDataUrl(cache[text])
      return
    }

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Tamaño grande responsive
    const fontSize = 72
    ctx.font = `900 ${fontSize}px sans-serif`
    const metrics = ctx.measureText(text)
    
    canvas.width = metrics.width + 20
    canvas.height = fontSize + 20

    ctx.font = `900 ${fontSize}px sans-serif`
    ctx.fillStyle = '#ffffff'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, 10, canvas.height / 2)

    const url = canvas.toDataURL('image/png')
    cache[text] = url
    setDataUrl(url)
  }, [text])

  if (!dataUrl) return <span className={className}>{text}</span>

  return (
    <img 
      src={dataUrl} 
      alt="" 
      aria-hidden="true"
      className={`inline-block h-[48px] md:h-[72px] w-auto ${className}`}
    />
  )
}