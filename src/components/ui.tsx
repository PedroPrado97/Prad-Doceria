import { AnchorHTMLAttributes, CSSProperties, ElementType, HTMLAttributes, ImgHTMLAttributes, ReactNode, useRef } from 'react';
import { prefersReducedMotion, useInView, useParallax } from '../hooks';

type UpProps = HTMLAttributes<HTMLElement> &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'> &
  Pick<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
    as?: string;
    delay?: number;
    children?: ReactNode;
  };

/** Elemento que surge suavemente ao entrar na tela. */
export function Up({ as = 'div', delay = 0, className = '', style, children, ...rest }: UpProps) {
  const [ref, seen] = useInView<HTMLElement>();
  const Tag: ElementType = as;
  const css = { ...style, '--d': `${delay}s` } as CSSProperties;
  return (
    <Tag ref={ref} className={`up${seen ? ' in' : ''} ${className}`.trim()} style={css} {...rest}>
      {children}
    </Tag>
  );
}

interface PhotoProps { src: string; alt: string; className?: string; delay?: number; }

/** Foto com revelação por máscara e parallax. */
export function Photo({ src, alt, className = '', delay = 0 }: PhotoProps) {
  const [ref, seen] = useInView<HTMLDivElement>(true);
  const img = useRef<HTMLImageElement>(null);
  useParallax(img);
  return (
    <div ref={ref} className={`ph rv${seen ? ' in' : ''} ${className}`.trim()} style={{ transitionDelay: `${delay}s` }}>
      <img ref={img} src={src} alt={alt} />
    </div>
  );
}

/** Confeitos decorativos: flutuam ou caem como neve. */
export function Sprinkles({ count, fall = false }: { count: number; fall?: boolean }) {
  return (
    <div className={`spr${fall ? ' fall' : ''}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const r = (k: number) => Math.sin(i * k + k) * 0.5 + 0.5;
        const base = { left: `${r(12.9) * 100}%`, background: i % 3 ? 'var(--pink)' : 'var(--cream)' };
        const style = fall
          ? { ...base, '--t': `${9 + r(5.1) * 9}s`, '--dl': `-${r(7.7) * 14}s`, rotate: `${r(3.3) * 180}deg` }
          : { ...base, top: `${r(78.2) * 100}%`, transform: `rotate(${r(3.3) * 180}deg)`, animationDelay: `-${r(5.1) * 9}s` };
        return <i key={i} style={style as CSSProperties} />;
      })}
    </div>
  );
}

/** Estrelinha que pisca. */
export const Star = ({ style }: { style: CSSProperties }) => (
  <svg className="sp" viewBox="0 0 24 24" style={style} aria-hidden="true">
    <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" />
  </svg>
);

/** Bolinha de Natal pendurada que balança. */
export const Bauble = ({ style }: { style: CSSProperties }) => (
  <div className="bauble" style={style} aria-hidden="true"><i /></div>
);

/** Fio com coração que se desenha ao rolar. */
export function HeartLine() {
  const [ref, seen] = useInView<SVGSVGElement>();
  return (
    <svg ref={ref} className={`hl${seen ? ' in' : ''}`} viewBox="0 0 600 70" aria-hidden="true">
      <path pathLength={1} d="M0 45C90 5 170 80 262 40c22-10 30-26 38-14 8-12 16 4 38 14 92 40 172-35 262 5" />
    </svg>
  );
}

/** "Bombom de Uva" → Bombom + "de Uva" em rosa */
export function Title({ name }: { name: string }) {
  const [first, ...rest] = name.split(' ');
  return <>{first} <i>{rest.join(' ')}</i></>;
}

/** Chuva de confeitos a partir de um ponto da tela. */
export function burst(x: number, y: number) {
  if (prefersReducedMotion()) return;
  for (let i = 0; i < 26; i++) {
    const s = document.createElement('i');
    s.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:7px;height:16px;border-radius:5px;z-index:90;pointer-events:none;background:${i % 2 ? '#e295b1' : '#f5f0e8'}`;
    document.body.appendChild(s);
    const a = Math.random() * Math.PI * 2, d = 90 + Math.random() * 160;
    s.animate(
      [{ transform: 'translate(0,0) rotate(0)', opacity: 1 },
       { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d + 120}px) rotate(${Math.random() * 540}deg)`, opacity: 0 }],
      { duration: 1100 + Math.random() * 600, easing: 'cubic-bezier(.2,.7,.3,1)' },
    ).onfinish = () => s.remove();
  }
}
