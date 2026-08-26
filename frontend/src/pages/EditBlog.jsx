import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BlogEditor from '../components/BlogEditor'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { fetchPostById, fetchCategories, updatePost } from '../services/api'

const EditBlog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadPost()
    loadCategories()
  }, [id])

  const loadPost = async () => {
    try {
      const data = await fetchPostById(id)
      setTitle(data.title)
      setContent(data.content)
      setExcerpt(data.excerpt || '')
      setCategoryId(data.category_id || '')
      setImageUrl(data.image_url || '')
    } catch (err) {
      setError('Failed to load post')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const data = await fetchCategories()
      setCategories(data)
    } catch (err) {
      console.error('Failed to load categories:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!title.trim() || !content.trim() || !categoryId) {
      setError('Please fill in all required fields')
      return
    }

    setSubmitting(true)

    try {
      await updatePost(id, {
        title,
        content,
        excerpt: excerpt || content.substring(0, 150),
        category_id: categoryId,
        image_url: imageUrl
      })
      navigate(`/blog/${id}`)
    } catch (err) {
      setError(err.message || 'Failed to update post')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Loading />

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Blog</h1>

      <ErrorMessage message={error} />

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Category *</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Featured Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows="2"
              placeholder="Brief description of your blog..."
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Content *</label>
            <BlogEditor content={content} setContent={setContent} />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {submitting ? 'Updating...' : 'Update Blog'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditBlog
