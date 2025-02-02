"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function SceneObjects() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    groupRef.current.children.forEach((child, i) => {
      child.position.y = Math.sin(state.clock.getElapsedTime() * 0.5 + i) * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[1, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#4338ca"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.4}
          metalness={0.8}
        />
      </Sphere>
      <Box args={[0.5, 0.5, 0.5]} position={[2, 0, 0]}>
        <MeshDistortMaterial
          color="#22c55e"
          attach="material"
          distort={0.2}
          speed={1.5}
          roughness={0.3}
          metalness={0.7}
        />
      </Box>
      <Torus args={[0.7, 0.2, 32, 64]} position={[-2, 0, 0]}>
        <MeshDistortMaterial
          color="#ec4899"
          attach="material"
          distort={0.4}
          speed={2.5}
          roughness={0.5}
          metalness={0.9}
        />
      </Torus>
    </group>
  );
}