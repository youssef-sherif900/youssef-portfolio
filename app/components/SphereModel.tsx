'use client'
import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'


export function SphereModel(props:any) {



  useEffect(() => {
    const onMouseMove = (event:MouseEvent) => {
      // Calculate mouse position relative to window
      const mouseX = event.clientX / window.innerWidth;
      const mouseY = event.clientY / window.innerHeight;

      // Adjust object position based on mouse position
      if (meshRef.current) {
        meshRef.current.rotation.x = (mouseY - 0.5) * Math.PI * 0.2; 
        meshRef.current.rotation.y = (mouseX - 0.5) * Math.PI * 0.2; 
      }
    };

    // Add event listener
    window.addEventListener('mousemove', onMouseMove);

    // Clean up event listener
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);



  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state , delta) => {
    meshRef.current!.rotation.y += delta*0.1
  })
  
  const { nodes, materials }:any = useGLTF('/hex-sphere.glb')
  return (
    <group {...props} dispose={null} ref={meshRef}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Frame_0?.geometry}
        >
          <meshStandardMaterial color='green' />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_0?.geometry}
          material={materials.Black}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/hex-sphere.glb')