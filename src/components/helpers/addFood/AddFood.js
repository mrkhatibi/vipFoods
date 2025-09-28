"use server";

import connectDB from "@/components/utils/connectDB";
import VIPFOODS from "@/models/vipFoods";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function AddFoodsFun(
  id,
  file, // همون فایل از FormData
  name,
  description,
  price,
  type
) {
  try {
    await connectDB();

    if (!file) throw new Error("  upload file");

    // فایل رو به Buffer تبدیل می‌کنیم
    const buffer = Buffer.from(await file.arrayBuffer());

    // آپلود به Cloudinary
    const uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "vip-foods", // اختیاری: عکس‌ها توی فولدر "vip-foods"
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    // ذخیره در دیتابیس
    const food = await VIPFOODS.create({
      userId: id,
      name,
      description,
      price,
      type,
      image: uploaded.secure_url, // لینک Cloudinary
    });

    return JSON.parse(JSON.stringify(food));
  } catch (err) {
    console.error("AddFoodsFun error:", err);
    return null;
  }
}
