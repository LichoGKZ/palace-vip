interface TextImageProps {
  text: string;
  className?: string;
  fontSize?: number;
  color?: string;
  fontWeight?: string;
}

/**
 * Antes dibujaba el texto en un <canvas> y lo mostraba como <img alt="" aria-hidden>.
 * Eso lo hacía invisible para lectores de pantalla, no escalaba con el zoom, se veía borroso
 * en pantallas retina y agregaba trabajo de JS en el cliente. Ahora es texto real
 * (misma API, sin JS de cliente).
 */
export default function TextImage({
  text,
  className = "",
  fontSize = 16,
  color = "#ffffff",
  fontWeight = "700",
}: TextImageProps) {
  return (
    <span
      className={`inline-block align-middle ${className}`.trim()}
      style={{ fontSize: `${fontSize}px`, color, fontWeight, lineHeight: 1.2 }}
    >
      {text}
    </span>
  );
}
