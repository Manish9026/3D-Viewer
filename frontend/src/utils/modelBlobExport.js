import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';
import { saveAs } from 'file-saver';

export const exportModel = async ({object, format = 'glb',isDownload,fileName,isFile=false}={}) => {
    console.log(object, format);
  
    if (!object) return;
    let objData=null;
  
    if (format === 'gltf' || format === 'glb') {
      const isBinary = format === 'glb';
  
      objData= await new Promise((resolve) => {
        new GLTFExporter().parse(
          object,
          (result) => {
            const output = JSON.stringify(result);
            const blob = new Blob(
              [output],
              { type: isBinary ? 'application/octet-stream' : 'application/json' }
            );
            resolve(
             {file: blob,
              extension: isBinary ? '.glb' : '.gltf',
              type: isBinary ? 'application/octet-stream' : 'application/json'}
            );
          },
          { binary: isBinary }
        );
      });
    } else if (format === 'obj') {
      const objExporter = new OBJExporter();
      const objParseData = objExporter.parse(object);
      const blob = new Blob([objParseData], { type: 'text/plain' });
      objData ={
        file: blob,
        extension: '.obj',
        type: 'text/plain'
      };
    } else if (format === 'stl') {
      const stlExporter = new STLExporter();
      const stlData = stlExporter.parse(object);
      const blob = new Blob([stlData], { type: 'application/sla' });
      objData= {
        file: blob,
        extension: '.stl',
        type: 'application/sla'
      };
    } else {
      alert('Unsupported format');
      return null;
    }

     if(isDownload){
        saveAs(objData.file, (fileName || "model" ) 
             + objData.extension, { type: objData.type });
     }
     if(isFile){
      const file = new File([objData?.file], (fileName || "model" ) 
      + objData.extension, {
        type: objData.type,
        lastModified: Date.now(),
      });

      return file
     }
     return objData;
  };
  