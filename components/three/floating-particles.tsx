"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function FloatingParticles() {
  const groupRef = useRef<THREE.Group>(null);
  const particleCount = 20;

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    groupRef.current.children.forEach((particle, i) => {
      particle.position.y = Math.sin(state.clock.getElapsedTime() + i) * 0.5;
    });
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <group ref={groupRef}>
        {[...Array(particleCount)].map((_, i) => (
          <Sphere
            key={i}
            args={[0.1, 16, 16]}
            position={[
              Math.cos((i / particleCount) * Math.PI * 2) * 3,
              0,
              Math.sin((i / particleCount) * Math.PI * 2) * 3
            ]}
          >
            <meshStandardMaterial
              color={`hsl(${(i / particleCount) * 360}, 70%, 60%)`}
              emissive={`hsl(${(i / particleCount) * 360}, 70%, 30%)`}
            />
          </Sphere>
        ))}
      </group>
    </>
  );
}