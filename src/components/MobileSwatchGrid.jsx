import React from "react";

export const MobileSwatchGrid = ({ patterns, activePatternId, onSelectPattern }) => {
  return (
    <div className="w-full bg-[#F7F3D3]/80 py-3 px-4 backdrop-blur-md border-t border-black/10 shadow-lg">
      <div className="no-scrollbar grid grid-cols-5 gap-2.5 max-h-[135px] overflow-y-auto [scrollbar-width:none]">
        {patterns.map((item) => {
          const isActive = activePatternId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectPattern(item.id)}
              className="flex flex-col items-center gap-1 outline-hidden"
            >
              <div
                className={`h-11 w-11 overflow-hidden rounded-full border-2 transition-all duration-200 ${
                  isActive
                    ? "scale-105 border-black shadow-md"
                    : "border-transparent opacity-75 hover:opacity-100"
                }`}
              >
                <img
                  src={item.thumb}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <span
                className={`font-mono text-[9px] font-bold tracking-tighter truncate max-w-full ${
                  isActive ? "text-black" : "text-black/60"
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileSwatchGrid;