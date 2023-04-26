import { gsap } from "gsap";
import { useLocation, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  function Reload() {
    navigate("/");
  }

  function Navigate(event: any) {
    if (location.pathname !== event.target.value) {
      gsap.fromTo(".block-container", { y: "100%" }, { y: "-100%", duration: 0.8 });

      setTimeout(() => {
        navigate(event.target.value);
      }, 200);
    }
  }

  const location = useLocation();

  return (
    <div className="nav w-32 fixed top-0 left-0 flex flex-col items-start justify-center gap-5 h-screen pl-4 md:pl-10">
      <p onClick={Reload} className="cursor-pointer absolute top-10 font-extrabold text-2xl">
        OV
      </p>
      <button
        value={"/"}
        onClick={Navigate}
        className={location.pathname === "/" ? "nav-button nav-button-active" : "nav-button"}
      >
        <span className="pointer-events-none"></span>Home
      </button>
      <button
        value={"/add"}
        onClick={Navigate}
        className={location.pathname === "/add" ? "nav-button nav-button-active" : "nav-button"}
      >
        <span className="pointer-events-none"></span>Add
      </button>
      <button
        value={"/hidden"}
        onClick={Navigate}
        className={location.pathname === "/hidden" ? "nav-button nav-button-active" : "nav-button"}
      >
        <span className="pointer-events-none"></span>Hidden
      </button>
    </div>
  );
}

export default Nav;
