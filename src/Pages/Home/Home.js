import React from 'react'
import { useSelector } from 'react-redux'
import Leftbar from '../../Component/LeftsideContainer/Leftbar'
import MainPost from '../../Component/MainPostContainer/MainPost'
import Navbar from '../../Component/Navbar/Navbar'
import Rightbar from '../../Component/RightsideContainer/Rightbar'
import './Home.css'

function Home() {
  const userDetails = useSelector((state)=>state.user)
  let user = userDetails.user
  console.log(user)
  return (
    <div className='home'>
{/* Memunculkan Navbar */}
    <Navbar />
    <div className='ComponentContainer'>
{/* Memunculkan Leftbar yang ada di Component di LeftsideContainer
    Untuk memunculkan Notif serta Explore yang akan
    Muncul di bagian depan Home*/}
    <Leftbar />

    <MainPost />
    <Rightbar />
    </div>
    </div>
  )
}

export default Home