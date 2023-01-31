import axios from "axios";
import {loginStart, loginSuccess, loginFailure, logout} from './userReducer'

export const login = async(dispatch, user)=>{
    dispatch(loginStart())
    try {
        const res = await axios.post(`http://localhost:9000/user/login`, user)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const VeriFyEmail = async(dispatch, user)=>{
    dispatch(loginStart())
    try {
        const res = await axios.post(`http://localhost:9000/user/verify/email`, user)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const signup = async(dispatch, user)=>{
    dispatch(loginStart())
    try {
        const res = await axios.post(`http://localhost:9000/user/create/user`, user)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}