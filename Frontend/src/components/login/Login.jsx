import React ,{Fragment,useState,useContext,useEffect}from 'react'
import {Link, useNavigate} from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css"
import Validation from './LoginValidation';
import { jwtDecode } from 'jwt-decode'; 
import { RoleContext } from '../../App';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Stack from '@mui/material/Stack';
import logo from "../../assets/edu.jpg"
const Login = ({setAuth}) => {
  const images = [
    {
      image:
        "https://res.cloudinary.com/devat12345/image/upload/v1678808974/Data_1_jdlhie.svg",

      title: "Employee Directory",
      subtitle:
        "Experience the convenience of accessing all your work-related tools, resources, and information from a single, user-friendly application with our all-in-one employee portal solution.",
    },
    {
      image:
        "https://res.cloudinary.com/devat12345/image/upload/v1678809120/Secure_2_1_kyztmb.svg",
      title: "HR Help Desk",
      subtitle:
        "Experience the convenience of accessing all your work-related tools, resources, and information from a single, user-friendly application with our all-in-one employee portal solution.",
    },
    {
      image:
        "https://res.cloudinary.com/devat12345/image/upload/v1678808913/Meeting_1_rfmmod.svg",
      title: "Insightful Dashboard",
      subtitle:
        "Experience the convenience of accessing all your work-related tools, resources, and information from a single, user-friendly application with our all-in-one employee portal solution.",
    },
  ];

  const [image, setImage] = useState(images);
  const [currentImg, setCurrentImg] = useState(1);
  var count = 0;
  const leftRotate = () => {
    console.log("leftrotate");
    let firstElement = image.shift();
    let temp = image.push(firstElement);
    setImage((temp) => [...temp]);
    count = count + 1;
    currentImg != image.length
      ? setCurrentImg(currentImg + 1)
      : setCurrentImg(1);
  };
  const rightRotate = () => {
    let firstElement = image.pop();
    let temp = image.unshift(firstElement);
    setImage((temp) => [...temp]);
  };
  useEffect(() => {
    const interval = setInterval(
      () => {
        leftRotate();
      }, 3000
    );
    return () => clearInterval(interval);
  });
  const navigate = useNavigate();
const setRole=useContext(RoleContext);
const [errors, setErrors] = useState({})
const [inputs,setInputs]=useState({email:"",password:""})
const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
const {email,password}=inputs 
const onChange=(e=>{
setInputs({...inputs,[e.target.name]:e.target.value})
})

const handleSubmit=async(e)=>{
e.preventDefault();
setErrors(Validation(inputs));
try {

if (errors.email === "" && errors.password !== ""){
const body={email,password}
const response=await fetch("http://localhost:5000/auth/login",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify(body)
})
var parseRes=await response.json()
// console.log("token:",parseRes.token);
if(parseRes.token){
  const user = jwtDecode(parseRes.token);
  console.log(user, user.role)
  // setRole(user.role);
  localStorage.setItem('user_role', user.role);
  if(user.role==="Admin")
  {
    // setTimeout(() => {
    //   // Navigate to '/another-page' after the delay
    //   setRole(false)
    //    }, 2000);
    setRole(false)
    setAuth(true)
    console.log("Admin:",user.role);
    toast.success("login successfully ..........") 
    localStorage.setItem("token",parseRes.token);
    // navigate('/fileupload')
   }
  else{
    // setTimeout(() => {
    //   // Navigate to '/another-page' after the delay
    // setAuth(true)
    // setRole(true)
    // }, 2000);
    setAuth(true)
    setRole(true)
    console.log("user:",user.role);
    toast.success("login successfully ..........") 
    localStorage.setItem("token",parseRes.token);

  }}
else{
  setAuth(false)
  console.log(parseRes);
  toast.error(parseRes.message)
    }}
 } catch (err) {
  console.error(err.message)
toast.error(parseRes)
}} 
return (
  <div className="login-main">
  <div className="login-left">
    <div className="image">
      <Grid
        sm={6}
        lg={6}
        className="leftContainer"
        display={{ xs: "none", sm: "block" }}>
        {image.length > 0 && (
          <Stack
            justifyContent={"center"}
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <div className="carousel">
              <div className="left-image">
                <div className="left-value">
                  <img
                    alt="left value"
                    src={image[0].image}
                    width={120}
                    height={120}
                  />
                </div>
              </div>
              <div className="center">
                <div className="center-image">
                  <div className="center-value">
                    <img
                      alt="center value"
                      src={image[1].image}
                      width={400}
                      height={400}
                    />
                  </div>
                </div>
              </div>
              <div className="right-image">
                <div className="right-value">
                  <img
                    alt="right-Value"
                    src={image[2].image}
                    width={120}
                    height={120}
                  />
                </div>
              </div>
            </div>
            <div className="image-title">
              <div className="title">{image[0].title}</div>
            </div>
            <div className="subtitle">{image[0].subtitle}</div>
            <div className="carosel-slider-group">
              <div className="carosel-slider-btn" onClick={leftRotate}></div>
              <div className="carosel-slider-btn" onClick={rightRotate}></div>
            </div>
          </Stack>
        )}
      </Grid>
    </div>
  </div>
  <div className="login-right">
    <div className="login-right-container">
      <div className="login-logo">
        <img src={logo} alt="" />
      </div>
      <div className="head"><h2>MCA SmartLearn</h2>
        <p>Ease of access is our priority. With just a few clicks, you can log in and access your account in no time</p>
      </div>
      <div className="login-center">
        <form onSubmit={handleSubmit}>
          <div className="input-name">
          <input type="email" name="email" placeholder="Username" value={email} onChange={e => { onChange(e) }} />
          {console.log("errors:",errors.name)}
         { errors.email && <span className="error"> {errors.email}</span>}
          </div>
          <div className="pass-input-div">
            <input type={showPassword ? "text" : "password"} name="password" value={password} onChange={e => { onChange(e) }} placeholder="Password" />
            {showPassword ? <FaEyeSlash onClick={() => { setShowPassword(!showPassword) }} /> : <FaEye onClick={() => { setShowPassword(!showPassword) }} />}
            {errors.password && <span className="error">{errors.password}</span>}

          </div>
         
          <div className="login-center-buttons">
            <center>  <button type="submit">Log In</button></center>
          </div>
        </form>
       
                  
      </div>
      <p className="login-bottom-p">Don&apos;t have an account? <a href="/register">Sign Up</a></p>
    </div>
  </div>
  <ToastContainer />
</div>
      )}
export default Login


{/* <Fragment>
    <div className=
    "image">
    <img src={Image1} style={{
        maxWidth: '100%',
        maxHeight: '93vh',
        objectFit: 'cover'
    }} alt="" />
      </div>
      <div className="container">
        <div className='col-md-offset-4 col-md-5 my-8'>
        <h1 className='text-center  my-5 '>Login</h1>
    <form onSubmit={onSubmitChange}>
     <div className="form-group">
      <input
      type='email' placeholder='Email'  name='email' value={email} onChange={e=>onChange(e)}  
      className='form-control my-3' />
      {errors.email && <span style={{color:"#FF3E3E"}}>{errors.email}</span>}
      </div>
      <div className="form-group">
      <input type="password" placeholder='Password'  name='password' value={password} onChange={e=>onChange(e)}  
        className='form-control my-3'  />
         {errors.password && <span style={{color:"#FF3E3E"}}>{errors.password}</span>}
       </div>
      <button className='btn btn-warning btn-block form-control'>Login</button>
     <Link to="/register">Register</Link>
      </form>
    </div>
    <ToastContainer />
    </div>
     </Fragment> */}
