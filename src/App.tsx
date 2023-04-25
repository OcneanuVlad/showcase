import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Showcase from "./pages/Showcase";
import Hidden from "./pages/Hidden";
import Edit from "./pages/Edit";
import Add from "./pages/Add";
import Nav from "./components/nav";
import { WorkType } from "./types/WorkType";

function App() {
  const [shownData, setShownData] = useState<Array<WorkType>>([]);
  const [hiddenData, setHiddenData] = useState<Array<WorkType>>([]);

  function updateData(data: WorkType[]) {
    setShownData(data.filter((work) => work.hidden === false));
    setHiddenData(data.filter((work) => work.hidden === true));

    localStorage.setItem("data", JSON.stringify(data));
  }

  return (
    <div className="flex justify-center px-36">
      <Nav />
      <Routes>
        <Route path="/" element={<Showcase data={shownData} updateData={updateData} />}></Route>
        <Route path="/add" element={<Add />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path="/hidden" element={<Hidden data={hiddenData} updateData={updateData}/>}></Route>
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
