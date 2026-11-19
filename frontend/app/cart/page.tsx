
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

const RUNNER_FEE = 5;

export default function CartPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    subtotal,
  } = useCart();

  const total = subtotal + (cartItems.length > 0 ? RUNNER_FEE : 0);

  return (
    <main className="min-h-screen bg-[#FBE8CE] px-6 py-14 text-[#303522] md:px-12">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/canteens"
          className="text-sm font-semibold text-[#718653] hover:text-[#52643D]"
        >
          ← Continue Shopping
        </Link>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#718653]">
              YOUR SELECTION
            </p>
            <h1 className="mt-2 text-4xl font-semibold">
              Shopping Cart
            </h1>
            <p className="mt-2 text-[#65664F]">
              Review your selected food items before checkout.
            </p>
          </div>

          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="rounded-xl border border-red-300 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <section className="mt-12 rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="text-7xl">🛒</div>

            <h2 className="mt-6 text-2xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mt-3 text-[#777763]">
              You haven't added any food items yet.
            </p>

            <Link
              href="/canteens"
              className="mt-7 inline-block rounded-xl bg-[#718653] px-7 py-3 font-bold text-white transition hover:bg-[#52643D]"
            >
              Explore Canteens
            </Link>
          </section>
        ) : (
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_350px]">

            {/* Cart Items */}
            <section className="space-y-5">

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="font-semibold">
                  {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
                </p>
              </div>

              {cartItems.map((item) => (
                <article
                  key={`${item.canteenId}-${item.id}`}
                  className="rounded-2xl bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-[#FBE8CE] text-5xl">
                      {item.image}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#718653]">
                        {item.canteenName}
                      </p>

                      <h3 className="mt-1 text-lg font-semibold">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-[#777763]">
                        {item.category}
                      </p>

                      <p className="mt-2 font-bold text-[#718653]">
                        ₱{item.price.toFixed(2)} each
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.canteenId,
                              item.quantity - 1
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E4DFB5] text-lg font-bold hover:bg-[#C3CC9B]"
                        >
                          −
                        </button>

                        <span className="min-w-6 text-center font-bold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.canteenId,
                              item.quantity + 1
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E4DFB5] text-lg font-bold hover:bg-[#C3CC9B]"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold">
                          ₱{(item.price * item.quantity).toFixed(2)}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id, item.canteenId)
                          }
                          className="mt-2 text-xs font-semibold text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>

                    </div>
                  </div>
                </article>
              ))}
            </section>

            {/* Order Summary */}
            <aside className="rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-xl font-semibold">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4 text-sm">

                <div className="flex justify-between gap-3">
                  <span className="text-[#777763]">
                    Food Subtotal
                  </span>
                  <span className="font-semibold">
                    ₱{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-[#777763]">
                    Runner Service Fee
                  </span>
                  <span className="font-semibold">
                    ₱{cartItems.length > 0 ? RUNNER_FEE.toFixed(2) : "0.00"}
                  </span>
                </div>

                <div className="border-t border-[#E4DFB5] pt-4">
                  <div className="flex justify-between gap-3 text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#718653]">
                      ₱{total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
  		href="/checkout"
  		className="mt-7 block w-full rounded-xl bg-[#718653] px-5 py-4 text-center font-bold text-white transition hover:bg-[#52643D]"
	      >
  		Proceed to Checkout →
		</Link>

              <p className="mt-3 text-center text-xs leading-5 text-[#777763]">
                Checkout and payment will be connected in the next steps.
              </p>

              <p className="mt-5 rounded-xl bg-[#FBE8CE] p-4 text-xs leading-5 text-[#65664F]">
                The runner fee is currently set to a sample ₱5.00.
                The final fee will follow the project's delivery fee rules.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
