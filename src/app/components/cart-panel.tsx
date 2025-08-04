'use client';
import { useCart } from '@/app/lib/store/cart';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function CartPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const cart = useCart();

  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 z-50 transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-xl font-bold">Cart</h2>
        <button onClick={onClose}><X /></button>
      </div>
      <div className="flex flex-col gap-4">
        {cart.items.map(item => (
          <div key={item.id} className="flex justify-between items-center text-sm">
            <div>
              <div className="font-semibold">{item.title}</div>
              <div>{item.quantity} × {(item.price / 100).toFixed(2)} {item.currency.toUpperCase()}</div>
            </div>
            <button className="text-red-500" onClick={() => cart.removeItem(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between font-semibold mb-4">
          <span>Total:</span>
          <span>{(cart.total() / 100).toFixed(2)} VES</span>
        </div>
        <Link
          href="/cart"
          className="block text-center bg-blue-800 text-white py-2 rounded hover:bg-blue-600"
        >
          Go to Cart
        </Link>
      </div>
    </div>
  );
}
