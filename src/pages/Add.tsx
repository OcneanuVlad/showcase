import { backEndUrl } from "../Url";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const navigate = useNavigate();

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
      const response = await fetch(`${backEndUrl}work`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Work created successfully");
      } else {
        console.error("Work created failed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      gsap.fromTo(".block-container", { y: "100%" }, { y: "-100%", duration: 0.8 });
      setTimeout(() => {
        navigate("/");
      }, 200);
    }
  }
  return (
    <div className="formContainer w-screen flex flex-col justify-around items-center">
      <p className="font-extrabold md:text-3xl text-xl text-center mt-20">Enter Project details</p>
      <form className="addForm" onSubmit={handleSubmit}>
        <input value={title} onChange={handleTitleChange} type="text" name={"title"} placeholder="Project Title" required></input>
        <input value={link} onChange={handleLinkChange} type="url" name={"link"} placeholder="Project Link" required></input>
        <div>
          <label htmlFor="fileInput">Select Image</label>
          <input id="fileInput" type="file" accept="image/*" name="file" required />
        </div>
        <input className="submit" type="submit" name="submit"></input>
      </form>
    </div>
  );
}

export default Add;
