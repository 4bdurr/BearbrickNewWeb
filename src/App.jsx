import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { X, Search, Menu } from "lucide-react";
import { FaInstagram, FaXTwitter, FaFacebookF } from "react-icons/fa6";
import BottomCarousel from "./components/BottomCarousel.jsx";
import VerticalSwatches from "./components/VerticalSwatches.jsx";
import MobileSwatchGrid from "./components/MobileSwatchGrid.jsx";
import DetailCard from "./components/DetailCard.jsx";
import MenuView from "./components/MenuView.jsx";
import BearbrickViewer from "./components/BearbrickViewer.jsx";
import { patterns } from "./data/patterns.js";

export const App = () => {
  const [activePatternId, setActivePatternId] = useState(patterns[0].id);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentPattern =
    patterns.find((p) => p.id === activePatternId) || patterns[0];

  const handleOpenMenu = () => {
    setIsDetailView(false);
    setIsMenuOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsDetailView(false);
    setIsMenuOpen(false);
  };

  return (
    <div
      className={`relative w-screen bg-grid-paper flex flex-col justify-between ${
        isDetailView
          ? "min-h-screen overflow-y-auto md:h-screen md:overflow-hidden"
          : "h-screen overflow-hidden"
      }`}
    >
      {/* Background Gunung Fuji */}
      <div className="pointer-events-none fixed md:absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
        <img
          src="/images/Mount_Fuji.png"
          alt="Mount Fuji"
          className="min-w-[150vw] md:min-w-[120vw] h-full object-cover opacity-30 select-none max-w-none"
        />
      </div>

      {/* Dark Tinted Glass Overlay (Kaca Film) */}
      <div
        className={`pointer-events-none fixed md:absolute inset-0 z-5 transition-all duration-700 ease-out ${
          isDetailView || isMenuOpen
            ? "bg-black/55 backdrop-blur-[2px] opacity-50"
            : "bg-transparent backdrop-blur-none opacity-0"
        }`}
      />

      {/* Header Bar */}
      <header className="sticky top-0 md:relative z-30 flex items-center justify-between px-5 md:px-8 py-4 md:py-6">
        <div className="flex items-center gap-2.5 md:gap-3">
          <h1 className="font-black text-xl md:text-2xl tracking-tighter text-black uppercase select-none">
            BE@RBRICK™
          </h1>
          <div className="h-4 w-4 md:h-5 md:w-5 rounded-full bg-[#D61B1F] shadow-xs" />
        </div>

        {isDetailView || isMenuOpen ? (
          <button
            type="button"
            onClick={handleCloseOverlay}
            className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full text-black transition-transform hover:scale-110 cursor-pointer"
            aria-label="Close current view"
          >
            <X size={26} />
          </button>
        ) : (
          <div className="flex items-center gap-4 md:gap-6">
            {/* Search Bar (Desktop Only) */}
            <div className="relative hidden md:flex items-center">
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

            {/* Social Icons (Desktop Only) */}
            <div className="hidden md:flex items-center gap-4 text-black">
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

            {/* Menu Button */}
            <button
              type="button"
              onClick={handleOpenMenu}
              className="flex items-center justify-center text-black transition-transform hover:scale-105 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        )}
      </header>

      {/* Stage Utama */}
      <div className="relative z-10 flex flex-1 flex-col md:flex-row items-center md:px-8 md:overflow-hidden">
        {/* Container Canvas 3D (Desktop: Bergeser ke Kiri 48% | Mobile Detail: Layar Penuh 100vh di Fold Pertama) */}
        <div
          className={`transition-all duration-700 ease-in-out ${
            isDetailView
              ? "relative md:absolute top-0 bottom-0 left-0 w-full h-screen md:h-full md:w-[48%] z-10 shrink-0"
              : isMenuOpen
                ? "w-0 opacity-0 pointer-events-none"
                : "absolute inset-0 z-0"
          }`}
        >
          <Canvas className="h-full w-full">
            <Suspense fallback={null}>
              <BearbrickViewer
                activeTextureUrl={currentPattern.texture}
                isDetailView={isDetailView}
                isMenuOpen={isMenuOpen}
                onClickModel={() => setIsDetailView(true)}
              />
            </Suspense>
          </Canvas>

          {/* Indikator Scroll Halus di Mobile Saat Detail View */}
          {isDetailView && (
            <div className="pointer-events-none absolute bottom-6 inset-x-0 flex flex-col items-center select-none md:hidden animate-bounce">
              <span className="font-mono text-[9px] font-bold tracking-widest text-black/60">
                SCROLL DOWN
              </span>
              <span className="text-xs font-bold text-black/60">↓</span>
            </div>
          )}
        </div>
        {/* 1. Tampilan MENU VIEW */}
        {isMenuOpen && (
          <div className="relative z-20 flex h-full w-full min-h-0 flex-1 flex-col md:flex-row items-center justify-between px-4 md:px-0">
            <div className="flex-1 w-full h-full min-h-0">
              <MenuView isOpen={isMenuOpen} />
            </div>

            {/* Desktop Vertical Swatches */}
            <div className="hidden md:block pointer-events-auto h-full transition-all duration-500 animate-in fade-in slide-in-from-right-12">
              <VerticalSwatches
                patterns={patterns}
                activePatternId={activePatternId}
                onSelectPattern={(id) => setActivePatternId(id)}
              />
            </div>
          </div>
        )}
        {/* 2. Tampilan DETAIL VIEW */}
        {isDetailView && (
          <div className="relative z-20 flex flex-col md:flex-row w-full md:h-full md:pointer-events-none items-center md:items-end justify-end gap-6 md:gap-10 px-4 md:px-0 pb-10 md:pb-0">
            {/* Detail Card (Mobile: Mengalir di bawah 3D model | Desktop: Terkunci di samping kanan) */}
            <div className="pointer-events-auto w-full md:w-auto h-auto md:h-full transition-all duration-500 animate-in fade-in slide-in-from-bottom-8">
              <DetailCard data={currentPattern} />
            </div>

            {/* Desktop Vertical Swatches (Hanya di Desktop) */}
            <div className="hidden md:block pointer-events-auto h-full transition-all duration-500 animate-in fade-in slide-in-from-right-12">
              <VerticalSwatches
                patterns={patterns}
                activePatternId={activePatternId}
                onSelectPattern={(id) => setActivePatternId(id)}
              />
            </div>

            {/* Mobile Swatches (Berada di paling bawah setelah di-scroll) */}
            <div className="w-full block md:hidden rounded-2xl overflow-hidden shadow-lg mt-2">
              <MobileSwatchGrid
                patterns={patterns}
                activePatternId={activePatternId}
                onSelectPattern={(id) => setActivePatternId(id)}
              />
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM SECTION */}
      {/* Desktop Homepage Bottom Carousel */}
      {!isDetailView && !isMenuOpen && (
        <div className="hidden md:block">
          <BottomCarousel
            patterns={patterns}
            activePatternId={activePatternId}
            onSelectPattern={(id) => setActivePatternId(id)}
          />
        </div>
      )}

      {/* Mobile Universal 5-Column Swatch Grid (Homepage & Menu) */}
      {!isDetailView && (
        <div className="block md:hidden relative z-30">
          <MobileSwatchGrid
            patterns={patterns}
            activePatternId={activePatternId}
            onSelectPattern={(id) => setActivePatternId(id)}
          />
        </div>
      )}
    </div>
  );
};

export default App;
