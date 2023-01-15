import React, { useEffect, useState } from 'react'
import ContentPost from '../ContentPostContainer/ContentPost'
import Post from '../ProfilePostContainer/Post'
import Coverimage from '../assets/Profil.jpg'
import './ProfileMainPost.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

function ProfileMainPost() {  
  const [post, setPost] = useState([])
  let location = useLocation()
  let id = location.pathname.split('/')[2]

  useEffect(() => {
    const getPost = async()=>{
      try {
        const res = await axios.get(`http://localhost:9000/post/get/post/${id}`,)
        setPost(res.data)
      } catch (error) {
        console.log('Eror di ProfileMainPostContainer')
      }
    }
    getPost()
  }, [])
  
  return (
    <div className='profilemainPostContainer'>
    <div>
    <img src={Coverimage} className='profileCoverimage' alt='' />
    <h2 style={{marginTop: -43, color: 'white', textAlign: 'start', marginLeft: '34px'}}>Profil Anda</h2>
    </div>
    <ContentPost />
    {post.map((item)=>(
      <Post detail={item} />
    ))}
    </div>
  )
}

export default ProfileMainPost