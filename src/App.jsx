import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Header from "./components/Header.jsx";
import BottomCarousel from "./components/BottomCarousel.jsx";
import BearbrickViewer from "./components/BearbrickViewer.jsx";
import { patterns } from "./data/patterns.js";

export const App = () => {
  const [activePatternId, setActivePatternId] = useState(patterns[0].id);

  // Ambil data motif yang sedang aktif
  const currentPattern = patterns.find((p) => p.id === activePatternId) || patterns[0];

  return (
    <div className="relative flex h-screen w-screen flex-col justify-between overflow-hidden bg-grid-paper">
      {/* Background Ilustrasi Gunung Fuji */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <img
          src="/images/Mount_Fuji.png"
          alt="Mount Fuji"
          className="w-full min-w-300 max-w-[1600px] object-cover opacity-20 select-none translate-y-4"
        />
      </div>

      {/* 1. Header */}
      <Header />

      {/* 2. Center Stage (3D Canvas) */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div className="relative h-full w-full">
          <Canvas
            className="h-full w-full"
          >
            <Suspense fallback={null}>
              <BearbrickViewer activeTextureUrl={currentPattern.texture} />
            </Suspense>
          </Canvas>

          {/* Badge 360° Interaction Cue */}
          {/* <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center select-none">
            <span className="font-mono text-xs font-bold tracking-wider text-black">360°</span>
            <div className="text-base leading-none font-bold text-black">↺</div>
          </div> */}
        </div>
      </div>

      {/* 3. Bottom Carousel Swatches */}
      <BottomCarousel
        patterns={patterns}
        activePatternId={activePatternId}
        onSelectPattern={(id) => setActivePatternId(id)}
      />
    </div>
  );
};

export default App;