import React,{useState,Suspense,useEffect, useRef} from 'react'
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  Grid,
  Center,
  ContactShadows
} from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { MeshStandardMaterial, Mesh } from 'three';
import * as THREE from 'three';
import { FaCloudDownloadAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import useReactHooks from '../hooks/useReactHooks.jsx';
import { 
  RotateCw, 
  ZoomIn, 
  Move, 
  Save, 
  Undo, 
  Upload,
  Camera,
  Home
} from "lucide-react";
// lazy load the components

const Button=React.lazy(()=>import('../components/Button.jsx'));
const LockComponent=React.lazy(()=>import('../components/LockComponent.jsx'));
const ToolPanel=React.lazy(()=>import('../components/ToolPanel.jsx'));


import { useThree } from '@react-three/fiber';
import { toast } from 'react-toastify';
import { TabContainer } from '../components/TabContainer.jsx';
import CameraTab from '../components/cameraComponent.jsx';
import { exportModel } from '../utils/modelBlobExport.js';
import { useUploadModelMutation } from '../services/modelServices.jsx';

const CameraUpdater = ({ cameraState }) => {
  const { camera } = useThree();

  useEffect(() => {
    const { position, rotation, zoom, fov } = cameraState;

    camera.position.set(position.x, position.y, position.z);
    camera.rotation.set(rotation.x, rotation.y, rotation.z);
    camera.zoom = zoom;
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }, [cameraState]);

  return null;
};

function ModelViewer({ file, setObjectRef }) {
  const [object, setObject] = useState(null);
    
  useEffect(() => {
    if (!file) return;

    // const extension = file.name.split('.').pop().toLowerCase();
    // const url = URL.createObjectURL(file);
    const extension=file.extension;
    const url = file.url;

    let loader;

    switch (extension) {
      case 'glb':
      case 'gltf':
        loader = new GLTFLoader();
        loader.load(url, (gltf) => {
          const obj = gltf.scene;
          setObject(obj);
          setObjectRef(obj);
        });
        break;
      case 'obj':
        loader = new OBJLoader();
        loader.load(url, (obj) => {
          setObject(obj);
          setObjectRef(obj);
        });
        break;
      case 'fbx':
        loader = new FBXLoader();
        loader.load(url, (fbx) => {
          setObject(fbx);
          setObjectRef(fbx);
        });
        break;
      case 'stl':
          loader = new STLLoader();
          loader.load(url, (geometry) => {
            const material = new MeshStandardMaterial({ color: 0xaaaaaa });
            const mesh = new Mesh(geometry, material);
            setObject(mesh);
            setObjectRef(mesh);
          });
          break;
      default:
        alert('Unsupported format');
        break;
    }

    // return () => URL.revokeObjectURL(url);
  }, [file]);

  return object ? (
    <Center>
      <primitive object={object} />
    </Center>
  ) : null;
}
 function ModelPanel() {
  // const [file, setFile] = useState(null);
  const [objectRef, setObjectRef] = useState(null);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const {modelFile}=useSelector((state)=>state.viewer);
  const [uploadFile,{isLoading}]=useUploadModelMutation();
  const {navigate}=useReactHooks();
  const {isAuthenticated}=useSelector((state)=>state.authReducer);
  const [currentTool, setCurrentTool] = useState("rotate");
  const cameraRef = useRef(null);
  const [cameraState, setCameraState] = useState({
    position: { x: 2, y: 2, z: 5 },
    rotation: { x: 5, y: 2, z: 5 },
    zoom: 1,
    fov: 60,
  });
  

  const handleFileUpload = (e) => {
    e.preventDefault();
    navigate('/upload')
  };
  const handleChangeColor = (color) => {

    if (objectRef) {
      saveState();
      objectRef.traverse((child) => {
        if (child.isMesh) {
          if (child.material) {
            child.material.color.set(color);
            child.material.needsUpdate = true;
          }
        }
      });
    }
  };
  const handleMove = (direction) => {
    if (objectRef) {
      saveState()
      objectRef.position.x += direction[0];
      objectRef.position.y += direction[1];
      objectRef.position.z += direction[2];
    }
  };
  const handleReset = () => {
    if (objectRef) {
      objectRef.position.set(0, 0, 0);
      objectRef.rotation.set(0, 0, 0);
      objectRef.scale.set(1, 1, 1);
    }
  };
  const handleScale = (axis, factor) => {
    if (objectRef) {
      saveState()
      objectRef.scale[axis] *= factor;
    }
  };
  const handleRotate = (axis, degrees) => {
    if (objectRef) {
      saveState()
      const radians = (degrees * Math.PI) / 180;
      objectRef.rotation[axis] += radians;
    }
  };
  const saveState = () => {
    if (objectRef) {
      const snapshot = {
        position: objectRef.position.clone(),
        rotation: objectRef.rotation.clone(),
        scale: objectRef.scale.clone(),
        color: objectRef.children.map((child) =>
          child.isMesh ? child.material.color.clone() : null
        ),
      };
      setHistory((prev) => [...prev, snapshot]);
      setFuture([]); // Clear future on new action
    }
  };
  const handleUndo = () => {
    if (history.length === 0 || !objectRef) return;
  
    const prev = history[history.length - 1];
    const newHistory = history.slice(0, history.length - 1);
  
    const current = {
      position: objectRef.position.clone(),
      rotation: objectRef.rotation.clone(),
      scale: objectRef.scale.clone(),
      color: objectRef.children.map((child) =>
        child.isMesh ? child.material.color.clone() : null
      ),
    };
  
    setHistory(newHistory);
    setFuture((prev) => [...prev, current]);
  
    objectRef.position.copy(prev.position);
    objectRef.rotation.copy(prev.rotation);
    objectRef.scale.copy(prev.scale);
    objectRef.traverse((child, index) => {
      if (child.isMesh && prev.color[index]) {
        child.material.color.copy(prev.color[index]);
      }
    });
  };
  const handleRedo = () => {
    if (future.length === 0 || !objectRef) return;
  
    const next = future[future.length - 1];
    const newFuture = future.slice(0, future.length - 1);
  
    const current = {
      position: objectRef.position.clone(),
      rotation: objectRef.rotation.clone(),
      scale: objectRef.scale.clone(),
      color: objectRef.children.map((child) =>
        child.isMesh ? child.material.color.clone() : null
      ),
    };
  
    setHistory((prev) => [...prev, current]);
    setFuture(newFuture);
  
    objectRef.position.copy(next.position);
    objectRef.rotation.copy(next.rotation);
    objectRef.scale.copy(next.scale);
    objectRef.traverse((child, index) => {
      if (child.isMesh && next.color[index]) {
        child.material.color.copy(next.color[index]);
      }
    });
  };
  const handleSave=()=>{
    console.log(objectRef,cameraRef?.current?.position,cameraState);
    
  }
  const handleToolChange = (tool) => {
    setCurrentTool(tool);
    toast.success(`${tool.charAt(0).toUpperCase() + tool.slice(1)} tool selected`);
  }
  const downloadFile = async(url) => {
    
    const file=await exportModel({object:objectRef,isDownload:true,fileName:"",format:"stl",isFile:true});
    console.log(file);
    let formData=new FormData();
    formData.append("file",file);
   await  uploadFile(formData);

    
  }

  return (
    <div className="h-full w-full bg-gray-900 text-white flex flex-col items-center p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">🎮 3D Object Viewer</h1>

      <label onClick={handleFileUpload} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded cursor-pointer">
        Upload 3D File (.glb, .obj, .fbx)
      
      </label>

      

      <div className="relative p-2 overflow-auto h-full flex   sm:flex-row flex-col  gap-3 w-full max-w-6xl rounded-lg max-h-[90vh] border border-gray-700 shadow-lg">
      {/* <CameraController /> */}
      
        <span className=' flex min-h-[300px] flex-1 sm:max-h-[450px] max-h-[300px] items-center flex z-20 min-w-[200px] sm:min-w-[300px] rounded-md sticky top-0 overflow-hidden' >
        <div className={`canvas-controls bg-slate-900 flex `}>
              <Button
                variant={currentTool === "rotate" ? "default" : "outline"}
                size="icon"
                onClick={() => handleToolChange("rotate")}
                title="Rotate"
              >
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button
                variant={currentTool === "zoom" ? "default" : "outline"}
                size="icon"
                onClick={() => handleToolChange("zoom")}
                title="Zoom"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant={currentTool === "pan" ? "default" : "outline"}
                size="icon"
                onClick={() => handleToolChange("pan")}
                title="Pan"
              >
                <Move className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setCameraState({
                    position: { x: 2, y: 2, z: 5 },
                    rotation: { x: 5, y: 2, z: 5 },
                    zoom: 1,
                    fov: 60,
                  })
                }}
                title="Reset View"
              >
                <Undo className="h-4 w-4" />
              </Button>
            </div>
        <Canvas ref={cameraRef} className='' shadows 
        // [2, 2, 5]
        camera={{ position: [cameraState.position.x, cameraState.position.y, cameraState.position.z], fov: cameraState.fov,rotation: [cameraState.rotation.x, cameraState.rotation.y, cameraState.rotation.z],zoom: cameraState.zoom }}

        >

          <ambientLight intensity={0.3} />
          <directionalLight castShadow position={[10, 10, 5]} intensity={1} shadow-mapSize={1024} />
          <OrbitControls enableZoom={currentTool=="zoom"} enablePan={currentTool=="pan"} enableRotate={currentTool=="rotate"}
            onChange={(e) => {


    const cam = e.target.object;

    setCameraState({
      position: cam.position,
      rotation: {x:cam.rotation._x, y:cam.rotation._y, z:cam.rotation._z},
      zoom: cam.zoom,
      fov: cam.fov,
    });
  }}
  />
  
          {/* <Environment preset="sunset" background /> */}
          <Grid args={[20, 20]} cellColor="#555" sectionColor="#333" fadeDistance={95}  />
          {/* <ContactShadows position={[0, -0.9, 0]} opacity={0.6} scale={10} blur={1} far={5} /> */}

          {/* <CameraTracker onUpdate={(state) =>{ setCameraState(state);console.log("hello");
          }} />d */}
          <CameraUpdater cameraState={cameraState} />
          <Suspense fallback={null}>
            {modelFile?.url && <ModelViewer file={modelFile} setObjectRef={setObjectRef} />}
          </Suspense>
        </Canvas>
        </span>
      
        { modelFile?.url && (
    isAuthenticated? <span className=''>
      <TabContainer components={[{title:"Tools",element: <ToolPanel
     onTransform={handleMove}
     onRotate={handleRotate}
     onScale={handleScale}
     onChangeColor={handleChangeColor}
     onUndo={handleUndo}
     onRedo={handleRedo}
     onReset={handleReset}
   />},{title:"Cameras",element:<CameraTab onViewSelect={setCameraState} onSavePosition={cameraState}/>}]}/>

   <span className='flex gap-2 p-2'>
    <Button onClick={()=>downloadFile()} className="bg-green-400 hover:bg-blue-700 flex-1"><FaCloudDownloadAlt />Download</Button>
    <Button onClick={()=>handleSave()} className="bg-blue-600 hover:bg-blue-700 flex-1">Save</Button>

   </span>
    </span>:<LockComponent className={"bg-slate-700 "} label='Tool panel locked' onLockClick={()=>{
        navigate('/user/login')
    }}/>
      )}
      </div>
     
    </div>
  );
}

const ModelViewPage = () => {
  return (
   <ModelPanel/>
  )
}

export default ModelViewPage