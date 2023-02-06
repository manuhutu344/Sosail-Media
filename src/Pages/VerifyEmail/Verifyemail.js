import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { VeriFyEmail } from '../../Component/ReduxContainer/apiCall';

export default function Verifyemail() {
  const dispatch = useDispatch();
  const [OTP , setOTP] = useState('');
  const user = useSelector((state)=>state.user);
  console.log(user)
  const userDetails = user.user;
  const id = userDetails?.user;
  console.log(id);
  console.log(userDetails)

  const handleOTP = (e)=>{
    e.preventDefault();
    VeriFyEmail(dispatch ,{OTP:OTP ,user:id});
  }
  
  return (
    <div style={{width:"100vw" , height:"100vh", display:'flex' , alignItems:"center" , justifyContent:"center"}}>
            <div style={{width:"25%" , padding:"20px" , margin:"auto" , borderRadius:"10px" , backgroundColor:"black"}}>
                <p style={{color:"white"}}>Verifikasi email anda</p>
                <form style={{display:"flex" , flexDirection:"column"}}>
                    <input type={"number"} placeholder="Masukan OTP anda" style={{flex:1 , minWidth:"40px" , margin:"10px 0px" , padding:"10px", borderRadius:"10px"}} onChange={(e)=> setOTP(e.target.value)}/>
                    <button style={{width:"40%" , border:"none" , padding:"10px 20px" , backgroundColor:"white" , color:"black" , borderRadius:"10px" , margin:"20px 0px" , cursor:"pointer"}} onClick={handleOTP}>Konfirmasi OTP Anda</button>
                    <Link to={"/register"}>
                       <p style={{ textDecoration:"none" , color:"white" , cursor:"pointer" , marginRight:"190px" , fontSize:"14px"}}>Check your email to get a OTP</p>
                    </Link>
         
                </form>
            </div>
        </div>
  )
}