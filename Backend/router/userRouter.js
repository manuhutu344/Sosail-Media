const router = require('express').Router()
const User = require('../Models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { verifytoken } = require('./verifytoken')
const Post = require('../Models/Post')
const { generateOTP } = require('./Extra/mail')
const VerificationToken = require('../Models/VerificationToken')
const JWTSEC = '#2@!@$ndja45883 r7##'
const nodemailer = require('nodemailer')

router.post('/create/user',
body('email').isEmail(),
body('password').isLength({ min: 6 }), 
body('username').isLength({ min: 3 }),
body('phonenumber').isLength({ min: 10 }),
 async(req, res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json(error)
    }
    
    let user = await User.findOne({email:req.body.email})
    if(user){
        return res.status(200).json('User ini telah tersedia')
    }
    const salt = await bcrypt.genSalt(10)
    const secpass = await bcrypt.hash(req.body.password, salt)

    user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: secpass,
        profile: req.body.profile,
        phonenumber: req.body.phonenumber
    })
    const accessToken = jwt.sign({
        id:user._id,
        username:user.username
    }, JWTSEC)
    const OTP = generateOTP()
    const verificationToken = await VerificationToken.create({
        user:user._id,
        token:OTP
    })
    verificationToken.save()
    await user.save()
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS
        }
      });
      transport.sendMail({
        from:'SosialMediaAjah@gmail.com',
        to:user.email,
        subject:'Verifikasi email anda dengan OTP',
        html:`<h1>Your OTP CODE ${OTP}</h1>`
      })
    res.status(200).json({Status:'Pending' ,msg:'Tolong Cek Email Anda', user:user._id})
})

router.post('/login',
body('email').isEmail(),
body('password').isLength({ min: 6 }), 

async(req, res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json('Error')
    }
    try {
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json('User Tidak Di Temukan')
    }
    const Comparepassword = await bcrypt.compare(req.body.password, user.password)
    if(!Comparepassword){
        return res.status(400).json('password salah')
    }
    const accessToken = jwt.sign({
        id:user._id,
        username:user.username
    }, JWTSEC)
    const {password, ...other} = user._doc
    res.status(200).json({other, accessToken})
} catch (error) {
    res.status(500).json('error')
}
})

router.put('/following/:id', verifytoken,async(req, res)=>{
    if(req.params.id !== req.body.user){
        const user = await User.findById(req.params.id)
        const otheruser = await User.findById(req.body.user)

        if(!user.Followers.includes(req.body.user)){
            await user.updateOne({$push:{Followers: req.body.user}})
            await otheruser.updateOne({$push:{Following:req.params.id}})
            return res.status(200).json('Telah di Follow')
        }else{
            await user.updateOne({$pull:{Followers: req.body.user}})
            await otheruser.updateOne({$pull:{Following:req.params.id}})
            return res.status(200).json('Telah di unFollow')
        }
    }else{
        return res.status(400).json('Tidak bisa mengikuti diri sendiri')
    }
})

router.get('/flw/:id', verifytoken, async(req, res)=>{
    try {
        const user = await User.findById(req.params.id)
        const followersPost = await Promise.all(
            user.Following.map((item)=>{
                return Post.find({user:item})
            })
        )
        const userPost = await Post.find({user:user._id})
        res.status(200).json(userPost.concat(...followersPost))
    } catch (error) {
        return res.status(500).json('error di internal get flw id')
    }
})

router.put('/update/:id', verifytoken, async(req, res)=>{
    try {
        if(req.params.id === req.user.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            const secpass = await bcrypt.hash(req.body.password, salt)
            req.body.password = secpass
            const updateuser = await User.findByIdAndUpdate(req.params.id, {
                $set:req.body
            })
            await updateuser.save()
            res.status(200).json(updateuser)
        }
    }else{
        return res.status(400).json('Tak bisa mengupdate user ini')
    }
    } catch (error) {
        return res.status(500).json('Error internal di update id')
    }
})

router.delete('/delete/:id', verifytoken, async(req, res)=>{
    try {
        if(req.params.id !== req.user.id){
            return res.status(400).json('Akun tidak cocok')
        }else{
            await User.findByIdAndDelete(req.params.id)
            return res.status(200).json('Akun berhasil di hapus')
        }
    } catch (error) {
        return res.status(500).json('Error di delete id')
    }
})

router.get('/post/user/details/:id', async(req, res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(400).json('Usernya tidak di temukan')
        }
        const {email, password, phonenumber, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        return res.status(500).json('Error di post user details id')
    }
})

router.get('/all/user/:id', async(req, res)=>{
    try {
        const allUser = await User.find()
        const user = await User.findById(req.params.id)
        const followinguser = await Promise.all(
            user.Following.map((item)=>{
                return item
            })
        )
        let UserToFollow = allUser.filter((val)=>{
            return !followinguser.find((item)=>{
                return val._id.toString()===item
            })
        })
        let fillteruser = await Promise.all(
            UserToFollow.map((item)=>{
                const {email, phonenumber, Followers, Following, password,...others} = item._doc
                return others
            })
        )
        res.status(200).json(fillteruser)
    } catch (error) {
        
    }
})

module.exports = router