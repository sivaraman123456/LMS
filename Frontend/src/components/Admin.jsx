import React from 'react'
import {  Outlet } from 'react-router-dom'
import './Admin/Admin.css'
import Sidebar from '../components/Sidebar/Sidebar'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Admin = ({setAuth}) => {
    const Logout=(e)=>{
        e.preventDefault();
        // setTimeout(() => {  
        //   // Navigate to '/another-page' after the delay
        //   setAuth(false)
        // }, 2000);
        setAuth(false)
        toast.success("Logout Successfully.......")
      
        localStorage.removeItem("token")
        localStorage.removeItem("user_role")
      }
  return (
    <div className='app'>
         <div className="logout">
      <button className="btn btn-warning btn-block " style={{alignItems:"flex-end"}} onClick={(e)=>Logout(e)}>Logout</button>
      </div>
    <ToastContainer/>
    <hr />
    <div className="app-content">
      <Sidebar/>
      <Outlet />
    </div>
  </div>   
  )
}
export default Admin
