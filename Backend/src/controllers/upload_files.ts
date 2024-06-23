

import { Request, Response } from 'express';
import multer, { StorageEngine } from 'multer';
import path from 'path';
import Appdata from '../datasource/datasource';
import { Fileupload } from '../entities/file';


const files=()=>{



// Configure multer storage options
const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files');
  },
  filename: function (req, file, cb) {
    // Generate unique file names
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Initialize multer with the storage options
const upload = multer({ storage: storage });

// Define a type for the request with files
interface MulterRequest extends Request {
  files: {
    [fieldname: string]: Express.Multer.File[];
  };
}

// Middleware for file upload
 upload.fields([{ name: 'file', maxCount: 1 }, { name: 'image', maxCount: 1 }]);

// Upload handler
 async (req: MulterRequest, res: Response): Promise<void>=> {
  const fileRepo = Appdata.getRepository(Fileupload);
  const file1 = new Fileupload();

  const { unit, subject, sem, category } = req.body;

  const file = req.files['file']?.[0];
  const image = req.files['image']?.[0];

  if (file && image) {
    file1.unit = unit;
    file1.subject = subject;
    file1.sem = sem;
    file1.image = image.filename;
    file1.pdf = file.filename;
    file1.catagory = category;

    try {
      await fileRepo.save(file1);
      res.json({ success: true, message: "Data added" });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Error saving data" });
    }
  } else {
    res.status(400).json({ success: false, message: "Files are missing" });
  }
};
}
export { files};
