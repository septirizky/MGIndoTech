import { Router } from "express";
import {
  uploadCSV,
  handleCSVUpload,
  importData,
  getAllData,
  updateData,
  deleteData,
} from "../controllers/dataController";
import { exportToExcel } from "../controllers/exportController";

const router = Router();

router.post("/upload", uploadCSV, handleCSVUpload);
router.post("/import", importData);

router.get("/data", getAllData);
router.put("/data/:id", updateData);
router.delete("/data/:id", deleteData);

router.get("/export", exportToExcel);

export default router;
