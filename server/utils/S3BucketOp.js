import { S3Client, PutObjectCommand, HeadObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();
export const s3 = new S3Client({
    region: "your-region",
    credentials: {
      accessKeyId: "YOUR_ACCESS_KEY",
      secretAccessKey: "YOUR_SECRET_KEY",
    },
  });
export const uploadToS3 = async (file, bucketName, keyPrefix = "uploads/") => {
    try {
        const fileStream = fs.createReadStream(file.path);
  const key = `${keyPrefix}${file.originalname}`;

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileStream,
    ACL: "public-read",
    ContentType: file.mimetype,
  };

  await s3.send(new PutObjectCommand(params));

  return {
    key,
    url: `https://${bucketName}.s3.amazonaws.com/${key}`,
  };
    } catch (error) {
        console.log(error);     
    }
};

export const getFileInfoFromS3 = async (bucketName, key) => {
 try {
    const command = new HeadObjectCommand({
        Bucket: bucketName,
        Key: key,
      });
    
      const result = await s3.send(command);
    
      return {
        key,
        contentType: result.ContentType,
        contentLength: result.ContentLength,
        lastModified: result.LastModified,
        url: `https://${bucketName}.s3.amazonaws.com/${key}`,
      };
 } catch (error) {
    console.log(error);
    return null; // or handle the error as needed
 }
};

export const deleteFileFromS3 = async (bucketName, key) => {
  try{const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  await s3.send(command);

  return { message: `File '${key}' deleted successfully.` };}
  catch (error) {
    console.error("Error deleting file from S3:", error);
    throw new Error("Failed to delete file from S3");
  }
};
