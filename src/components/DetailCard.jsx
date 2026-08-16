import React from "react";

export const DetailCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="relative flex h-full w-[460px] flex-col justify-start rounded-t-[44px] rounded-b-none border-t border-l border-white/60 bg-[#F7F3D3]/65 p-10 shadow-[0_-10px_35px_rgba(0,0,0,0.06)] backdrop-blur-[24px] backdrop-saturate-150">
      {/* Title */}
      <h2 className="font-japanese text-4xl leading-[1.15] tracking-wider text-black select-none">
        {data.title || "KATSUSHIKA HOKUSAI"}
      </h2>

      {/* Series Info */}
      <p className="mt-6 font-mono text-sm font-semibold tracking-widest text-black/90 select-none">
        {data.series || "Series 46 | Exhibition Edition"}
      </p>

      {/* Scrollable Lore / Description */}
      <div className="no-scrollbar mt-8 flex-1 overflow-y-auto pr-2 font-mono text-[11.5px] leading-relaxed text-black/80 scrollbar-none">
        {data.artist && (
          <p className="mb-2 font-bold text-black uppercase tracking-wide">
            {data.artist}
          </p>
        )}
        <div className="space-y-3 whitespace-pre-line font-medium">
          {data.description}
        </div>
      </div>
    </div>
  );
};

export default DetailCard;