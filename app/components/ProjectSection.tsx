"use client";

import Image from "next/image";
import data from "../data.json";
import Link from "next/link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { motion } from "framer-motion";
import { useState } from "react";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof data)[0];
  index: number;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-green-900/50 bg-zinc-950/80 transition-all duration-300 hover:border-green-600/60 hover:shadow-lg hover:shadow-green-900/20"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
        {!imgError ? (
          <Image
            src={project.img}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-950 to-zinc-900">
            <span className="text-4xl font-bold text-green-800/80">
              {project.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg font-semibold text-white">{project.name}</h3>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-green-800/50 bg-green-950/40 px-2.5 py-0.5 text-xs text-green-400"
            >
              {t}
            </span>
          ))}
        </div>

        <Link
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-lg border border-green-700/50 px-4 py-2 text-sm font-medium text-green-400 transition-all hover:border-green-500 hover:bg-green-900/30 hover:text-green-300"
        >
          View Demo
          <OpenInNewIcon sx={{ fontSize: 14 }} />
        </Link>
      </div>
    </motion.article>
  );
}

function ProjectSection() {
  return (
    <section id="projects" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-green-600">
            Portfolio
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            My Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            A selection of front-end applications built with React, Next.js, and
            modern UI libraries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectSection;
