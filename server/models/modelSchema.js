import mongoose from "mongoose";


const modelSchema = new mongoose.Schema({
key:{
    type: String,
    required: true,
},
url:String,
userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    // required: true,
},
modelName:{
    type: String,
    required: true,
},
modelType:{
    type: String,
    required: true,
},

    fileSize:{
        type:Number
    },

modelDescription:{
    type: String,
    },
bucketName:{
        type: String,
        required: true,
        default:""
    },
},{timestamps:true});
export const model3dModel=mongoose.model("models",modelSchema);

const cameraSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        // required: true,
    },
    modelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "models",
        // required: true,
    },
    camera: {
        type: mongoose.Schema({
            position: {
                type:Object,
                // required: true,
            },
            rotation: {
                type:Object,
                // required: true,
            },
            fov: {
                type: Number,
                // required: true,
            },
            zoom: {
                type: Number,
                // required: true,
            },
        },{_id:false}),
        required: true,
    },
    name:{
        type:String
    },
    
    createdAt:{
        type: Date,
        default: Date.now,
    },


})

export const cameraModel=mongoose.model("cameraPosition",cameraSchema);