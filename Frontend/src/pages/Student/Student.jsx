import React from 'react'
import { url } from '../../assets/assests'
import axios from 'axios'
import "./Student.css"
import { useState ,useEffect} from 'react'
const Student = () => {
    const [data,setData]=useState([])
const fetchData=async()=>{
const response=await axios.get(`${url}/auth/data`)

console.log(response.data.data.rows);
setData(response.data.data.rows)
}

const removeData=async()=>{
  const remove=await axios.delete()
}
useEffect(()=>{
fetchData();
},[])

  return (
    <table className="customers">
    <tr>
      <th  scope="col">Id</th>
      <th  scope="col">Name</th>
      <th  scope="col">Email</th>
    </tr>
    
        
        <tbody>
          {data.map((item, index) => (
            
            !(item.name==='Admin')?
            <tr key={index}>
              <td scope="row">{item.user_id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td></td>
              {/* <td>{item.handle}</td> */}
            </tr>
            
             :
             null
            ))}
            </tbody>
           

    
      </table>
    );
  };
  
    
  


export default Student

