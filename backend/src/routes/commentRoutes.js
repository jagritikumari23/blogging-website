import express from 'express'
import {
  getCommentsByPostId,
  createComment,
  deleteComment
} from '../controllers/commentController.js'
import { authenticate } from '../middleware/authMiddleware.js'
import { validateComment } from '../middleware/validationMiddleware.js'

const router = express.Router()

router.get('/posts/:postId/comments', getCommentsByPostId)
router.post('/posts/:postId/comments', authenticate, validateComment, createComment)
router.delete('/comments/:id', authenticate, deleteComment)

export default router
