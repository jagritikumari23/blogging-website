import { supabase } from '../config/supabase.js'
import { successResponse, errorResponse, createdResponse } from '../utils/response.js'

export const getAllPosts = async (req, res) => {
  try {
    const { search, category } = req.query

    let query = supabase
      .from('posts')
      .select(`
        *,
        profiles:author_id (full_name),
        categories:category_id (name)
      `)
      .order('created_at', { ascending: false })

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%,excerpt.ilike.%${search}%`)
    }

    if (category) {
      query = query.eq('categories.name', category)
    }

    const { data, error } = await query

    if (error) throw error

    const posts = data.map(post => ({
      ...post,
      author_name: post.profiles?.full_name,
      category_name: post.categories?.name
    }))

    successResponse(res, posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    errorResponse(res, 'Failed to fetch posts', 500)
  }
}

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:author_id (full_name),
        categories:category_id (name)
      `)
      .eq('id', id)
      .single()

    if (error) throw error

    const post = {
      ...data,
      author_name: data.profiles?.full_name,
      category_name: data.categories?.name
    }

    successResponse(res, post)
  } catch (error) {
    console.error('Error fetching post:', error)
    errorResponse(res, 'Post not found', 404)
  }
}

export const getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id

    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        categories:category_id (name)
      `)
      .eq('author_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    const posts = data.map(post => ({
      ...post,
      category_name: post.categories?.name
    }))

    successResponse(res, posts)
  } catch (error) {
    console.error('Error fetching my posts:', error)
    errorResponse(res, 'Failed to fetch posts', 500)
  }
}

export const createPost = async (req, res) => {
  try {
    const userId = req.user.id
    const { title, content, excerpt, category_id, image_url } = req.body

    // Check if profile exists, if not create it
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
      .from('posts')
      .insert({
        author_id: userId,
        title,
        content,
        excerpt: excerpt || content.substring(0, 150),
        category_id,
        image_url
      })
      .select()
      .single()

    if (error) throw error

    createdResponse(res, data, 'Post created successfully')
  } catch (error) {
    console.error('Error creating post:', error)
    errorResponse(res, 'Failed to create post', 500)
  }
}

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id
    const { title, content, excerpt, category_id, image_url } = req.body

    // Check if user owns the post
    const { data: existingPost } = await supabase
      .from('posts')
      .select('author_id')
      .eq('id', id)
      .single()

    if (!existingPost) {
      return errorResponse(res, 'Post not found', 404)
    }

    if (existingPost.author_id !== userId) {
      return errorResponse(res, 'You can only edit your own posts', 403)
    }

    const { data, error } = await supabase
      .from('posts')
      .update({
        title,
        content,
        excerpt: excerpt || content.substring(0, 150),
        category_id,
        image_url,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    successResponse(res, data, 'Post updated successfully')
  } catch (error) {
    console.error('Error updating post:', error)
    errorResponse(res, 'Failed to update post', 500)
  }
}

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    // Check if user owns the post
    const { data: existingPost } = await supabase
      .from('posts')
      .select('author_id')
      .eq('id', id)
      .single()

    if (!existingPost) {
      return errorResponse(res, 'Post not found', 404)
    }

    if (existingPost.author_id !== userId) {
      return errorResponse(res, 'You can only delete your own posts', 403)
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) throw error

    successResponse(res, null, 'Post deleted successfully')
  } catch (error) {
    console.error('Error deleting post:', error)
    errorResponse(res, 'Failed to delete post', 500)
  }
}
