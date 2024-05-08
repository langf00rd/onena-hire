import * as uuid from "short-uuid";
import uploadFileToS3 from "@/utils/upload-file";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const fileKey: string =
      formData.get("file-key")?.toString() ?? uuid.generate();

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, fileKey);
    const encodedFileName = encodeURIComponent(fileName);
    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${encodedFileName}`;

    return Response.json({ data: { url } });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
