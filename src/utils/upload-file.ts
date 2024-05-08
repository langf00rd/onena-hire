import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "./config/s3";

export default async function uploadFileToS3(file: Buffer, fileName: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${fileName}`,
    Body: file,
    // ContentType: "image/png",
  });
  await s3.send(command);
  return fileName;
}
