import type { ComponentPropsWithoutRef } from "react";

const base =
  "inline-flex items-center justify-center transition-colors active:scale-[0.99] motion-reduce:transition-none motion-reduce:active:scale-100";

const variants = {
  primary:
    "min-h-12 rounded-xl bg-white px-7 text-base font-bold text-neutral-950 hover:bg-white/90",
  secondary:
    "min-h-12 rounded-xl px-5 text-base font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline",
  outline:
    "min-h-11 rounded-full border border-white/15 px-5 text-sm font-semibold hover:bg-white/10",
} as const;

type Props = ComponentPropsWithoutRef<"a"> & {
  variant?: keyof typeof variants;
};

/** Enlace con estilo de botón. Objetivos táctiles >= 44px; el foco visible es global. */
export default function CtaLink({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  return (
    <a
      {...props}
      className={`${base} ${variants[variant]} ${className}`.trim()}
    />
  );
}
