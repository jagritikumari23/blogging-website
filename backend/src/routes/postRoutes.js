import express from 'express'
import {
  getAllPosts,
  getPostById,
  getMyPosts,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController.js'
import { authenticate } from '../middleware/authMiddleware.js'
import { validatePost } from '../middleware/validationMiddleware.js'

const router = express.Router()

router.get('/', getAllPosts)
router.get('/my', authenticate, getMyPosts)
router.get('/:id', getPostById)
router.post('/', authenticate, validatePost, createPost)
router.put('/:id', authenticate, validatePost, updatePost)
router.delete('/:id', authenticate, deletePost)

export default router
