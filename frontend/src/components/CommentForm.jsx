import { useState } from 'react'
import { createComment } from '../services/api'
import { useAuth } from '../context/AuthContext'

const CommentForm = ({ postId, onCommentAdded }) => {
  const { user } = useAuth()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    if (!user) {
      alert('Please login to comment')
      return
    }

    setLoading(true)
    try {
      await createComment(postId, content)
      setContent('')
      onCommentAdded()
    } catch (error) {
      console.error('Error creating comment:', error)
      alert('Failed to create comment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Leave a Comment</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        rows="4"
        disabled={!user}
      />
      {!user && (
        <p className="text-sm text-gray-500 mt-2">
          Please <a href="/login" className="text-indigo-600 hover:underline">login</a> to comment
        </p>
      )}
      <button
        type="submit"
        disabled={!user || loading || !content.trim()}
        className="mt-3 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  )
}

export default CommentForm
