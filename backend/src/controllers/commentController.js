import { supabase } from '../config/supabase.js'
import { successResponse, errorResponse, createdResponse } from '../utils/response.js'

export const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params

    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        profiles:user_id (full_name)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true })

    if (error) throw error

    const comments = data.map(comment => ({
      ...comment,
      user_name: comment.profiles?.full_name
    }))

    successResponse(res, comments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    errorResponse(res, 'Failed to fetch comments', 500)
  }
}

export const createComment = async (req, res) => {
  try {
    const { postId } = req.params
    const userId = req.user.id
    const { content } = req.body

    // Check if post exists
    const { data: post } = await supabase
      .from('posts')
      .select('id')
      .eq('id', postId)
      .single()

    if (!post) {
      return errorResponse(res, 'Post not found', 404)
    }

    // Check if profile exists
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single()

    if (!profile) {
      await supabase.from('profiles').insert({
        id: userId,
        email: req.user.email,
        full_name: req.user.user_metadata?.full_name || ''
      })
    }

    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        user_id: userId,
        content
      })
      .select(`
        *,
        profiles:user_id (full_name)
      `)
      .single()

    if (error) throw error

    const comment = {
      ...data,
      user_name: data.profiles?.full_name
    }

    createdResponse(res, comment, 'Comment created successfully')
  } catch (error) {
    console.error('Error creating comment:', error)
    errorResponse(res, 'Failed to create comment', 500)
  }
}

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    // Check if user owns the comment
    const { data: existingComment } = await supabase
      .from('comments')
      .select('user_id, posts (author_id)')
      .eq('id', id)
      .single()

    if (!existingComment) {
      return errorResponse(res, 'Comment not found', 404)
    }

    // Allow deletion if user is comment author or post author
    if (existingComment.user_id !== userId && existingComment.posts?.author_id !== userId) {
      return errorResponse(res, 'You can only delete your own comments', 403)
    }

    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)

    if (error) throw error

    successResponse(res, null, 'Comment deleted successfully')
  } catch (error) {
    console.error('Error deleting comment:', error)
    errorResponse(res, 'Failed to delete comment', 500)
  }
}
