"use client";
import React from "react";
import { OrbitControls } from "@react-three/drei";
import { SphereModel } from "./SphereModel";
import { Canvas } from "@react-three/fiber";

function ModelView() {
  return (
    <Canvas className="mt-10" style={{height:'22rem'}}>
      <color attach="background" args={["#000"]} />
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <SphereModel scale={3} />
    </Canvas>
  );
}

export default ModelView;

