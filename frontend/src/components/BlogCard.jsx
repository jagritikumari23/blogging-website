import { Link } from 'react-router-dom'
import { formatDate } from '../utils/formatDate'

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {blog.image_url && (
        <img
          src={blog.image_url}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-indigo-600 font-semibold">
            {blog.category_name || blog.category}
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(blog.created_at)}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {blog.excerpt || blog.content?.substring(0, 150) + '...'}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            By {blog.author_name || blog.author}
          </span>
          <Link
            to={`/blog/${blog.id}`}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
