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
          /* Close Button saat mode detail */
          <button
            type="button"
            onClick={() => setIsDetailView(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-black transition-transform hover:scale-110"
            aria-label="Close detail view"
          >
            <X size={28} />
          </button>
        ) : (
          /* Navigasi Standard Homepage */
          <div className="flex items-center gap-6">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search collection..."
                className="h-9 w-60 rounded-full border border-black/80 bg-transparent px-4 pr-9 text-xs font-medium text-black placeholder:text-black/50 focus:outline-hidden focus:ring-1 focus:ring-black"
              />
              <Search size={14} className="absolute right-3.5 text-black/80 pointer-events-none" />
            </div>

            {/* Social Media Icons (react-icons/fa6) */}
            <div className="flex items-center gap-4 text-black">
              <a href="#instagram" className="transition-transform hover:scale-110">
                <FaInstagram size={17} />
              </a>
              <a href="#twitter" className="transition-transform hover:scale-110">
                <FaXTwitter size={15} />
              </a>
              <a href="#facebook" className="transition-transform hover:scale-110">
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

      {/* Stage Tengah: 3D Canvas + Overlay Detail */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-8">
        {/* Canvas 3D */}
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 16], fov: 50 }}
            className="h-full w-full"
          >
            <Suspense fallback={null}>
              <BearbrickViewer
                activeTextureUrl={currentPattern.texture}
                isDetailView={isDetailView}
                onClickModel={() => setIsDetailView(true)}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* UI Overlay saat Detail View Aktif */}
        {isDetailView && (
          <div className="pointer-events-none relative z-10 flex h-full w-full items-center justify-end gap-10">
            <div className="pointer-events-auto transition-all duration-500 animate-in fade-in slide-in-from-right-8">
              <DetailCard data={currentPattern} />
            </div>

            <div className="pointer-events-auto transition-all duration-500 animate-in fade-in slide-in-from-right-12">
              <VerticalSwatches
                patterns={patterns}
                activePatternId={activePatternId}
                onSelectPattern={(id) => setActivePatternId(id)}
              />
            </div>
          </div>
        )}

        {/* 360 Indicator saat Homepage Mode */}
        {/* {!isDetailView && (
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center select-none">
            <span className="font-mono text-xs font-bold tracking-wider text-black">360°</span>
            <div className="text-base leading-none font-bold text-black">↺</div>
          </div>
        )} */}
      </div>

      {/* Bottom Swatches saat Homepage Mode */}
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