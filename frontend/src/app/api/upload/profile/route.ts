'use server'
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req, res) => {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");
    console.log(filename);
    try {
        await writeFile(
            path.join(process.cwd(), "uploads/profile_picture" + filename),
            buffer
        );
        return NextResponse.json({ Message: "Profile picture upload success", status: 201 });
    } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ Message: "Failed to upload profile picture", status: 500 });
    }
};
