import React from 'react'
import  './Sidebar.css'
import { assets } from '../../assets/assests'
import { Link } from 'react-router-dom'
// import Nav from 'react-bootstrap/Nav';
// import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  // const navigate = useNavigate();
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        
        <Link to='/admin/add' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
        </Link>
        <Link to='/admin/list' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Items</p>
        </Link> 
        <Link to='/admin/student' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Student</p>
        </Link> 
        
        </div>
    </div>)}
export default Sidebar
