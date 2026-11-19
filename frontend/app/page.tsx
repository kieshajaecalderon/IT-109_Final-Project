
import Link from "next/link";

const features = [
  {
    icon: "🍽️",
    title: "Explore Canteens",
    description:
      "Discover participating campus canteens and browse their available food selections.",
    link: "/canteens",
    action: "Explore Canteens",
  },
  {
    icon: "🛒",
    title: "Order Your Meals",
    description:
      "Choose your favorite meals, add them to your cart, and conveniently place your order.",
    link: "/cart",
    action: "Start Ordering",
  },
  {
    icon: "🚚",
    title: "Campus Delivery",
    description:
      "Get your orders delivered by student delivery runners within the campus.",
    link: "/orders",
    action: "View Orders",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FBE8CE] text-[#303522]">

      {/* Hero Section */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:grid-cols-2 md:px-12 md:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C3CC9B] bg-[#E4DFB5] px-4 py-2 text-sm font-bold text-[#52643D]">
            <span className="h-2 w-2 rounded-full bg-[#718653]" />
            YOUR CAMPUS FOOD DESTINATION
          </span>

          <h1 className="mt-7 max-w-xl text-5xl font-semibold leading-[1.12] tracking-tight md:text-6xl">
            Good Food.
            <span className="block text-[#718653]">Easy Orders.</span>
            Campus Delivered.
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-[#65664F] md:text-lg">
            Discover campus canteens, order your favorite meals, and enjoy
            convenient delivery through one student-friendly platform.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="rounded-xl bg-[#9AB17A] px-7 py-4 font-bold text-[#303522] shadow-lg shadow-[#C3CC9B]/60 transition duration-300 hover:-translate-y-1 hover:bg-[#81965F] hover:shadow-xl"
            >
              Start Ordering →
            </Link>

            <Link
              href="#features"
              className="rounded-xl border border-[#9AB17A] bg-white/70 px-7 py-4 font-bold transition duration-300 hover:-translate-y-1 hover:bg-[#E4DFB5]"
            >
              Explore Features →
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm font-medium text-[#65664F]">
            <span>✓ Multiple Canteens</span>
            <span>✓ Easy Ordering</span>
            <span>✓ Campus Delivery</span>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-[2rem] bg-[#E4DFB5] p-8">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#C3CC9B]/60" />
          <div className="absolute -bottom-16 -left-12 h-56 w-56 rounded-full bg-[#9AB17A]/50" />

          <div className="relative z-10 w-full max-w-sm rounded-3xl border border-white/70 bg-white/80 p-8 text-center shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-[#FBE8CE] text-8xl">
              🍱
            </div>

            <h2 className="mt-7 text-2xl font-semibold">
              Your next favorite meal awaits.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#65664F]">
              Browse. Order. Enjoy.
            </p>

            <div className="mt-6 rounded-xl bg-[#C3CC9B]/50 px-4 py-3 text-sm font-semibold text-[#52643D]">
              Made for campus convenience
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white px-6 py-20 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#718653]">
              SIMPLE AND CONVENIENT
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Everything You Need in One Hub
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#777763]">
              A convenient platform connecting campus customers, canteen
              vendors, and student delivery runners.
            </p>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {features.map((feature, index) => (
              <Link
                key={feature.title}
                href={feature.link}
                className="group block rounded-2xl border border-[#E4DFB5] bg-[#FBE8CE]/40 p-8 transition duration-300 hover:-translate-y-2 hover:border-[#9AB17A] hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E4DFB5] text-3xl transition duration-300 group-hover:bg-[#C3CC9B]">
                  {feature.icon}
                </div>

                <p className="mt-6 text-xs font-bold tracking-widest text-[#9AB17A]">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-2 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#777763]">
                  {feature.description}
                </p>

                <p className="mt-6 text-sm font-bold text-[#718653] transition duration-300 group-hover:translate-x-2">
                  {feature.action} →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="bg-[#C3CC9B]/40 px-6 py-20 md:px-12"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#718653]">
            BUILT FOR YOUR CAMPUS
          </p>

          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
            Your Campus. Your Canteens. One Platform.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#555B43]">
            Multi-Canteen Order & Student Delivery Hub brings together
            students, faculty members, canteen vendors, and student delivery
            runners in one organized ordering system.
          </p>

          <Link
            href="/register"
            className="mt-9 inline-flex rounded-xl bg-[#718653] px-8 py-4 font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#52643D] hover:shadow-md"
          >
            Join CanteenHub →
          </Link>
        </div>
      </section>
    </div>
  );
}
