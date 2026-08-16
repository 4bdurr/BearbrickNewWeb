import React from "react";
import { ChevronRight } from "lucide-react";

export const DetailCard = ({ data, onShowMore = () => {} }) => {
  if (!data) return null;

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(247, 243, 211, 0.25) 100%)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
      }}
      className="relative flex h-full w-[460px] flex-col justify-between rounded-t-[44px] rounded-b-none border-t border-l border-white/80 p-10 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]"
    >
      {/* Bagian Atas: Title, Series & Deskripsi */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Title */}
        <h2 className="font-japanese text-4xl leading-[1.15] tracking-wider text-black select-none">
          {data.title || "KATSUSHIKA HOKUSAI"}
        </h2>

        {/* Series Info */}
        <p className="mt-5 font-mono text-sm font-semibold tracking-widest text-black/90 select-none">
          {data.series || "Series 46 | Exhibition Edition"}
        </p>

        {/* Scrollable Lore / Description */}
        <div className="no-scrollbar mt-6 flex-1 overflow-y-auto pr-2 font-mono text-[11.5px] leading-relaxed text-black/80 [scrollbar-width:none]">
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
      <div className="pt-6">
        <button
          type="button"
          onClick={onShowMore}
          className="flex items-center justify-center gap-2 rounded-full bg-[#F15A24] px-8 py-3.5 font-mono text-xs font-bold tracking-wider text-white shadow-md transition-all duration-200 hover:bg-[#d94815] hover:shadow-lg active:scale-95"
        >
          <span>Show more details</span>
          <ChevronRight size={15} className="stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

export default DetailCard;