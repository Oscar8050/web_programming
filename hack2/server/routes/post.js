import express from 'express'
import Post from '../models/post'
import moment from 'moment'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts', async (req, res) => {
    console.log('request')
    //let allPost = ["first", "second"]
    //res.json({allPost})
    try {
        let allPost = await Post.find()
        //console.log(allPost)

        allPost.sort((a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp)
        })
        //console.log(allPost)

        res.json({message: "success", data: allPost})
    } catch (e) {
        res.json({message: "error", data: null})
    }

})

// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/postDetail', async (req, res) => {
    try {
        //console.log(req.query.pid)
        let postId = req.query.pid
        let info = await Post.find({postId})
        //console.log(info)
        res.json({message: "success", post: info[0]})
    } catch (e) {
        res.json({message: "error", post: null})
    }

})

// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost', async (req, res) => {
    //console.log(req.body)
    let data = req.body
    console.log(data.postId)
    let postId = data.postId
    let title = data.title
    let content = data.content
    let timestamp = data.timestamp
    try {
        const newPost = new Post({postId, title, content, timestamp})
        console.log(newPost)
        newPost.save();
        res.json({message: "success"})
    } catch (e) {
        res.json( {message: "error", post: null})
    }

})

// TODO 5-(1): create the 4th API (/api/post)

export default router