import React, { useState } from "react";
import { Lock, LockOpen } from "lucide-react";

const Button = React.lazy(() => import("./Button"));
import { cn } from "../utils/classFunctions";

// interface LockProps {
//   children: React.ReactNode;
//   className?: string;
//   label?: string;
// }

const LockComponent =({
  children,
  className,
  label = "Unlock to reveal",
  onLockClick
}) => {
  const [locked, setLocked] = useState(true);

  return (
    <div
      className={` ${className}   flex flex-col items-center justify-center min-h-[140px] w-full max-w-md mx-auto p-6 rounded-2xl shadow-xl transition-all duration-300`}
    >
      {locked ? (
        <div className="flex flex-col items-center gap-3 animate-fade-in">
          <span className="flex items-center justify-center mb-1">
            <Lock size={38} className="text-primary animate-bounce" />
          </span>
          <span className="font-semibold text-gray-300 capitalize text-lg mb-2">{label}</span>
          <Button
            variant="default"
            className="rounded-full px-6 py-2 mt-1 bg-primary/90 hover:bg-primary transition-all"
            onClick={() =>{ setLocked(false); onLockClick && onLockClick();}}
          >
            <span className="flex items-center gap-2">
              <Lock size={20} /> Unlock
            </span>
          </Button>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center animate-fade-in">
          <span className="flex items-center gap-2 mb-1">
            <LockOpen size={28} className="text-green-500 animate-bounce" />
            <span className="text-green-700 font-medium">Unlocked!</span>
          </span>
          <div className="w-full mt-2 animate-scale-in">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default LockComponent;