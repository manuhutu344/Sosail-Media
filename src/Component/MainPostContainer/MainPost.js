import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ContentPost from '../ContentPostContainer/ContentPost'
import Post from '../PostContainer/Post'
import './MainPost.css'

function MainPost() {
  const userDetails = useSelector((state)=>state.user)
  let user = userDetails.user
  console.log(user)
  let id = user.other._id
  const accesstoken = user.accessToken
  console.log(accesstoken)
  const [post, setPost] = useState([])
  useEffect(() => {
    const getPost = async()=>{
      try {
        const res = await axios.get(`http://localhost:9000/user/flw/${id}`, {
          headers:{
            token:accesstoken
          }
        })
        setPost(res.data)
      } catch (error) {
        
      }
    }
    getPost()
  }, [])
  console.log(post)
  
  return (
    <div className='mainPostContainer'>
    <ContentPost />
    {post.map((item)=>(
      item.map((postdetails)=>(
        <Post post={postdetails} />
      ))
  ))}
    </div>
  )
}

export default MainPost