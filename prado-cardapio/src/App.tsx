import { useState } from 'react';
import { ProductId } from './data';
import Header from './components/Header';
import ProductModal from './components/ProductModal';
import { Bombons, Categories, Footer, Guirlanda, Hero, HowToOrder, Pudins } from './components/Sections';

export default function App() {
  const [open, setOpen] = useState<ProductId | null>(null);
  return (
    <>
      <Header />
      <main id="topo">
        <Hero />
        <Categories />
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
