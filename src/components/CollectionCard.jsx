import React from 'react'
import { useDispatch } from 'react-redux'
import { removeCollection } from '../redux/features/collectionSlice'
import { toast } from 'react-toastify'

const CollectionCard = ({ item }) => {
  const dispatch = useDispatch()

  if (!item) return null

  const handleRemove = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(removeCollection(item.id))
    toast.info('Removed from collection', { autoClose: 1500 })
  }

  return (
    <div className="group relative rounded-2xl overflow-hidden
                    bg-teal-800 shadow-lg hover:shadow-2xl
                    transition-all duration-500 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        {item?.type === 'photo' && (
          <img src={item.thumbnail} alt={item.title || 'Photo'}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        )}
        {item?.type === 'video' && (
          <video autoPlay muted loop playsInline poster={item.thumbnail}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
            <source src={item.src} />
          </video>
        )}
        {item?.type === 'gif' && (
          <img src={item.thumbnail} alt={item.title || 'GIF'}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        )}

      <div className="absolute inset-0 bg-gradient-to-t
                        from-teal-900/90 via-transparent to-transparent" />

        <button
          onClick={handleRemove}
          aria-label="Remove"
          className="absolute top-3 right-3 w-9 h-9 rounded-full
                     bg-red-500 text-white text-xl font-bold
                     flex items-center justify-center shadow-md
                     hover:bg-red-600 transition-all duration-300
                     active:scale-90 cursor-pointer z-10"
        >
          ×
        </button>

        {item?.type && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full
                          bg-cream-100/90 backdrop-blur text-teal-800
                          text-[10px] font-bold uppercase tracking-wider">
            {item.type}
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-cream-100 font-medium text-sm line-clamp-2">
            {item.title || 'Untitled Item'}
          </p>
          {item?.url && (
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
          )}
        </div>
      </div>
    </div>
  )
}

export default CollectionCard
