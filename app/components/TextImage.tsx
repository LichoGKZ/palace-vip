'use client'

import { useState, useEffect } from 'react'

interface TextImageProps {
  text: string
  className?: string
  fontSize?: number
  color?: string
  fontWeight?: string
}

const cache: Record<string, string> = {}

export default function TextImage({ 
  text, 
  className = '', 
  fontSize = 16,
  color = '#ffffff',
  fontWeight = '700'
}: TextImageProps) {
  const [dataUrl, setDataUrl] = useState<string>('')

  useEffect(() => {
    if (cache[text]) {
      setDataUrl(cache[text])
      return
    }

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Medir texto
    ctx.font = `${fontWeight} ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
    const metrics = ctx.measureText(text)
    
    // Dimensiones con padding
    const paddingX = 2
    const paddingY = 4
    canvas.width = metrics.width + (paddingX * 2)
    canvas.height = fontSize + (paddingY * 2)

    // Dibujar fondo transparente
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Dibujar texto
    ctx.font = `${fontWeight} ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
    ctx.fillStyle = color
    ctx.textBaseline = 'middle'
    ctx.fillText(text, paddingX, canvas.height / 2)

    const url = canvas.toDataURL('image/png')
    cache[text] = url
    setDataUrl(url)
  }, [text, fontSize, color, fontWeight])

  if (!dataUrl) {
    return <span className={className} style={{ opacity: 0 }}>{text}</span>
  }

  return (
    <img 
      src={dataUrl} 
      alt="" 
      aria-hidden="true"
      className={`inline-block ${className}`}
      style={{ 
        height: `${fontSize}px`, 
        width: 'auto',
        verticalAlign: 'middle',
        pointerEvents: 'none'
      }}
    />
  )
}