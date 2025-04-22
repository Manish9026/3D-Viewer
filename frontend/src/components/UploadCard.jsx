import React, { useRef, useState } from "react";
import { Upload, File, Check, Loader, X } from "lucide-react";
// import { toast } from "@/hooks/use-toast";

import { cn } from "../utils/classFunctions";
import { toast } from "react-toastify";
// import { cn } from "@/lib/utils";

// type Status = "idle" | "drag" | "selected" | "uploading" | "success" | "error";

export default function UploadCard({onUpload}) {
  const [status, setStatus] = useState("idle");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef(null);

  // handle drag over
  const handleDrag = (e) => {
    e.preventDefault();
    setStatus("drag");
  };
  // handle drag leave
  const handleDragLeave = (e) => {
    e.preventDefault();
    setStatus(file ? "selected" : "idle");
  };
  // handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) handleFile(files[0]);
  };

  // file selection
  const handleFile = (fileItem) => {
    setFile(fileItem);
    setStatus("selected");
  };

  const onChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // upload simulation with animation
  const handleUpload = () => {
    if (!file) return;
    setStatus("uploading");
    setProgress(0);

    // Animate progress
    let pct = 0;
    const intv = setInterval(() => {
      pct += 10 + Math.floor(Math.random() * 15);
      setProgress(Math.min(pct, 100));
      if (pct >= 100) {
        clearInterval(intv);
        setTimeout(() => {
          setStatus("success");
        //   toast({
        //     title: "Upload Successful",
        //     description: `"${file.name}" uploaded!`,
        //     variant: "default",
        //   });
        onUpload(file);
        toast.success(`"${file.name}" uploaded!`)
        }, 400);
      }
    }, 150);
  };

  // Reset everything
  const handleReset = () => {
    setFile(null);
    setProgress(0);
    setStatus("idle");
  };

  const renderIcon = () => {
    switch (status) {
      case "idle":
      case "drag":
        return (
          <Upload size={38} className="text-primary/80 animate-fade-in" />
        );
      case "selected":
        return <File size={38} className="text-violet-400 animate-fade-in" />;
      case "uploading":
        return (
          <span className="animate-spin inline-block">
            <Loader size={36} strokeWidth={2.5} className="text-purple-400" />
          </span>
        );
      case "success":
        return <Check size={38} className="text-green-500 animate-bounce" />;
      case "error":
        return <X size={38} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "max-w-md w-full rounded-2xl glass mx-auto shadow-2xl px-6 py-10 flex flex-col items-center animate-fade-in",
        "transition-[box-shadow,background] duration-300 ease-in-out",
        status === "drag" ? "ring-4 ring-primary/30 bg-secondary/50" : ""
      )}
      style={{
        background: "rgb(7, 46, 96)",
        backdropFilter: "blur(10px)",
      }}
      onDragOver={handleDrag}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* ICON & HEADER */}
      <div className="mb-2">{renderIcon()}</div>
      <h2 className={cn(
        "text-xl font-bold mb-3 text-gray-900",
        "transition-colors duration-200 text-slate-300",
        status === "success" && "text-green-600"
      )}>
        {status === "idle" && "Upload Your File"}
        {status === "drag" && "Drop to Upload"}
        {status === "selected" && "Ready to Upload"}
        {status === "uploading" && "Uploading..."}
        {status === "success" && "Success!"}
      </h2>

      <div className="w-full">
        {(status === "idle" || status === "drag") && (
          <label
            htmlFor="file-upload"
            className={cn(
              "flex flex-col items-center justify-center border-2 border-dashed border-primary/30 rounded-xl px-4 py-7 cursor-pointer hover:border-primary hover:bg-blue-900/50 transition-colors duration-150 group",
              "hover-scale"
            )}
          >
            <span className="text-gray-500 mb-2">Drag & drop or click to select</span>
            <button
              type="button"
              className="bg-primary/90 hover:bg-violet-600 mt-2 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 animate-fade-in"
              onClick={() => inputRef.current?.click()}
              tabIndex={-1}
            >
              <span className="inline-flex items-center gap-2">
                <Upload size={18} /> Browse Files
              </span>
            </button>
            <input
              id="file-upload"
              ref={inputRef}
              type="file"
              onChange={onChange}
              className="hidden"
            />
          </label>
        )}

        {status === "selected" && file && (
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 rounded-lg p-3 mb-4 w-full flex flex-row items-center gap-3 max-w-xs shadow-inner">
              <File size={24} className="text-violet-500" />
              <span className="truncate text-gray-800 flex-1">{file.name}</span>
              <button title="Remove" onClick={handleReset}>
                <X size={22} className="text-gray-400 hover:text-red-500 transition-colors" />
              </button>
            </div>
            <button
              className="w-full rounded-lg py-2 mt-0.5 bg-gradient-to-r from-primary via-violet-400 to-purple-400 text-white font-semibold tracking-wide text-base hover:from-violet-500 hover:to-purple-500 transition-all animate-fade-in mb-1"
              onClick={handleUpload}
            >
              <span className="flex items-center justify-center gap-2 ">
                <Upload size={18} /> Upload File
              </span>
            </button>
          </div>
        )}

        {status === "uploading" && (
          <div className="w-full flex flex-col items-center animate-fade-in">
            <div className="w-full bg-gray-200 rounded-md h-4 mb-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-violet-500 to-indigo-400 h-4 transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-gray-500 text-sm mb-1">{progress}%</span>
            <button className="text-xs text-gray-400 underline" onClick={handleReset}>
              Cancel
            </button>
          </div>
        )}

        {status === "success" && file && (
          <div className="w-full flex flex-col items-center animate-fade-in">
            <div className="bg-gradient-to-r from-green-100 via-green-50 to-white rounded-lg py-3 px-5 w-full flex items-center justify-between">
              <span className="flex items-center gap-2 text-green-700 font-medium">
                <Check size={20} /> Uploaded!
              </span>
              <span className="truncate max-w-[9rem] text-gray-800 text-sm">{file.name}</span>
            </div>
            <button
              className="mt-3 px-4 py-2 rounded-lg bg-primary/80 hover:bg-violet-600 text-white font-semibold transition-all"
              onClick={handleReset}
            >
              Upload Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
}