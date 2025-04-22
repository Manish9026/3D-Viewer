import { cameraModel, model3dModel } from '../models/modelSchema.js';
import { cloudinary } from '../utils/cloudinary.js';
import { goodResponse, badResponse } from '../utils/response.js';

const bucketName=process.env.BUCKETNAME;
export class Model {

    static async uploadModel(req, res) {
        try {
            const file = req?.file;
            const userId=req?.user?._id;
            // console.log(file,req);
            
    if (!file) return res.status(400).send("No file uploaded.");

    const result = await cloudinary.uploader.upload(file?.path, {
        folder: '3d-models',
        resource_type: 'raw',
        use_filename: true,
        unique_filename: false,
        // chunk_size: 6 * 1024 * 1024, // 6MB chunks
      });

      // Clean up local file
      fs.unlinkSync(req.file.path);
      console.log(result,"result");


      

    const newData =model3dModel.create({
        key,
        url,
        userId,
        fileSize:file?.size,
        bucketName,
        modelName:file?.originalname
    })
    if(!newData) return badResponse({res,message:"file not saved"})

    goodResponse({res,message:"uploaded on record",data:{file:newData}});    
    res.json(result);


console.log(req.files,req.body,req)
        } catch (error) {
            console.log(error);
            
            badResponse({
                res,
                message: "Error while uploading model",
                error: error.message,
                statusCode: 500,
            })
        }
    }

    static async getModel(req, res) {
        try {

        } catch (error) {
            badResponse({
                res,
                message: "Error while fetching model",
                error: error.message,
                statusCode: 500,
            })

        }
    }
    static async deleteModel(req, res) {
        try {

        } catch (error) {
            badResponse({
                res,
                message: "Error while deleting model",
                error: error.message,
                statusCode: 500,
            })

        }
    }
}

export class Camera {
    constructor(name, position, rotation, fov) {
        this.name = name;
        this.position = position;
        this.rotation = rotation;
        this.fov = fov;
    }

    static async addPosition(req, res) {
        try {

            const { camera, name, userId } = req.body;
            console.log();

            const cameraPosition = await cameraModel.create({
                camera,
                name,
                userId,

            })
            if (!cameraPosition) {
                return badResponse({
                    res,
                    message: "Error while adding camera position",
                    statusCode: 500,
                })
            }


            return goodResponse({
                res,
                message: "Camera position added successfully",
                data: { camera: cameraPosition },
                statusCode: 200,
            })

        } catch (error) {
            console.log(error);

            badResponse({
                res,
                message: "Error while adding camera position",
                error: error.message,
                statusCode: 500,
            })
        }
    }

    static async getPosition(req, res) {
        try {
            const { userId } = req.query;
            let options = { userId }
            const cameraPosition = await cameraModel.find(options).sort({ createdAt: -1 });
            if (!cameraPosition) {
                return badResponse({
                    res,
                    message: "Error while fetching camera position",
                    statusCode: 500,
                })
            }
            console.log(cameraPosition, "camera position from db");


            return goodResponse({
                res,
                message: "Camera position fetched successfully",
                data: { camera: cameraPosition },
                statusCode: 200,
            })

        } catch (error) {
            console.log(error);

            return badResponse({
                res,
                message: "Error while fetching camera position",
                error: error.message,
                statusCode: 500,
            })
        }
    }
}