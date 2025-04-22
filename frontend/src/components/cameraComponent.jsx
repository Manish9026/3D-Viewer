import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CameraIcon, SaveIcon } from 'lucide-react'; // or use any icon lib
import { useFetchCameraPositionQuery, useSetCameraPositionMutation } from '../services/modelServices';
import { useSelector } from 'react-redux';
// import { useThree } from '@react-three/fiber';

const CameraTab = ({ onSavePosition, onViewSelect }) => {
  const [positions, setPositions] = useState([
    { name: 'Front View', position: {x:0, y:2, z:5}, rotation: {x:0, y:0, z:0}, fov: 60 },
    { name: 'Top View', position: {x:0, y:10, z:0}, rotation: {x:-Math.PI / 2, y:0, z:0}, fov: 60 },
   {
    name:"side view",
    position: {x:5, y:2, z:0},
    rotation: {x:0, y:Math.PI / 2, z:0},
    fov: 60,
   }
   
  ]);
  const {user}=useSelector((state)=>state.authReducer);
  const [setPosition,{isLoading}]=useSetCameraPositionMutation();
  const {data:savedPos,isLoading:saveLoading}=useFetchCameraPositionQuery(user?._id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })


  const [name, setName] = useState('');
//   const { camera } = useThree();

  const handleSave = async() => {
    // if (!name.trim()) return;
    // const newPosition = {
    //   name,
    //   position: camera.position.toArray(),
    //   rotation: [camera.rotation.x, camera.rotation.y, camera.rotation.z],
    //   fov: camera.fov,
    // };
    // setPositions((prev) => [...prev, newPosition]);
    // setName('');
    // if (onSavePosition) onSavePosition(newPosition);
    const data=await setPosition({camera:onSavePosition, name,userId:user?._id}).unwrap();
    console.log(onSavePosition);
    console.log(data,"data from camera tab");
    
    
  };

  return (
    <motion.div
      className="bg-[#0f172a] text-white rounded-lg p-4 shadow-md w-80"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-lg font-semibold mb-2">Save Camera Position</h2>
      <div className="flex items-center gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Front view"
          className="flex-1 px-3 py-1 rounded bg-[#1e293b] text-white focus:outline-none"
        />
        <button
          onClick={handleSave}
          className="bg-purple-600 hover:bg-purple-700 p-2 rounded"
        >
          <SaveIcon className="w-4 h-4 text-white" />
        </button>
      </div>

      <h3 className="text-sm font-medium mb-2">Saved Positions</h3>
      <div className="space-y-2">
        {positions.map((pos, idx) => (
          <motion.div
            key={idx}
            className="flex items-center gap-2 cursor-pointer hover:bg-[#1e293b] px-2 py-1 rounded"
            whileHover={{ scale: 1.02 }}
            onClick={() => onViewSelect?.(prev=>({...prev,...pos}))}
          >
            <CameraIcon className="w-4 h-4" />
            <span>{pos.name}</span>
          </motion.div>
        ))}
        {savedPos?.data?.camera && savedPos?.data?.camera.map((pos, idx) => (
          <motion.div
            key={pos?._id}
            className="flex items-center gap-2 cursor-pointer hover:bg-[#1e293b] px-2 py-1 rounded"
            whileHover={{ scale: 1.02 }}
            onClick={() => onViewSelect?.(prev=>({...prev,...pos?.camera}))}
          >
            <CameraIcon className="w-4 h-4" />
            <span>{pos?.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CameraTab;
