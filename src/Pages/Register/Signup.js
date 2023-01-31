import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {signup} from '../../Component/ReduxContainer/apiCall'
import app from '../../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './Signup.css'

function Signup() {
  const dispatch = useDispatch()
  const {isFetching, error} = useSelector((state)=>state.user)
  const user = useSelector((state)=>state.user)
  const [email, setEmail] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [username, setusername] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState(null)
  const userDetails = user.user
  const navigator = useNavigate()
  console.log(user)
  const handleClick = (e)=>{
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
      signup(dispatch,{email, password, username, phonenumber, profile:downloadURL})
      })
    });
  }
  return (
    <div className='mainContainerForsignup'>
    <div className='submainContainer'>
    <div style={{flex:1, marginLeft:150, marginBottom:'170px'}}>
    <p className='logoText'>Sosial<span className='part'>Media Ajah</span></p>
    <p className='introtext'>Mengkoneksi semua <span className='part'> orang yang ada</span></p>
    </div>
    <div style={{flex:3}}>
    <p className='createaccounTxt'>Buat Akun Anda</p>
    <input type='file' name='file' id='file' onChange={(e)=>setFile(e.target.files[0])} />
    <input type='text' placeholder='Username Anda' onChange={(e)=>setusername(e.target.value)} className='inputText'/>
    <input type='text' placeholder='Nomor Telfon Anda' onChange={(e)=>setPhonenumber(e.target.value)} className='inputText' />
    <input type='email' nama='' onChange={(e)=>setEmail(e.target.value)} id='' placeholder='Email Anda' className='inputText'/>
    <input type='password' nama='' onChange={(e)=>setPassword(e.target.value)} id='' placeholder='Masukan Password Anda' className='inputText' />
    <button className='btnforsignup' onClick={handleClick}>Buat Akun Anda</button>
    <Link to='/login'>
    <p style={{textAlign:'start', marginLeft:'30.6%'}}>Sudah Punya Akun ?</p>
    </Link>
    </div>
    </div>
    </div>
  )
}

export default Signup