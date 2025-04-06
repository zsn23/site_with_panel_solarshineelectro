export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      {/* Spinning loader */}
      <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>

      <div className="text-center">
        <h2 className="text-lg font-semibold text-yellow-600">Loading...</h2>
        <p className="text-sm text-gray-500">Please wait a moment</p>
      </div>
    </div>
  )
}

