const mongoose=require("mongoose")
const pdfDetailsSchema=new mongoose.Schema({
    pdf:String,
    unit:String,
    sem:String,
    subject:String
},{
    collection:"PdfDetails"
}
);

mongoose.model("PdfDetails",pdfDetailsSchema)

