import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dummy } from "../dummy";
import Work from "./work";
import { useEffect } from "react";
import "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js";

gsap.registerPlugin(ScrollTrigger);

function Grid() {
  function WorkDisplay(data: any) {
    return <Work name={data.name} client={data.client} link={data.link} />;
  }

  useEffect(() => {

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
          transform: ["translateY(calc(-100% + 20vh))", "translateY(calc(100% - 100vh))"],
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
    <div className="col-container h-auto w-9/12 flex justify-between">
      <div className="column-reverse col-1 w-32p flex flex-col-reverse h-full">
        {dummy.length % 3 == 0
          ? dummy.slice(0, Math.floor(dummy.length / 3)).map((work) => WorkDisplay(work))
          : dummy.slice(0, Math.floor(dummy.length / 3) + 1).map((work) => WorkDisplay(work))}
      </div>
      <div className="col-2 w-32p flex flex-col h-full">
        {dummy.length % 3 == 2
          ? dummy.slice(Math.floor(dummy.length / 3) + 1, Math.floor(dummy.length / 3) * 2 + 2).map((work) => WorkDisplay(work))
          : dummy.length % 3 == 1
          ? dummy.slice(Math.floor(dummy.length / 3) + 1, Math.floor(dummy.length / 3) * 2 + 1).map((work) => WorkDisplay(work))
          : dummy.slice(Math.floor(dummy.length / 3), Math.floor(dummy.length / 3) * 2).map((work) => WorkDisplay(work))}
      </div>
      <div className="column-reverse col-3 w-32p flex flex-col-reverse h-full">
        {dummy.length % 3 == 0
          ? dummy.slice(Math.floor(dummy.length / 3) * 2, dummy.length).map((work) => WorkDisplay(work))
          : dummy.length % 3 == 1
          ? dummy.slice(Math.floor(dummy.length / 3) * 2 + 1, dummy.length).map((work) => WorkDisplay(work))
          : dummy.slice(Math.floor(dummy.length / 3) * 2 + 2, dummy.length).map((work) => WorkDisplay(work))}
      </div>
    </div>
  );
}

export default Grid;
