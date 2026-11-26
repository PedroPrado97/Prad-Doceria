import { useRef } from 'react';
import hero from '../assets/guirlanda-hero.jpg';
import marca from '../assets/marca-vermelha.png';
import { whatsappLink } from '../config';
import { daysToChristmas, useParallax } from '../hooks';
import { burst, Sprinkles, Up } from './ui';

const TITLE = 'Natal tem gosto de carinho.'.split(' ');
const STRIP = ['PUDINS', 'BOMBONS', 'GUIRLANDA', 'FEITO À MÃO'];

export default function Hero() {
  const bg = useRef<HTMLImageElement>(null);
  useParallax(bg, 0.12);
  const days = daysToChristmas();
  return (
    <section className="hero">
      <div className="hero-bg"><img ref={bg} src={hero} alt="" /><div className="hero-ov" /></div>
      <Sprinkles count={20} />
      <div className="hero-c">
        <Up className="pill">Cardápio de Natal</Up>
        <h1>{TITLE.map((w, i) => <span key={i} className="w" style={{ animationDelay: `${0.2 + i * 0.13}s` }}>{w}</span>)}</h1>
        <Up as="p" delay={0.5}>Pudins, bombons e uma guirlanda, feitos à mão para a sua mesa ficar completa.</Up>
        {days !== null && (
          <Up className="cd" delay={0.6}>
            <b>{days === 0 ? 'Hoje é Natal!' : days}</b>{days === 0 ? ' Feliz Natal 🎄' : days === 1 ? ' dia para o Natal' : ' dias para o Natal'}
          </Up>
        )}
        <Up className="acts" delay={0.7}>
          <a className="btn" href={whatsappLink('Olá, Pradô! Quero fazer meu pedido de Natal.')} target="_blank" rel="noopener noreferrer">Fazer meu pedido</a>
          <a className="lnk" href="#pudins">Ver o cardápio</a>
        </Up>
      </div>
      <div className="vt" aria-hidden="true">Natal 2026</div>
      <button className="stk" aria-label="Soltar confeitos" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2); }}>
        <svg viewBox="0 0 160 160" aria-hidden="true">
          <defs><path id="ring" d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" /></defs>
          <circle cx="80" cy="80" r="78" fill="#e295b1" />
          <g className="spin"><text fontSize="17" fontWeight="700" fill="#96181b"><textPath href="#ring" textLength="355">feito à mão ✦ feito à mão ✦ feito à mão ✦</textPath></text></g>
        </svg>
        <img src={marca} alt="" />
      </button>
      <div className="mq" aria-hidden="true">
        <div>{[0, 1, 2, 3].map((k) => <span key={k}>{STRIP.map((t) => <em key={t}>{t}<u>◆</u></em>)}</span>)}</div>
      </div>
    </section>
  );
}
