import React, { useEffect, useState } from 'react'
import './ProfileRightbar.css'
import axios from 'axios'
import Follow from '../RightsideContainer/Follow'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

function ProfileRightbar() {
  const userDetails = useSelector((state)=>state.user)
  let user = userDetails.user
  let location = useLocation()
  let id = location.pathname.split('/')[2]
  let idForSuggest = user?.other?._id
  const [Followersuser, setFollowersuser] = useState([])
  useEffect(() => {
    const getFollowers = async()=>{
      try {
        const res = await axios.get(`http://localhost:9000/post/followers/${id}`)
        setFollowersuser(res.data)
      } catch (error) {
        console.log('Error di profileRightbar')
      }
    }
    getFollowers()
  }, [])
  console.log(Followersuser)

  const [users, setusers] = useState([])
  useEffect(() => {
    const getuser = async()=>{
      try {
        const res = await axios.get(`http://localhost:9000/user/all/user/${idForSuggest}`)
        setusers(res.data)
      } catch (error) {
        console.log('error di getuser user post user details')
      }
    }
    getuser()
  }, [])
  console.log(users)
  return (
    <div className='profilerightbar'>
    <div className='profilerightcontainer'>
    <h3>Followers</h3>
    <div>
    {Followersuser.map((item)=>(
      <div style={{marginTop:'10px'}}>
      <div style={{display: 'flex', alignItems: 'center', marginLeft: 10, cursor: 'pointer'}}>
      <img src={`${item.profile}`} className='Friendsimage' alt='' />
      <p style={{textAlign: 'start', marginLeft: '10px'}}>{item.username} </p>
      </div>
  
      </div>
    ))}
  
    
    </div>
    </div>

    <div className='rightcontainer2'>
    <h3 style={{textAlign: 'start', marginLeft: '10px'}}>Disarankan untuk Anda</h3>
    {users.map((item)=>(
      <Follow userdetails={item}/>
    ))}
    </div>
    </div>
  )
}

export default ProfileRightbar