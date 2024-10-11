import { Request, Response } from "express";
import multer from "multer";
import csvParser from "csv-parser";
import { Data } from "../models/dataModel";
import fs from "fs";

const upload = multer({ dest: "uploads/" });

export const uploadCSV = upload.single("file");

export const handleCSVUpload = (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  const results: any[] = [];

  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on("data", (data: any) => results.push(data))
    .on("end", () => {
      res.json(results);
    })
    .on("error", (err: Error) => {
      res.status(500).json({ message: "Failed to parse CSV", error: err });
    });
};

export const importData = async (req: Request, res: Response) => {
  const { selectedData } = req.body;

  try {
    const insertedData = await Data.insertMany(selectedData);
    res.status(201).json(insertedData);
  } catch (error) {
    res.status(500).json({ message: "Failed to import data", error });
  }
};

export const getAllData = async (req: Request, res: Response) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data", error });
  }
};

export const updateData = async (req: Request, res: Response) => {
  try {
    const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ message: "Failed to update data", error });
  }
};

export const deleteData = async (req: Request, res: Response) => {
  try {
    await Data.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete data", error });
  }
};
