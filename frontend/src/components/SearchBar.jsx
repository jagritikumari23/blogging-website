const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="max-w-2xl mx-auto mb-8">
      <input
        type="text"
        placeholder="Search blogs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  )
}

export default SearchBar
