"use client";

import { useEffect, useState } from "react";

type Props = {
  href: string;
  label: string;
  /** ids de secciones que ya muestran un CTA; el sticky se oculta mientras alguna esté en pantalla */
  hideWhileVisible: readonly string[];
};

/** CTA fijo inferior solo en móvil (< md), con safe area y sin robar foco cuando está oculto. */
export default function StickyCta({ href, label, hideWhileVisible }: Props) {
  const [visible, setVisible] = useState(false);
  const key = hideWhileVisible.join(",");

  useEffect(() => {
    const targets = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const inView = new Set<Element>();

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) inView.add(entry.target);
        else inView.delete(entry.target);
      }
      setVisible(inView.size === 0);
    });

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-neutral-950/90 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] backdrop-blur transition-[transform,opacity,visibility] duration-200 motion-reduce:transition-none md:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "invisible translate-y-4 opacity-0"
      }`}
    >
      <a
        href={href}
        className="flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-6 text-base font-bold text-neutral-950 active:scale-[0.99] motion-reduce:active:scale-100"
      >
        {label}
      </a>
    </div>
  );
}
