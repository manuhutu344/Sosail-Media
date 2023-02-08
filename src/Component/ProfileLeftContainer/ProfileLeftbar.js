import React, { useEffect, useState } from 'react'
import './ProfileLeftbar.css'
import image from '../assets/Profil.jpg'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProfileLeftbar() {
  let location = useLocation()
  let id = location.pathname.split('/')[2]
  console.log(id)
  const userDetails = useSelector((state)=>state.user)
  let user = userDetails.user
  const [Follow, setUnFollow] = useState([user.other.Following.includes(id) ? 'Unfollow' : 'Follow'])
  const accessToken = user.accessToken
  console.log(accessToken)
  let username = user?.other?.username
  const [users, setuser] = useState([])
  useEffect(() => {
    const getuser = async()=>{
      try {
        const res = await axios.get(`http://localhost:9000/user/post/user/details/${id}`)
        setuser(res.data)
      } catch (error) {
        console.log('error di getuser user post user details')
      }
    }
    getuser()
  }, [])
  let followersCounter = users?.Followers?.length
  let followingCounter = users?.Following?.length
  console.log(users)
  const [Followinguser, setFollowinguser] = useState([])
  useEffect(() => {
    const getFollowing = async()=>{
      try {
        const res = await axios.get(`http://localhost:9000/post/following/${id}`)
        setFollowinguser(res.data)
      } catch (error) {
        console.log('Error di profileleftbar')
      }
    }
    getFollowing()
  }, [])
  const handleFollow = async()=>{
    if(Follow === 'Follow'){
      await fetch(`http://localhost:9000/user/following/${id}`, {method:'PUT', headers:{'Content-Type':"application/JSON", token:accessToken}, body:JSON.stringify({user:`${user.other._id}`})})
      setUnFollow('terUnFollow')
    }else{
      await fetch(`http://localhost:9000/user/following/${id}`, {method:'PUT', headers:{'Content-Type':"application/JSON", token:accessToken}, body:JSON.stringify({user:`${user.other._id}`})})
      setUnFollow('Follow')
    }
  }

  console.log(Followinguser)
  
  return (
    <div className='ProfileLeftbar'>
    {/* Ini Untuk Fitur Notif & Lihat Semua */}
    <div className='NotificationsContainer'>
    <img src={image} className='ProfilepageCover' alt='' />
    <div style={{display: 'flex', alignItems: 'center', marginTop: -30}}>
    <img src={`${users.profile}`} className='Profilepageimage' alt='' />
    <div>
    <p style={{marginLeft: 6, marginTop: 20, color: 'black', textAlign: 'start'}}>{users.username}</p>
    <p style={{marginLeft: 6, marginTop: 20, color: 'black', textAlign: 'start', marginTop: -20, fontSize: -16}}>Penganguran</p>
    </div>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <p style={{color: 'black', marginLeft: 20, fontSize: '14px'}}>Following</p>
    <p style={{color: 'black', marginRight: 20, fontSize: '12px', marginTop: 17}}>{followingCounter}</p>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: -20}}>
    <p style={{color: 'black', marginLeft: 20, fontSize: '14px'}}>Followers</p>
    <p style={{color: 'black', marginRight: 20, fontSize: '12px', marginTop: 17}}>{followersCounter}</p>
    </div>
    <div style={{ marginTop: -20}}>
    <h5 style={{color: 'black', marginLeft: 10, fontSize: '14px', marginRight: 30, marginTop: 30, textAlign: 'start'}}>Bio</h5>
    <p style={{color: 'black',  fontSize: '12px', marginTop: -20, textAlign: 'start', marginLeft: '10px'}}>Ini Bio saya dimana ini merupakan bio saya oleh karena itu ini bio saya, nah kan ini bio saya udah</p>
    </div>
    {user.other._id !== id ? <div onClick={handleFollow}><button style={{width:"100%" , paddingTop:7 , paddingBottom:7 , border:"none" , backgroundColor:"green" , color:"white"}}>{Follow}</button></div> : <div><button style={{width: '100%', paddingTop: 7, paddingBottom: 7, border: 'none', backgroundColor: 'black', color: 'white'}}>Edit Bio</button></div>}
    </div>

    {/* Ini Untuk Fitur Explore & Lihat Semua */}
    <div className='NotificationsContainer'>
    <h3>Followings</h3>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <p style={{marginLeft: 10}}>Teman</p>
    <p style={{marginRight: 10, color: '#aaa'}}>Lihat Semua</p>
    </div>
    <div style={{display: 'flex', flexWrap: 'wrap', marginLeft:5}}>
    {Followinguser.map((item)=>(
      <Link to={`/profil/${item._id}`}>
      <div style={{marginLeft: 4, cursor:'pointer'}}key={item._id}>
    <img src={`${item.profile}`} className='friendimage' alt='' />
    <p style={{marginTop: -2}}>{item.username}</p>
    </div>
    </Link>
  ))}
    </div>
    </div>

    </div>
  )
}

export default ProfileLeftbar