import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import MediaQuery from "react-responsive";
import Work from "../components/work";
import { useLayoutEffect, useEffect } from "react";
import "../scroll-timeline";
import { WorkType } from "../types/WorkType";
import { backEndUrl } from "../Url";

gsap.registerPlugin(ScrollTrigger);

function Showcase({ data, updateData }: { data: WorkType[]; updateData: any }) {
  const width = useMediaQuery({ minWidth: 1000 });

  function WorkDisplay(data: any) {
    return (
      <Work
        id={data.id}
        title={data.title}
        link={data.link}
        hidden={data.hidden}
        filePath={data.file}
        updateCurrentData={updateCurrentData}
      />
    );
  }

  function updateCurrentData() {
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch(`${backEndUrl}work`)
      .then((response) => response.json())
      .then((data) => {
        updateData(data);
      })
      .catch((error) => console.error(error));
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
          transform: ["translateY(calc(-100% + 10vh))", "translateY(calc(100% - 160vh))"],
        },
        {
          duration: 1,
          fill: "both",
          timeline,
        }
      );
    });
    const col2 = document.querySelector(".col-2")?.firstChild!;
    if (col2 instanceof HTMLElement) {
      col2.style.marginTop = "0px";
    }
  }, [width]);

  useLayoutEffect(() => {
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
          transform: ["translateY(calc(-100% + 10vh))", "translateY(calc(100% - 160vh))"],
        },
        {
          duration: 1,
          fill: "both",
          timeline,
        }
      );
    });
    const col2 = document.querySelector(".col-2")?.firstChild!;
    if (col2 instanceof HTMLElement) {
      col2.style.marginTop = "0px";
    }
  }, []);

  return (
    <>
      <div className="initial-message z-0 transition-opacity fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex-col justify-center items-center h-16">
        <p className="text-3xl font-extrabold">KEEP IT SIMPLE</p>
        <div className="container">
          <div className="chevron"></div>
          <div className="chevron"></div>
          <div className="chevron"></div>
        </div>
      </div>
      {width && (
        <div className="col-container z-10 h-auto w-10/12 flex justify-between">
          <div className="column column-reverse col-1 w-32p flex flex-col-reverse h-full">
            {data.length % 3 == 2
              ? data.slice(Math.floor(data.length / 3) + 1, Math.floor(data.length / 3) * 2 + 2).map((work) => WorkDisplay(work))
              : data.length % 3 == 1
              ? data.slice(Math.floor(data.length / 3) + 1, Math.floor(data.length / 3) * 2 + 1).map((work) => WorkDisplay(work))
              : data.slice(Math.floor(data.length / 3), Math.floor(data.length / 3) * 2).map((work) => WorkDisplay(work))}
          </div>
          <div className="column col-2 w-32p flex flex-col h-full">
            {data.length % 3 == 0
              ? data.slice(0, Math.floor(data.length / 3)).map((work) => WorkDisplay(work))
              : data.slice(0, Math.floor(data.length / 3) + 1).map((work) => WorkDisplay(work))}
          </div>
          <div className="column column-reverse col-3 w-32p flex flex-col-reverse h-full">
            {data.length % 3 == 0
              ? data.slice(Math.floor(data.length / 3) * 2, data.length).map((work) => WorkDisplay(work))
              : data.length % 3 == 1
              ? data.slice(Math.floor(data.length / 3) * 2 + 1, data.length).map((work) => WorkDisplay(work))
              : data.slice(Math.floor(data.length / 3) * 2 + 2, data.length).map((work) => WorkDisplay(work))}
          </div>
        </div>
      )}
      {!width && <div className="mainCol flex flex-col w-6/12 h-auto">{data.map((work) => WorkDisplay(work))}</div>}
    </>
  );
}

export default Showcase;
