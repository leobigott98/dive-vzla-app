"use client";
import { useCart } from "@/app/lib/store/cart";
import { useEffect, useState } from "react";
import { Product } from "@/app/models/product";
import { getProducts } from "@/app/lib/data"; // from file or DB
import Image from "next/image";
import CartPanel from "@/app/components/cart-panel";
//import Link from 'next/link';
//import { useTranslations } from 'next-intl';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isCartOpen, setCartOpen] = useState(false);
  const cart = useCart();

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchAndSetProducts();
  }, []);

  //const t = useTranslations('shop');

  return (
    <main className="px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tienda</h1>
      {!products ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded shadow p-4 flex flex-col"
            >
              <Image
                //src={product.image} <-- UNCOMMENT THIS LINE WHEN YOU HAVE THE REAL IMAGES
                src='/images/products/snorkel-stock-img.jpg' // COMMENT THIS OUT WHEN YOU HAVE THE REAL IMAGES
                alt={product.title}
                width={200}
                height={150}
                className="rounded mx-auto"
              />
              <h2 className="mt-2 font-semibold">{product.title}</h2>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="mt-1 font-bold text-lg">
                {(product.price / 100).toFixed(2)}{" "}
                {product.currency.toUpperCase()}
              </p>
              <button
                type="button"
                onClick={() => {
                  cart.addItem(product);
                  setCartOpen(true);
                }}
                className="mt-2 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                buy
              </button>
            </div>
          ))}
        </div>
      )}
      <CartPanel open={isCartOpen} onClose={() => setCartOpen(false)} />
    </main>
  );
}
