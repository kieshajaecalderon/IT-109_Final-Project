
import { Suspense } from "react";
import { notFound } from "next/navigation";
import CanteenMenu from "./menu-client";

const canteens = [
  { id: 1, name: "Batok Hall Canteen – Left Side", location: "Left side of CMNSLSG, Batok Hall" },
  { id: 2, name: "Batok Hall Canteen – Right Side", location: "Right side of CMNSLSG, Batok Hall" },
  { id: 3, name: "Hiraya Canteen – Front", location: "In front of Hiraya" },
  { id: 4, name: "Hiraya Canteen – Inside", location: "Inside Hiraya" },
  { id: 5, name: "Library Canteen", location: "Right Side of the Library" },
  { id: 6, name: "CAA Canteen", location: "CAA Building" },
  { id: 7, name: "CED Canteen", location: "CED Building" },
  { id: 8, name: "BCC", location: "Beside the Boffo Canteen" },
  { id: 9, name: "Dear Coffee", location: "Beside the BCC Canteen" },
  { id: 10, name: "Boffo Canteen", location: "Beside the Library and Book Store" },
  { id: 11, name: "Kinaadman Canteen – Left Side", location: "Left side of Kinaadman" },
  { id: 12, name: "Kinaadman Canteen – Right Side", location: "Right side of Kinaadman" },
  { id: 13, name: "Villares Canteen", location: "Villares Building" },
];

export function generateStaticParams() {
  return canteens.map((canteen) => ({
    id: String(canteen.id),
  }));
}

// This component reads the route parameters inside Suspense.
async function CanteenMenuContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const canteen = canteens.find(
    (item) => item.id === Number(id)
  );

  if (!canteen) {
    notFound();
  }

  return <CanteenMenu canteen={canteen} />;
}

export default function CanteenMenuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBE8CE] px-6 py-20 text-center text-[#718653]">
          Loading canteen menu...
        </div>
      }
    >
      <CanteenMenuContent params={params} />
    </Suspense>
  );
}
