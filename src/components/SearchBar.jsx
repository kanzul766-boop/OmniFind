import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setQuery } from '../redux/features/searchSlice'

const SearchBar = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  function submitHandler(e) {
    e.preventDefault()
    if (!text.trim()) return
    dispatch(setQuery(text))
    setText('')
  }

  return (
    <section className="relative px-6 pt-12 pb-6">
      <div className="max-w-5xl mx-auto text-center">

        <div className="mb-8 animate-fade-up">
          <h2 className="font-display text-5xl md:text-6xl font-black text-teal-800 leading-[1.05] mb-3">
           Omni <span className="text-ember-400 italic">Find</span> 
          </h2>
          <p className="text-ember-400 text-lg max-w-xl mx-auto">
            Search photos, videos & GIFs — save what moves you.
          </p>
        </div>

        <form
          onSubmit={submitHandler}
          className="glass-card max-w-3xl mx-auto flex items-center gap-2 p-2 animate-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="pl-4 text-ember-500 text-xl">🔍</div>
          <input
            type="text"
            placeholder="Try 'mountains', 'ocean', 'city lights'..."
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 bg-transparent px-3 py-3 text-lg text-teal-800
                       placeholder:text-teal-700/40 outline-none font-medium"
          />
          <button type="submit" className="text-ember-400 hover:text-ember-400 text-sm p-5 bg-ember-300/10 rounded-full transition-all duration-300 hover:scale-105 active:scale-95">
            Search
          </button>
        </form>

      </div>
    </section>
  )
}

export default SearchBar
