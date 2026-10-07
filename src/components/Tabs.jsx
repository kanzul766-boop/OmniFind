import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../redux/features/searchSlice'

const Tabs = () => {
  const dispatch = useDispatch()
  const activeTab = useSelector((state) => state.search.activeTab)

  const tabs = [
    { key: 'photos', label: 'Photos', icon: '◐' },
    { key: 'videos', label: 'Videos', icon: '▶' },
    { key: 'gif',    label: 'GIFs',   icon: '✦' },
  ]

  return (
    <div className="flex justify-center px-6 py-6">
      <div className="glass-card inline-flex p-1.5 gap-1">
        {tabs.map(tab => {
          const active = activeTab === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => dispatch(setActiveTab(tab.key))}
              className={`relative px-6 py-2.5 rounded-xl font-semibold text-sm
                          transition-all duration-300 flex items-center gap-2
                ${active
                  ? 'bg-gradient-to-br from-ember-500 to-ember-600 text-cream-100 shadow-md shadow-ember-500/40'
                  : 'text-teal-800/70 hover:text-teal-800 hover:bg-teal-800/5'
                }`}
            >
              <span className="text-xs">{tab.icon}</span>
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Tabs