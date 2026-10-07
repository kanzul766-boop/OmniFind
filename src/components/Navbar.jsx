import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const location = useLocation()
  const collectionCount = useSelector(state => state.collection.items.length)

  const links = [
    { to: '/', label: 'Discover', icon: '✦' },
    { to: '/collection', label: 'Collection', icon: '♡' },
  ]

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-cream-200/80 border-b border-teal-800/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ember-500 to-teal-700
                          flex items-center justify-center text-cream-100 font-display font-black text-xl
                          shadow-lg shadow-ember-500/40 group-hover:rotate-6 transition-transform duration-300">
            <img src="../dist/assets/icon.png" alt="" />
          </div>
          <div className="leading-none">
            
            <h1 className="font-display text-2xl font-black text-teal-800 tracking-tight">
              Omni<span className="text-ember-400">Find</span>
            </h1>
            
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {links.map(link => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300
                  ${active
                    ? 'bg-teal-800 text-cream-100 shadow-md shadow-teal-800/30'
                    : 'text-teal-800 hover:bg-teal-800/10'
                  }`}
              >
                <span className="mr-1.5">{link.icon}</span>
                {link.label}
                {link.to === '/collection' && collectionCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center
                                   w-5 h-5 rounded-full bg-ember-500 text-cream-100
                                   text-[10px] font-bold">
                    {collectionCount}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navbar