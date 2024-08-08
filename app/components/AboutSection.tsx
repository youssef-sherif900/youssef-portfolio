"use client";
import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import TechModel from "./TachModel";
import techData from "../utils/techData";
import { Physics } from "@react-three/cannon";
import {  useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

interface techInterface {
  img: string;
  pos: [number, number, number];
  shape: React.ReactNode;
}

function AboutSection() {
  const ref = useRef(null);

  const inView = useInView(ref, { once: true });


  const [canvasHeight, setCanvasHeight] = useState<string>('500px');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) { // Adjust the breakpoint as needed
        setCanvasHeight('300px');
      } else {
        setCanvasHeight('500px');
      }
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <section id="about" className=" sm:p-24 p-8 h-[150vh] sm:h-[130vh]  2xl:h-screen">
   

      <div className="w-full flex flex-col-reverse sm:flex-row">
        <div className="sm:w-2/3 py-5" ref={ref}>
        <h1 className="text-3xl mb-5 ">About Me</h1>
          {inView && (
            <TypeAnimation
              className=" leading-5 sm:leading-7 text-sm sm:text-md"
              sequence={[
                "As a passionate Front-End Developer, I specialize in crafting intuitive and visually compelling user experiences using a diverse array of technologies. With expertise in React.js and Next.js, I excel in building dynamic, high-performance web applications that meet the latest industry standards. My proficiency extends to modern design systems, including Material-UI and Tailwind CSS, which I use to create responsive, accessible interfaces. I’m also skilled in Bootstrap for rapid development and have a strong command of JavaScript and TypeScript for robust, scalable code. My solid foundation in HTML and CSS ensures that I can deliver pixel-perfect designs, while my experience with Git and Docker enables efficient version control and streamlined deployment processes. Committed to continuous learning and problem-solving, I thrive on turning complex challenges into elegant solutions.",
              ]}
              wrapper="span"
              speed={80}
              repeat={0}
            />
          )}
        </div>

        <Canvas style={{height:canvasHeight}} >
          <ambientLight intensity={7} />
          <pointLight position={[10, 10, 10]} />
          <Physics gravity={[0, 0, 0]}>
            {techData.map((tech: techInterface, i: number): React.ReactNode => {
              return (
                <TechModel
                  key={i}
                  img={tech.img}
                  pos={tech.pos}
                  shape={tech.shape}
                />
              );
            })}
          </Physics>
        </Canvas>
      </div>
    </section>
  );
}

export default AboutSection;
