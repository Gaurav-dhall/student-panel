import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">Student Not Found</h2>
      <p className="text-blue-600 mb-6">The student you're looking for doesn't exist or has been removed.</p>
      <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Return to Student Panel
      </Link>
    </div>
  )
}
