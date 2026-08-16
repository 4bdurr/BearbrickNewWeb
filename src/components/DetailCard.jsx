import React from "react";
import { ChevronRight } from "lucide-react";

export const DetailCard = ({ data, onShowMore = () => {} }) => {
  if (!data) return null;

  return (
    <div className="relative flex h-145 w-115 flex-col justify-between rounded-[36px] border border-black/5 bg-[#F9F6E5]/90 p-8 shadow-2xl backdrop-blur-md">
      {/* Title & Series */}
      <div>
        <h2 className="font-japanese text-3xl leading-tight tracking-wider text-black">
          {data.title}
        </h2>
        <p className="mt-3 font-mono text-xs font-semibold tracking-widest text-black/80">
          {data.series}
        </p>

        {/* Scrollable Lore / Description Container */}
        <div className="mt-5 h-70 overflow-y-auto pr-3 text-[11px] font-medium leading-relaxed text-black/85 scrollbar-thin">
          <p className="font-bold text-black">{data.artist}</p>
          <div className="mt-2 whitespace-pre-line">{data.description}</div>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={onShowMore}
        className="flex items-center justify-center gap-2 rounded-full bg-[#F15A24] px-6 py-3 font-mono text-xs font-bold tracking-wider text-white shadow-md transition-all hover:bg-[#d94815] hover:scale-[1.02] active:scale-[0.98]"
      >
        <span>Show more details</span>
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default DetailCard;