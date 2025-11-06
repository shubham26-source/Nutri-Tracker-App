import { useState, useEffect } from 'react'
import axios from 'axios'

function FoodLog({ token }) {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    try {
      const response = await axios.get('/api/food/logs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setLogs(response.data.logs)
    } catch (error) {
      console.error('Error fetching logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (log) => {
    return `${log.month}/${log.day}/${log.year} at ${log.hour.toString().padStart(2, '0')}:${log.minute.toString().padStart(2, '0')}`
  }

  const getTotals = () => {
    return logs.reduce(
      (acc, log) => ({
        calories: acc.calories + log.calories,
        protein: acc.protein + log.protein,
        carbs: acc.carbs + log.carbs,
        fat: acc.fat + log.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    )
  }

  const totals = getTotals()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">My Food Log</h1>

        {logs.length > 0 && (
          <div className="mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Daily Totals</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm opacity-90">Calories</div>
                <div className="text-3xl font-bold">{totals.calories.toFixed(0)}</div>
              </div>
              <div>
                <div className="text-sm opacity-90">Protein</div>
                <div className="text-3xl font-bold">{totals.protein.toFixed(1)}g</div>
              </div>
              <div>
                <div className="text-sm opacity-90">Carbs</div>
                <div className="text-3xl font-bold">{totals.carbs.toFixed(1)}g</div>
              </div>
              <div>
                <div className="text-sm opacity-90">Fat</div>
                <div className="text-3xl font-bold">{totals.fat.toFixed(1)}g</div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : logs.length === 0 ? (
          <p className="text-center text-gray-600">
            No foods logged yet. Start searching and adding foods!
          </p>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{log.food_name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{formatDate(log)}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Calories:</span>
                        <span className="ml-1 font-semibold">{log.calories.toFixed(1)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Protein:</span>
                        <span className="ml-1 font-semibold">{log.protein.toFixed(1)}g</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Carbs:</span>
                        <span className="ml-1 font-semibold">{log.carbs.toFixed(1)}g</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Fat:</span>
                        <span className="ml-1 font-semibold">{log.fat.toFixed(1)}g</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodLog
