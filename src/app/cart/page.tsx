"use client";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, updateQty } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal - discount;

  console.log("Cart items:", cart);


  return (
    <section className="min-h-screen bg-white dark:bg-black text-black dark:text-white py-16 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Product List */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
          {cart.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded shadow"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-gray-500 dark:text-gray-300">
                    Rs.{item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="px-2 border rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="bg-gray-100 dark:bg-[#494848] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>Rs.{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Discount</span>
            <span>-Rs.{discount.toFixed(2)}</span>
          </div>

          <div className="border-t border-gray-300 dark:border-gray-700 my-4" />

          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>Rs.{total.toFixed(2)}</span>
          </div>

          <input
            type="text"
            placeholder="Coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full p-2 mb-3 rounded border dark:bg-black dark:text-white"
          />

          <button
            onClick={() => setDiscount(coupon.toLowerCase() === "rr10" ? 10 : 0)}
            className="w-full bg-[#c9a566] text-white py-2 rounded hover:opacity-90 mb-4"
          >
            Apply Coupon
          </button>

          <button className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded hover:opacity-90">
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
