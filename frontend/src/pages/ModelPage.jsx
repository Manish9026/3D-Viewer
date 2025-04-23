
import { Loader2 } from "lucide-react";
import { useGetModelsQuery } from "../services/modelServices";
import { useSelector } from "react-redux";
import React, { useEffect, useRef, Suspense,useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import useReactHooks from "../hooks/useReactHooks";
import { setModelUrl } from "../slices/viewerSlice";
import { RxSize } from "react-icons/rx";


const Model = ({ url, extension, onLoad }) => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      let loadedModel = null;

      switch (extension) {
        case 'glb':
        case 'gltf': {
          const loader = new GLTFLoader();
          const dracoLoader = new DRACOLoader();
          dracoLoader.setDecoderPath('/draco/');
          loader.setDRACOLoader(dracoLoader);
          loadedModel = await loader.loadAsync(url);
          break;
        }
        case 'obj': {
          const loader = new OBJLoader();
          loadedModel = await loader.loadAsync(url);
          break;
        }
        case 'fbx': {
          const loader = new FBXLoader();
          loadedModel = await loader.loadAsync(url);
          break;
        }
        case 'stl': {
          const loader = new STLLoader();
          loadedModel = await loader.loadAsync(url);
          break;
        }
        default:
          console.error('Unsupported format');
          return;
      }

      setModel(loadedModel);
      if (onLoad) onLoad();
    };

    loadModel();
  }, [url, extension, onLoad]);

  if (!model) {
    return null; // Render nothing while loading
  }

  return <primitive object={model.scene || model} />;
};

const ModelViewer = ({ url }) => {
  const [loading, setLoading] = useState(true);

  // Extract the file extension
  const extension = url.split('.').pop().toLowerCase();

  // Handle loading state change
  const handleModelLoad = (status) => {
    //  if(status) return  setLoading(status);
     setLoading(false)


     // Model has finished loading
  };

  return (
    <div className="relative w-full h-[200px] p-2">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
        <Suspense fallback={<>loading....</>}>
          <ambientLight intensity={0.5} />
          <Environment preset="sunset" />
          <Model url={url} extension={extension} onLoad={handleModelLoad} />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
      {loading && <LoadingIndicator />}
    </div>
  );
};

// Loading Indicator Component
const LoadingIndicator = () => (
  <div className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50">
    <Loader2 className="animate-spin text-white" size={48} />
  </div>
);
const ModelGallery = () => {
    const {user}=useSelector(state=>state?.authReducer)
    const {navigate,dispatch}=useReactHooks();
const {data,isLoading,isError,isFetching}=useGetModelsQuery(user?.
    _id,{
        refetchOnFocus:true,
        refetchOnReconnect:true,
        refetchOnMountOrArgChange:true
    }
)

// console.log(model);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  if (isError) {
    return <p className="flex items-center justify-center h-screen text-red-500 ">Failed to load models !!</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">3D Models</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data && data['data'] && data['data']?.model?.map((model,index) => (
          <div
            key={model._id}
            className="bg-slate-800 shadow-md rounded-xl overflow-hidden transition hover:scale-105 duration-300"
          >
            <ModelViewer
            //  setObjectRef={()=>{}} 
             url={model?.url} 
            //  extension={model?.url.split('.').pop().toLowerCase()}
             />
            <div className="p-4 flex flex-col">
                <span className="flex px-2 flex-1 justify-between mb-2">
                <h2 className="text-lg font-semibold">{model?.name || "Model " + (index + 1)}</h2>
              <h3 className="flex  justify-start items-center gap-2 ">
              <RxSize  />
                {(model?.fileSize / (1024 * 1024)).toFixed(2) + " MB"}
              </h3>
              {/* <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{model?.description}</p> */}

                </span>
          
            <button className="bg-slate-400 cursor-pointer hover:bg-sky- hover:scale-95 will-change-transform transition ease duration-700 p-2 center flex flex-1 rounded-md" 
            onClick={()=>{
                dispatch(setModelUrl({url:model?.url,extension:model?.url.split('.').pop().toLowerCase()}));
                    navigate("/model/view");
            }}
            >
                view
            </button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelGallery;
