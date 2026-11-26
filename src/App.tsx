import { CSSProperties, useState } from 'react';
import { ProductId } from './data';
import { useScrollState } from './hooks';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductModal from './components/ProductModal';
import { Bombons, Footer, Guirlanda, HowToOrder, Pudins } from './components/Sections';

export default function App() {
  const [open, setOpen] = useState<ProductId | null>(null);
  const { p, solid } = useScrollState();
  return (
    <>
      <div className="prog" style={{ '--p': p } as CSSProperties} />
      <Header solid={solid} />
      <main id="topo">
        <Hero />
        <Pudins onOpen={setOpen} />
        <Bombons onOpen={setOpen} />
        <Guirlanda onOpen={setOpen} />
        <HowToOrder />
      </main>
      <Footer />
      <ProductModal productId={open} onClose={() => setOpen(null)} />
    </>
  );
}
