"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

export function FloatingCubes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    groupRef.current.children.forEach((cube, i) => {
      cube.rotation.x = state.clock.getElapsedTime() * (0.2 + i * 0.1);
      cube.rotation.y = state.clock.getElapsedTime() * (0.3 + i * 0.1);
    });
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <group ref={groupRef}>
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            args={[0.5, 0.5, 0.5]}
            position={[
              Math.cos((i / 5) * Math.PI * 2) * 2,
              Math.sin((i / 5) * Math.PI * 2) * 2,
              0
            ]}
          >
            <meshStandardMaterial
              color={`hsl(${(i / 5) * 360}, 70%, 60%)`}
              wireframe
              transparent
              opacity={0.7}
            />
          </Box>
        ))}
      </group>
    </>
  );
}