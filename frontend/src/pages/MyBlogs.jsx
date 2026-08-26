import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { formatDate } from '../utils/formatDate'
import { fetchMyPosts, deletePost } from '../services/api'

const MyBlogs = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const data = await fetchMyPosts()
      setPosts(data)
    } catch (err) {
      setError('Failed to load your posts')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id)
        setPosts(posts.filter(post => post.id !== id))
      } catch (err) {
        console.error('Error deleting post:', err)
        alert('Failed to delete post')
      }
    }
  }

  if (loading) return <Loading />

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Blogs</h1>

      <ErrorMessage message={error} />

      {posts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 mb-4">You haven't created any blogs yet.</p>
          <Link
            to="/create"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Create Your First Blog
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-indigo-600 mb-2">{post.category_name || post.category}</p>
                  <p className="text-gray-500 text-sm">{formatDate(post.created_at)}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Link
                    to={`/edit/${post.id}`}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBlogs
