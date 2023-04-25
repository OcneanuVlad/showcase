import { WorkType } from "../types/WorkType";
import Work from "../components/work";

function Hidden({ data, updateData }: { data: WorkType[]; updateData: any }) {
  function updateCurrentData() {
    fetchData();
  }

  function fetchData() {
    fetch("http://localhost:3000/work")
      .then((response) => response.json())
      .then((data) => {
        updateData(data);
      })
      .catch((error) => console.error(error));
  }
  function WorkDisplay(data: any) {
    return <Work id={data.id} title={data.title} link={data.link} hidden={data.hidden} filePath={data.file} updateCurrentData={updateCurrentData} />;
  }
  return <div className="flex flex-col w-6/12 h-auto">{data.map((work) => WorkDisplay(work))}</div>;
}

export default Hidden;
