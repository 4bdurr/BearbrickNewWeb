import React, { useEffect, useRef } from "react";
import { useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

function BearbrickModel({ textureUrl, isDetailView, onClickModel }) {
  const modelGroupRef = useRef();
  const rotateGroupRef = useRef();
  const isFirstRender = useRef(true);
  const { scene } = useGLTF("/models/bearbrick.glb");

  // 1. Transisi Pergeseran Posisi & Ukuran (Overview vs Detail)
  useEffect(() => {
    if (!modelGroupRef.current) return;

    gsap.to(modelGroupRef.current.position, {
      x: isDetailView ? -3.2 : 0,
      y: isDetailView ? -0.2 : -0.3,
      z: 0,
      duration: 0.8,
      ease: "power3.inOut",
    });

    gsap.to(modelGroupRef.current.scale, {
      x: isDetailView ? 1.35 : 1.2,
      y: isDetailView ? 1.35 : 1.2,
      z: isDetailView ? 1.35 : 1.2,
      duration: 0.8,
      ease: "power3.inOut",
    });
  }, [isDetailView]);

  // 2. Load Tekstur, Pasang ke Material, & Jalankan Rotasi Spin
  useEffect(() => {
    if (!textureUrl) return;

    const loader = new THREE.TextureLoader();
    loader.load(textureUrl, (loadedTexture) => {
      loadedTexture.flipY = false;
      loadedTexture.colorSpace = THREE.SRGBColorSpace;
      loadedTexture.needsUpdate = true;

      // Terapkan tekstur dan properti bayangan ke semua mesh
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          if (
            !child.material ||
            child.material.type !== "MeshStandardMaterial"
          ) {
            child.material = new THREE.MeshStandardMaterial({
              map: loadedTexture,
              roughness: 0.35,
              metalness: 0.15,
            });
          } else {
            child.material.map = loadedTexture;
            child.material.needsUpdate = true;
          }
        }
      });

      // Putar 360 derajat hanya jika bukan render pertama kali
      if (isFirstRender.current) {
        isFirstRender.current = false;
      } else if (rotateGroupRef.current) {
        gsap.to(rotateGroupRef.current.rotation, {
          y: rotateGroupRef.current.rotation.y + Math.PI * 2,
          duration: 0.7,
          ease: "power2.out",
        });
      }
    });
  }, [textureUrl, scene]);

  return (
    <group
      ref={modelGroupRef}
      position={[0, -0.3, 0]}
      scale={1.2}
      onClick={(e) => {
        e.stopPropagation();
        onClickModel();
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <group ref={rotateGroupRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}
export const BearbrickViewer = ({
  activeTextureUrl,
  isDetailView,
  onClickModel,
}) => {
  const controlsRef = useRef();

  // Sinkronisasi target kamera saat berpindah mode
  useEffect(() => {
    if (!controlsRef.current) return;

    // Geser titik fokus OrbitControls
    gsap.to(controlsRef.current.target, {
      x: isDetailView ? -3.2 : 0,
      y: isDetailView ? -0.2 : -0.3,
      z: 0,
      duration: 0.8,
      ease: "power3.inOut",
      onUpdate: () => controlsRef.current.update(),
    });

    // Reset posisi kamera agar kembali lurus menghadap depan saat mode Overview
    if (!isDetailView && controlsRef.current.object) {
      gsap.to(controlsRef.current.object.position, {
        x: 0,
        y: 0,
        z: 16,
        duration: 0.8,
        ease: "power3.inOut",
      });
    }
  }, [isDetailView]);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 16]}
        fov={50}
        near={0.1}
        far={100}
      />

      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.8} />

      <BearbrickModel
        textureUrl={activeTextureUrl}
        isDetailView={isDetailView}
        onClickModel={onClickModel}
      />

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  );
};
useGLTF.preload("/models/bearbrick.glb");
export default BearbrickViewer;
