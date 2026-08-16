import React, { useMemo, useEffect, useRef } from "react";
import { useGLTF, useTexture, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

function BearbrickModel({ textureUrl }) {
  const groupRef = useRef();
  const isFirstRender = useRef(true);
  const { scene } = useGLTF("/models/bearbrick.glb");
  const rawTexture = useTexture(textureUrl);

  const activeTexture = useMemo(() => {
    if (!rawTexture) return null;
    const cloned = rawTexture.clone();
    cloned.flipY = false;
    cloned.colorSpace = THREE.SRGBColorSpace;
    cloned.needsUpdate = true;
    return cloned;
  }, [rawTexture]);

  useEffect(() => {
    if (!activeTexture || !groupRef.current) return;

    // Saat load pertama kali, langsung pasang material tanpa animasi putar
    if (isFirstRender.current) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material = new THREE.MeshStandardMaterial({
            map: activeTexture,
            roughness: 0.35,
            metalness: 0.15,
          });
        }
      });
      isFirstRender.current = false;
      return;
    }

    // Animasi GSAP transisi pergantian tekstur
    const tl = gsap.timeline();

    tl.to(groupRef.current.scale, {
      x: 1.08,
      y: 1.08,
      z: 1.08,
      duration: 0.16,
      ease: "power2.in",
      onComplete: () => {
        scene.traverse((child) => {
          if (child.isMesh) {
            child.material.map = activeTexture;
            child.material.needsUpdate = true;
          }
        });
      },
    })
      .to(
        groupRef.current.rotation,
        {
          y: groupRef.current.rotation.y + Math.PI * 2,
          duration: 0.65,
          ease: "back.out(1.4)",
        },
        0
      )
      .to(groupRef.current.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 0.45,
        ease: "back.out(2)",
      });
  }, [activeTexture, scene]);

  return (
    <group ref={groupRef} position={[0, -0.3, 0]} scale={1.1}>
      <primitive object={scene} />
    </group>
  );
}

export const BearbrickViewer = ({ activeTextureUrl }) => {
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

      <BearbrickModel textureUrl={activeTextureUrl} />

      <OrbitControls
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