import {NextRequest, NextResponse} from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import {nanoid} from 'nanoid';

export const POST = async (req: any) => {
  console.log("Inside");
  // Get form data
  const formData = await req.formData();
  const files = formData.getAll("file");
  const fileNames = formData.getAll("name"); // Assume custom names are provided as "name"

  if (!files || files.length === 0) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  // if (fileNames.length !== files.length) {
  //   return NextResponse.json(
  //     { error: "Mismatched files and names." },
  //     { status: 400 },
  //   );
  // }

  const fileResponses = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    
    const customName = fileNames[i]; // Get the custom name for this file

    if (!file || typeof file.arrayBuffer !== "function") continue;

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = customName || Date.now() + file.name.replaceAll(" ", "_");
    try {
      const postImageName  = nanoid()
      const extension = filename.substring(filename.lastIndexOf('.'));
      const uploadPath = path.join(process.cwd(), "uploads/post", postImageName + extension);
      await fs.writeFile(uploadPath, buffer);
      fileResponses.push({ filename, status: "Success" });
    } catch (error) {
      console.log("Error occurred while writing file:", error);
      fileResponses.push({ filename, status: "Failed" });
    }
  }
  return NextResponse.json({ files: fileResponses, status: 201 });
};
