"use client";
import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import { Float, useTexture } from "@react-three/drei";
import { Decal } from "@react-three/drei";
import {  useBox } from "@react-three/cannon";
import { DragState, useDrag } from "@use-gesture/react";
import * as THREE from 'three';
import { ThreeEvent } from "@react-three/fiber";


interface TeachModelInterface {
  img: string;
  shape: React.ReactNode;
  pos: [number, number, number];
}


const TechModel = ({ img, shape, pos }: TeachModelInterface) => {
  const [hovered, setHovered] = useState(false);

  

  const [meshRef , api] = useBox<THREE.Mesh>(() => ({
    position: pos,
    mass: 1,
    onCollide: () =>{
       api.velocity.set(0, 0, 0)
      }
  }));


  // Define the constraints for X and Y axes
  const xMin = -5;
  const xMax = 5;
  const yMin = -5;
  const yMax = 5;

  // Use useDrag hook to handle dragging with constraints
  const bind : any = useDrag((state: DragState) => {
    const { offset: [x, y] , memo = pos } = state;
    const newPosX = Math.max(xMin, Math.min(xMax, pos[0] + x * 0.01));
    const newPosY = Math.max(yMin, Math.min(yMax, pos[1] - y * 0.01));
    // Update position directly with drag delta while applying constraints
    api.position.set(newPosX, newPosY, pos[2]);

    return memo;

  });

  const { color, scale } = useSpring({
    color: hovered ? "white" : "green",
    scale: hovered ? 1.2 : 1,
    config: { duration: 300 }, // Adjust duration for transition speed
  });

  const [decal]: any = useTexture([img]);



  return (
    <Float
      position={[1, 1, -1]}
      rotation={[0, 0, 0]}
      rotationIntensity={2}
      floatIntensity={2}
      speed={0.75}
    >
      <animated.mesh
        ref={meshRef}
        {...bind()}
        position={pos}
        onPointerOver={(event:  ThreeEvent<PointerEvent>) => setHovered(true)} // Explicit type for ThreeEvent
        onPointerOut={(event:  ThreeEvent<PointerEvent>) => setHovered(false)} // Explicit type for ThreeEvent
        scale={scale}
        castShadow
        receiveShadow
      >
      <animated.meshStandardMaterial color={color} polygonOffset polygonOffsetFactor={-5} flatShading />
      <Decal map={decal} position={[0, 0, 0.5]} rotation={[2*Math.PI , 0 , 6.25]} />
      {shape}
    </animated.mesh>
    </Float>
  );
};

export default TechModel;
