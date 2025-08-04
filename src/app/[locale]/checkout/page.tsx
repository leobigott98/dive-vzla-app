'use client';
import { useCart } from '@/app/lib/store/cart';

export default function Page() {
  const cart = useCart();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ cart: cart.items }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleCheckout} className="space-y-4">
        <input type="text" placeholder="Name" required className="w-full border p-2 rounded" />
        <input type="email" placeholder="Email" required className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded w-full">
          Pay with Stripe
        </button>
      </form>
    </main>
  );
}
