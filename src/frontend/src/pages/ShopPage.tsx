import { PART_IMAGES, fallbackParts } from "@/data/fallbackData";
import { useGetParts } from "@/hooks/useQueries";
import { useCartStore } from "@/store/cartStore";
import { Check, Package, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORIES = [
  "ALL",
  "TURBOS",
  "EXHAUSTS",
  "WHEELS",
  "SUSPENSION",
] as const;
type Category = (typeof CATEGORIES)[number];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const { data: parts } = useGetParts();
  const allParts = parts && parts.length > 0 ? parts : fallbackParts;
  const { addToCart, cartItems } = useCartStore();

  const filtered =
    activeCategory === "ALL"
      ? allParts
      : allParts.filter((p) => p.category === activeCategory);

  const handleAddToCart = (part: (typeof fallbackParts)[0]) => {
    if (!part.inStock) return;
    addToCart({ name: part.name, price: part.price });
    toast.success(`Added to cart: ${part.name}`, {
      description: `\u00a3${part.price.toLocaleString()}`,
      style: {
        background: "#121821",
        border: "1px solid rgba(24,230,255,0.3)",
        color: "#F2F6F8",
      },
    });
  };

  return (
    <div className="pt-16">
      <section
        className="py-24 text-center"
        style={{
          background: "linear-gradient(180deg, #0d1117 0%, #0B0F14 100%)",
          borderBottom: "1px solid rgba(24,230,255,0.15)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[1200px] mx-auto px-6"
        >
          <p
            className="font-mono-data text-xs uppercase tracking-[0.4em] mb-3"
            style={{ color: "#18E6FF" }}
          >
            &gt; GENUINE OEM &amp; AFTERMARKET PARTS
          </p>
          <h1
            className="font-racing text-5xl sm:text-7xl"
            style={{ color: "#F2F6F8" }}
          >
            PERFORMANCE{" "}
            <span
              style={{
                color: "#18E6FF",
                textShadow: "0 0 30px rgba(24,230,255,0.8)",
              }}
            >
              PARTS
            </span>
          </h1>
          {cartItems.length > 0 && (
            <div
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full"
              style={{
                background: "rgba(24,230,255,0.1)",
                border: "1px solid rgba(24,230,255,0.3)",
                color: "#18E6FF",
              }}
            >
              <ShoppingCart size={14} />
              <span className="font-mono-data text-xs">
                {cartItems.length} ITEM{cartItems.length > 1 ? "S" : ""} IN CART
              </span>
            </div>
          )}
        </motion.div>
      </section>

      <section className="py-16 max-w-[1200px] mx-auto px-6">
        <div className="flex gap-2 mb-10 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              data-ocid="shop.tab"
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full font-mono-data text-xs uppercase tracking-widest transition-all duration-200"
              style={{
                background:
                  activeCategory === cat ? "#18E6FF" : "rgba(24,230,255,0.05)",
                color: activeCategory === cat ? "#0B0F14" : "#A7B0BA",
                border: `1px solid ${activeCategory === cat ? "#18E6FF" : "rgba(24,230,255,0.2)"}`,
                boxShadow:
                  activeCategory === cat
                    ? "0 0 15px rgba(24,230,255,0.4)"
                    : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((part, i) => {
            const inCart = cartItems.some((c) => c.name === part.name);
            return (
              <motion.div
                key={part.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                data-ocid={`shop.item.${i + 1}`}
                className="group rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: "#121821",
                  border: "1px solid rgba(24,230,255,0.15)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(24,230,255,0.5)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 20px rgba(24,230,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(24,230,255,0.15)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div className="aspect-[3/2] overflow-hidden relative">
                  <img
                    src={
                      PART_IMAGES[part.category] ??
                      "/assets/generated/part-turbo.dim_600x400.jpg"
                    }
                    alt={part.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span
                      className="font-mono-data text-[10px] uppercase tracking-wider px-2 py-1 rounded"
                      style={{
                        background: "rgba(24,230,255,0.2)",
                        color: "#18E6FF",
                        border: "1px solid rgba(24,230,255,0.3)",
                      }}
                    >
                      {part.category}
                    </span>
                    <span
                      className="font-mono-data text-[10px] uppercase tracking-wider px-2 py-1 rounded flex items-center gap-1"
                      style={{
                        background: part.inStock
                          ? "rgba(34,197,94,0.2)"
                          : "rgba(239,68,68,0.2)",
                        color: part.inStock ? "#4ade80" : "#f87171",
                        border: `1px solid ${part.inStock ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
                      }}
                    >
                      <Package size={10} />{" "}
                      {part.inStock ? "IN STOCK" : "OUT OF STOCK"}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3
                    className="font-racing text-lg mb-1 uppercase leading-tight"
                    style={{ color: "#F2F6F8" }}
                  >
                    {part.name}
                  </h3>
                  <p
                    className="text-xs mb-4"
                    style={{ color: "#A7B0BA", lineHeight: 1.6 }}
                  >
                    {part.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono-data text-2xl font-bold"
                      style={{ color: "#18E6FF" }}
                    >
                      &pound;{part.price.toLocaleString()}
                    </span>
                    <button
                      type="button"
                      data-ocid={`shop.item.${i + 1}.button`}
                      onClick={() => handleAddToCart(part)}
                      disabled={!part.inStock}
                      className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200"
                      style={{
                        background: !part.inStock
                          ? "rgba(255,255,255,0.05)"
                          : inCart
                            ? "rgba(34,197,94,0.2)"
                            : "#18E6FF",
                        color: !part.inStock
                          ? "#555"
                          : inCart
                            ? "#4ade80"
                            : "#0B0F14",
                        cursor: !part.inStock ? "not-allowed" : "pointer",
                        border: inCart
                          ? "1px solid rgba(34,197,94,0.3)"
                          : "none",
                      }}
                    >
                      {inCart ? (
                        <>
                          <Check size={12} /> ADDED
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={12} /> ADD TO CART
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
