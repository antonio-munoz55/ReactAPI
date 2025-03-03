import { useState, useRef } from 'react'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
  Type: string
}

interface UseMoviesResult {
  movies: Movie[]
  getMovies: (params: { search: string; year?: string; type?: string }) => Promise<void>
  loading: boolean
  error: string | null
}

const API_KEY = 'df9f088d';

export function useMovies(): UseMoviesResult {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const lastSearchRef = useRef<{ search: string; year?: string; type?: string } | null>(null)

  async function getMovies({ search, year, type }: { search: string; year?: string; type?: string }) {
    if (
      lastSearchRef.current &&
      lastSearchRef.current.search === search &&
      lastSearchRef.current.year === year &&
      lastSearchRef.current.type === type
    ) {
      return
    }

    try {
      setLoading(true)
      setError(null)

      lastSearchRef.current = { search, year, type }

      const url = new URL('https://www.omdbapi.com/')
      url.searchParams.set('apikey', API_KEY)
      url.searchParams.set('s', search)
      if (year) url.searchParams.set('y', year)
      if (type) url.searchParams.set('type', type)

      const response = await fetch(url.toString())
      const data = await response.json()

      if (data.Response === 'False') {
        setError(data.Error || 'Unknown error')
        setMovies([])
      } else {
        setMovies(data.Search)
      }
    } catch (err: any) {
      setError(err.message)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  return { movies, getMovies, loading, error }
}
