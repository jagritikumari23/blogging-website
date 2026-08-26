import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, signOut } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              BLOGSPACE
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
                  Home
                </Link>
                <Link to="/create" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
                  Create Blog
                </Link>
                <Link to="/my-blogs" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
                  My Blogs
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
                  Home
                </Link>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
