"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/85 backdrop-blur-lg border-b border-green-900/40 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="#home"
          className="group flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-green-700/60 bg-green-950/40 text-sm font-bold text-green-400 transition-colors group-hover:border-green-500 group-hover:bg-green-900/30">
            YS
          </span>
          <span className="hidden text-sm font-medium text-zinc-300 sm:block">
            Youssef Sherif
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm text-zinc-400 transition-colors hover:bg-green-950/50 hover:text-green-400"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/youssef-sherif-cv.pdf"
            download="Youssef-Sherif-CV.pdf"
            className="inline-flex items-center gap-2 rounded-lg border border-green-700/60 bg-green-950/30 px-4 py-2 text-sm font-medium text-green-400 transition-all hover:border-green-500 hover:bg-green-900/40 hover:text-green-300"
          >
            <DownloadIcon sx={{ fontSize: 16 }} />
            Resume
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-lg p-2 text-green-500 transition-colors hover:bg-green-950/50 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-green-900/40 bg-black/95 backdrop-blur-lg md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-base text-zinc-300 transition-colors hover:bg-green-950/50 hover:text-green-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="/youssef-sherif-cv.pdf"
                  download="Youssef-Sherif-CV.pdf"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-green-700/60 bg-green-950/30 px-4 py-3 text-sm font-medium text-green-400"
                >
                  <DownloadIcon sx={{ fontSize: 18 }} />
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
