"use server";
import XLSX from "xlsx";
import { z } from "zod";

const nodeSchema = z.array(
  z.object({
    no: z.number(),
    name: z.string(),
    role: z.string(),
    site: z.string(),
    note: z.string().optional(),
  }),
);

export async function parseFile(file: File) {
  try {
    const workbook = XLSX.read(await file.arrayBuffer());

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const rawData = XLSX.utils.sheet_to_json(worksheet, {
      header: ["no", "name", "role", "site", "note"],
      range: 1,
    });

    const validResult = nodeSchema.safeParse(rawData);
    if (!validResult.success) {
      return { error: "invalid file", data: null };
    }

    return { error: null, data: rawData };
  } catch (error) {
    return { error: "parse file error", data: null };
  }
}
