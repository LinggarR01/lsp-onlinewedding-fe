// src/components/OurCatalogue.jsx
import { CheckSquare } from "lucide-react"; // atau pakai react-icons jika mau

const PACKAGES = [
  {
    name: "Intimate Wedding",
    price: "Rp 30.000.000 – Rp 50.000.000",
    gradient: "from-pink-500 to-rose-600",
    bulletColor: "bg-pink-400",
    items: [
      "Venue indoor/outdoor kapasitas 50–100 tamu",
      "Dekorasi sederhana (bunga segar lokal, backdrop akad, meja resepsi)",
      "Catering 3 menu utama + 2 snack (buffet gaya tradisional)",
      "Dokumentasi foto selama acara (1 fotografer, 100 edited photos)",
      "MC non-profesional (internal tim)",
      "Sound system standar",
    ],
  },
  {
    name: "Elegant Wedding",
    price: "Rp 80.000.000 – Rp 120.000.000",
    gradient: "from-violet-800 to-fuchsia-700",
    bulletColor: "bg-violet-500",
    items: [
      "Include Intimate Wedding",
      "Venue ballroom / garden kapasitas 200–300 tamu",
      "Dekorasi elegan (bunga segar premium, photo booth, pelaminan modern)",
      "Catering upgrade → 5 menu utama + 3 snack + dessert corner",
      "Dokumentasi lengkap (2 fotografer + 1 videografer, cinematic highlight 5 menit, 300 edited photos)",
      "Make up pengantin + keluarga inti (2 orang)",
    ],
  },
  {
    name: "Luxury Wedding",
    price: "Rp 250.000.000 – Rp 400.000.000",
    gradient: "from-yellow-500 to-amber-600",
    bulletColor: "bg-yellow-400",
    items: [
      "Include Elegant Wedding",
      "Make up & wardrobe pengantin (2 gaun, 2 jas), keluarga inti & bridesmaid",
      "Wedding organizer (WO) full service",
      "Catering internasional → 8 menu utama + live cooking + dessert bar",
      "Dekorasi mewah custom (bunga impor, chandelier, wedding gate premium)",
      "Sound system profesional + LED screen",
      "Honeymoon package (3D2N Bali / Lombok)",
    ],
  },
];

export default function OurCatalogue() {
  return (
    <section className="bg-[#0f0f11] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-wide mb-12">
          Our Catalogue
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <article
              key={i}
              className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/10"
            >
              {/* header gradient */}
              <div className={`bg-gradient-to-br ${p.gradient} p-6`}>
                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm md:text-base font-semibold">
                  Price Start : <span className="font-bold">{p.price}</span>
                </p>
                <p className="mt-4 text-sm uppercase tracking-wider opacity-90">
                  What you get?
                </p>
              </div>

              {/* body */}
              <div className="bg-zinc-900/60 backdrop-blur-sm p-6">
                <ul className="space-y-3">
                  {p.items.map((it, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span
                        className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded-sm ${p.bulletColor}`}
                        aria-hidden
                      >
                        <CheckSquare className="h-4 w-4 text-zinc-950" />
                      </span>
                      <span className="text-zinc-200 leading-relaxed">
                        {it}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
