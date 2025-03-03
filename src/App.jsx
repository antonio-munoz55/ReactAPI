import { useMovies } from './hooks/useMovies'
import { MovieSearchForm } from './components/MovieSearchForm'
import { MoviesGrid } from './components/MoviesGrid'

function App() {
  const { movies, getMovies, loading, error } = useMovies()

  const handleSearch = (search, year, type) => {
    getMovies({ search, year, type })
  }

  return (
    <div className="bg-purple-900 min-h-screen text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Movies</h1>
        
        <MovieSearchForm onSearch={handleSearch} />
        
        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-center mt-4 text-red-400">{error}</p>}

        <MoviesGrid movies={movies} />
      </div>
    </div>
  )
}

export default App
