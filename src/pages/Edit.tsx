import { WorkType } from "../types/WorkType";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Edit() {
  const { id } = useParams<string>();

  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [file, setFile] = useState<string>("");

  useEffect(() => {
    const data: WorkType[] = JSON.parse(localStorage.getItem("data") || "[]");

    const selectedWork: WorkType = data.find((work) => work.id === parseInt(id!))!;

    setTitle(selectedWork.title);
    setLink(selectedWork.link);
    setFile(selectedWork.file)
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
      const response = await fetch(`http://localhost:3000/work/${id}`, {
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
      window.location.href = "http://localhost:3001/";
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input value={title} onChange={handleTitleChange} type="text" name={"title"}></input>
        <label>Link:</label>
        <input value={link} onChange={handleLinkChange} type="text" name={"link"}></input>
        <label>Image:</label>
        <input type="file" accept="image/*" name="file" defaultValue={file} />
        <input type="submit" name="submit"></input>
      </form>
    </div>
  );
}

export default Edit;
