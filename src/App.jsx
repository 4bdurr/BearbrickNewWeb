import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { X, Search, Menu } from "lucide-react";
import { FaInstagram, FaXTwitter, FaFacebookF } from "react-icons/fa6";
import BottomCarousel from "./components/BottomCarousel.jsx";
import VerticalSwatches from "./components/VerticalSwatches.jsx";
import DetailCard from "./components/DetailCard.jsx";
import BearbrickViewer from "./components/BearbrickViewer.jsx";
import { patterns } from "./data/patterns.js";

export const App = () => {
  const [activePatternId, setActivePatternId] = useState(patterns[0].id);
  const [isDetailView, setIsDetailView] = useState(false);

  const currentPattern =
    patterns.find((p) => p.id === activePatternId) || patterns[0];

  return (
    <div className="relative flex h-screen w-screen flex-col justify-between overflow-hidden bg-grid-paper">
      {/* Background Gunung Fuji */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <img
          src="/images/Mount_Fuji.png"
          alt="Mount Fuji"
          className="w-full min-w-300 max-w-[1600px] object-cover opacity-20 select-none translate-y-4"
        />
      </div>

      {/* Header Bar */}
      <header className="relative z-30 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <h1 className="font-black text-2xl tracking-tighter text-black uppercase select-none">
            BE@RBRICK™
          </h1>
          <div className="h-5 w-5 rounded-full bg-[#D61B1F] shadow-xs" />
        </div>

        {isDetailView ? (
          <button
            type="button"
            onClick={() => setIsDetailView(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-black transition-transform hover:scale-110 cursor-pointer"
            aria-label="Close detail view"
          >
            <X size={28} />
          </button>
        ) : (
          <div className="flex items-center gap-6">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search collection..."
                className="h-9 w-60 rounded-full border border-black/80 bg-transparent px-4 pr-9 text-xs font-medium text-black placeholder:text-black/50 focus:outline-hidden focus:ring-1 focus:ring-black"
              />
              <Search
                size={14}
                className="absolute right-3.5 text-black/80 pointer-events-none"
              />
            </div>

            <div className="flex items-center gap-4 text-black">
              <a
                href="#instagram"
                className="transition-transform hover:scale-110"
              >
                <FaInstagram size={17} />
              </a>
              <a
                href="#twitter"
                className="transition-transform hover:scale-110"
              >
                <FaXTwitter size={15} />
              </a>
              <a
                href="#facebook"
                className="transition-transform hover:scale-110"
              >
                <FaFacebookF size={15} />
              </a>
            </div>

            <button
              type="button"
              className="flex items-center justify-center text-black transition-transform hover:scale-105"
              aria-label="Toggle navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        )}
      </header>

      {/* Stage Utama */}
      <div className="relative z-10 flex flex-1 items-center px-8 overflow-hidden">
        {/* Container Canvas Dinamis (Full saat Home, Geser ke Kiri saat Detail) */}
        <div
          className={`absolute top-0 bottom-0 left-0 transition-all duration-700 ease-in-out ${
            isDetailView ? "w-full md:w-[48%] z-10" : "w-full z-0"
          }`}
        >
          <Canvas className="h-full w-full">
            <Suspense fallback={null}>
              <BearbrickViewer
                activeTextureUrl={currentPattern.texture}
                isDetailView={isDetailView}
                onClickModel={() => setIsDetailView(true)}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* UI Overlay Card & Vertical Swatches di sebelah Kanan */}
        {isDetailView && (
          <div className="pointer-events-none relative z-20 flex h-full w-full items-end justify-end gap-10">
            {/* Detail Card memanjang sampai mentok ke bawah */}
            <div className="pointer-events-auto h-full transition-all duration-500 animate-in fade-in slide-in-from-bottom-8">
              <DetailCard data={currentPattern} />
            </div>

            {/* Vertical Swatches sejajar di atas, scroll ke bawah */}
            <div className="pointer-events-auto h-full transition-all duration-500 animate-in fade-in slide-in-from-right-12">
              <VerticalSwatches
                patterns={patterns}
                activePatternId={activePatternId}
                onSelectPattern={(id) => setActivePatternId(id)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Carousel saat Homepage Mode */}
      {!isDetailView && (
        <BottomCarousel
          patterns={patterns}
          activePatternId={activePatternId}
          onSelectPattern={(id) => setActivePatternId(id)}
        />
      )}
    </div>
  );
};

export default App;
