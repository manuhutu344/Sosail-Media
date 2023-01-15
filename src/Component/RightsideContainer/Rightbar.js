import React, { useEffect, useState } from 'react'
import ads from '../assets/ads.jpg'
import image1 from '../assets/Image1.jpg'
import './Rightbar.css'
import axios from 'axios'
import Follow from './Follow'
import { useSelector } from 'react-redux'

function Rightbar() {
  const userDetails = useSelector((state)=>state.user)
  let user = userDetails.user
  const id = user.other._id
  const [users, setusers] = useState([])
  useEffect(() => {
    const getuser = async()=>{
      try {
        const res = await axios.get(`http://localhost:9000/user/all/user/${id}`)
        setusers(res.data)
      } catch (error) {
        console.log('error di getuser user post user details')
      }
    }
    getuser()
  }, [])
  console.log(users)
  return (
    <div className='rightbar'>
    <div className='rightcontainer'>
    <div className='adsContainer'>
    <img src={ads} className='adsimg' alt='' />
    <div>
    <p style={{textAlign: 'start', marginLeft: '10px', marginTop: -20}}>CodeDemy</p>
    <p style={{textAlign: 'start', marginLeft: '10px', fontSize: '12px', marginTop: '-16px'}}>Beli Dong Gaes Ngak Rugi</p>
    </div>
    </div>
    <div className='adsContainer'>
    <img src={image1} className='adsimg' alt='' />
    <div>
    <p style={{textAlign: 'start', marginLeft: '10px', marginTop: -20}}>CodeDemy</p>
    <p style={{textAlign: 'start', marginLeft: '10px', fontSize: '12px', marginTop: '-16px'}}>Beli Dong Gaes Ngak Rugi</p>
    </div>
    </div>
    </div>

    <div className='rightcontainer2'>
    <h3 style={{textAlign: 'start', marginLeft: '10px'}}>Disarankan untuk Anda</h3>
    {users.map((item)=>(
      <Follow userdetails={item} />
    ))}
    
    </div>

    </div>
  )
}

export default Rightbar