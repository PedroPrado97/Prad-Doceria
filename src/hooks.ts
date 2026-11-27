import { RefObject, useEffect, useRef, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Retorna true assim que o elemento entra na tela (uma única vez). */
export function useInView<T extends Element>(observeParent = false): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.15 });
    // observa o contêiner: o próprio elemento pode estar recortado (clip-path) e nunca "aparecer"
    io.observe(observeParent && el.parentElement ? el.parentElement : el);
    return () => io.disconnect();
  }, [observeParent]);
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

/** Inclinação 3D suave seguindo o ponteiro (só em dispositivos com mouse). */
export function useTilt<T extends HTMLElement>(max = 6) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia('(hover: hover)').matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * max}deg`);
      el.style.setProperty('--rx', `${-((e.clientY - r.top) / r.height - 0.5) * max}deg`);
    };
    const leave = () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
  }, [max]);
  return ref;
}

/** Id da seção visível no momento (destaca o menu). */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-40% 0px -55% 0px' });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/** Progresso de rolagem (0–1) e se já saiu do topo. */
export function useScrollState() {
  const [s, setS] = useState({ p: 0, solid: false });
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setS({ p: max > 0 ? Math.min(1, window.scrollY / max) : 0, solid: window.scrollY > 40 });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return s;
}

/** Dias até o Natal (null depois de 25/12). */
export function daysToChristmas(now = new Date()): number | null {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const xmas = new Date(now.getFullYear(), 11, 25);
  const d = Math.round((xmas.getTime() - today.getTime()) / 86400000);
  return d >= 0 ? d : null;
}

/** Diálogo nativo com animação de entrada/saída, ESC e clique fora. */
export function useAnimatedDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const d = ref.current;
    if (!d || !open) return;
    if (!d.open) d.showModal();
    document.documentElement.style.overflow = 'hidden';
    const raf = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(raf);
  }, [open]);
  const close = () => {
    setShown(false);
    window.setTimeout(() => {
      ref.current?.close();
      document.documentElement.style.overflow = '';
      onClose();
    }, prefersReducedMotion() ? 0 : 320);
  };
  return { ref, shown, close };
}
