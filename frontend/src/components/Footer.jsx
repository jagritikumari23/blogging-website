const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">BlogSpace</p>
          <p className="text-gray-400">Discover & Share Ideas</p>
          <p className="text-gray-500 text-sm mt-4">
            © {new Date().getFullYear()} BlogSpace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
