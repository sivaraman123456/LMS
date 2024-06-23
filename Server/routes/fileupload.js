const router = require("express").Router()
const fs = require('fs');
const pool = require("../db")
const path=require("path")
var cors = require('cors');
router.use(cors());
const multer  = require('multer')


// Define storage for files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify where to store the files
    cb(null, './files');
  },
  filename: function (req, file, cb) {
    // Generate unique file names
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer with the storage options
const upload = multer({ storage: storage });

  router.post("/upload-files",upload.fields([{ name: 'file', maxCount: 1 }, { name: 'image', maxCount: 1 }]),async(req,res)=>{
    const unit=req.body.unit;
    const subject=req.body.subject;
    const sem=req.body.sem;
    const category=req.body.category;
    const filename = req.files['file'][0]; 
    const imagename = req.files['image'][0];
    console.log("filename:",filename.filename);
    console.log("imagename:",imagename.filename);
    try {
     
        await pool.query("insert into Fileupload (image,pdf,unit,sem,subject,category) values($1,$2,$3,$4,$5,$6) returning *",[imagename.filename,filename.filename,unit,sem,subject,category])
        res.json({ success: true, message: "Data added " })
      } catch (error) {
          console.log(error);
          res.json({ success: false, message: "Error" })
      }
  console.log(req.file);
    })

router.delete("/delete-file/:dataId",async(req,res)=>{
try {
  // const pdf = await pdfSchema.findById(req.params.id);
  console.log(req.params.dataId);
  const pdf=await pool.query("select * from Fileupload where file_id=$1",[req.params.dataId])
    if (!pdf) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    console.log(__dirname)
    // console.log("imga:",pdf);
    console.log("imga:",pdf.rows);
    console.log("imga:",pdf.rows[0].image);
//   // Delete the file from file system
    await fs.unlinkSync('../server/files/'+pdf.rows[0].image);
    await fs.unlinkSync('../server/files/'+pdf.rows[0].pdf);
    await pool.query("delete from Fileupload where file_id=$1",[req.params.dataId]);
    res.send({ status:"ok"});
  } catch (err) {
  console.error(err.message);
  }
})

router.get("/get-files",async(req,res)=>{
    try {
     
    await pool.query("select * from Fileupload ")

      .then((data)=>{
        res.send({status:"ok",data:data})
        console.log("file:",data);
      })  
     
    } catch (err) {
        console.error(err.message);
      
    }
    
})

module.exports=router