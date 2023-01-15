import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {login} from '../../Component/ReduxContainer/apiCall'
import './Login.css'

function Login() {
  const dispatch = useDispatch()
  const {isFetching, error} = useSelector((state)=>state.user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleClick = (e)=>{
    e.preventDefault()
    login(dispatch,{email, password})
  }
  return (
    <div className='mainContainerForsignup'>
    <div className='submainContainer'>
    <div style={{flex:1, marginLeft:150, marginBottom:'170px'}}>
    <p className='logoText'>Sosial<span className='part'>Media Ajah</span></p>
    <p className='introtext'>Mengkoneksi semua <span className='part'> orang yang ada</span></p>
    </div>
    <div style={{flex:3}}>
    <p className='createaccounTxt'>Masuk Ke Akun Anda</p>
    <input type='email' nama='' id='email' placeholder='Email Anda' onChange={(e)=>setEmail(e.target.value)} className='inputText'/>
    <input type='password' nama='' id='password' placeholder='Masukan Password Anda' onChange={(e)=>setPassword(e.target.value)} className='inputText' />
    <button className='btnforsignup' onClick={handleClick}>Masuk</button>
    <Link to='/signup'>
    <p style={{textAlign:'start', marginLeft:'30.6%'}}>Lupa Password ?</p>
    </Link>
    <Link to='/signup'>
    <p style={{textAlign:'start', marginLeft:'30.6%'}}>Belum Punya Akun ?</p>
    </Link>
    </div>
    </div>
    </div>
  )
}

export default Login