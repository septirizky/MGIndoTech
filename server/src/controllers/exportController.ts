import { Request, Response } from "express";
import { Data } from "../models/dataModel";
import ExcelJS from "exceljs";

export const exportToExcel = async (req: Request, res: Response) => {
  try {
    const data = await Data.find();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    worksheet.columns = [
      { header: "Id", key: "id", width: 10 },
      { header: "Nama", key: "nama", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Telepon", key: "telepon", width: 20 },
      { header: "Alamat", key: "alamat", width: 50 },
    ];

    worksheet.addRows(data);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=data.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: "Failed to export data to Excel", error });
  }
};
