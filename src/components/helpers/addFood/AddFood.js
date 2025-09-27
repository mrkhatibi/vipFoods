"use server";

import fs from "fs";
import path from "path";
import connectDB from "@/components/utils/connectDB";
import VIPFOODS from "@/models/vipFoods";

export default async function AddFoodsFun(
  id,
  file,
  name,
  description,
  price,
  type
) {
  await connectDB();
  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const filePath = path.join(uploadsDir, file.name);
  fs.writeFileSync(filePath, buffer);

  const food = await VIPFOODS.create({
    userId: id,
    name,
    description,
    price,
    type,
    image: `/uploads/${file.name}`,
  });

  return JSON.parse(JSON.stringify(food));
}
