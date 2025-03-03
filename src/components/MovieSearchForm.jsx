import { useState } from 'react'

export function MovieSearchForm({ onSearch }) {
  const [search, setSearch] = useState('')
  const [year, setYear] = useState('')
  const [type, setType] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(search.trim(), year.trim(), type.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mb-8 items-center max-w-sm mx-auto">
      <div>
        <label htmlFor="search" className="block mb-1 text-white font-semibold">Title: </label>
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Ex: The Last Samurai"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-purple-400 bg-white text-black"
        />
      </div>

      <div>
        <label htmlFor="year" className="block mb-1 text-white font-semibold">Year: </label>
        <input
          id="year"
          name="year"
          type="number"
          placeholder="Ex: 2012"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-purple-400 bg-white text-black"
        />
      </div>

      <div>
        <label htmlFor="type" className="block mb-1 text-white font-semibold">Type: </label>
        <select
          id="type"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-purple-400 bg-white text-black"
        >
          <option value="">Any</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
          <option value="game">Game</option>
        </select>
      </div>

      <button type="submit"
      disabled={!search}
      className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-md">Search</button>
    </form>
  )
}
