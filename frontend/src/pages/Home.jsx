import { useState, useEffect } from 'react'
import BlogCard from '../components/BlogCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { fetchPosts, fetchCategories } from '../services/api'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    loadPosts()
    loadCategories()
  }, [searchQuery, selectedCategory])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const data = await fetchPosts(searchQuery, selectedCategory)
      setPosts(Array.isArray(data) ? data : [])
      setError('')
    } catch (err) {
      setError('Failed to load posts. Please try again.')
      setPosts([])
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

  if (loading) return <Loading />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover & Share Ideas</h1>
        <p className="text-gray-600">Read, write, and connect with the community</p>
      </div>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <ErrorMessage message={error} />

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} blog={post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
