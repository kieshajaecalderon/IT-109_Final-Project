
"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

type Canteen = {
  id: number;
  name: string;
  location: string;
};

const menuItems = [
  {
    id: 1,
    name: "Chicken Adobo Rice",
    category: "Rice Meals",
    description: "A Filipino favorite served with steamed rice.",
    price: 85,
    image: "🍗",
  },
  {
    id: 2,
    name: "Pork Sisig Rice",
    category: "Rice Meals",
    description: "Savory pork sisig served with rice.",
    price: 95,
    image: "🍛",
  },
  {
    id: 3,
    name: "Fried Chicken Rice",
    category: "Rice Meals",
    description: "Crispy fried chicken with steamed rice.",
    price: 90,
    image: "🍗",
  },
  {
    id: 4,
    name: "Pancit Canton",
    category: "Noodles",
    description: "Filipino-style stir-fried noodles.",
    price: 60,
    image: "🍜",
  },
  {
    id: 5,
    name: "Ham and Cheese Sandwich",
    category: "Snacks",
    description: "A simple and delicious sandwich.",
    price: 45,
    image: "🥪",
  },
  {
    id: 6,
    name: "Cheeseburger",
    category: "Snacks",
    description: "Burger with cheese and fresh vegetables.",
    price: 65,
    image: "🍔",
  },
  {
    id: 7,
    name: "French Fries",
    category: "Snacks",
    description: "Golden and crispy potato fries.",
    price: 50,
    image: "🍟",
  },
  {
    id: 8,
    name: "Iced Coffee",
    category: "Drinks",
    description: "Refreshing chilled coffee.",
    price: 65,
    image: "🧋",
  },
  {
    id: 9,
    name: "Bottled Water",
    category: "Drinks",
    description: "Refreshing bottled drinking water.",
    price: 20,
    image: "💧",
  },
];

const categories = [
  "All",
  "Rice Meals",
  "Noodles",
  "Snacks",
  "Drinks",
];

export default function CanteenMenu({
  canteen,
}: {
  canteen: Canteen;
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addedMessage, setAddedMessage] = useState("");

  const { addToCart, cartCount } = useCart();

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter(
          (item) => item.category === selectedCategory
        );

  const handleAddToCart = (item: (typeof menuItems)[number]) => {
    addToCart({
      ...item,
      canteenId: canteen.id,
      canteenName: canteen.name,
    });

    setAddedMessage(`${item.name} added to your cart!`);
  };

  return (
    <main className="min-h-screen bg-[#FBE8CE] text-[#303522]">

      {/* Canteen Header */}
      <section className="px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">

          <Link
            href="/canteens"
            className="text-sm font-semibold text-[#718653] transition hover:text-[#52643D]"
          >
            ← Back to Canteens
          </Link>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#718653]">
            CARAGA STATE UNIVERSITY
          </p>

          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
            {canteen.name}
          </h1>

          <p className="mt-4 text-[#65664F]">
            📍 {canteen.location}
          </p>

          <p className="mt-5 max-w-2xl leading-8 text-[#65664F]">
            Explore the available food selections from this campus
            establishment and find something delicious for your next meal.
          </p>

        </div>
      </section>

      {/* Menu Section */}
      <section className="bg-white px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">

          {/* Menu Heading */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#718653]">
                FOOD SELECTION
              </p>

              <h2 className="mt-2 text-3xl font-semibold">
                Explore the Menu
              </h2>

              <p className="mt-2 text-sm text-[#777763]">
                Browse food items and their prices.
              </p>
            </div>

            <Link
              href="/cart"
              className="rounded-xl bg-[#718653] px-6 py-3 font-bold text-white transition hover:bg-[#52643D]"
            >
              View Cart ({cartCount}) →
            </Link>

          </div>

          {/* Add to Cart Confirmation */}
          {addedMessage && (
            <div className="mb-6 rounded-xl bg-[#C3CC9B]/40 p-4 text-sm font-semibold text-[#52643D]">
              ✓ {addedMessage}
            </div>
          )}

          {/* Clickable Categories */}
          <div className="mb-10 flex flex-wrap gap-3">

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setAddedMessage("");
                }}
                className={`rounded-full px-6 py-3 text-sm font-semibold transition duration-200 ${
                  selectedCategory === category
                    ? "bg-[#718653] text-white shadow-md"
                    : "bg-[#E4DFB5] text-[#52643D] hover:bg-[#C3CC9B]"
                }`}
              >
                {category}
              </button>
            ))}

          </div>

          {/* Item Count */}
          <p className="mb-6 text-sm text-[#777763]">
            Showing {filteredItems.length} menu items
          </p>

          {/* Food Cards */}
          {filteredItems.length > 0 ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-[#E4DFB5] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* Food Image */}
                  <div className="flex h-48 items-center justify-center bg-[#FBE8CE]">
                    <span className="text-8xl">
                      {item.image}
                    </span>
                  </div>

                  {/* Food Details */}
                  <div className="p-6">

                    <span className="rounded-full bg-[#E4DFB5] px-3 py-1 text-xs font-bold text-[#52643D]">
                      {item.category}
                    </span>

                    <h3 className="mt-4 text-xl font-semibold">
                      {item.name}
                    </h3>

                    <p className="mt-2 min-h-12 text-sm leading-6 text-[#777763]">
                      {item.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between">

                      <span className="text-xl font-bold text-[#718653]">
                        ₱{item.price.toFixed(2)}
                      </span>

                      <span className="rounded-lg bg-[#C3CC9B]/40 px-3 py-2 text-xs font-semibold text-[#52643D]">
                        Sample Item
                      </span>

                    </div>

                    {/* Add to Cart Button */}
                    <button
                      type="button"
                      onClick={() => handleAddToCart(item)}
                      className="mt-5 w-full rounded-xl bg-[#718653] px-5 py-3 font-bold text-white transition hover:bg-[#52643D] active:scale-95"
                    >
                      + Add to Cart
                    </button>

                  </div>
                </article>
              ))}

            </div>
          ) : (
            <p className="rounded-xl bg-[#FBE8CE] p-8 text-center text-[#65664F]">
              No menu items available in this category.
            </p>
          )}

          {/* Sample Data Notice */}
          <p className="mt-10 rounded-xl bg-[#FBE8CE] p-5 text-sm leading-7 text-[#65664F]">
            Note: These are demonstration menu items and prices only.
            Actual food selections, prices, and availability will be
            provided by the participating canteen vendors.
          </p>

        </div>
      </section>

      {/* Bottom Navigation */}
      <section className="px-6 py-10 text-center">
        <Link
          href="/canteens"
          className="font-semibold text-[#718653] transition hover:text-[#52643D]"
        >
          ← Explore Other Canteens
        </Link>
      </section>

    </main>
  );
}
