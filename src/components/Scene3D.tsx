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

    // Constant slow rotation + mouse tilt
    groupRef.current.rotation.x += (mousePos.y * 0.15 + Math.sin(t * 0.2) * 0.1 - groupRef.current.rotation.x) * 0.02;
    groupRef.current.rotation.y += (mousePos.x * 0.15 + t * 0.1 - groupRef.current.rotation.y) * 0.02;

    // Scroll-driven horizontal position: starts right, moves left
    const xTarget = 2.5 - scrollProgress * 5;
    groupRef.current.position.x += (xTarget - groupRef.current.position.x) * 0.03;

    // Gentle vertical float
    const yTarget = Math.sin(t * 0.5) * 0.3;
    groupRef.current.position.y += (yTarget - groupRef.current.position.y) * 0.03;

    // Scale: stays visible throughout, only fades at very end
    let targetScale = 1.0 + scrollProgress * 0.3; // grows slightly
    if (scrollProgress > 0.9) {
      targetScale *= 1.0 - (scrollProgress - 0.9) / 0.1; // fade out last 10%
    }
    targetScale = Math.max(targetScale, 0.01);
    const s = groupRef.current.scale.x;
    groupRef.current.scale.setScalar(s + (targetScale - s) * 0.04);

    // Wireframe: fades in as scroll progresses
    const wireMat = wireRef.current.material as THREE.MeshBasicMaterial;
    wireMat.opacity = scrollProgress * 0.3;

    // Main material opacity: only fade at the very end
    const mainMat = meshRef.current.material as THREE.MeshStandardMaterial;
    if (scrollProgress > 0.9) {
      mainMat.opacity = 1.0 - (scrollProgress - 0.9) / 0.1;
    } else {
      mainMat.opacity = 1.0;
    }
  });

  return (
    <group ref={groupRef} position={[2.5, 0, 0]}>
      {/* Main solid mesh */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial
          color="#18182b"
          metalness={0.95}
          roughness={0.1}
          envMapIntensity={1.5}
          transparent
          opacity={1}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.03, 1]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0}
        />
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
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} />
        <directionalLight position={[-3, -2, -5]} intensity={0.3} color="#6366f1" />
        <pointLight position={[0, 2, 5]} intensity={0.5} color="#a5b4fc" />
        <Polyhedron scrollProgress={scrollProgress} mousePos={mousePos} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
