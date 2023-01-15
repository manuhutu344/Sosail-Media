const express = require ('express')
const app = express()
require('dotenv').config()
require('./connection')
const userRouter = require('./router/userRouter')
const postRouter = require('./router/postRouter')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/user', userRouter)
app.use('/post', postRouter)

app.listen(9000, ()=>{
    console.log('Terkoneksi Ke Server')
})