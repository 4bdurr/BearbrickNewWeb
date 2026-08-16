import React from "react";

export const VerticalSwatches = ({ patterns, activePatternId, onSelectPattern }) => {
  return (
    <div className="no-scrollbar flex h-full flex-col items-center gap-5 overflow-y-auto px-3 pb-6 scrollbar-none">
      {patterns.map((item) => {
        const isActive = activePatternId === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectPattern(item.id)}
            className="group flex flex-col items-center gap-1.5 p-1 outline-hidden cursor-pointer"
          >
            <div
              className={`h-14 w-14 overflow-hidden rounded-full border-2 transition-all duration-300 ${
                isActive
                  ? "scale-110 border-black shadow-md"
                  : "border-transparent opacity-80 group-hover:scale-105 group-hover:opacity-100"
              }`}
            >
              <img
                src={item.thumb}
                alt={item.name}
                className="h-full w-full object-cover pointer-events-none"
              />
            </div>
            <span
              className={`font-mono text-[10px] font-bold tracking-widest transition-colors ${
                isActive ? "text-black" : "text-black/60 group-hover:text-black"
              }`}
            >
              {item.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default VerticalSwatches;