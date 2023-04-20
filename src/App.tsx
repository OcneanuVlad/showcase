import React from "react";
import { Routes, Route } from "react-router-dom";

import Showcase from "./pages/Showcase";
import Hidden from "./pages/Hidden";
import Edit from "./pages/Edit";
import Add from "./pages/Add";
import Nav from "./components/nav";

function App() {
  return (
    <div className="flex justify-center">
      <Nav />
      <Routes>
        <Route path="/" element={<Showcase />}></Route>
        <Route path="/add" element={<Add />}></Route>
        <Route path="/edit" element={<Edit />}></Route>
        <Route path="/hidden" element={<Hidden />}></Route>
      </Routes>
    </div>
  );
}

export default App;
