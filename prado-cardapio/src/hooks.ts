import { RefObject, useEffect, useRef, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Retorna true assim que o elemento entra na tela (uma única vez). */
export function useInView<T extends Element>(): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

/** Parallax sutil: desloca a imagem conforme a posição do contêiner na tela. */
export function useParallax(ref: RefObject<HTMLElement>, factor = -0.05) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let tick = false;
    const update = () => {
      tick = false;
      const box = el.parentElement!.getBoundingClientRect();
      const h = window.innerHeight;
      if (box.bottom < 0 || box.top > h) return;
      el.style.transform = `translateY(${(box.top + box.height / 2 - h / 2) * factor}px)`;
    };
    const onScroll = () => { if (!tick) { tick = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref, factor]);
}
