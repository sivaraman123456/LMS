 import './Home.css';
import React from 'react'
import { useState} from 'react'
import backgroundImg1 from "../../assets/random/coding_bg2.jpg"

const randomImges = [
    backgroundImg1
]
const Home = () => {
 
    const [backgroundImg, setBackgroundImg] = useState(0);

    const styles = {
      fontWeight: 'bold',
      color: 'transparent',
      background: 'linear-gradient(to right, #6B46C1, #B794F4)',
      WebkitBackgroundClip: 'text'
    };
  return (
  <>
  <div className="signup">
    <a href='/login'>Sign In</a>
  </div>
   <div className='header'>
            <div className='header-contents'>
                <h2>Empower Your Future with <span style={styles} >Coding Skills</span></h2>
                <p>With our online  coding notes, you can learn at your own place, from anywhere in the world, and get access to a wealth of resources, including MCA subject notes in semester wise,you can download </p>
    </div>
        </div>
        </>
  )
}
export default Home


