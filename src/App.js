import './App.css';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import {Routes, BrowserRouter, Route, Navigate} from 'react-router-dom'
import Login from './Pages/Login/Login';
import Signup from './Pages/Register/Signup';
import Verifyemail from './Pages/VerifyEmail/Verifyemail'
import { useSelector } from 'react-redux';

function App() {
  const userDetails = useSelector((state)=>state.user)
  let user = userDetails?.user
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path='/' element={user?.other?.verifed === true ? <Home /> :  <Navigate to={"/login"} replace={true}/>}></Route>
    <Route path='/profil/:id' element={<Profile />}></Route>
    <Route path='/login' element={ user?.other?.verifed === true? <Navigate to={"/"} replace={true}/> : <Login />}></Route>
    <Route path='/signup' element={  <Signup />}></Route>
    <Route path="/verify/email" element={user?.Status === 'Pending' ? <Verifyemail/> : user?.other?.verifed === true ? <Navigate to={"/"} replace={true}/> : <Login/>}></Route>
    </Routes>
    </BrowserRouter>
{/* Memunculkan Home yang berisi leftbar, rightbar, dan mainpost */}
    </div>
  );
}

export default App;
