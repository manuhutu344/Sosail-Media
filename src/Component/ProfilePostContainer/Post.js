import React, { useEffect, useState } from 'react'
import Profil from '../assets/Profil.jpg'
import Komen from '../assets/speech-bubble.png'
import Likes from '../assets/setLike.png'
import Share from '../assets/share.png'
import More from '../assets/more.png'
import './Post.css'
import axios from 'axios'

function Post({detail}) {
  console.log(detail)
  const [count, setCount] = useState(0)
  const [Comments, setComments] = useState([])
  const [commentwriting, setcommentwriting] = useState('')
  const [show, setshow] = useState(false)

  const [user, setuser] = useState([])
  useEffect(() => {
    const getuser = async()=>{
      try {
        const res = await axios.get(`http://localhost:9000/user/post/user/details/${detail.user}`)
        setuser(res.data)
      } catch (error) {
        console.log('error di getuser user post user details')
      }
    }
    getuser()
  }, [])

  console.log(user)

  const handleLike= async()=>{
    {/*
    if(Like == Likes){
      await fetch(`http://localhost:9000/post/${post._id}/like` , {method:"PUT" , headers:{'Content-Type':"application/Json" , token:accesstoken}})
      setLike(anotherlikeicon)
      setCount(count + 1)
    }else{
      await fetch(`http://localhost:9000/post/${post._id}/like` , {method:"PUT" , headers:{'Content-Type':"application/Json" , token:accesstoken}})
      setLike(Likes)
      setCount(count-1)
    }
    */}
  }

  const addComment = ()=>{
    const comment = {
      'id':'677oollkh990044ooplggggg',
      'username' : 'Dia',
      'title' : `${commentwriting}`
    }
    setComments(Comments.concat(comment))
  }

  const handleComment = ()=>{
    addComment()
  }

  console.log(Comments)

  const handleshow = () =>{
    if(show === false){
      setshow(true) 
    }else{
      setshow(false)
    }
  }

  {/*console.log(user) */}

  return (
    <div className='PostContainer'>
    <div className='SubPostContainer'>
    <div>
    <div style={{display: 'flex', alignItems: 'center'}}>
    <img src={`${user.profile}`} className='PostImage' alt='' />
    <div>
    <p style={{marginLeft: '5px', textAlign: 'start'}}>{user.username}</p>
    <p style={{fontSize: '11px', textAlign: 'start', marginLeft: 5, marginTop: -13, color: '#aaa'}}>Following by saya</p>
    </div>
    <img src={More} className='moreicons' alt='' />
    </div>
    <p style={{textAlign: 'start', width: '96%', marginLeft:10, marginTop:0}}>{detail.title}</p>
    <img src={`${detail.image}`} className='PostImages' alt='' />
    <div style={{display: 'flex'}}>
    <div style={{display: 'flex', marginLeft: '10px'}}>
    <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
    {/*<img src={Like} className='iconsforPost' onClick={handleLike} alt='' />*/}
    <p style={{marginLeft: '6px'}}>{detail.like.length} Suka</p>
    </div>
    <div style={{display: 'flex', alignItems: 'center', marginLeft: 20, cursor: 'pointer'}}>
    <img src={Komen} className='iconsforPost' onClick={handleshow} alt='' />
    <p style={{marginLeft: '6px'}}>{detail.comments.length}Komen</p>
    </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', marginLeft: 200, cursor: 'pointer'}}>
    <img src={Share} className='iconsforPost' alt='' />
    <p style={{marginLeft: '6px'}}>Bagikan</p>
    </div>
    </div>
    {show === true ? 
    <div style={{padding: '10px'}}>
    <div style={{display: 'flex', alignItems: 'center'}}>
    <img src={Profil} className='PostImage' alt='' />
    <input type='text' className='commentinput' placeholder='Komen saja' onChange={(e)=>setcommentwriting(e.target.value)} />
    <button className='addCommentbtn' onClick={handleComment}>Posting</button>
    </div>
    {Comments.map((item)=>(
    <div style={{ alignItems: 'center'}}>
    <div style={{display: 'flex', alignItems: 'center', }}>
    <img src={Profil} className='PostImage' alt='' />
    <p style={{marginLeft: '6px', fontSize: 18, marginTop: 6}}>{item.username}</p>
    </div>
    <p style={{marginLeft: '55px', textAlign: 'start', marginTop: -16}}>{item.title}</p>
    <p style={{marginLeft: '55px', textAlign: 'start', marginTop: -10, color: '#aaa', fontSize: 11}}>Balas</p>
    </div>
  ))}
  </div>: ''
}
    </div>
    </div>
    </div>
  )
}

export default Post