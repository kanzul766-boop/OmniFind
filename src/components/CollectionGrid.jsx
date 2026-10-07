import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import CollectionCard from "../components/CollectionCard.jsx" 
import { clearCollection } from '../redux/features/collectionSlice'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const CollectionPage = () => {
  const items = useSelector(state => state.collection.items)
  const dispatch = useDispatch()

  const clear = () => {
    dispatch(clearCollection())
    toast.info('Collection cleared', { autoClose: 1500 })
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 animate-fade-up">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ember-500 font-bold mb-2">
              Your Vault
            </p>
            <h1 className="font-display text-5xl font-black text-teal-800">
              {items.length > 0 ? 'Saved Collection' : 'Empty Vault'}
            </h1>
            {items.length > 0 && (
              <p className="text-teal-700/60 mt-2">
                {items.length} {items.length === 1 ? 'item' : 'items'} saved
              </p>
            )}
          </div>

          {items.length > 0 && (
            <button onClick={clear} className="btn-teal text-sm">
              Clear All
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 glass-card animate-fade-up">
            <div className="text-7xl mb-6 animate-float inline-block">📦</div>
            <h2 className="font-display text-3xl font-bold text-teal-800 mb-3">
              Nothing saved yet
            </h2>
            <p className="text-teal-700/60 mb-8 max-w-sm mx-auto">
              Start exploring and tap the ♡ on any media to build your collection.
            </p>
            <Link to="/" className="btn-ember inline-block">
              Start Exploring
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {items.map((item, i) => (
              <div
                key={item.id || i}
                className="animate-fade-up"
                style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
              >
                <CollectionCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CollectionPage
