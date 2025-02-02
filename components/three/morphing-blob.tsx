"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

export function MorphingBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  // Dynamic colors based on theme
  const mainColor = theme === 'dark' ? '#818cf8' : '#4338ca';
  const particleColor = theme === 'dark' ? '#6366f1' : '#4f46e5';

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Complex movement
    const time = state.clock.getElapsedTime();
    meshRef.current.position.x = Math.sin(time * 0.3) * 0.3;
    meshRef.current.position.y = Math.cos(time * 0.2) * 0.2;
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      <directionalLight position={[0, 5, 5]} intensity={0.5} />
      
      <Float
        speed={4}
        rotationIntensity={1}
        floatIntensity={2}
      >
        <Sphere ref={meshRef} args={[2, 128, 128]} scale={[1, 1, 1]}>
          <MeshDistortMaterial
            color={mainColor}
            attach="material"
            distort={0.4}
            speed={3}
            roughness={0.2}
            metalness={0.8}
            opacity={0.8}
            transparent
          />
        </Sphere>
      </Float>

      {/* Floating particles with improved distribution */}
      {Array.from({ length: 40 }).map((_, i) => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 3 + Math.random() * 3;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        return (
          <Float
            key={i}
            speed={2}
            rotationIntensity={1}
            floatIntensity={2}
          >
            <Sphere 
              args={[0.05, 16, 16]} 
              position={[x, y, z]}
            >
              <meshBasicMaterial
                color={particleColor}
                transparent
                opacity={0.6 + Math.random() * 0.4}
              />
            </Sphere>
          </Float>
        );
      })}
    </>
  );
}