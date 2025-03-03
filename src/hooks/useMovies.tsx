import { useState } from 'react'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
  Type: string
}

interface UseMoviesResult {
  movies: Movie[]
  getMovies: (params: { search: string; year?: string; type?: string }) => void
  loading: boolean
  error: string | null
}

const API_KEY = 'df9f088d'

export function useMovies(): UseMoviesResult {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [lastSearch, setLastSearch] = useState<{ search: string; year?: string; type?: string } | null>(null)

  function getMovies({ search, year, type }: { search: string; year?: string; type?: string }) {

    if (
      lastSearch &&
      lastSearch.search === search &&
      lastSearch.year === year &&
      lastSearch.type === type
    ) {
      return
    }

    setLoading(true)
    setError(null)
    setLastSearch({ search, year, type })

    const url = new URL('https://www.omdbapi.com/')
    url.searchParams.set('apikey', API_KEY)
    url.searchParams.set('s', search)
    if (year) url.searchParams.set('y', year)
    if (type) url.searchParams.set('type', type)

    fetch(url.toString())
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'False') {
          setError(data.Error || 'Unknown error')
          setMovies([])
        } else {
          setMovies(data.Search)
        }
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setMovies([])
        setLoading(false)
      })
  }

  return { movies, getMovies, loading, error }
}