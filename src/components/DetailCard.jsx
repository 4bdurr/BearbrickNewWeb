import React from "react";
import { ChevronRight } from "lucide-react";

export const DetailCard = ({ data, onShowMore = () => {} }) => {
  if (!data) return null;

  return (
    <div className="relative flex h-full w-115 flex-col justify-between overflow-hidden rounded-t-2xl rounded-b-none p-10 bg-linear-to-b from-white/60 via-white/30 to-white/10 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_-15px_35px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]">
      {/* Layer Kilau Cahaya (Refleksi Kaca Diagonal) */}
      <div className="pointer-events-none absolute -left-1/2 -top-1/2 h-[200%] w-[200%] rotate-12 bg-linear-to-br from-white/30 via-transparent to-transparent" />

      {/* Konten tetap di atas layer kilau */}
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        {/* Title */}
        <h2 className="font-japanese text-4xl leading-[1.15] tracking-wider text-black select-none">
          {data.title || "KATSUSHIKA HOKUSAI"}
        </h2>

        {/* Series Info */}
        <p className="mt-5 font-mono text-sm font-semibold tracking-widest text-black/90 select-none">
          {data.series || "Series 46 | Exhibition Edition"}
        </p>

        {/* Scrollable Lore / Description */}
        <div className="no-scrollbar mt-6 flex-1 overflow-y-auto pr-2 font-mono text-[11.5px] leading-relaxed text-black/80 scrollbar-none">
          {data.artist && (
            <p className="mb-2 font-bold uppercase tracking-wide text-black">
              {data.artist}
            </p>
          )}
          <div className="space-y-3 font-medium whitespace-pre-line">
            {data.description}
          </div>
        </div>
      </div>

      {/* Bagian Bawah: Action Button */}
      <div className="relative z-10 pt-6">
        <button
          type="button"
          onClick={onShowMore}
          className="flex w-64 items-center justify-between rounded-full bg-[#F15A24] px-6 py-3.5 font-mono text-xs font-bold tracking-wider text-white shadow-md transition-all duration-200 hover:bg-[#d94815] hover:shadow-lg active:scale-95"
        >
          <span>Show more details</span>
          <ChevronRight size={15} className="stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

export default DetailCard;
