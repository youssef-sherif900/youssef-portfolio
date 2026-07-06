"use client";
import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import TechModel from "./TachModel";
import techData from "../utils/techData";
import { Physics } from "@react-three/cannon";
import { useInView, motion } from "framer-motion";

interface techInterface {
  img: string;
  pos: [number, number, number];
  shape: React.ReactNode;
}

const skills = [
  { name: "React.js", category: "Core Development" },
  { name: "Next.js", category: "Core Development" },
  { name: "TypeScript", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "Tailwind CSS", category: "UI & Styling" },
  { name: "Material-UI", category: "UI & Styling" },
  { name: "Bootstrap", category: "UI & Styling" },
  { name: "HTML5 & CSS3", category: "UI & Styling" },
  { name: "Git & GitHub", category: "Tools & DevOps" },
  { name: "Docker", category: "Tools & DevOps" },
];

function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [canvasHeight, setCanvasHeight] = useState<string>('400px');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCanvasHeight('260px');
      } else {
        setCanvasHeight('400px');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="relative min-h-screen py-24 px-6 sm:px-12 md:px-24 bg-black overflow-hidden flex items-center justify-center">
      {/* Background radial glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-green-950/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Heading and Story */}
        <motion.div 
          ref={ref}
          className="lg:col-span-7 py-5 flex flex-col w-full"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="flex flex-col">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-500">
              About Me
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              My Engineering Journey
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="text-zinc-400 space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              As a passionate <strong className="text-white font-medium">Front-End Developer</strong>, I specialize in crafting intuitive and visually compelling user experiences using a diverse array of modern technologies. With extensive expertise in <strong className="text-emerald-400 font-medium">React.js</strong> and <strong className="text-emerald-400 font-medium">Next.js</strong>, I build dynamic, high-performance web applications that adhere to the highest industry standards for speed, security, and responsiveness.
            </p>
            <p>
              My proficiency extends to modular UI design systems and CSS utilities, including <strong className="text-white font-medium">Material-UI (MUI)</strong> and <strong className="text-white font-medium">Tailwind CSS</strong>, allowing me to develop responsive, fully accessible, and pixel-perfect interfaces. 
            </p>
            <p>
              I write scalable, typing-safe code with <strong className="text-emerald-400 font-medium">TypeScript</strong> and JavaScript, and utilize <strong className="text-white font-medium">Git</strong> and <strong className="text-white font-medium">Docker</strong> for seamless version control, containerization, and deployment. I am dedicated to continuous learning and solving complex developer challenges with elegant, lightweight answers.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div variants={itemVariants} className="mt-10">
            <h3 className="text-lg font-semibold text-zinc-200 mb-4">Core Technologies</h3>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className="rounded-xl border border-green-950 bg-green-950/20 px-3.5 py-2 text-xs sm:text-sm font-medium text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.02)] transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-950/30 hover:scale-105 hover:text-emerald-300"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Physics Canvas */}
        <motion.div 
          className="lg:col-span-5 flex flex-col justify-center items-center w-full bg-zinc-950/35 border border-zinc-900 rounded-3xl p-6 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Label Helper */}
          <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-900/30 text-[10px] font-mono tracking-widest text-emerald-500 uppercase select-none pointer-events-none">
            Interactive Physics Sandbox
          </div>

          <Canvas style={{ height: canvasHeight, cursor: "grab" }} camera={{ position: [0, 0, 8] }}>
            <ambientLight intensity={6} />
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
          <div className="mt-4 text-xs font-medium text-zinc-500 flex items-center gap-2 select-none pointer-events-none">
            <span>💡</span> Click and drag the icons to test the physics
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
