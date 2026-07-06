"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import ProjectSection from "./components/ProjectSection";
import DownloadIcon from "@mui/icons-material/Download";

// Load Three.js Canvas and interactive parts dynamically with ssr: false
// to fix the client-side JavaScript crashes and compilation issues
const ModelView = dynamic(() => import("./components/ModelView"), {
  ssr: false,
  loading: () => (
    <div className="h-[22rem] flex items-center justify-center text-zinc-500">
      <span className="text-sm tracking-wider uppercase animate-pulse">Loading interactive space...</span>
    </div>
  ),
});

const SkillSection = dynamic(() => import("./components/AboutSection"), {
  ssr: false,
});

const ContactSection = dynamic(() => import("./components/ContactSection"), {
  ssr: false,
});

export default function Home() {
  const container = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center w-full px-6 py-20 sm:px-12 md:px-24 pt-28 sm:pt-32 overflow-hidden bg-black"
      >
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-green-500/5 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          <motion.div
            className="w-full flex flex-col justify-center lg:col-span-7"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            {/* Header Badge */}
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 w-fit mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Welcome to My Portfolio
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(52,211,153,0.15)]">
                Youssef Sherif
              </span>
            </motion.h1>

            <motion.h2
              variants={item}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-300 mt-3"
            >
              a <span className="text-emerald-400">Front-End Developer</span>
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl"
            >
              I specialize in crafting intuitive, pixel-perfect, and highly responsive user interfaces. My passion is building dynamic web applications that blend clean code with premium interactive design.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={buttonVariant}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="/youssef-sherif-cv.pdf"
                download="Youssef-Sherif-CV.pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500 bg-emerald-500/10 px-6 py-3.5 text-sm font-semibold text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all hover:bg-emerald-500 hover:text-black hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <DownloadIcon sx={{ fontSize: 18 }} />
                Download Resume
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950/40 px-6 py-3.5 text-sm font-semibold text-zinc-300 transition-all hover:border-zinc-500 hover:bg-zinc-900 hover:text-white hover:-translate-y-0.5 active:translate-y-0"
              >
                View Projects
              </a>
            </motion.div>
          </motion.div>

          {/* 3D Render Area */}
          <motion.div
            className="w-full lg:col-span-5 flex justify-center items-center h-[26rem] lg:h-[30rem]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="w-full max-w-md aspect-square bg-zinc-950/20 border border-green-950/30 rounded-full p-6 relative shadow-[0_0_50px_rgba(16,185,129,0.05)]">
              <div className="absolute inset-0 rounded-full border-2 border-emerald-500/10 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-dashed border-emerald-500/5 animate-[spin_40s_linear_infinite_reverse]" />
              <ModelView />
            </div>
          </motion.div>
        </div>
      </section>
      <ProjectSection />
      <SkillSection />
      <ContactSection />
    </>
  );
}
