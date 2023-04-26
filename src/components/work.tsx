import { useNavigate } from "react-router-dom";
import { backEndUrl } from "../Url";
import { useEffect } from "react";

function Work({
  id,
  title,
  link,
  hidden,
  filePath,
  updateCurrentData,
}: {
  id: number;
  title: string;
  link: string;
  hidden: boolean;
  filePath: string;
  updateCurrentData: any;
}) {
  const navigate = useNavigate();

  function Edit() {
    gsap.fromTo(".block-container", { y: "100%" }, { y: "-100%", duration: 0.8 });
    setTimeout(() => {
      navigate(`/edit/${id}`);
    }, 200);
  }

  useEffect(() => {
    const workButtons = Array.from(document.getElementsByClassName("workButton") as HTMLCollectionOf<HTMLElement>);
    workButtons.forEach((button) => {
      button.addEventListener("transitionend", (event) => {
        if (event.propertyName === "line-height") {
          if (event.target instanceof Element) {
            let image: Element | null = null;
            let currentSibling = event.target.previousElementSibling;
            while (currentSibling) {
              if (currentSibling.classList.contains("workImage")) {
                image = currentSibling as Element;
                break;
              }
              currentSibling = currentSibling.previousElementSibling;
            }
            if (window.getComputedStyle(image!).getPropertyValue("opacity") === "0") {
              button.style.pointerEvents = "auto";
            } else {
              button.style.pointerEvents = "none";
            }
          }
        }
      });
    });
  }, []);

  const img = new Image();
  img.src = `${backEndUrl}${filePath.replace(/\\/g, "/")}`;

  async function Delete() {
    try {
      const response = await fetch(`${backEndUrl}work/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Work deleted successfully");
      } else {
        console.error("Work deletion failed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      updateCurrentData();
    }
  }

  async function HideToggle() {
    const updateHidden = !hidden;
    try {
      const response = await fetch(`${backEndUrl}work/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hidden: updateHidden }),
      });

      if (response.ok) {
        console.log("Work hidden successfully");
      } else {
        console.error("Work hidden failed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      updateCurrentData();
    }
  }

  return (
    <div className="relative work flex flex-col items-center justify-center w-full h-auto">
      <img
        className="workImage w-full aspect-auto z-10"
        src={`${backEndUrl}${filePath.replace(/\\/g, "/")}`}
        alt="projectImage"
      />
      <p className="absolute font-bold text-xl">{title}</p>
      <a className="workButton" href={link} target="blank">
        View
      </a>
      <button onClick={Edit} className="workButton">
        Edit
      </button>
      <button onClick={Delete} className="workButton">
        Delete
      </button>
      <button onClick={HideToggle} className="workButton">
        {hidden ? "Unhide" : "Hide"}
      </button>
    </div>
  );
}

export default Work;
