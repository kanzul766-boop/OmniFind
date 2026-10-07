import { useDispatch, useSelector } from "react-redux"
import { fetchPhotos, fetchVideos, fetchGIFs } from "../api/mediaApi"
import { setResults, setLoading, setError } from "../redux/features/searchSlice"
import { useEffect } from "react"
import ResultCard from "./ResultCard"

const ResultGrid = () => {
  const dispatch = useDispatch()
  const { query, activeTab, results, loading, error } = useSelector((store) => store.search)

  useEffect(() => {
    if (!query) return
    const getData = async () => {
      try {
        dispatch(setLoading())
        let data = []
        
        if (activeTab === 'photos') {
          const response = await fetchPhotos(query)
          data = response.results.map((item) => ({
            id: item.id,
            type: 'photo',
            title: item.alt_description || 'Untitled',
            thumbnail: item.urls.small,
            src: item.urls.regular,
            url: item.links.html,
          }))
        }
        if (activeTab === 'videos') {
          const response = await fetchVideos(query)
          data = response.hits.map((item) => ({
            id: item.id,
            type: 'video',
            title: item.tags || 'Video',
            thumbnail: item.video?.thumbnail || item.userImageURL,
            src: item.videos?.medium?.url || item.videos?.small?.url,
            url: item.pageURL,
          }))
        }
        if (activeTab === 'gif') {
          const response = await fetchGIFs(query)
          data = response.data.map((item) => ({
            id: item.id,
            type: 'gif',
            title: item.title || "GIF",
            thumbnail: item.images.fixed_height_small.url,
            src: item.images.original.url,
            url: item.url,
          }))
        }
        dispatch(setResults(data))
      } catch (err) {
        dispatch(setError(err.message))
      }
    }
    getData()
  }, [query, activeTab, dispatch])

  if (error) return (
    <div className="max-w-2xl mx-auto my-16 p-8 glass-card text-center animate-fade-up">
      <div className="text-5xl mb-3">⚠️</div>
      <h3 className="font-display text-2xl font-bold text-teal-800 mb-2">
        Something went wrong
      </h3>
      <p className="text-teal-700/70">{error}</p>
    </div>
  )

  if (loading) return (
    <div className="max-w-7xl mx-auto px-6 pb-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}
            className="aspect-square rounded-2xl bg-gradient-to-r
                       from-cream-300 via-cream-100 to-cream-300
                       bg-[length:1000px_100%] animate-shimmer" />
        ))}
      </div>
    </div>
  )

  if (results.length === 0) return (
    <div className="max-w-md mx-auto my-16 text-center animate-fade-up">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="font-display text-2xl font-bold text-teal-800">
        No results found
      </h3>
      <p className="text-teal-700/60 mt-2">Try a different keyword.</p>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {results.map((item, i) => (
          <div
            key={item.id || i}
            className="animate-fade-up"
            style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
          >
            <ResultCard item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResultGrid
