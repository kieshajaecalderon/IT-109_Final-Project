
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const RUNNER_FEE = 5;

export default function CheckoutPage() {
  const { cartItems, subtotal } = useCart();

  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("gcash");

  const runnerFee = cartItems.length > 0 ? RUNNER_FEE : 0;
  const total = subtotal + runnerFee;

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#FBE8CE] px-6 py-20 text-center text-[#303522]">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-10 shadow-sm">
          <div className="text-6xl">🛒</div>
          <h1 className="mt-5 text-3xl font-semibold">
            Your cart is empty
          </h1>
          <p className="mt-3 text-[#777763]">
            Add some food items before proceeding to checkout.
          </p>
          <Link
            href="/canteens"
            className="mt-7 inline-block rounded-xl bg-[#718653] px-7 py-3 font-bold text-white hover:bg-[#52643D]"
          >
            Explore Canteens
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBE8CE] px-6 py-14 text-[#303522] md:px-12">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/cart"
          className="text-sm font-semibold text-[#718653] hover:text-[#52643D]"
        >
          ← Back to Cart
        </Link>

        <div className="mt-8">
          <p className="text-sm font-bold uppercase tracking-widest text-[#718653]">
            ALMOST THERE
          </p>
          <h1 className="mt-2 text-4xl font-semibold">
            Checkout
          </h1>
          <p className="mt-3 text-[#65664F]">
            Enter your campus delivery details and select a payment method.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_380px]">

          {/* Delivery and Payment Details */}
          <div className="space-y-7">

            <section className="rounded-2xl bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-semibold">
                1. Delivery Information
              </h2>

              <p className="mt-2 text-sm text-[#777763]">
                Tell the runner where to deliver your order on campus.
              </p>

              <div className="mt-7 space-y-5">

                <div>
                  <label
                    htmlFor="building"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Building / Campus Location
                  </label>
                  <input
                    id="building"
                    type="text"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    placeholder="e.g. CED Building"
                    className="w-full rounded-xl border border-[#D9D8BD] bg-white px-4 py-3 outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#718653]/20"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="room"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Room Number / Drop-off Point
                  </label>
                  <input
                    id="room"
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="e.g. Room 204 or Main Entrance"
                    className="w-full rounded-xl border border-[#D9D8BD] bg-white px-4 py-3 outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#718653]/20"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="instructions"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Additional Instructions (Optional)
                  </label>
                  <textarea
                    id="instructions"
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    placeholder="e.g. Please meet me near the building entrance."
                    rows={3}
                    className="w-full resize-none rounded-xl border border-[#D9D8BD] bg-white px-4 py-3 outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#718653]/20"
                  />
                </div>

              </div>
            </section>

            <section className="rounded-2xl bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-semibold">
                2. Payment Method
              </h2>

              <p className="mt-2 text-sm text-[#777763]">
                Choose how you would like to pay for your order.
              </p>

              <div className="mt-6 space-y-3">

                <label className={`flex cursor-pointer items-center gap-4 rounded-xl border p-5 transition ${
                  paymentMethod === "gcash"
                    ? "border-[#718653] bg-[#C3CC9B]/20"
                    : "border-[#E4DFB5] hover:bg-[#FBE8CE]/50"
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="gcash"
                    checked={paymentMethod === "gcash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-[#718653]"
                  />
                  <span className="text-2xl">📱</span>
                  <span>
                    <span className="block font-semibold">GCash</span>
                    <span className="text-xs text-[#777763]">
                      Pay through the GCash payment option.
                    </span>
                  </span>
                </label>

                <label className={`flex cursor-pointer items-center gap-4 rounded-xl border p-5 transition ${
                  paymentMethod === "card"
                    ? "border-[#718653] bg-[#C3CC9B]/20"
                    : "border-[#E4DFB5] hover:bg-[#FBE8CE]/50"
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-[#718653]"
                  />
                  <span className="text-2xl">💳</span>
                  <span>
                    <span className="block font-semibold">Debit / Credit Card</span>
                    <span className="text-xs text-[#777763]">
                      Pay using a supported bank card.
                    </span>
                  </span>
                </label>

              </div>

              <p className="mt-5 rounded-xl bg-[#FBE8CE] p-4 text-xs leading-6 text-[#65664F]">
                Payments will be processed through PayMongo Sandbox.
                No real payment will be collected during development.
              </p>
            </section>

          </div>

          {/* Order Summary */}
          <aside className="rounded-2xl bg-white p-7 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-2xl font-semibold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-5">
              {cartItems.map((item) => (
                <div
                  key={`${item.canteenId}-${item.id}`}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FBE8CE] text-2xl">
                    {item.image}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#777763]">
                      {item.quantity} × ₱{item.price.toFixed(2)}
                    </p>
                  </div>

                  <p className="text-sm font-bold">
                    ₱{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 space-y-4 border-t border-[#E4DFB5] pt-6 text-sm">

              <div className="flex justify-between">
                <span className="text-[#777763]">Food Subtotal</span>
                <span className="font-semibold">₱{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#777763]">Runner Fee</span>
                <span className="font-semibold">₱{runnerFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between border-t border-[#E4DFB5] pt-5 text-lg font-bold">
                <span>Total</span>
                <span className="text-[#718653]">
                  ₱{total.toFixed(2)}
                </span>
              </div>

            </div>

            <button
              type="button"
              disabled
              className="mt-7 w-full cursor-not-allowed rounded-xl bg-[#9AB17A] px-5 py-4 font-bold text-white opacity-70"
            >
              Continue to Payment
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-[#777763]">
              Payment processing will be enabled after backend integration.
            </p>

            <Link
              href="/cart"
              className="mt-5 block text-center text-sm font-semibold text-[#718653] hover:text-[#52643D]"
            >
              Edit Cart
            </Link>
          </aside>

        </div>
      </div>
    </main>
  );
}
