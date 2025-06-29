import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css';

const characters = [
  {
    name: "Not",
    image: "./girlbg.png",
    imageStyle: "character absolute w-[250px] sm:w-[300px] md:w-[350px] lg:w-[500px] lg:top-[27%] lg:left-[33%] transform scale-[1.5] lg:rotate-[6deg]",
    gradient: "bg-gradient-to-r from-orange-600 to-black",
  }
  ,
  {
    name: "Asper",
    image: "./asper.png",
    imageStyle: "character absolute top-[50%] sm:top-[44%] w-[180px] sm:w-[220px] md:w-[250px] lg:w-[300px] lg:top-[30%] lg:left-[38%] transform scale-[1.8]",
    gradient: "bg-gradient-to-r from-rose-900 to-zinc-900",
  },
  {
    name: "Halena",
    image: "./halena3.png",
    imageStyle: "character absolute w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] lg:top-[25%] lg:left-[35%] transform scale-[1.4]",
    gradient: "bg-gradient-to-r from-teal-500 to-black",
  },
  {
    name: "Kyra",
    image: "./kyra.png",
    imageStyle: "character absolute w-[240px] sm:w-[300px] md:w-[330px] lg:w-[380px] lg:top-[26%] lg:left-[35%] transform scale-[1.4]",
    gradient: "bg-gradient-to-r via-amber-600 from-orange-600 to-black",
  },
  {
    name: "Zenji",
    image: "./zenji2.png",
    imageStyle: "character absolute top-[52%] sm:top-[45%] w-[150px] sm:w-[180px] md:w-[220px] lg:w-[250px] lg:top-[30%] lg:left-[40%] transform scale-[2.1]",
    gradient: "bg-gradient-to-r from-emerald-900 to-stone-900",
  },
  {
    name: "Rio",
    image: "./rio.png",
    imageStyle: "character absolute top-[55%] sm:top-[45%] w-[150px] sm:w-[180px] md:w-[220px] lg:w-[250px] lg:top-[25%] lg:left-[38%] transform scale-[2.1]",
    gradient: "bg-gradient-to-r from-orange-500 to-amber-700",
  },
  {
    name: "Ozbel",
    image: "./oz2.png",
    imageStyle: "character absolute w-[240px] sm:w-[250px] md:w-[350px] lg:w-[400px] lg:top-[33%] lg:left-[35%] transform scale-[1.6]",
    gradient: "bg-gradient-to-r from-stone-300 to-amber-950",
  },
  {
    name: "Noya",
    image: "./noya.png",
    imageStyle: "character absolute w-[240px] sm:w-[300px] md:w-[350px] lg:w-[400px] lg:top-[25%] lg:left-[35%] transform scale-[1.5]",
    gradient: "bg-gradient-to-r from-orange-300 to-sky-500",
  },
  {
    name: "Lucifer",
    image: "./lui2.png",
    imageStyle: "character absolute w-[240px] sm:w-[300px] md:w-[350px] lg:w-[400px] lg:top-[25%] lg:left-[37%] transform scale-[1.5]",
    gradient: "bg-gradient-to-r from-orange-950 to-rose-200",
  },
  {
    name: "Brooklyn",
    image: "./brooklyn.png",
    imageStyle: "character absolute w-[240px] sm:w-[300px] md:w-[350px] lg:w-[400px] lg:top-[23%] lg:left-[35%] transform scale-[1.4]",
    gradient: "bg-gradient-to-r from-orange-500 via-orange-300 to-black",
  },
];

function App() {
  const [showContent, setShowContent] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const targetRef = useRef(null);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  const charNameRef = useRef(null);
  const charImgRef = useRef(null);

  const currentCharacter = characters[activeIndex];

  const changeCharacter = (dir) => {
    setDirection(dir);
    if (charImgRef.current) {
      gsap.to(charImgRef.current, {
        x: dir === "next" ? "-100%" : "100%",
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      });
    }

    setTimeout(() => {
      const nextIndex = dir === "next"
        ? (activeIndex + 1) % characters.length
        : (activeIndex - 1 + characters.length) % characters.length;
      setActiveIndex(nextIndex);
    }, 300);
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".frislandia-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".frislandia-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onComplete: () => {
        setShowContent(true);
      },
    });
  }, []);

  useGSAP(() => {
    if (!showContent) return;

    const tl = gsap.timeline();

    tl.to([".main", ".sky", ".bg", ".text"], {
      scale: (i, target) => {
        if (target.classList.contains("main")) return 1;
        if (target.classList.contains("sky")) return 1.2;
        if (target.classList.contains("bg")) return 1.2;
        if (target.classList.contains("characters")) return 1.1;
        return 1;
      },
      rotate: 0,
      duration: 2,
      ease: "Expo.easeInOut",
      delay: -1,
      stagger: 0.05,
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".imagesdiv .text", {
        x: `${xMove * 0.4}%`,
      });
      gsap.to(".sky", { x: xMove });
      gsap.to(".bg", { x: xMove * 1.7 });
    });
  }, [showContent]);

  useGSAP(() => {
    if (!charImgRef.current || !charNameRef.current) return;

    const fromX = direction === "next" ? "100%" : "-100%";

    gsap.set(charNameRef.current, { x: fromX, opacity: 0 });
    gsap.to(charNameRef.current, {
      x: "0%",
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
    });

    gsap.set(charImgRef.current, { x: fromX, opacity: 0 });
    gsap.to(charImgRef.current, {
      x: "0%",
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
    });
  }, [activeIndex]);

  useEffect(() => {
    if (isHovered || !showContent) return;
    intervalRef.current = setInterval(() => {
      changeCharacter("next");
    }, 10000);
    return () => clearInterval(intervalRef.current);
  }, [activeIndex, isHovered, showContent]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showContent) return;

      if (e.key === "ArrowRight") changeCharacter("next");
      else if (e.key === "ArrowLeft") changeCharacter("prev");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showContent, activeIndex]);

  return (
    <>
      {!showContent && (
        <div className="svg flex items-center justify-center fixed top-0 left-0 z-[9999] w-full h-screen overflow-hidden bg-[#000]">
          <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <mask id="frislandiaMask">
                <rect width="100%" height="100%" fill="black" />
                <g className='frislandia-mask-group'>
                  <text
                    x="50%"
                    y="50%"
                    fontSize="180"
                    textAnchor="middle"
                    fill="white"
                    dominantBaseline="middle"
                    fontFamily="CarnevaleeFreakshow"
                  >
                    FRISLANDIA
                  </text>
                </g>
              </mask>
            </defs>
            <image
              href="./bg.png"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              mask="url(#frislandiaMask)"
            />
          </svg>
        </div>
      )}

      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7] relative z-0">
          <div
            className="landing overflow-hidden relative w-full h-screen bg-black z-0"
          >

            <div className="navbar fixed top-0 left-0 z-[100] w-full py-10 px-10">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px] ml-5">
                  <div className="line w-15 h-2 bg-white"></div>
                  <div className="line w-8 h-2 bg-white"></div>
                  <div className="line w-5 h-2 bg-white"></div>
                </div>
                <h3 className="text-4xl -mt-[8px] leading-none text-white text-stroke-black">Auktroz</h3>
              </div>
            </div>

            <div className="imagesdiv relative w-full h-screen overflow-hidden flex items-center justify-center z-10">
              <img className="sky absolute top-0 left-0 w-full h-full scale-[1.5] rotate-[-20deg] object-cover z-0" src="./sky.png" />
              <img className="bg absolute top-0 left-0 w-full h-full object-cover scale-[1.8] rotate-[-3deg] z-10" src="./bg.png" />

              <div className="text-wrapper w-full absolute top-[80px] sm:top-[130px] md:top-[120px] lg:top-[100px] xl:top-[40px] left-0 flex justify-center z-10">
                <div
                  ref={charNameRef}
                  className="text text-white whitespace-nowrap flex items-center gap-5 md:gap-10 scale-[1.2] md:scale-[1.5] rotate-[-10deg] font-[CarnevaleeFreakshow]"
                >
                  <h1 className={`text-[2.5rem] md:text-[6rem] leading-none bg-clip-text text-transparent ${currentCharacter.gradient} text-stroke-black`}>
                    {currentCharacter.name}
                  </h1>
                  <h1 className="text-[2.5rem] md:text-[6rem] leading-none bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-stone-700 text-stroke-black">
                    from Frislandia
                  </h1>
                </div>
              </div>

              <div className="z-[15] flex items-end justify-center w-full h-full px-4 md:px-0 cursor-pointer relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                <img
                  ref={charImgRef}
                  key={currentCharacter.name}
                  src={currentCharacter.image}
                  alt={currentCharacter.name}
                  className={currentCharacter.imageStyle}
                />
              </div>
            </div>

            <button
              onClick={() => changeCharacter("prev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-r from-black/60 to-transparent text-white z-50 flex items-center justify-center text-2xl font-bold rounded-full cursor-pointer transition-transform duration-300 hover:scale-110"
            >
              <i className="ri-arrow-left-s-line text-3xl" />
            </button>

            <button
              onClick={() => changeCharacter("next")}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-l from-black/60 to-transparent text-white z-50 flex items-center justify-center text-2xl font-bold rounded-full cursor-pointer transition-transform duration-300 hover:scale-110"
            >
              <i className="ri-arrow-right-s-line text-3xl" />
            </button>

            <div className="btmbar text-white absolute -bottom-2.5 left-0 w-full py-6 px-4 sm:px-6 md:px-10 bg-gradient-to-t from-black to-transparent z-30">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex gap-3 items-center cursor-pointer" onClick={scrollToBottom}>
                  <i className="text-3xl ml-[10px]  sm:ml-[20px] sm:text-4xl ri-arrow-down-line transition-transform duration-300 hover:scale-110"></i>
                  <h3 className="text-base sm:text-lg md:text-xl font-[Helvetica_Now_Display]">Scroll Down</h3>
                </div>

                <a href="https://bit.ly/royalroadfrislandia" target="_blank" rel="noopener noreferrer" className="mx-auto sm:mx-0">
                  <img
                    className="cursor-pointer transition-transform duration-300 hover:scale-110 h-[30px] sm:h-[35px]"
                    src="./rr.png"
                    alt="Read Frislandia"
                  />
                </a>
              </div>
            </div>
          </div>

          <div ref={targetRef} className="w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 bg-black py-10">
            <div className="cntnr flex flex-col lg:flex-row text-white w-full max-w-[1400px] gap-10">
              <div className="limg relative w-full lg:w-1/2 h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden flex justify-center items-center">
                <img
                  className="scale-[0.8] max-h-full fade-bottom object-contain"
                  src="./Ivo1.png"
                  alt=""
                />
              </div>
              <div className="rg w-full lg:w-1/2 -mt-[8%] lg:mt-20 px-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">Let's Explore,</h1>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">Frislandia!</h1>
                <p className="mt-6 text-sm sm:text-base md:text-lg font-[Helvetica_Now_Display] leading-relaxed">
                  The world forbids exploring beyond its borders, and just speaking about the lost island of Frislandia is a dangerous taboo. Many pirates, explorers, and adventurers who dared to search for it have been captured, executed, or disappeared without a trace, crushed by the ruling empires. But Asper has no clue about these dangers.
                </p>
                <p className="mt-4 text-sm sm:text-base md:text-lg font-[Helvetica_Now_Display] leading-relaxed">
                  After being confined in the quiet village of Darzine for years, all Asper dreams of is exploring the unknown and becoming the world's greatest explorer. Ever since he learned about Frislandia-a place said to be unreachable, yet full of secrets-his heart is set. But what happens when the world stands in his way? With new friends by his side, will Asper uncover the island's mysteries or fall victim to the same fate as those before him?
                </p>
                <a href="https://bit.ly/royalroadfrislandia" target="_blank" rel="noopener noreferrer">
                  <button className="bg-yellow-500 hover:bg-yellow-300 transition-colors duration-300 px-6 sm:px-7 py-3 sm:py-4 text-black mt-6 text-base sm:text-lg md:text-xl cursor-pointer">
                    Read Now
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
