"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function Polyhedron({ scrollProgress, mousePos }: { scrollProgress: number; mousePos: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);
  
  const fragments = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.8, 0);
    const positions = geo.getAttribute("position");
    const faces: { position: THREE.Vector3; rotation: THREE.Euler; vertices: Float32Array }[] = [];
    
    for (let i = 0; i < positions.count; i += 3) {
      const cx = (positions.getX(i) + positions.getX(i + 1) + positions.getX(i + 2)) / 3;
      const cy = (positions.getY(i) + positions.getY(i + 1) + positions.getY(i + 2)) / 3;
      const cz = (positions.getZ(i) + positions.getZ(i + 1) + positions.getZ(i + 2)) / 3;
      
      const verts = new Float32Array(9);
      for (let j = 0; j < 3; j++) {
        verts[j * 3] = positions.getX(i + j) - cx;
        verts[j * 3 + 1] = positions.getY(i + j) - cy;
        verts[j * 3 + 2] = positions.getZ(i + j) - cz;
      }
      
      faces.push({
        position: new THREE.Vector3(cx, cy, cz),
        rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        vertices: verts,
      });
    }
    return faces;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Mouse tilt
    const targetRotX = mousePos.y * 0.15;
    const targetRotY = mousePos.x * 0.15;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetRotY + t * 0.15 - groupRef.current.rotation.y) * 0.05;

    // Scroll-driven position
    const xPos = THREE.MathUtils.lerp(1.5, -1.5, Math.min(scrollProgress * 2, 1));
    groupRef.current.position.x += (xPos - groupRef.current.position.x) * 0.05;

    // Fragment explosion based on scroll
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const face = fragments[i];
      
      // Phase 1 (0-0.2): assembled
      // Phase 2 (0.2-0.4): unfolding - faces separate slightly
      // Phase 3 (0.4-0.6): explosion - fragments fly out
      // Phase 4 (0.6-0.8): reassemble into new shape
      // Phase 5 (0.8-1.0): dissolve
      
      let explodeFactor = 0;
      let dissolveFactor = 0;
      
      if (scrollProgress < 0.2) {
        explodeFactor = 0;
      } else if (scrollProgress < 0.4) {
        explodeFactor = (scrollProgress - 0.2) / 0.2 * 0.3; // slight separation
      } else if (scrollProgress < 0.6) {
        explodeFactor = 0.3 + (scrollProgress - 0.4) / 0.2 * 2.5; // full explosion
      } else if (scrollProgress < 0.8) {
        explodeFactor = 2.8 * (1 - (scrollProgress - 0.6) / 0.2); // reassemble
      } else {
        explodeFactor = 0;
        dissolveFactor = (scrollProgress - 0.8) / 0.2;
      }

      const dir = face.position.clone().normalize();
      mesh.position.copy(face.position.clone().add(dir.multiplyScalar(explodeFactor)));
      
      // Spin during explosion
      if (explodeFactor > 0.3) {
        mesh.rotation.x = face.rotation.x + t * (i % 3 === 0 ? 1 : -1) * explodeFactor * 0.3;
        mesh.rotation.y = face.rotation.y + t * (i % 2 === 0 ? 1 : -1) * explodeFactor * 0.3;
      } else {
        mesh.rotation.set(0, 0, 0);
      }

      // Dissolve
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.opacity = 1 - dissolveFactor;
    });
  });

  return (
    <group ref={groupRef}>
      {fragments.map((face, i) => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(face.vertices, 3));
        geo.computeVertexNormals();
        
        return (
          <mesh
            key={i}
            ref={(el) => { if (el) meshRefs.current[i] = el; }}
            geometry={geo}
            position={face.position}
          >
            <meshStandardMaterial
              color="#1a1a2e"
              metalness={0.9}
              roughness={0.15}
              transparent
              opacity={1}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
      
      {/* Wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[1.81, 0]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={Math.min(scrollProgress * 3, 0.15)}
        />
      </mesh>
    </group>
  );
}

function SceneContent({ scrollProgress, mousePos }: { scrollProgress: number; mousePos: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#4a4a8a" />
      <pointLight position={[0, 0, 4]} intensity={0.5} color="#ffffff" />
      <Polyhedron scrollProgress={scrollProgress} mousePos={mousePos} />
      <Environment preset="city" />
    </>
  );
}

export default function Scene3D({ scrollProgress, mousePos }: { scrollProgress: number; mousePos: { x: number; y: number } }) {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneContent scrollProgress={scrollProgress} mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
