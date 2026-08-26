const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Helper function to get auth token
const getAuthHeader = () => {
  const token = localStorage.getItem('supabase_token')
  return token ? { 'Authorization': `Bearer ${token}` } : {}
}

// Posts API
export const fetchPosts = async (search = '', category = '') => {
  const params = new URLSearchParams()
  if (search) params.append('search', search)
  if (category) params.append('category', category)
  
  const response = await fetch(`${API_URL}/api/posts?${params}`)
  if (!response.ok) throw new Error('Failed to fetch posts')
  const json = await response.json()
  return json.data
}

export const fetchPostById = async (id) => {
  const response = await fetch(`${API_URL}/api/posts/${id}`)
  if (!response.ok) throw new Error('Failed to fetch post')
  const json = await response.json()
  return json.data
}

export const createPost = async (postData) => {
  const response = await fetch(`${API_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(postData)
  })
  if (!response.ok) throw new Error('Failed to create post')
  const json = await response.json()
  return json.data
}

export const updatePost = async (id, postData) => {
  const response = await fetch(`${API_URL}/api/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(postData)
  })
  if (!response.ok) throw new Error('Failed to update post')
  const json = await response.json()
  return json.data
}

export const deletePost = async (id) => {
  const response = await fetch(`${API_URL}/api/posts/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  })
  if (!response.ok) throw new Error('Failed to delete post')
  const json = await response.json()
  return json.data
}

export const fetchMyPosts = async () => {
  const response = await fetch(`${API_URL}/api/posts/my`, {
    headers: getAuthHeader()
  })
  if (!response.ok) throw new Error('Failed to fetch my posts')
  const json = await response.json()
  return json.data
}

// Comments API
export const fetchComments = async (postId) => {
  const response = await fetch(`${API_URL}/api/posts/${postId}/comments`)
  if (!response.ok) throw new Error('Failed to fetch comments')
  const json = await response.json()
  return json.data
}

export const createComment = async (postId, content) => {
  const response = await fetch(`${API_URL}/api/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify({ content })
  })
  if (!response.ok) throw new Error('Failed to create comment')
  const json = await response.json()
  return json.data
}

export const deleteComment = async (commentId) => {
  const response = await fetch(`${API_URL}/api/comments/${commentId}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  })
  if (!response.ok) throw new Error('Failed to delete comment')
  const json = await response.json()
  return json.data
}

// Categories API
export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/api/categories`)
  if (!response.ok) throw new Error('Failed to fetch categories')
  const json = await response.json()
  return json.data
}

// Profile API
export const fetchProfile = async () => {
  const response = await fetch(`${API_URL}/api/profile`, {
    headers: getAuthHeader()
  })
  if (!response.ok) throw new Error('Failed to fetch profile')
  const json = await response.json()
  return json.data
}

export const updateProfile = async (profileData) => {
  const response = await fetch(`${API_URL}/api/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(profileData)
  })
  if (!response.ok) throw new Error('Failed to update profile')
  const json = await response.json()
  return json.data
}
