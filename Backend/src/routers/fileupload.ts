import { Router } from "express";
import { files} from "../controllers/upload_files";
import { Any } from "typeorm";

const router = Router();

router.post("/upload-files", files);
router.get("/get-files")
router.delete("/delete-file")

export default router;
