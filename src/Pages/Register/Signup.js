import React from 'react'
import { Link } from 'react-router-dom'
import './Signup.css'

function Signup() {
  return (
    <div className='mainContainerForsignup'>
    <div className='submainContainer'>
    <div style={{flex:1, marginLeft:150, marginBottom:'170px'}}>
    <p className='logoText'>Sosial<span className='part'>Media Ajah</span></p>
    <p className='introtext'>Mengkoneksi semua <span className='part'> orang yang ada</span></p>
    </div>
    <div style={{flex:3}}>
    <p className='createaccounTxt'>Buat Akun Anda</p>
    <input type='text' placeholder='Username Anda' className='inputText'/>
    <input type='text' placeholder='Nomor Telfon Anda' className='inputText' />
    <input type='email' nama='' id='' placeholder='Email Anda' className='inputText'/>
    <input type='password' nama='' id='' placeholder='Masukan Password Anda' className='inputText' />
    <button className='btnforsignup'>Buat Akun Anda</button>
    <Link to='/login'>
    <p style={{textAlign:'start', marginLeft:'30.6%'}}>Sudah Punya Akun ?</p>
    </Link>
    </div>
    </div>
    </div>
  )
}

export default Signup