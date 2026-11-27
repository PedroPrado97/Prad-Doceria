import { CSSProperties, useState } from 'react';
import { useCart } from './cart';
import { ProductId } from './data';
import { useScrollState } from './hooks';
import { CartBar, CartDrawer } from './components/CartDrawer';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductModal from './components/ProductModal';
import { Bombons, Footer, Guirlanda, HowToOrder, Pudins } from './components/Sections';

export default function App() {
  const [open, setOpen] = useState<ProductId | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useCart();
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
      <CartBar cart={cart} onOpen={() => setCartOpen(true)} />
      <ProductModal productId={open} onClose={() => setOpen(null)} onAdd={cart.add} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />
    </>
  );
}
