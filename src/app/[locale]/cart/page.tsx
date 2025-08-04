'use client';
import { useCart } from '@/app/lib/store/cart';
import Link from 'next/link';

export default function CartPage() {
  const cart = useCart();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y">
            {cart.items.map(item => (
              <li key={item.id} className="py-4 flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p>{item.quantity} × {(item.price / 100).toFixed(2)} {item.currency.toUpperCase()}</p>
                </div>
                <button onClick={() => cart.removeItem(item.id)} className="text-red-500">Remove</button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between font-bold">
            <span>Total:</span>
            <span>{(cart.total() / 100).toFixed(2)} VES</span>
          </div>
          <Link href="/checkout" className="block text-center mt-6 bg-green-700 text-white py-2 rounded hover:bg-green-600">
            Proceed to Checkout
          </Link>
        </>
      )}
    </main>
  );
}
