import React from 'react'
import './Profile.css'
import Navbar from '../../Component/Navbar/Navbar'
import ProfileLeftbar from '../../Component/ProfileLeftContainer/ProfileLeftbar'
import ProfileMainPost from '../../Component/ProfileMainPostContainer/ProfileMainPost'
import ProfileRightbar from '../../Component/ProfileRightsideContainer/ProfileRightbar'
import { useSelector } from 'react-redux'

function Profile() {
  const userDetails = useSelector((state)=>state.user)
  let user = userDetails.user
  console.log(user)
  return (
    <div className='ProfileContainer'>
    <Navbar />
    <div className='subProfileContainer'>
    <ProfileLeftbar />
    <ProfileMainPost />
    <ProfileRightbar />
    </div>
    </div>
  )
}

export default Profile