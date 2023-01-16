import React, { useState } from 'react'
import Profil from '../assets/Profil.jpg'
import imageIcon from '../assets/gallery.png'
import emoji from '../assets/cat-face.png'
import Iconvideo from '../assets/video.png'
import './ContentPost.css'
import { useSelector } from 'react-redux'

function ContentPost() {
  const userDetails = useSelector((state)=>state.user)
  let user = userDetails.user
  console.log(user)
  let id = user.other._id
  const [file, setfile] = useState(null)
  return (
    <div>
    <div className='contentUploadContainer'>
    <div style={{display: 'flex', alignItems: 'center', padding: 10}}>
    <img src={`${user.other.profile}`} className='profileimage' alt='' />
    <input type='text' className='contentWritingpart' placeholder='Apa Yang Anda Pikirkan Hari Ini' />
    </div>
    <div style={{display: 'flex', marginLeft: '5px'}}>
    <div>
    <label htmlFor='file'>
    <img src={imageIcon} className='icons' alt='' />
    <input type='file' name='file' id='file' style={{display:'none'}} />
    </label>
    <img src={emoji} className='icons' alt='' />
    <img src={Iconvideo} className='icons' alt='' />
    <button style={{height:"27px" ,marginRight:"12px",marginTop:"40px", paddingLeft:"21px" , paddingRight:"21px" , paddingTop:7 , paddingBottom:7 , border:"none" , backgroundColor:"black" , color:"white" , borderRadius:"5px" , cursor:"pointer", marginLeft:'280px', marginBottom:'12px'}}>Posting</button>
    </div>
    </div>
    </div>
    </div>
  )
}

export default ContentPost