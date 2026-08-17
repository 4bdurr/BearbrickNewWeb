import React, { useEffect, useRef } from "react";
import { useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

function BearbrickModel({
  textureUrl,
  isDetailView,
  isMenuOpen,
  onClickModel,
}) {
  const modelGroupRef = useRef();
  const rotateGroupRef = useRef();
  const isFirstRender = useRef(true);
  const { scene } = useGLTF("/models/bearbrick.glb");

  // 1. Animasi Skala & Visibilitas saat berganti Mode (Home / Detail / Menu)
  useEffect(() => {
    if (!modelGroupRef.current) return;

    if (isMenuOpen) {
      // Sembunyikan model saat menu terbuka
      gsap.to(modelGroupRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.5,
        ease: "power2.in",
      });
      return;
    }

    // Skala saat Detail View vs Home
    const targetScale = isDetailView ? 1.25 : 1.2;
    gsap.to(modelGroupRef.current.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: 0.7,
      ease: "power3.inOut",
    });
  }, [isDetailView, isMenuOpen]);

  // 2. Load Tekstur, Pasang ke Material, & Animasi Spin 360°
  useEffect(() => {
    if (!textureUrl) return;

    const loader = new THREE.TextureLoader();
    loader.load(textureUrl, (loadedTexture) => {
      loadedTexture.flipY = false;
      loadedTexture.colorSpace = THREE.SRGBColorSpace;
      loadedTexture.needsUpdate = true;

      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          if (!child.material || child.material.type !== "MeshStandardMaterial") {
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
      position={[0, -0.4, 0]}
      scale={1.15}
      onClick={(e) => {
        e.stopPropagation();
        if (!isMenuOpen) onClickModel();
      }}
      onPointerOver={() => {
        if (!isMenuOpen) document.body.style.cursor = "pointer";
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
  isMenuOpen,
  onClickModel,
}) => {
  const controlsRef = useRef();

  // Reset kamera ketika berpindah tampilan
  useEffect(() => {
    if (!controlsRef.current) return;

    gsap.to(controlsRef.current.target, {
      x: 0,
      y: -0.2,
      z: 0,
      duration: 0.7,
      ease: "power3.inOut",
      onUpdate: () => controlsRef.current.update(),
    });

    if (!isDetailView && controlsRef.current.object) {
      gsap.to(controlsRef.current.object.position, {
        x: 0,
        y: 0,
        z: 16,
        duration: 0.7,
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
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={100}
      />

      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.8} />

      <BearbrickModel
        textureUrl={activeTextureUrl}
        isDetailView={isDetailView}
        isMenuOpen={isMenuOpen}
        onClickModel={onClickModel}
      />

      <OrbitControls
        ref={controlsRef}
        enabled={!isMenuOpen}
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