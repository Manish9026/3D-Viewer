import React from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const LoadingScreen = ({title,colorTheme,containerTheme}) => {
  return (
    <div className={` absolute inset-0 z-50 flex items-center justify-center backdrop-blur  ${containerTheme?containerTheme:'bg-black/30'} `}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`p-8 rounded-2xl shadow-2xl ${colorTheme?colorTheme:'bg-white/10'}  border-2 border-white/20 flex flex-col items-center space-y-4`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Loader2 size={48} className="text-white" />
        </motion.div>
        <p className="text-white text-lg font-semibold tracking-wide">
          {title || "Loading, please wait..."}
        </p>
      </motion.div>
    </div>
  );
};


const FileSaver = ({ status, message }) => {
  if (status === "idle") return null;

  const getIcon = () => {
    if (status === "saving") return <Loader2 className="animate-spin" size={20} />;
    if (status === "success") return <CheckCircle2 className="text-green-400" size={20} />;
    if (status === "error") return <XCircle className="text-red-400" size={20} />;
    return null;
  };

  const getMessage = () => {
    if (status === "saving") return "Saving file...";
    if (status === "success") return "File saved successfully";
    return message || "Something went wrong";
  };

  return (
    <AnimatePresence>
      <motion.div
        className="absolute w-full flex-1 min-h-full z-100 flex items-center gap-3 px-4 py-3 rounded-lg shadow-md w-fit mx-auto text-white font-medium
          bg-blue-600/10 center top-0 left-0"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.3 }}
      >
        {getIcon()}
        <span>{getMessage()}</span>
      </motion.div>
    </AnimatePresence>
  );
};

// import { motion } from "framer-motion";
import { Loader, Sparkles } from "lucide-react";

export const SuspenseLoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-4">
      <motion.div
        className="flex items-center justify-center mb-6"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      >
        <Loader className="w-12 h-12 text-indigo-300 animate-pulse" />
      </motion.div>

      <motion.h1
        className="text-2xl font-semibold text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Loading your 3D experience...
      </motion.h1>

      <motion.div
        className="flex gap-2 mt-4 text-sm text-indigo-200 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.8,
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1.4,
        }}
      >
        <Sparkles className="w-4 h-4 animate-bounce" />
        <span>Optimizing textures & lighting</span>
      </motion.div>
    </div>
  );
};




export {LoadingScreen,FileSaver}

export default {LoadingScreen,FileSaver};
