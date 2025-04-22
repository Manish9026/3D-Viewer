
import React, { lazy, useState } from 'react';
import { FaEye } from "react-icons/fa6";
const Button=lazy(()=>import('./Button.jsx'));
import {
  MoveLeft,
  MoveRight,
  ArrowUp,
  ArrowDown,
  ArrowUpRight,
  ArrowDownLeft,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Undo,
  Redo,
  RefreshCw,
  EyeClosed,
} from 'lucide-react';


export default function ToolPanel({
  onTransform,
  onRotate,
  onScale,
  onChangeColor,
  onUndo,
  onRedo,
  onReset,
}) {

    const [dimension, setDimension] = useState({
        scale:"x",
        rotate:"x",

    });

    const handleChange=(e)=>{
        setDimension(prev=>({...prev,[e.target.name]:e.target.value}));
    }
  return (
    <div className="flex flex-col  max-w-[500px] items-center justify-center flex-1 gap-3 bg-gray-800 p-4 rounded-lg max-w-6xl text-white">
      
      {/* Move Controls */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-semibold">Move</p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => onTransform([-0.5, 0, 0])}><MoveLeft size={18} />Left</Button>
          <Button onClick={() => onTransform([0.5, 0, 0])}><MoveRight size={18} />Right</Button>
          <Button onClick={() => onTransform([0, 0.5, 0])}><ArrowUp size={18} />Up</Button>
          <Button onClick={() => onTransform([0, -0.5, 0])}><ArrowDown size={18} />Down</Button>
          <Button onClick={() => onTransform([0, 0, -0.5])}><ArrowUpRight size={18} />Forward</Button>
          <Button onClick={() => onTransform([0, 0, 0.5])}><ArrowDownLeft size={18} />Backward</Button>
        </div>
      </div>


      <div className="flex w-full flex-1  gap-3 items-center justify-around">
      {/* Rotate Controls */}

      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-semibold">Rotate</p>
        <div className="flex gap-2 mb-2">
            <input type="radio" name="rotate" checked={dimension?.rotate=="x"} id="rotate"  value={"x"} onChange={handleChange}  />
            <input type="radio" name="rotate"  onChange={handleChange}  checked={dimension?.rotate=="y"} id="rotate" value={"y"} />
            <input type="radio"  onChange={handleChange}  checked={dimension?.rotate=="z"} name="rotate" id="rotate" value={"z"} />
            <p>{dimension?.rotate}</p>

        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => onRotate(dimension?.rotate,15)}><RotateCcw size={18} />X</Button>
          <Button onClick={() =>onRotate(dimension?.rotate,-15)}><RotateCw size={18} />Y</Button>
        
        </div>
      </div>

      {/* Scale Controls */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-semibold">Scale</p>
        <div className="flex gap-2 mb-2">
            <input type="radio" name="scale" checked={dimension?.scale=="x"} id="scale"  value={"x"} onChange={handleChange}  />
            <input type="radio" name="scale"  onChange={handleChange}  checked={dimension?.scale=="y"} id="scale" value={"y"} />
            <input type="radio"  onChange={handleChange}  checked={dimension?.scale=="z"} name="scale" id="scale" value={"z"} />
            <p>{dimension?.scale}</p>

        </div>
        <div className="flex gap-2">
          <Button onClick={() => onScale(dimension?.scale,1.1)}><ZoomIn size={18} />Up</Button>
          <Button onClick={() => onScale(`${dimension?.scale}`,0.9)}><ZoomOut size={18} />Down</Button>
        </div>
      </div>
      {/* Color Picker */}

      <div className="flex flex-col items-center gap-2">
        {/* <FaEye size={18} /> */}
        <p className="text-sm font-semibold">Color</p>
        <input
          type="color"
          onChange={(e) => onChangeColor(e.target.value)}
          className="w-10  h-10 border-none rounded-md overflow-hidden  cursor-pointer outline-transparent bg-transparent"
        />
      </div>
      </div>
      

      {/* Undo/Redo */}
      <div className="flex gap-2 flex-1 w-full">
        <Button onClick={onUndo} className={"flex-1"}><Undo size={18} />Undo</Button>
        <Button onClick={onRedo}><Redo size={18} />Redo</Button>
      {/* Reset */}
        <Button onClick={onReset} className="text-red-400">
        <RefreshCw size={18} />Reset
      </Button>
      </div>

      
    </div>
  );
}



// export default function ToolPanel({
//   onTransform,
//   onRotate,
//   onScale,
//   onChangeColor,
//   onReset,
//   onUndo,
//   onRedo
// }) {
//   const [color, setColor] = useState('#ffffff');

//   const handleTransform = (axis, amount) => {
//     const dir = [0, 0, 0];
//     if (axis === 'x') dir[0] = amount;
//     if (axis === 'y') dir[1] = amount;
//     if (axis === 'z') dir[2] = amount;
//     onTransform(dir);
//   };

//   return (
//     <div className="flex flex-wrap justify-center gap-4 bg-gray-800 p-4 rounded-xl shadow-xl w-full max-w-4xl">
//       {/* Undo / Redo */}
//       <Button variant="outline" onClick={onUndo} className="gap-2">
//         <Undo2 className="w-4 h-4" />
//         Undo
//       </Button>
//       <Button variant="outline" onClick={onRedo} className="gap-2">
//         <Redo2 className="w-4 h-4" />
//         Redo
//       </Button>

//       {/* Move Dropdown */}
//       <DropdownMenu>
//         <DropdownMenuTrigger >
//           <Button variant="outline" className="gap-2">
//             <Move3D className="w-4 h-4" />
//             Move
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="bg-gray-700 text-white rounded-md shadow-lg p-2">
//           <DropdownMenuLabel>Move Object</DropdownMenuLabel>
//           {['x', 'y', 'z'].map((axis) => (
//             <div key={axis} className="flex gap-2 my-1">
//               <DropdownMenuItem onClick={() => handleTransform(axis, 0.2)}>+{axis.toUpperCase()}</DropdownMenuItem>
//               <DropdownMenuItem onClick={() => handleTransform(axis, -0.2)}>-{axis.toUpperCase()}</DropdownMenuItem>
//             </div>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>

//       {/* Rotate Dropdown */}
//       <DropdownMenu>
//         <DropdownMenuTrigger >
//           <Button variant="outline" className="gap-2">
//             <Rotate3D className="w-4 h-4" />
//             Rotate
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="bg-gray-700 text-white rounded-md shadow-lg p-2">
//           <DropdownMenuLabel>Rotate 15°</DropdownMenuLabel>
//           {['x', 'y', 'z'].map((axis) => (
//             <div key={axis} className="flex gap-2 my-1">
//               <DropdownMenuItem onClick={() => onRotate(axis, 15)}>+{axis.toUpperCase()}</DropdownMenuItem>
//               <DropdownMenuItem onClick={() => onRotate(axis, -15)}>-{axis.toUpperCase()}</DropdownMenuItem>
//             </div>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>

//       {/* Scale Dropdown */}
//       <DropdownMenu>
//         <DropdownMenuTrigger >
//           <Button variant="outline" className="gap-2">
//             {/* <Resize className="w-4 h-4" /> */}
//             Scale
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="bg-gray-700 text-white rounded-md shadow-lg p-2">
//           <DropdownMenuLabel>Scale Object</DropdownMenuLabel>
//           {['x', 'y', 'z'].map((axis) => (
//             <div key={axis} className="flex gap-2 my-1">
//               <DropdownMenuItem onClick={() => onScale(axis, 1.1)}>+{axis.toUpperCase()}</DropdownMenuItem>
//               <DropdownMenuItem onClick={() => onScale(axis, 0.9)}>-{axis.toUpperCase()}</DropdownMenuItem>
//             </div>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>

//       {/* Color Picker */}
//       <div className="flex items-center gap-2">
//         <Palette className="w-5 h-5" />
//         <input
//           type="color"
//           value={color}
//           onChange={(e) => {
//             setColor(e.target.value);
//             onChangeColor(e.target.value);
//           }}
//           className="w-8 h-8 border-none rounded-full cursor-pointer"
//         />
//       </div>

//       {/* Reset */}
//       <Button variant="outline" onClick={onReset} className="gap-2">
//         <RefreshCw className="w-4 h-4" />
//         Reset
//       </Button>
//     </div>
//   );
// }
