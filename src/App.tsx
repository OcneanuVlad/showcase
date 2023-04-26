import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { gsap } from "gsap";

import Showcase from "./pages/Showcase";
import Hidden from "./pages/Hidden";
import Edit from "./pages/Edit";
import Add from "./pages/Add";
import Nav from "./components/nav";
import { WorkType } from "./types/WorkType";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/") {
      const gsaptimeline = gsap.timeline({ defaults: { duration: 0.5 } });
      gsaptimeline
        .to(".underline", { width: "100%", delay: 1.25 })
        .fromTo(".preload-text", { y: "30px" }, { y: 0, stagger: 0.5 })
        .add(() => {
          window.scrollTo(0, document.body.scrollHeight);
          const images = Array.from(document.getElementsByClassName("workImage") as HTMLCollectionOf<HTMLElement>);
          images.forEach((image) => {
            image.style.opacity = "0%";
            console.log("bat");
          });
          setTimeout(() => {
            images.forEach((image) => {
              image.style.opacity = "100%";
              console.log("tab");
            });
          }, 600);
        })
        .to(".preloader", { opacity: 0, delay: 1 })
        .to(".preloader", { display: "none", duration: 0 })
        .add(() => {
          window.scrollTo(0, 1);
          setTimeout(() => {
            window.addEventListener("scroll", (event) => {
              const cols = Array.from(document.getElementsByClassName("column") as HTMLCollectionOf<HTMLElement>);
              cols.forEach((col) => {
                col.style.opacity = "100%";
              });
              console.log("hei");
            });
          }, 500);
        })
        .fromTo(".block-container", { y: "0vh" }, { y: "-100%", duration: 1.5, delay: 0.5 });
    } else {
      const preloader: HTMLElement = document.querySelector(".preloader")!;
      preloader.style.display = "none";
      gsap.fromTo(".block-container", { y: "0vh" }, { y: "-100%", duration: 1.5, delay: 0.5 });
    }
  }, []);

  const [shownData, setShownData] = useState<Array<WorkType>>([]);
  const [hiddenData, setHiddenData] = useState<Array<WorkType>>([]);

  function updateData(data: WorkType[]) {
    setShownData(data.filter((work) => work.hidden === false));
    setHiddenData(data.filter((work) => work.hidden === true));

    localStorage.setItem("data", JSON.stringify(data));
  }

  return (
    <div className="flex justify-center px-16 md:px-36 min-h-screen">
      <Nav />
      <Routes>
        <Route path="/" element={<Showcase data={shownData} updateData={updateData} />}></Route>
        <Route path="/add" element={<Add />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path="/hidden" element={<Hidden data={hiddenData} updateData={updateData} />}></Route>
      </Routes>
      <div className="block-container">
        <div className="block"></div>
        <div className="block"></div>
        <div className="block"></div>
      </div>
      <div className="preloader">
        <div className="preload-container">
          <p className="preload-text">Mint</p>
          <p className="preload-text">of</p>
          <p className="preload-text">Creativity</p>
          <div className="underline"></div>
        </div>
      </div>
      <p className="copyright w-36 fixed bottom-5 right-7 text-xs font-base">© 2023 Ocneanu Vlad</p>
    </div>
  );
}

export default App;
