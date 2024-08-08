"use client";

import { motion } from "framer-motion";
const ModelView = lazy(() => import("./components/ModelView"));
import { lazy, Suspense } from "react";
import ProjectSection from "./components/ProjectSection";
import SkillSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";


export default function Home() {
  const container = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.8,
      },
    },
  };

  const item = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  const button = {
    hidden:{x:20 , opacity: 0},
    visible: {
      x:0,
      opacity:1
    }
  }

  return (
    <>
      <section className=" flex flex-col sm:flex-row homepage items-center justify-center md:aspect-[1/2] w-screen p-10 sm:p-24 ">
        <motion.div
          className=" py-4 w-full flex flex-col ml-auto"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.h3 variants={item} className="md:text-lg text-sm">
            Welcome to My Portfolio
          </motion.h3>
          <motion.h1 variants={item} className="text-2xl ">
            I'm Youssef Sherif, a <span className="hero glitch layers"  data-text="Front-End Developer"> Front-End Developer </span> 
          </motion.h1>
          <motion.h4 variants={item} className="sm:text-xl text-sm">
            passionate about creating engaging digital experiences.
          </motion.h4>
          <motion.button variants={button} className=" mr-auto ml-auto mt-10 custom-btn btn-7"> <span> <a href="/youssef.pdf" download>My Resume</a> </span> </motion.button>
        </motion.div>
        <Suspense fallback={"loading..."}>
          <ModelView />
        </Suspense>
      </section>
      <ProjectSection />
      <SkillSection />
      <ContactSection />
    </>
  );
}
