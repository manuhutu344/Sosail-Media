import React from 'react'
import logo from '../assets/logo.png'
import searchIcon from '../assets/search.png'
import notif from '../assets/bell.png'
import Message from '../assets/message.png'
import Profil from '../assets/Profil.jpg'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../ReduxContainer/userReducer'

function Navbar() {
  const userDetails = useSelector((state)=>state.user)
  let user = userDetails?.user
  console.log(user)
  let id = user?.other?._id
  const dispatch = useDispatch()
  const handleLogout = ()=>{
    dispatch(logout())
  }
  return (
    <div className='mainNavbar'>
    <div className='LogoContainer'>
    <img src = {logo} style={{width: 50, height: 50}} />
    </div>
    <div>
    <div className='searchInputContainer'>
    <img src={searchIcon} className='searchIcon' alt='' />
    <input type='text' className='searchInput' placeholder='Anda Bisa Mencari Teman Anda Disini' name='' id='' />
    </div>
    </div>
    <div className='IconsContainer'>
    <img src={notif} className='Icons' alt='' />
    <img src={Message} className='Icons' alt='' />

    <Link to={`/profil/${id}`}>
    <div style={{display: 'flex', alignItems: 'center'}}>
    <img src={`${user?.other?.profile}`} className='Profileimage' alt='' />
    <p style={{marginLeft: '5px'}}>{user?.other?.username}</p>
    </div>
    </Link>
    <div style={{marginRight: '30px', marginLeft: '20px', cursor: 'pointer'}} onClick={handleLogout}>
    <p>Logout</p>
    </div>

    </div>
    </div>
  )
}

export default Navbar