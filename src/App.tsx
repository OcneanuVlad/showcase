import React from "react";
import { Routes, Route } from "react-router-dom";

import Showcase from "./pages/Showcase";
import Hidden from "./pages/Hidden";
import Edit from "./pages/Edit";
import Add from "./pages/Add";
import Nav from "./components/nav";

function App() {
  return (
    <div className="flex justify-center px-36">
      <Nav />
      <Routes>
        <Route path="/" element={<Showcase />}></Route>
        <Route path="/add" element={<Add />}></Route>
        <Route path="/edit" element={<Edit />}></Route>
        <Route path="/hidden" element={<Hidden />}></Route>
      </Routes>
      <div className="block-container">
        <div className="block"></div>
        <div className="block"></div>
        <div className="block"></div>
      </div>
      <p className="w-36 fixed bottom-5 right-7 text-xs font-base">© 2023 Ocneanu Vlad</p>
    </div>
  );
}

export default App;
