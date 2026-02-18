"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
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

    // Scroll-driven position: starts top-right, moves down-left across the page
    const xTarget = 3.0 - scrollProgress * 6.0;
    const yTarget = 1.0 - scrollProgress * 2.0 + Math.sin(t * 0.5) * 0.2;
    groupRef.current.position.x += (xTarget - groupRef.current.position.x) * 0.03;
    groupRef.current.position.y += (yTarget - groupRef.current.position.y) * 0.03;

    // Scale: moderate size, grows slightly
    let targetScale = 0.8 + scrollProgress * 0.15;
    if (scrollProgress > 0.9) {
      targetScale *= 1.0 - (scrollProgress - 0.9) / 0.1;
    }
    targetScale = Math.max(targetScale, 0.01);
    const s = groupRef.current.scale.x;
    groupRef.current.scale.setScalar(s + (targetScale - s) * 0.04);

    // Wireframe fades in
    const wireMat = wireRef.current.material as THREE.MeshBasicMaterial;
    wireMat.opacity = scrollProgress * 0.25;

    // Dissolve at end
    const mainMat = meshRef.current.material as THREE.MeshStandardMaterial;
    mainMat.opacity = scrollProgress > 0.9 ? 1.0 - (scrollProgress - 0.9) / 0.1 : 1.0;
  });

  return (
    <group ref={groupRef} position={[3, 1, 0]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial
          color="#18182b"
          metalness={0.95}
          roughness={0.1}
          envMapIntensity={1.5}
          transparent
          opacity={1}
        />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.62, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0} />
      </mesh>
    </group>
  );
}

function SceneInner({ scrollProgress, mousePos }: { scrollProgress: number; mousePos: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} />
      <directionalLight position={[-3, -2, -5]} intensity={0.3} color="#6366f1" />
      <pointLight position={[0, 2, 5]} intensity={0.5} color="#a5b4fc" />
      <Polyhedron scrollProgress={scrollProgress} mousePos={mousePos} />
      <Environment preset="city" />
      <Preload all />
    </>
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
        camera={{ position: [0, 0, 8], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneInner scrollProgress={scrollProgress} mousePos={mousePos} />
        </Suspense>
      </Canvas>
    </div>
  );
}
