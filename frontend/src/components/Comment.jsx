import { formatDate } from '../utils/formatDate'
import { useAuth } from '../context/AuthContext'
import { deleteComment } from '../services/api'

const Comment = ({ comment, onDelete, postAuthorId }) => {
  const { user } = useAuth()

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteComment(comment.id)
        onDelete()
      } catch (error) {
        console.error('Error deleting comment:', error)
        alert('Failed to delete comment')
      }
    }
  }

  const canDelete = user && (user.id === comment.user_id || user.id === postAuthorId)

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
            {comment.user_name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{comment.user_name || 'Anonymous'}</p>
            <p className="text-sm text-gray-500">{formatDate(comment.created_at)}</p>
          </div>
        </div>
        {canDelete && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Delete
          </button>
        )}
      </div>
      <p className="text-gray-700">{comment.content}</p>
    </div>
  )
}

export default Comment
