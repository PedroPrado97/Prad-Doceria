import logo from '../assets/logo.png';
import { formatBRL, PRODUCTS, ProductId } from '../data';
import { INSTAGRAM, whatsappLink } from '../config';
import ProductCard from './ProductCard';
import { Photo, Sprinkles, Up } from './ui';

interface OpenProps { onOpen: (id: ProductId) => void; }
const P = PRODUCTS;

export function Hero() {
  return (
    <section className="hero">
      <Sprinkles count={22} />
      <div className="hero-in">
        <div>
          <Up as="img" className="logo" src={logo} alt="Pradô doceria" />
          <Up as="h1" delay={0.15}>Doces feitos à mão, com carinho, para a sua mesa de Natal.</Up>
          <Up as="p" delay={0.3}>Pudins, bombons e uma guirlanda de brownie para dividir, presentear e enfeitar.</Up>
          <Up as="a" className="btn cream" delay={0.45} href="#categorias">Conheça nosso cardápio</Up>
        </div>
        <div className="stage">
          <Photo className="a arch" src={P.gu.image} alt="Guirlanda de brownie decorada com cremes, frutas e detalhes dourados" />
          <Photo className="b" delay={0.4} src={P.bm.image} alt="Bombom de morango" />
        </div>
      </div>
    </section>
  );
}

export function Categories() {
  const cats = [
    { href: '#pudins', title: 'Pudins', sub: 'para dividir à mesa', img: P.pp.image },
    { href: '#bombons', title: 'Bombons', sub: 'para se presentear', img: P.bu.image },
    { href: '#guirlanda', title: 'Guirlanda', sub: 'para enfeitar a mesa', img: P.gu.image },
  ];
  return (
    <section className="sec" id="categorias">
      <div className="wrap">
        <Up as="h2">O que você quer levar para a mesa?</Up>
        <div className="cats">
          {cats.map((c, i) => (
            <Up as="a" key={c.href} className="cat" href={c.href} delay={i * 0.12}>
              <Photo className="arch" src={c.img} alt={c.title} />
              <b>{c.title}</b><small>{c.sub}</small>
            </Up>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pudins({ onOpen }: OpenProps) {
  return (
    <section className="sec" id="pudins" style={{ paddingTop: 24 }}>
      <div className="wrap">
        <Up as="h2">Pudins</Up>
        <Up as="p" className="sub">para dividir à mesa</Up>
        <div className="pud">
          <ProductCard product={P.pp} onOpen={onOpen} shape="circ" />
          <ProductCard product={P.pg} onOpen={onOpen} shape="circ" className="g" />
        </div>
      </div>
    </section>
  );
}

export function Bombons({ onOpen }: OpenProps) {
  return (
    <section className="sec bom" id="bombons">
      <div className="wrap">
        <Up as="h2">Bombons</Up>
        <Up as="p" className="sub">para se presentear</Up>
        <div className="bg">
          <ProductCard product={P.bu} onOpen={onOpen} />
          <ProductCard product={P.bm} onOpen={onOpen} className="m" />
        </div>
      </div>
    </section>
  );
}

export function Guirlanda({ onOpen }: OpenProps) {
  return (
    <section className="sec gui" id="guirlanda">
      <Sprinkles count={16} />
      <div className="wrap row">
        <Up className="ring"><Photo className="circ" src={P.gu.image} alt="Guirlanda de brownie" /></Up>
        <div>
          <Up as="h2">Guirlanda de Brownie</Up>
          <Up as="p" className="sub">para enfeitar a mesa</Up>
          <Up as="p">{P.gu.description}</Up>
          <Up className="pr">{formatBRL(P.gu.price)}</Up>
          <Up as="button" className="btn cream" onClick={() => onOpen('gu')}>Ver detalhes e pedir</Up>
        </div>
      </div>
    </section>
  );
}

export function HowToOrder() {
  const steps = [
    ['Escolha', 'Toque no doce, confira tamanho e preço e defina a quantidade.'],
    ['Envie', 'O botão do WhatsApp abre a conversa com a Pradô com o pedido já escrito.'],
    ['Combine', 'Acerte os detalhes diretamente com a Pradô, na conversa.'],
  ];
  return (
    <section className="sec" id="como-pedir">
      <div className="wrap">
        <Up as="h2">Como fazer seu pedido</Up>
        <div className="steps">
          {steps.map(([t, d], i) => (
            <Up key={t} delay={i * 0.1}><h3>{t}</h3><p>{d}</p></Up>
          ))}
        </div>
        <Up as="a" className="btn wa" href={whatsappLink('Olá, Pradô! Quero fazer uma encomenda.')} target="_blank" rel="noopener noreferrer">
          Falar no WhatsApp
        </Up>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="end">
      <Sprinkles count={18} />
      <img src={logo} alt="Pradô doceria" />
      <Up as="h2">Feito à mão, com carinho, para quem você ama.</Up>
      <div className="acts">
        <a className="btn cream" href={whatsappLink('Olá, Pradô!')} target="_blank" rel="noopener noreferrer">Pedir pelo WhatsApp</a>
        {INSTAGRAM && (
          <a className="btn" style={{ background: 'var(--pink)', color: 'var(--red)' }}
             href={`https://instagram.com/${INSTAGRAM.replace('@', '')}`} target="_blank" rel="noopener noreferrer">Instagram</a>
        )}
      </div>
    </footer>
  );
}
