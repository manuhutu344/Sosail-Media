import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import addFriends from '../assets/add-user.png'
import UserToFollow from '../assets/afterFollowImg.png'

function Follow({userdetails}) {
  const userDetails = useSelector((state)=>state.user)
  let user = userDetails.user
  console.log(user)
  let id = user.other._id
  console.log(id)
  
    const accessToken = user?.accessToken
    const [follow, setfollow] = useState(addFriends)
    const handleFollow = async(e)=>{
        await fetch(`http://localhost:9000/user/following/${userdetails._id}`, {method:'PUT', headers:{'Content-Type':"application/JSON", token:accessToken}, body:JSON.stringify({user:`${id}`})})
        setfollow(UserToFollow)
    }
  return (
    <div style={{marginTop: '-10px'}}key={userdetails._id}>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
    <Link to={`/profil/${userdetails._id}`}>
    <div style={{display: 'flex', alignItems: 'center'}}>
    <img src={`${userdetails.profile}`} className='Profileimage' alt='' />
    <div>
    <p style={{marginLeft: '10px', textAlign: 'start'}}>{userdetails.username}</p>
    <p style={{marginLeft: '10px', textAlign: 'start', marginTop: '-16px', fontSize: '11px', color: '#aaa'}}>Disarankan Untuk Anda</p>
    </div>
    </div>
    </Link>
    <div style={{backgroundColor: '#aaa', padding: '10px', marginRight: 13, borderRadius: '50%', cursor: 'pointer'}} onClick={e=>handleFollow(userdetails._id)}>
    <img src={follow} className='addfriend' alt='' />
    </div>
    </div>
    
    </div>
  )
}

export default Follow