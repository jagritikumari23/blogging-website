const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      <button
        onClick={() => setSelectedCategory('')}
        className={`px-4 py-2 rounded-full ${
          selectedCategory === ''
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.name)}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === category.name
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
