"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <motion.nav
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
        variants={{
          initial: { opacity: 0, y: -100 },
          animate: { opacity: 1, y: 0 },
        }}
        className=" py-10 sm:flex items-center justify-center hidden"
      >
        <Link
          href="#home"
          className="px-10  text-green-700 hover:text-white "
        >
          {" "}
          Home
        </Link>
        <Link
          href="#about"
          className="px-10  text-green-700 hover:text-white "
        >
          {" "}
          About
        </Link>
        <Link
          href="#contact"
          className="px-10  text-green-700  hover:text-white  "
        >
          {" "}
          Contact
        </Link>
      </motion.nav>

      <motion.nav
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
        variants={{
          initial: { opacity: 0, y: -100 },
          animate: { opacity: 1, y: 0 },
        }}
        className=" py-6 flex items-center justify-center sm:hidden "
      >
        <MenuIcon className="ml-auto mr-5" onClick={toggleDrawer(true)} />
      </motion.nav>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <div className="relative w-[80vw] h-full flex flex-col items-center justify-center bg-black border-l-2 border-green-700 ">



          <CloseIcon onClick={() => setOpen(false)} className="absolute top-5 right-5 text-green-800" />




          <Link
            onClick={() => setOpen(false)}
            href="#home"
            className="px-10  text-green-700 hover:text-white "
          >
            {" "}
            Home
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="#about"
            className="px-10 my-10 text-green-700 hover:text-white "
          >
            {" "}
            About
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="#contact"
            className="px-10 mb-24 text-green-700  hover:text-white  "
          >
            {" "}
            Contact
          </Link>
        </div>
      </Drawer>
    </>
  );
}

export default Navbar;
