import Post from './Post.js'
import PostService from './PostService.js'

class PostController {
    async create(req, res) {
        try {
            const {author, title, content} = req.body
            const {picture} = req.files

            const post = await PostService.create({author, title, content}, picture)
        
            res.status(201).json(post)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getAll(req, res) {
        try {
            const posts = await PostService.getAll()
            res.json(posts)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params
            const post = await PostService.getOne(id)
            res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try {
            const post = req.body

            if(!post._id) {
                res.status(400).json({message: 'No ID!'})
            }

            const updatedPost = await PostService.update(post)

            res.json(updatedPost)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params

            if(!id) {
                res.status(400).json({message: 'No ID!'})
            }

            const post = await PostService.delete(id)

            res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new PostController()