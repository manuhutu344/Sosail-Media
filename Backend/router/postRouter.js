const router = require('express').Router()
const Post = require('../Models/Post')
const { verifytoken } = require('./verifytoken')
const User = require('../Models/User')

router.post('/user/post', verifytoken, async(req, res)=>{
    try {
    let {title, image, video } = req.body
    let newpost = new Post({
        title, image, video, user:req.user.id
    })
    const post = await newpost.save()
    res.status(200).json(post)
} catch (error) {
    return res.status(500).json('errornya di internal postRouter.js')
}
})

router.get('/get/post/:id', async(req, res)=>{
    try {
        const mypost = await Post.find({user:req.params.id})
        if(!mypost){
            return res.status(400).json('Kamu tidak memiliki postingan apapun')
        }
        res.status(200).json(mypost)
    } catch (error) {
        res.status(500).json('error internal postrouter di get postnya')
    }
})

router.put('/update/post/:id', verifytoken, async(req, res)=>{
    try {
        let post = await Post.findById(req.params.id)
        if(!post){
            return res.status(400).json('post tidak ditemukan')
        }
        post = await Post.findByIdAndUpdate(req.params.id, {
            $set:req.body
        })
        let updatepost = await post.save()
        res.status(200).json(updatepost)
    } catch (error) {
        return res.status(500).json('Terjadi Error di postrouter bagian update post')
    }
})

router.put('/:id/like', verifytoken,async(req, res)=>{
    try {
    const post = await Post.findById(req.params.id)
    if(!post.like.includes(req.body.user)){
        if(post.dislike.includes(req.user.id)){
            await post.updateOne({$pull:{dislike:req.user.id}})
        }
        await post.updateOne({$push:{like:req.user.id}})
        return res.status(200).json('Post telah di like')
    }else{
        await post.updateOne({$pull:{like:req.user.id}})
        return res.status(200).json('Post anda telah di unlike')
    }
} catch (error) {
    return res.status(500).json('error internal di id like') 
}
})

router.put('/:id/dislike', verifytoken,async(req, res)=>{
    try {
    const post = await Post.findById(req.params.id)
    if(!post.dislike.includes(req.user.id)){
        if(post.like.includes(req.user.id)){
            await post.updateOne({$pull:{like:req.user.id}})
        }
        await post.updateOne({$push:{dislike:req.user.id}})
        return res.status(200).json('Post anda telah di dislike')
    }else{
        await post.updateOne({$pull:{dislike:req.user.id}})
        return res.status(200).json('Post anda telah di undislike')
    }
} catch (error) {
    return res.status(500).json('error internal di id dislike')
}
})

router.put('/comment/post', verifytoken, async(req, res)=>{
    try {
        const {comment, postid, profile} = req.body
        const comments={
            user:req.user.id,
            username:req.user.username,
            comment,
            profile
        }
        const post = await Post.findById(postid)
        post.comments.push(comments)
        await post.save()
        res.status(200).json(post)
    } catch (error) {
        return res.status(500).json('error internal di id comment')
    }
})

router.delete('/delete/post/:id' , verifytoken, async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.user === req.user.id){
            const deletepost = await Post.findByIdAndDelete(req.params.id)
            return res.status(200).json('Postingan anda telah di hapus')
        }else{
            return res.status(400).json('Anda tidak di izinkan untuk menghapus postingan ini')
        }
    } catch (error) {
        return res.status(500).json('Error di delete post id')
    }
})

router.get('/following/:id', async(req, res)=>{
    try {
        const user = await User.findById(req.params.id)
        const followinguser = await Promise.all(
            user.Following.map((item)=>{
                return User.findById(item)
            })
        )
        let followingList=[]
        followinguser.map((person)=>{
            const {email, password, phonenumber, Following, Followers, ...others} = person._doc
            followingList.push(others)
        })
        res.status(200).json(followingList)
    } catch (error) {
        return res.status(500).json('Eror di get following id')
    }
})

router.get('/followers/:id', async(req, res)=>{
    try {
        const user = await User.findById(req.params.id)
        const followersuser = await Promise.all(
            user.Followers.map((item)=>{
                return User.findById(item)
            })
        )
        let followerList=[]
        followersuser.map((person)=>{
            const {email, password, phonenumber, Following, Followers, ...others} = person._doc
            followerList.push(others)
        })
        res.status(200).json(followerList)
    } catch (error) {
        return res.status(500).json('Eror di get following id')
    }
})

module.exports = router