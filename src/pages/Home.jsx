import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import Tabs from '../components/Tabs' // Tabs ko wapis import kiya
import ResultGrid from '../components/ResultGrid'
import { useSelector, useDispatch } from 'react-redux'
import { setQuery } from '../redux/features/searchSlice'

const Home = () => {
  const dispatch = useDispatch()
  const { query } = useSelector((store) => store.search)

  // Shuru mein automatic default items load karne ke liye
  useEffect(() => {
    if (query === '') {
      dispatch(setQuery('trending'))
    }
  }, [query, dispatch])

  return (
    <div className="min-h-screen">
      <Navbar />
      <SearchBar />
      
      <Tabs /> 
      
      <ResultGrid />
    </div>
  )
}

export default Home
