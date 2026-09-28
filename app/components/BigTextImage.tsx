/**
 * Antes rasterizaba el texto en un <canvas> (ver TextImage). Ahora es texto real,
 * accesible, seleccionable y escalable. Tamaño equivalente al de la imagen anterior.
 */
export default function BigTextImage({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-block align-middle text-[2.35rem] font-black leading-none text-white md:text-[3.5rem] ${className}`.trim()}
    >
      {text}
    </span>
  );
}
