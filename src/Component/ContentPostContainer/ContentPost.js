import React, { useState } from 'react'
import Profil from '../assets/Profil.jpg'
import imageIcon from '../assets/gallery.png'
import emoji from '../assets/cat-face.png'
import Iconvideo from '../assets/video.png'
import './ContentPost.css'
import { useSelector } from 'react-redux'
import app from '../../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function ContentPost() {
  const userDetails = useSelector((state)=>state.user)
  let user = userDetails.user
  console.log(user)
  let id = user.other._id
  const [file, setfile] = useState('')
  const [file2, setfile2] = useState('')
  console.log(file?.name)
  const handlePost = (e)=>{
    e.preventDefault()
    const fileName = new Date().getTime() + file?.name
    const storage = getStorage(app)
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);
  }
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
    <input type='file' name='file' id='file' style={{display:'none'}} onChange={(e)=>setfile(e.target.files[0])}/>
    </label>
    <img src={emoji} className='icons' alt='' />
    <label htmlFor='file2'>
    <img src={Iconvideo} className='icons' alt='' />
    <input type='file' name='file2' id='file2' style={{display:'none'}} onChange={(e)=>setfile2(e.target.files[0])}/>
    </label>
    <button style={{height:"27px" ,marginRight:"12px",marginTop:"40px", paddingLeft:"21px" , paddingRight:"21px" , paddingTop:7 , paddingBottom:7 , border:"none" , backgroundColor:"black" , color:"white" , borderRadius:"5px" , cursor:"pointer", marginLeft:'280px', marginBottom:'12px'}}onClick={handlePost}>Posting</button>
    </div>
    </div>
    </div>
    </div>
  )
}

export default ContentPost