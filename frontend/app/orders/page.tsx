
"use client";

import Link from "next/link";
import { useState } from "react";

type OrderStatus =
  | "Paid"
  | "Preparing"
  | "Ready for Pickup"
  | "Out for Delivery"
  | "Delivered";

type Order = {
  id: string;
  date: string;
  canteen: string;
  items: string[];
  total: number;
  status: OrderStatus;
};

const sampleOrders: Order[] = [
  {
    id: "CH-1001",
    date: "November 18, 2026",
    canteen: "Batok Hall Canteen – Left Side",
    items: ["Chicken Adobo Rice", "Iced Coffee"],
    total: 155,
    status: "Out for Delivery",
  },
  {
    id: "CH-1002",
    date: "November 17, 2026",
    canteen: "Hiraya Canteen – Front",
    items: ["Pork Sisig Rice", "Bottled Water"],
    total: 120,
    status: "Delivered",
  },
  {
    id: "CH-1003",
    date: "November 16, 2026",
    canteen: "Library Canteen",
    items: ["Cheeseburger", "French Fries"],
    total: 125,
    status: "Preparing",
  },
];

const statuses: OrderStatus[] = [
  "Paid",
  "Preparing",
  "Ready for Pickup",
  "Out for Delivery",
  "Delivered",
];

function getStatusColor(status: OrderStatus) {
  switch (status) {
    case "Paid":
      return "bg-blue-100 text-blue-700";
    case "Preparing":
      return "bg-yellow-100 text-yellow-700";
    case "Ready for Pickup":
      return "bg-purple-100 text-purple-700";
    case "Out for Delivery":
      return "bg-orange-100 text-orange-700";
    case "Delivered":
      return "bg-[#C3CC9B] text-[#303522]";
  }
}

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#FBE8CE] px-6 py-14 text-[#303522] md:px-12">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/"
          className="text-sm font-semibold text-[#718653] hover:text-[#52643D]"
        >
          ← Back to Home
        </Link>

        <div className="mt-8">
          <p className="text-sm font-bold uppercase tracking-widest text-[#718653]">
            CUSTOMER DASHBOARD
          </p>

          <h1 className="mt-2 text-4xl font-semibold">
            My Orders
          </h1>

          <p className="mt-3 text-[#65664F]">
            View your orders and follow their delivery progress.
          </p>
        </div>

        {/* Sample Data Notice */}
        <div className="mt-8 rounded-xl border border-[#D9D8BD] bg-white p-4 text-sm text-[#65664F]">
          These are demonstration orders. Your actual order history will
          appear here after backend integration.
        </div>

        {/* Order List */}
        <section className="mt-8 space-y-6">

          {sampleOrders.map((order) => {
            const currentStep = statuses.indexOf(order.status);
            const isExpanded = selectedOrder === order.id;

            return (
              <article
                key={order.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >

                <div className="p-6 md:p-8">

                  {/* Order Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4">

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#718653]">
                        ORDER NUMBER
                      </p>

                      <h2 className="mt-1 text-xl font-bold">
                        {order.id}
                      </h2>

                      <p className="mt-2 text-sm text-[#777763]">
                        {order.date}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-4 py-2 text-xs font-bold ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>

                  </div>

                  {/* Canteen */}
                  <div className="mt-6 rounded-xl bg-[#FBE8CE] p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#718653]">
                      ORDERED FROM
                    </p>

                    <p className="mt-1 font-semibold">
                      {order.canteen}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div className="mt-6">
                    <p className="text-sm font-bold">
                      Ordered Items
                    </p>

                    <ul className="mt-3 space-y-2">
                      {order.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 text-sm text-[#65664F]"
                        >
                          <span>🍽️</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Total and Details */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#E4DFB5] pt-5">

                    <div>
                      <p className="text-xs text-[#777763]">
                        Total Amount
                      </p>

                      <p className="mt-1 text-xl font-bold text-[#718653]">
                        ₱{order.total.toFixed(2)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedOrder(
                          isExpanded ? null : order.id
                        )
                      }
                      className="rounded-xl border border-[#718653] px-5 py-3 text-sm font-bold text-[#718653] transition hover:bg-[#C3CC9B]/30"
                    >
                      {isExpanded ? "Hide Details" : "Track Order"}
                    </button>

                  </div>

                  {/* Order Tracking */}
                  {isExpanded && (
                    <div className="mt-8 border-t border-[#E4DFB5] pt-7">

                      <h3 className="text-lg font-semibold">
                        Delivery Progress
                      </h3>

                      <p className="mt-2 text-sm text-[#777763]">
                        Follow the progress of your order from payment
                        confirmation to delivery.
                      </p>

                      <div className="mt-7 space-y-5">

                        {statuses.map((status, index) => {
                          const completed = index <= currentStep;
                          const current = index === currentStep;

                          return (
                            <div
                              key={status}
                              className="flex items-start gap-4"
                            >
                              <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                                  completed
                                    ? "bg-[#718653] text-white"
                                    : "bg-[#E4DFB5] text-[#777763]"
                                }`}
                              >
                                {completed ? "✓" : index + 1}
                              </div>

                              <div className="pt-1">
                                <p
                                  className={`font-semibold ${
                                    current
                                      ? "text-[#718653]"
                                      : completed
                                        ? "text-[#303522]"
                                        : "text-[#999985]"
                                  }`}
                                >
                                  {status}
                                  {current ? " — Current Status" : ""}
                                </p>

                                {current && (
                                  <p className="mt-1 text-xs text-[#777763]">
                                    Your order is currently at this stage.
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}

                      </div>
                    </div>
                  )}

                </div>
              </article>
            );
          })}

        </section>

        {/* Continue Shopping */}
        <div className="mt-10 text-center">
          <Link
            href="/canteens"
            className="inline-block rounded-xl bg-[#718653] px-7 py-3 font-bold text-white transition hover:bg-[#52643D]"
          >
            Order More Food →
          </Link>
        </div>

      </div>
    </main>
  );
}
