import { WorkType } from "../types/WorkType";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { backEndUrl } from "../Url";

function Edit() {
  const { id } = useParams<string>();

  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [file, setFile] = useState<string>("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const data: WorkType[] = JSON.parse(localStorage.getItem("data") || "[]");

    const selectedWork: WorkType = data.find((work) => work.id === parseInt(id!))!;

    setTitle(selectedWork.title);
    setLink(selectedWork.link);
    setFile(selectedWork.file);
  }, [id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("link", link);
      formData.append("file", e.currentTarget.file.files[0]);
      const response = await fetch(`${backEndUrl}work/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        console.log("Work updated successfully");
      } else {
        console.error("Work update failed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      gsap.fromTo(".block-container", { y: "100%" }, { y: "-100%", duration: 0.8 });
      setTimeout(() => {
        navigate("/");
      }, 200);
    }
  };

  return (
    <div className="formContainer w-screen flex flex-col justify-around items-center">
      <p className="font-extrabold md:text-3xl text-xl text-center mt-20">Edit Project details</p>
      <form className="addForm" onSubmit={handleSubmit}>
        <input value={title} onChange={handleTitleChange} type="text" name={"title"} placeholder="Project Title" required></input>
        <input value={link} onChange={handleLinkChange} type="url" name={"link"} placeholder="Project Link" required></input>
        <div>
          <label htmlFor="fileInput">Select Image</label>
          <input id="fileInput" type="file" accept="image/*" name="file" />
          <p className="ml-3 mt-1 text-xs font-thin opacity-60">If you don't select a file, the Image will not change*</p>
        </div>
        <input className="submit" type="submit" name="submit" defaultValue={file}></input>
      </form>
    </div>
  );
}

export default Edit;
