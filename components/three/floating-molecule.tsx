"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

export function FloatingMolecule() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <group ref={groupRef}>
        <Sphere args={[0.3, 16, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#4338ca" />
        </Sphere>
        <Sphere args={[0.3, 16, 16]} position={[1, 1, 0]}>
          <meshStandardMaterial color="#22c55e" />
        </Sphere>
        <Sphere args={[0.3, 16, 16]} position={[-1, -1, 0]}>
          <meshStandardMaterial color="#ec4899" />
        </Sphere>
        <Line
          points={[[0, 0, 0], [1, 1, 0]]}
          color="#94a3b8"
          lineWidth={2}
        />
        <Line
          points={[[0, 0, 0], [-1, -1, 0]]}
          color="#94a3b8"
          lineWidth={2}
        />
      </group>
    </>
  );
}