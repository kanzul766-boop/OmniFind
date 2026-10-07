import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCollection } from '../redux/features/collectionSlice'
import { toast } from 'react-toastify'

const ResultCard = ({ item }) => {
  const dispatch = useDispatch()
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addCollection(item))
    setSaved(true)
    toast.success('Saved to your collection ✦', { autoClose: 1800 })
  }

  return (
    <div className="group relative rounded-2xl overflow-hidden
                    bg-teal-800 shadow-lg shadow-teal-800/10
                    hover:shadow-2xl hover:shadow-ember-500/20
                    transition-all duration-500 hover:-translate-y-1.5">

      <div className="relative aspect-square overflow-hidden">
        {item.type === 'photo' && (
          <img
            src={item.thumbnail}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover
                       group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        )}
        {item.type === 'video' && (
          <video
            autoPlay muted loop playsInline
            poster={item.thumbnail}
            className="w-full h-full object-cover
                       group-hover:scale-110 transition-transform duration-700"
          >
            <source src={item.src} />
          </video>
        )}
        {item.type === 'gif' && (
          <img
            src={item.thumbnail}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover
                       group-hover:scale-110 transition-transform duration-700"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t
                        from-teal-900/90 via-teal-900/20 to-transparent
                        opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full
                        bg-cream-100/90 backdrop-blur text-teal-800
                        text-[10px] font-bold uppercase tracking-wider">
          {item.type}
        </div>

        <button
          onClick={handleSave}
          disabled={saved}
          aria-label="Save"
          className={`absolute top-3 right-3 w-10 h-10 rounded-full
                      flex items-center justify-center text-lg
                      backdrop-blur transition-all duration-300
                      active:scale-90
            ${saved
              ? 'bg-ember-500 text-cream-100 shadow-lg shadow-ember-500/50'
              : 'bg-cream-100/80 text-teal-800 hover:bg-ember-500 hover:text-cream-100'
            }`}
        >
          {saved ? '♥' : '♡'}
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4
                        translate-y-2 group-hover:translate-y-0
                        transition-transform duration-500">
          <p className="text-cream-100 font-medium text-sm line-clamp-2
                        leading-snug drop-shadow">
            {item.title}
          </p>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-2 text-[11px] uppercase tracking-wider
                       text-gold-500 font-bold hover:text-ember-400
                       transition-colors"
          >
            View source →
          </a>
        </div>
      </div>
    </div>
  )
}

export default ResultCard