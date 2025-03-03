import React from 'react'

export function MoviesGrid({ movies }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className="bg-white text-black rounded-md shadow-md overflow-hidden"
        >
          <div className="relative w-full bg-black text-white" style={{ paddingTop: '147%' }}>
            <img
              src={
                movie.Poster !== 'N/A'
                  ? movie.Poster
                  : 'https://via.placeholder.com/300x450?text=No+Image'
              }
              alt={movie.Title}
              className="absolute top-0 left-0 w-full h-full object-contain"
            />
          </div>

          <div className="p-4 text-center">
            <h3 className="font-semibold text-lg mb-1">{movie.Title}</h3>
            <p className="text-sm mb-1">{movie.Year}</p>
            <p className="text-xs text-gray-600">{movie.Type}</p>
          </div>
        </div>
      ))}
    </div>
  )
}