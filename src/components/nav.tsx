import { Link, useLocation } from "react-router-dom";


function Nav() {

    const location = useLocation();
    console.log(location);

  return (
    <div className="nav w-1/12 fixed top-0 left-0 flex flex-col items-start justify-center gap-5 h-screen pl-10">
      <p className="absolute top-10 font-extrabold text-2xl">OV</p>
      <Link className={location.pathname === "/" ? "nav-button nav-button-active" : "nav-button"} to="/"><span></span>Home</Link>
      <Link className={location.pathname === "/add" ? "nav-button nav-button-active" : "nav-button"} to="/add"><span></span>Add</Link>
      <Link className={location.pathname === "/hidden" ? "nav-button nav-button-active" : "nav-button"} to="/hidden"><span></span>Hidden</Link>
    </div>
  );
}

export default Nav;
