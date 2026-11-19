
import Link from "next/link";

const canteens = [
  {
    id: 1,
    name: "Batok Hall Canteen – Left Side",
    category: "Campus Canteen",
    location: "Left side of CMNSLSG, Batok Hall",
    image: "🍛",
    color: "bg-[#E4DFB5]",
  },
  {
    id: 2,
    name: "Batok Hall Canteen – Right Side",
    category: "Campus Canteen",
    location: "Right side of CMNSLSG, Batok Hall",
    image: "🍱",
    color: "bg-[#C3CC9B]/50",
  },
  {
    id: 3,
    name: "Hiraya Canteen – Front",
    category: "Campus Canteen",
    location: "In front of Hiraya",
    image: "🥘",
    color: "bg-[#FBE8CE]",
  },
  {
    id: 4,
    name: "Hiraya Canteen – Inside",
    category: "Campus Canteen",
    location: "Inside Hiraya",
    image: "🍜",
    color: "bg-[#E4DFB5]",
  },
  {
    id: 5,
    name: "Library Canteen",
    category: "Campus Canteen",
    location: "Right Side of the Library",
    image: "🥪",
    color: "bg-[#C3CC9B]/50",
  },
  {
    id: 6,
    name: "CAA Canteen",
    category: "Campus Canteen",
    location: "CAA Building",
    image: "🍗",
    color: "bg-[#FBE8CE]",
  },
  {
    id: 7,
    name: "CED Canteen",
    category: "Campus Canteen",
    location: "CED Building",
    image: "🍲",
    color: "bg-[#E4DFB5]",
  },
  {
    id: 8,
    name: "BCC",
    category: "Food Establishment",
    location: "Beside the Boffo Canteen",
    image: "🍔",
    color: "bg-[#C3CC9B]/50",
  },
  {
    id: 9,
    name: "Dear Coffee",
    category: "Coffee Shop",
    location: "Beside the BCC Canteen",
    image: "☕",
    color: "bg-[#FBE8CE]",
  },
  {
    id: 10,
    name: "Boffo Canteen",
    category: "Campus Canteen",
    location: "Beside the Library and book Store",
    image: "🍟",
    color: "bg-[#E4DFB5]",
  },
  {
    id: 11,
    name: "Kinaadman Canteen – Left Side",
    category: "Campus Canteen",
    location: "Left side of Kinaadman",
    image: "🍛",
    color: "bg-[#C3CC9B]/50",
  },
  {
    id: 12,
    name: "Kinaadman Canteen – Right Side",
    category: "Campus Canteen",
    location: "Right side of Kinaadman",
    image: "🍱",
    color: "bg-[#FBE8CE]",
  },

  {
    id: 13,
    name: "Villares Canteen",
    category: "Campus Canteen",
    location: "Villares Building",
    image: "🍜",
    color: "bg-[#FBE8CE]",
  },

];

export default function CanteensPage() {
  return (
    <div className="min-h-screen bg-[#FBE8CE] text-[#303522]">

      {/* Page Heading */}
      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#718653]">
            CARAGA STATE UNIVERSITY
          </p>

          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
            Explore Our Canteens
          </h1>

          <p className="mt-5 max-w-2xl leading-8 text-[#65664F]">
            Discover food establishments around Caraga State University.
            Browse different campus canteens, find your favorite meals,
            and conveniently order from one platform.
          </p>
        </div>
      </section>

      {/* Canteen Listings */}
      <section className="bg-white px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">
                Campus Food Establishments
              </h2>
              <p className="mt-2 text-sm text-[#777763]">
                Select an establishment to browse its menu.
              </p>
            </div>

            <span className="rounded-full bg-[#E4DFB5] px-4 py-2 text-sm font-semibold text-[#52643D]">
              {canteens.length} Establishments
            </span>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {canteens.map((canteen) => (
              <article
                key={canteen.id}
                className="overflow-hidden rounded-2xl border border-[#E4DFB5] bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div
                  className={`flex h-48 items-center justify-center ${canteen.color}`}
                >
                  <span className="text-8xl">{canteen.image}</span>
                </div>

                <div className="p-7">
                  <span className="rounded-full bg-[#E4DFB5] px-3 py-1 text-xs font-bold text-[#52643D]">
                    {canteen.category}
                  </span>

                  <h3 className="mt-5 text-xl font-semibold">
                    {canteen.name}
                  </h3>

                  <p className="mt-3 text-sm text-[#65664F]">
                    📍 {canteen.location}
                  </p>

                  <Link
                    href={`/canteens/${canteen.id}`}
                    className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#718653] px-5 py-3 font-bold text-white transition hover:bg-[#52643D]"
                  >
                    View Menu →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="px-6 py-10 text-center">
        <Link
          href="/"
          className="font-semibold text-[#718653] hover:text-[#52643D]"
        >
          ← Back to Home
        </Link>
      </section>
    </div>
  );
}
