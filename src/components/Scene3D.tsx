"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

function Polyhedron({ scrollProgress, mousePos }: { scrollProgress: number; mousePos: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current || !wireRef.current) return;
    const t = state.clock.elapsedTime;

    // Mouse tilt
    groupRef.current.rotation.x += (mousePos.y * 0.2 - groupRef.current.rotation.x) * 0.03;
    groupRef.current.rotation.y += (mousePos.x * 0.2 + t * 0.12 - groupRef.current.rotation.y) * 0.03;

    // Scroll-driven horizontal position
    const xTarget = THREE.MathUtils.lerp(2, -2, Math.min(scrollProgress * 2.5, 1));
    groupRef.current.position.x += (xTarget - groupRef.current.position.x) * 0.04;

    // Scroll-driven vertical bob
    const yTarget = Math.sin(scrollProgress * Math.PI * 2) * 0.5;
    groupRef.current.position.y += (yTarget - groupRef.current.position.y) * 0.04;

    // Scale: grow slightly then shrink as dissolving
    let scale = 1;
    if (scrollProgress < 0.6) {
      scale = 1 + scrollProgress * 0.5;
    } else {
      scale = (1.3) * (1 - (scrollProgress - 0.6) / 0.4);
    }
    scale = Math.max(scale, 0);
    groupRef.current.scale.setScalar(scale);

    // Wireframe opacity increases with scroll
    const wireMat = wireRef.current.material as THREE.MeshBasicMaterial;
    wireMat.opacity = Math.min(scrollProgress * 2, 0.25);

    // Main material: shift metalness/roughness
    const mainMat = meshRef.current.material as THREE.MeshStandardMaterial;
    mainMat.roughness = 0.12 + scrollProgress * 0.3;
    
    // Dissolve via opacity
    if (scrollProgress > 0.75) {
      mainMat.transparent = true;
      mainMat.opacity = 1 - (scrollProgress - 0.75) / 0.25;
      wireMat.opacity = mainMat.opacity * 0.25;
    } else {
      mainMat.opacity = 1;
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, 0]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.95}
          roughness={0.12}
          envMapIntensity={1.2}
          transparent
        />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.02, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0} />
      </mesh>
    </group>
  );
}

export default function Scene3D({ scrollProgress, mousePos }: { scrollProgress: number; mousePos: { x: number; y: number } }) {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1,
      pointerEvents: "none",
    }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-3, -2, -4]} intensity={0.3} color="#6366f1" />
        <pointLight position={[0, 3, 4]} intensity={0.6} color="#a5b4fc" />
        <Polyhedron scrollProgress={scrollProgress} mousePos={mousePos} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
