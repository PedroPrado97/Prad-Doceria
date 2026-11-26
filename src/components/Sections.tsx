import logo from '../assets/logo.png';
import { formatBRL, PRODUCTS, Product, ProductId } from '../data';
import { INSTAGRAM_URL, whatsappLink } from '../config';
import { useTilt } from '../hooks';
import { InstagramIcon, Sparkle, WhatsAppIcon } from './Icons';
import { Photo, Sprinkles, Up } from './ui';

interface OpenProps { onOpen: (id: ProductId) => void; }
const P = PRODUCTS;
const Price = ({ v }: { v: number }) => <div className="price"><small>R$</small>{formatBRL(v).slice(3)}</div>;

function PudimCard({ p, onOpen, delay }: { p: Product; onOpen: (id: ProductId) => void; delay: number }) {
  const tilt = useTilt<HTMLDivElement>();
  const [name, size] = p.name.split(' ');
  return (
    <Up as="button" className="cardw" delay={delay} onClick={() => onOpen(p.id)} aria-label={`Ver detalhes de ${p.name}`}>
      <div className="card" ref={tilt}>
        <Photo src={p.image} alt={p.name} />
        <div className="ct">
          <span className="pill sm">Tamanho {size}</span>
          <h3>{name} <i>{size}</i></h3>
          <p>{p.description}</p>
          <div className="mt">{p.serving}</div>
          <Price v={p.price} />
          <span className="btn dark">Ver e pedir ↗</span>
        </div>
      </div>
    </Up>
  );
}

function BombomItem({ p, onOpen, shape, delay }: { p: Product; onOpen: (id: ProductId) => void; shape: string; delay: number }) {
  return (
    <Up as="button" className="bi" delay={delay} onClick={() => onOpen(p.id)} aria-label={`Ver detalhes de ${p.name}`}>
      <Photo className={shape} src={p.image} alt={p.name} />
      <span className="nm">{p.name}</span>
      <Price v={p.price} />
      <span className="pill sm">Para se presentear</span>
    </Up>
  );
}

export function Pudins({ onOpen }: OpenProps) {
  return (
    <section className="sec" id="pudins">
      <i className="blob b1" /><i className="blob b2" />
      <Sprinkles count={10} />
      <div className="wrap">
        <div className="hd">
          <Up className="pill">Da nossa cozinha para a sua mesa</Up>
          <Up as="h2" className="big">Pudins</Up>
          <Up as="p" className="sub">Para dividir à mesa, feitos à mão.</Up>
        </div>
        <div className="cards">
          <PudimCard p={P.pp} onOpen={onOpen} delay={0} />
          <PudimCard p={P.pg} onOpen={onOpen} delay={0.12} />
        </div>
      </div>
    </section>
  );
}

export function Bombons({ onOpen }: OpenProps) {
  return (
    <section className="sec red scal" id="bombons">
      <i className="blob b3" />
      <Sparkle style={{ left: '8%', top: '16%' }} /><Sparkle style={{ right: '10%', top: '10%', animationDelay: '-1s' }} /><Sparkle style={{ right: '5%', top: '34%', animationDelay: '-2s' }} />
      <div className="wrap">
        <div className="hd">
          <Up className="pill">Para presentear</Up>
          <Up as="h2" className="big">Bombons</Up>
          <Up as="p" className="sub">Pequenos momentos de doçura para compartilhar.</Up>
        </div>
        <div className="bomrow">
          <BombomItem p={P.bu} onOpen={onOpen} shape="circ" delay={0} />
          <BombomItem p={P.bm} onOpen={onOpen} shape="rt" delay={0.15} />
        </div>
      </div>
    </section>
  );
}

export function Guirlanda({ onOpen }: OpenProps) {
  return (
    <section className="sec" id="guirlanda">
      <i className="blob b4" />
      <Sparkle style={{ right: '8%', top: '12%' }} /><Sparkle style={{ right: '44%', bottom: '10%', animationDelay: '-1.5s' }} />
      <div className="wrap gr">
        <Photo className="gph" src={P.gu.image} alt="Guirlanda de brownie decorada com cremes, frutas e detalhes dourados" />
        <div className="gt">
          <Up as="h2" className="big">Guirlanda</Up>
          <Up as="p" className="sub">Para enfeitar a mesa.</Up>
          <Up className="pill">Especial de Natal</Up>
          <Up as="p" delay={0.1}>{P.gu.description}</Up>
          <Up delay={0.15}><Price v={P.gu.price} /></Up>
          <Up as="button" className="btn dark" delay={0.2} onClick={() => onOpen('gu')}>Ver e pedir ↗</Up>
        </div>
      </div>
    </section>
  );
}

export function HowToOrder() {
  const steps = [
    ['Escolha', 'Toque no doce e defina tamanho e quantidade.'],
    ['Envie', 'O pedido já vai escrito para o WhatsApp da Pradô.'],
    ['Combine', 'Acerte os detalhes direto na conversa.'],
  ];
  return (
    <section className="sec" id="como-pedir" style={{ paddingBottom: 40 }}>
      <div className="wrap">
        <div className="hd"><Up as="h2" className="mid">Como fazer seu pedido</Up></div>
        <div className="steps">
          {steps.map(([t, d], i) => <Up key={t} delay={i * 0.1}><h3>{t}</h3><p>{d}</p></Up>)}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="end scal">
      <Sprinkles count={18} />
      <img src={logo} alt="Pradô doceria" />
      <Up as="h2">Feito à mão, com carinho, para quem você ama.</Up>
      <div className="acts">
        <a className="btn" href={whatsappLink('Olá, Pradô! Vim pelo cardápio de Natal.')} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />WhatsApp</a>
        <a className="btn cream" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><InstagramIcon />Instagram</a>
      </div>
    </footer>
  );
}
