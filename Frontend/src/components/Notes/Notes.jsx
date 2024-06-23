
import React, { useContext, useState, Fragment, useEffect } from 'react'
import './Notes.css'
import { menu_list } from '../../assets/assests'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { FaRegEye } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
const Notes = ({ setAuth }) => {

  const [category, setCategory] = useState("All")
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [allImage, setAllImage] = useState([]);
  useEffect(() => {
    getFile();
  }, [])
  //get files from the file folder
  const getFile = async () => {
    const result = await axios.get("http://localhost:5000/fileupload/get-files")
    console.log("datasss:", result.data.data.rows);
    setAllImage(result.data.data.rows)
    console.log("allimage:", allImage)
  }
  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard",
        {
          method: "GET",
          headers: { token: localStorage.token }
        })
      const parseRes = await response.json()
      setName(parseRes.name)
      setEmail(parseRes.email)
      console.log(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  }
  const showPdf = async (pdf) => {
    window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer")
  }
  const Logout = (e) => {
    e.preventDefault();
    setTimeout(() => {
      // Navigate to '/another-page' after the delay
      setAuth(false)
    }, 2000);
    toast.success("Logout Successfully.......")
    localStorage.removeItem("token")
    localStorage.removeItem("user_role")
  }
  useEffect(() => {
    getName();
  })
  return (

    <div className="app">
      <div className="logout">
        <button className="btn btn-warning btn-block " style={{ alignItems: "flex-end" }} onClick={(e) => Logout(e)}>Logout</button>
      </div>
      <div className="dash" style={{ color: 'black' }}>
        <h4 >Name:{name}</h4>
        <h4 >Email:{email}</h4>
      </div>
      <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Notes </h1>
        <p className='explore-menu-text'>Access your course notes anytime and enhance your learning experience with our comprehensive Learning Management System.</p>
        <div className="explore-menu-list">
          {menu_list.map((item, index) => {
            return (
              <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-item'>
                <img src={item.menu_image} className={category === item.menu_name ? "active" : ""} alt="" />
                <p>{item.menu_name}</p>
              </div>
            )
          })}
        </div>
        <hr />
      </div>
      <div className="uploaded">

        


        {allImage === null ? "" : allImage.map((data, index) => {
          if (category === "All" || category === data.category) {
            return (
              
              <div className="inner-div">
                <div key={index} className="card" style={{ width: "18rem" }}>
                  {console.log(data.image)}
                  <img src={`http://localhost:5000/files/` + data.image} className="card-img-top" alt="" />
                  <div className="card-body">
                    <h5 className="card-title">Subject:{data.subject}</h5>

                    <h6 className="card-subtitle mb-2 text-muted">Semester:{data.sem}</h6>

                    <p className="card-text">Unit:{data.unit}</p>
                    {console.log("file_id", data.pdf)}
                    <FaRegEye onClick={() => showPdf(data.pdf)} style={{ marginLeft: "20px" }} />
                  </div>
                </div>
              </div>
            )
          }
          else {

          }
        }

        )}
      </div>

    </div>
  )
}

export default Notes

