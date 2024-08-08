'use client'
import Image from "next/image";
import data from "../data.json";
import Tilt from 'react-parallax-tilt'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";



// Import Swiper styles

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../SwiperStyles.css";

// import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import Link from "next/link";
import { useEffect, useState } from "react";

function ProjectSection() {



  const [slidesPerView, setSlidesPerView] = useState<number>(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) { // Adjust the breakpoint as needed
        setSlidesPerView(1);
      } else {
        setSlidesPerView(3);
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
    <section className=" sm:h-[130vh] 2xl:h-[80vh] flex flex-col items-center justify-start px-5 py-24">
      <h1 className="text-2xl mb-10">My Projects</h1>
      <Swiper
        slidesPerView={ slidesPerView }
        freeMode={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination , FreeMode]}
        className="w-full h-[70vh] sm:h-screen mySwiper"
      >
        {data.map((_, i) => {
          return (
            <SwiperSlide key={i} >
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} >
              <div className=" relative 2xl:w-[500px] w-[300px]  sm:w-[350px] h-[450px] sm:h-[400px] rounded-md overflow border-green-700 border-2 ">
                <Image
                  src={_.img}
                  alt={_.name}
                  width={400}
                  height={400}
                  className="h-[200px] 2xl:w-[500px]"
                />
                <div className=" w-full h-full mt-5">
                  <h2 className="text-xl px-3">{_.name} test</h2>
                  <div className="p-2 flex flex-wrap">
                  {_.tech.map((t , i) => (
                    <span key={i} className="text-black bg-[#008000] text-xs font-bold px-2 py-1 mx-1 my-1 rounded-xl">#{t}</span>
                  ))}
                  </div>
                  <Link className="absolute bottom-4 right-4 text-green-600  border-2 border-green-500 px-3 py-1 rounded-3xl hover:text-black hover:bg-green-700" href={_.demo}>Demo</Link>
                </div>
              </div>
              </Tilt>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

export default ProjectSection;
