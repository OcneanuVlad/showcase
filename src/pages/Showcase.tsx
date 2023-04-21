import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dummy } from "../dummy";
import Work from "../components/work";
import { useEffect } from "react";
import "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js";

gsap.registerPlugin(ScrollTrigger);

function Showcase() {
  function WorkDisplay(data: any) {
    return <Work name={data.name} client={data.client} link={data.link} />;
  }

  useEffect(() => {
    const col2 = document.querySelector('.col-2')?.firstChild!;
    if (col2 instanceof HTMLElement) {
      col2.style.marginTop = '0px';
    }

    window.scrollTo(0, 0);
    

    // @ts-ignore
    const timeline = new ScrollTimeline({
      scrollSource: document.documentElement,
      timeRange: 1,
      fill: "both",
    });

    document.querySelectorAll(".column-reverse").forEach((column: any) => {
      column.style.flexDirection = "column-reverse";

      column.animate(
        {
          transform: ["translateY(calc(-100% + 20vh))", "translateY(calc(100% - 180vh))"],
        },
        {
          duration: 1,
          fill: "both",
          timeline,
        }
      );
    });
  }, []);
  return (
    <>
      <div className="initial-message z-0 transition-opacity fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center h-16">
        <p className="text-3xl font-extrabold">KEEP IT SIMPLE</p>
        <div className="container">
          <div className="chevron"></div>
          <div className="chevron"></div>
          <div className="chevron"></div>
        </div>
      </div>
      <div className="col-container z-10 h-auto w-10/12 flex justify-between">
        <div className="column-reverse col-1 w-32p flex flex-col-reverse h-full">
          {dummy.length % 3 == 2
            ? dummy.slice(Math.floor(dummy.length / 3) + 1, Math.floor(dummy.length / 3) * 2 + 2).map((work) => WorkDisplay(work))
            : dummy.length % 3 == 1
            ? dummy.slice(Math.floor(dummy.length / 3) + 1, Math.floor(dummy.length / 3) * 2 + 1).map((work) => WorkDisplay(work))
            : dummy.slice(Math.floor(dummy.length / 3), Math.floor(dummy.length / 3) * 2).map((work) => WorkDisplay(work))}
        </div>
        <div className="col-2 w-32p flex flex-col h-full">
          {dummy.length % 3 == 0
            ? dummy.slice(0, Math.floor(dummy.length / 3)).map((work) => WorkDisplay(work))
            : dummy.slice(0, Math.floor(dummy.length / 3) + 1).map((work) => WorkDisplay(work))}
        </div>
        <div className="column-reverse col-3 w-32p flex flex-col-reverse h-full">
          {dummy.length % 3 == 0
            ? dummy.slice(Math.floor(dummy.length / 3) * 2, dummy.length).map((work) => WorkDisplay(work))
            : dummy.length % 3 == 1
            ? dummy.slice(Math.floor(dummy.length / 3) * 2 + 1, dummy.length).map((work) => WorkDisplay(work))
            : dummy.slice(Math.floor(dummy.length / 3) * 2 + 2, dummy.length).map((work) => WorkDisplay(work))}
        </div>
      </div>
    </>
  );
}

export default Showcase;
