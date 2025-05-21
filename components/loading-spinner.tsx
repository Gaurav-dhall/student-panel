export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative h-12 w-12">
        <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-full w-full animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    </div>
  )
}
