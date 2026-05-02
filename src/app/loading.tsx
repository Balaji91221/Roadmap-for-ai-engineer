export default function Loading() {
  return (
    <div className="px-4 md:px-6 lg:px-8 py-6 lg:py-8 max-w-[1400px] mx-auto animate-pulse">
      <div className="h-10 bg-surface2 rounded-xl w-1/3 mb-3" />
      <div className="h-4 bg-surface2 rounded-md w-1/2 mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-surface2 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-48 bg-surface2 rounded-xl" />
        ))}
      </div>
    </div>
  )
}
