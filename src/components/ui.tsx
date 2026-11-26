import { AnchorHTMLAttributes, createElement, CSSProperties, HTMLAttributes, ImgHTMLAttributes, ReactNode, useRef } from 'react';
import { useInView, useParallax } from '../hooks';

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
  const css = { ...style, '--d': `${delay}s` } as CSSProperties;
  return createElement(as, { ref, className: `up${seen ? ' in' : ''} ${className}`.trim(), style: css, ...rest }, children);
}

interface PhotoProps { src: string; alt: string; className?: string; delay?: number; }

/** Foto com revelação por máscara e parallax. */
export function Photo({ src, alt, className = '', delay = 0 }: PhotoProps) {
  const [ref, seen] = useInView<HTMLDivElement>();
  const img = useRef<HTMLImageElement>(null);
  useParallax(img);
  return (
    <div ref={ref} className={`ph rv${seen ? ' in' : ''} ${className}`.trim()} style={{ transitionDelay: `${delay}s` }}>
      <img ref={img} src={src} alt={alt} loading="lazy" />
    </div>
  );
}

/** Confeitos decorativos do logotipo, com movimento discreto. */
export function Sprinkles({ count }: { count: number }) {
  return (
    <div className="spr" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const r = (k: number) => Math.sin(i * k + k) * 0.5 + 0.5;
        return (
          <i key={i} style={{
            left: `${r(12.9) * 100}%`, top: `${r(78.2) * 100}%`,
            transform: `rotate(${r(3.3) * 180}deg)`, animationDelay: `-${r(5.1) * 9}s`,
            background: i % 3 ? 'var(--pink)' : 'var(--cream)',
          }} />
        );
      })}
    </div>
  );
}

/** "Bombom de Uva" → Bombom + itálico "de Uva" */
export function Title({ name }: { name: string }) {
  const [first, ...rest] = name.split(' ');
  return <>{first} <i>{rest.join(' ')}</i></>;
}
