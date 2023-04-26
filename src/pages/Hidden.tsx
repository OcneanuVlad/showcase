import { WorkType } from "../types/WorkType";
import Work from "../components/work";
import { backEndUrl } from "../Url";
import {useEffect} from 'react';

function Hidden({ data, updateData }: { data: WorkType[]; updateData: any }) {
  function updateCurrentData() {
    fetchData();
  }

  useEffect(() => {
    fetchData();
  },[])

  function fetchData() {
    fetch(`${backEndUrl}work`)
      .then((response) => response.json())
      .then((data) => {
        updateData(data);
      })
      .catch((error) => console.error(error));
  }
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
  if (data.length > 0) {
    return <div className="hiddenCol flex flex-col w-6/12 h-auto">{data.map((work) => WorkDisplay(work))}</div>;
  } else {
    return (
      <p className="absolute top-1/2 -translate-y-1/2 text-center md:text-4xl text-2xl font-extrabold w-6/12 md:w-screen">
        There are no hidden entries
      </p>
    );
  }
}

export default Hidden;
