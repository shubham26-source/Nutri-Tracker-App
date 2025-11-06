import { useState } from 'react'
import axios from 'axios'

function FoodSearch({ token }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    setMessage('')

    try {
      const response = await axios.get(`/api/food/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchResults(response.data.foods)
      if (response.data.foods.length === 0) {
        setMessage('No foods found. Try a different search term.')
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error searching for food. Please try again.')
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToLog = async (food) => {
    try {
      await axios.post(
        '/api/food/log',
        {
          food_name: food.name,
          calories: food.calories,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setMessage(`Successfully logged ${food.name}!`)
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Error adding food to log. Please try again.')
      console.error('Log error:', error)
    }
  }

  const popularSearches = ['Apple', 'Banana', 'Chicken', 'Rice', 'Broccoli', 'Salmon']

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Search Food</h1>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter food name (e.g., banana, chicken breast, quinoa)"
              className="flex-1 px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {message && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              message.includes('Success')
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            {message}
          </div>
        )}

        <div className="mb-8">
          <p className="text-gray-600 mb-2 text-center">Popular searches:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {popularSearches.map((food) => (
              <button
                key={food}
                onClick={() => {
                  setSearchQuery(food)
                  handleSearch({ preventDefault: () => {} })
                }}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm"
              >
                {food}
              </button>
            ))}
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Search Results</h2>
            {searchResults.map((food) => (
              <div
                key={food.id}
                className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{food.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">Per {food.serving_size}g serving</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Calories:</span>
                        <span className="ml-1 font-semibold">{Math.round(food.calories)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Protein:</span>
                        <span className="ml-1 font-semibold">{food.protein.toFixed(1)}g</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Carbs:</span>
                        <span className="ml-1 font-semibold">{food.carbs.toFixed(1)}g</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Fat:</span>
                        <span className="ml-1 font-semibold">{food.fat.toFixed(1)}g</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddToLog(food)}
                    className="ml-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold whitespace-nowrap"
                  >
                    + Add to Log
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodSearch
