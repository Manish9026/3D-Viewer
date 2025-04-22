import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setModelUrl } from "../slices/viewerSlice";
import UploadCard from "../components/UploadCard";

const Upload= () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onUpload = (file) => {
    if (!file) return alert("Please select a 3D model file");
    console.log(file);
    
    // const objectURL = URL.createObjectURL(file);
   const extension = file.name.split('.').pop().toLowerCase();
    const url = URL.createObjectURL(file);
    dispatch(setModelUrl({url,extension}));
    navigate("/model/view");
  }
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-blue-100"
      // style={{
      //   background: "linear-gradient(111.4deg, rgba(238,113,113,1) 1%, rgba(246,215,148,1) 58%)",
      // }}
    >
      <div className="w-full max-w-2xl flex flex-col items-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
          File Uploader 💫
        </h1>
        <p className="mb-7 text-lg text-gray-600 md:text-xl text-center animate-fade-in">
          Easily upload your files with a beautiful, intuitive, and animated interface.<br className="hidden md:block" />
          Drag your file, or click below!
        </p>
        <UploadCard onUpload={onUpload}/>
      </div>
    </div>
  );
};

export default Upload;