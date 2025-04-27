import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { students } from "@/lib/data"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-700">Student Panel</h1>
        <p className="text-blue-500 mt-2">View student information</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {students.map((student) => (
          <Link key={student.id} href={`/student/${student.id}`} className="block">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-blue-100">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-blue-200">
                    <Image
                      src={student.profileImage || "/placeholder.svg"}
                      alt={student.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg text-blue-800">{student.name}</h2>
                    <p className="text-blue-600 text-sm">{student.enrollmentNumber}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-blue-700">
                  <p>
                    <span className="text-blue-400">Department:</span> {student.department}
                  </p>
                  <p>
                    <span className="text-blue-400">Batch:</span> {student.batch}
                  </p>
                  <p>
                    <span className="text-blue-400">Contact:</span> {student.contactNumber}
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  {student.socialMedia.facebook && <Facebook size={16} className="text-blue-500" />}
                  {student.socialMedia.twitter && <Twitter size={16} className="text-blue-500" />}
                  {student.socialMedia.instagram && <Instagram size={16} className="text-blue-500" />}
                  {student.socialMedia.linkedin && <Linkedin size={16} className="text-blue-500" />}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
