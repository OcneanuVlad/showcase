import { useNavigate } from "react-router-dom";

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
    navigate(`/edit/${id}`);
  }

  async function Delete() {
    try {
      const response = await fetch(`http://localhost:3000/work/${id}`, {
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
      const response = await fetch(`http://localhost:3000/work/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hidden: updateHidden }),
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
  return (
    <div className="relative work flex flex-col items-center justify-center w-full h-auto">
      <img className="workImage w-full aspect-auto z-10" src={`http://localhost:3000/${filePath.replace(/\\/g, "/")}`} alt="projectImage" />
      <p className="absolute">{title}</p>
      <a className="absolute top-8 left-8" href={link} target="blank">
        Check it out
      </a>
      <button onClick={Edit} className="absolute top-8 right-8">
        Edit
      </button>
      <button onClick={Delete} className="absolute bottom-8 left-8">
        Delete
      </button>
      <button onClick={HideToggle} className="absolute bottom-8 right-8">
        {hidden ? "Show" : "Hide"}
      </button>
    </div>
  );
}

export default Work;
