import React, { useEffect, useState } from 'react'
import './List.css'
import { url } from '../../assets/assests'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const [list,setList] = useState([]);
  const fetchList = async () => {
    const result = await axios.get(`${url}/fileupload/get-files`)
    console.log(result.data);
      setList(result.data.data.rows);
    
    
  }

  const removedata = async (dataId) => {
    const send = await axios.delete(`${url}/fileupload/delete-file/${dataId}`)
    await fetchList();
    if (send.data.status === "ok") {
      toast.success("file deleted successfully..")

    }
    else {
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
        <p>All Data List</p>
        <div className='list-table'>
          <div className="list-table-format title ">
            
            <b>Image</b>
            <b>Pdf</b>
            <b>Semester</b>
            <b>Subject</b>
            <b>Unit</b>
            <b>Delete</b>
           
          </div>
          {list.map((item,index)=>{
            return (
           
              <div key={index} className='list-table-format'>
                <img src={`${url}/files/`+item.image} alt="" />
                <p>{item.pdf}</p>
                <p>{item.sem}</p>
               <p>{item.category}</p>
                <p>{item.unit}</p>
                <p className='cursor' onClick={()=>removedata(item.file_id)}>x</p>
                {console.log("file_id:",item.file_id)}
              </div>
             
            )
          })}
        </div>
    </div>
  )
}

export default List




