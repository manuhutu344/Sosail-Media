import React, { useEffect, useState } from 'react'
import './Leftbar.css'
import image from '../assets/Profil.jpg'
import image1 from '../assets/Image1.jpg'
import image2 from '../assets/Image2.jpg'
import image3 from '../assets/Image3.jpg'
import image4 from '../assets/Image4.jpeg'
import image5 from '../assets/Image5.jpg'
import image6 from '../assets/Image6.jpg'
import axios from 'axios'
import { useSelector } from 'react-redux'

function Leftbar() {
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
    <div className='leftbar'>
    {/* Ini Untuk Fitur Notif & Lihat Semua */}
    <div className='NotificationsContainer'>
    <div style={{display:'flex', justifyContent: 'space-around'}}>
    <p style={{marginLeft: '-14px'}}>Notif</p>
    <p style={{color: '#aaa', marginLeft: '40px'}}>Lihat Semua</p>
    </div>
    <div style={{display:'flex', alignItems: 'center', marginTop: -10}}>
    <img src={image} className='notificationimg' alt='' />
    <p style={{marginLeft: '5px', color: '#aaa', fontSize: '13', width: '120px', textAlign:'start' }}>Saya Like Kamu</p>
    <img src={image1} className='likeimage' alt='' />
    </div>
    <div style={{display:'flex', alignItems: 'center', marginTop: -10}}>
    <img src={image} className='notificationimg' alt='' />
    <p style={{marginLeft: '5px', color: '#aaa', fontSize: '13', textAlign:'start', width: '120px' }}>Saya Mulai Mengikuti Kamu</p>
    <img src={image2} className='followinguserimage' alt='' />
    </div>
    <div style={{display:'flex', alignItems: 'center', marginTop: -10}}>
    <img src={image} className='notificationimg' alt='' />
    <p style={{marginLeft: '5px', color: '#aaa', fontSize: '13', width: '120px', textAlign:'start' }}>Saya Like Kamu</p>
    <img src={image3} className='likeimage' alt='' />
    </div>
    <div style={{display:'flex', alignItems: 'center', marginTop: -10}}>
    <img src={image} className='notificationimg' alt='' />
    <p style={{marginLeft: '5px', color: '#aaa', fontSize: '13', width: '120px', textAlign:'start' }}>Dia Mulai Mengikuti Saya</p>
    <img src={image4} className='followinguserimage' alt='' />
    </div>
    <div style={{display:'flex', alignItems: 'center', marginTop: -10}}>
    <img src={image} className='notificationimg' alt='' />
    <p style={{marginLeft: '5px', color: '#aaa', fontSize: '13', width: '120px', textAlign:'start' }}>Kamu Mulai Mengikuti Saya</p>
    <img src={image5} className='followinguserimage' alt='' />
    </div>
    <div style={{display:'flex', alignItems: 'center', marginTop: -10}}>
    <img src={image} className='notificationimg' alt='' />
    <p style={{marginLeft: '5px', color: '#aaa', fontSize: '13', width: '120px', textAlign:'start' }}>Saya Like Kamu</p>
    <img src={image6} className='likeimage' alt='' />
    </div>
    </div>

    {/* Ini Untuk Fitur Explore & Lihat Semua */}
    <div className='NotificationsContainer'>
    <div style={{display:'flex', justifyContent: 'space-around'}}>
    <p style={{marginLeft: '-20px'}}>Explore</p>
    <p style={{color: '#aaa', marginLeft: '40px'}}>Lihat Semua</p>
    </div>
    <div>
    {post.map((item)=>(
    [item.image === '' ? '' :
        <img src={item.image} className='exploreimage' alt='' />
    ]
    ))}

    </div>
    </div>

    </div>
  )
}

export default Leftbar