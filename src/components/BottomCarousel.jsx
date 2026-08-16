import React from "react";

export const BottomCarousel = ({ patterns, activePatternId, onSelectPattern }) => {
  // Gandakan item agar 1 track pasti lebih panjang dari layar monitor
  const baseItems = patterns.length < 8 ? [...patterns, ...patterns, ...patterns] : [...patterns, ...patterns];

  const renderTrack = (trackName) => (
    <div className="flex shrink-0 items-center gap-7 pr-7 animate-marquee-right group-hover:[animation-play-state:paused]">
      {baseItems.map((item, index) => {
        const isActive = activePatternId === item.id;
        return (
          <button
            key={`${trackName}-${item.id}-${index}`}
            type="button"
            onClick={() => onSelectPattern(item.id)}
            className="group/item flex shrink-0 flex-col items-center gap-2 cursor-pointer outline-none"
          >
            {/* Thumbnail Bulat */}
            <div
              className={`relative h-18 w-18 overflow-hidden rounded-full border-2 transition-all duration-300 ${
                isActive
                  ? "scale-110 border-black shadow-md"
                  : "border-transparent opacity-85 group-hover/item:scale-105 group-hover/item:opacity-100"
              }`}
            >
              <img
                src={item.thumb}
                alt={item.name}
                className="h-full w-full object-cover pointer-events-none"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            {/* Label Font Monospaced */}
            <span
              className={`font-mono text-xs font-bold tracking-widest transition-colors ${
                isActive ? "text-black" : "text-black/70 group-hover/item:text-black"
              }`}
            >
              {item.name}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="group relative z-30 flex w-full overflow-hidden px-4 pb-6 select-none">
      {/* Track 1 */}
      {renderTrack("track1")}
      {/* Track 2 (Menyambung tepat di sebelahnya secara mulus) */}
      {renderTrack("track2")}
    </div>
  );
};

export default BottomCarousel;