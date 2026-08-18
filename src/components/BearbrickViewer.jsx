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

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Animasi posisi & skala
  useEffect(() => {
    if (!modelGroupRef.current) return;

    if (isMenuOpen) {
      gsap.to(modelGroupRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.45,
        ease: "power2.in",
      });
      return;
    }

    let targetX = 0;
    let targetY = -0.4;
    let targetScale = 1.2;

    if (isMobile) {
      targetScale = isDetailView ? 0.95 : 1.05;
      targetY = isDetailView ? 1.2 : -0.2;
    } else {
      targetScale = isDetailView ? 1.25 : 1.2;
      targetX = 0;
    }

    gsap.to(modelGroupRef.current.position, {
      x: targetX,
      y: targetY,
      duration: 0.7,
      ease: "power3.inOut",
    });

    gsap.to(modelGroupRef.current.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: 0.7,
      ease: "power3.inOut",
    });
  }, [isDetailView, isMenuOpen, isMobile]);

  // Load tekstur & spin 360
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
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (!controlsRef.current) return;

    const targetY = isMobile && isDetailView ? 1.2 : -0.2;

    gsap.to(controlsRef.current.target, {
      x: 0,
      y: targetY,
      z: 0,
      duration: 0.7,
      ease: "power3.inOut",
      onUpdate: () => controlsRef.current.update(),
    });
  }, [isDetailView, isMobile]);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, isMobile ? 18 : 16]}
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

      {/* OrbitControls: Matikan enableRotate khusus saat mode Detail di Mobile agar sentuhan jari menjadi scroll dokumen */}
      <OrbitControls
        ref={controlsRef}
        enabled={!isMenuOpen}
        enableRotate={true}
        enableZoom={!isDetailView}
        enablePan={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  );
};

useGLTF.preload("/models/bearbrick.glb");
export default BearbrickViewer;