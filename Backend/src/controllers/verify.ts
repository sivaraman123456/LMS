import { Request,Response} from "express";
const verify=(req:Request,res:Response)=>
{
    try {
        res.json(true)
    } catch (error) {
        console.error(error);
    }
}
export default verify;
