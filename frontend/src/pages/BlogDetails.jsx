import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'
import { fetchPostById, fetchComments, deletePost } from '../services/api'
import { formatDate } from '../utils/formatDate'

const BlogDetails = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadPost()
    loadComments()
  }, [id])

  const loadPost = async () => {
    try {
      const data = await fetchPostById(id)
      setPost(data)
    } catch (err) {
      setError('Failed to load post')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const loadComments = async () => {
    try {
      const data = await fetchComments(id)
      setComments(data)
    } catch (err) {
      console.error('Failed to load comments:', err)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id)
        window.location.href = '/my-blogs'
      } catch (err) {
        console.error('Error deleting post:', err)
        alert('Failed to delete post')
      }
    }
  }

  const handleCommentAdded = () => {
    loadComments()
  }

  const handleCommentDeleted = () => {
    loadComments()
  }

  if (loading) return <Loading />

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ErrorMessage message="Post not found" />
        <Link to="/" className="text-indigo-600 hover:underline">Back to Home</Link>
      </div>
    )
  }

  const isAuthor = user && user.id === post.author_id

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ErrorMessage message={error} />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-indigo-600 font-semibold">
              {post.category_name || post.category}
            </span>
            {isAuthor && (
              <div className="space-x-2">
                <Link
                  to={`/edit/${post.id}`}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

          <div className="flex items-center text-gray-600 mb-6">
            <span className="mr-4">By {post.author_name || post.author}</span>
            <span>{formatDate(post.created_at)}</span>
          </div>

          <div
            className="prose max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <hr className="my-8" />

          <h2 className="text-2xl font-bold mb-4">Comments ({comments.length})</h2>

          <CommentForm postId={id} onCommentAdded={handleCommentAdded} />

          <div className="mt-6">
            {comments.length === 0 ? (
              <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onDelete={handleCommentDeleted}
                  postAuthorId={post.author_id}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails
