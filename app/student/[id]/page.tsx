import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { students } from "@/lib/data"

export default function StudentDetail({ params }: { params: { id: string } }) {
  const student = students.find((s) => s.id === params.id)

  if (!student) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
        <ChevronLeft size={20} />
        <span>Back to all students</span>
      </Link>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100">
        <div className="relative h-64 w-full">
          <Image
            src={student.profileImage || "/placeholder.svg"}
            alt={student.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-blue-800">{student.name}</h1>
            <p className="text-blue-600 text-lg">{student.enrollmentNumber}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-blue-700 mb-2">Personal Information</h2>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-blue-400">Department:</span>
                    <span className="text-blue-800">{student.department}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-blue-400">Batch:</span>
                    <span className="text-blue-800">{student.batch}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-blue-400">Contact:</span>
                    <span className="text-blue-800">{student.contactNumber}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-blue-400">Category:</span>
                    <span className="text-blue-800">{student.category}</span>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-blue-700 mb-2">Social Media</h2>
                <div className="flex gap-4">
                  {student.socialMedia.facebook && (
                    <a
                      href={student.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Facebook size={24} />
                      <span className="sr-only">Facebook</span>
                    </a>
                  )}
                  {student.socialMedia.twitter && (
                    <a
                      href={student.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Twitter size={24} />
                      <span className="sr-only">Twitter</span>
                    </a>
                  )}
                  {student.socialMedia.instagram && (
                    <a
                      href={student.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Instagram size={24} />
                      <span className="sr-only">Instagram</span>
                    </a>
                  )}
                  {student.socialMedia.linkedin && (
                    <a
                      href={student.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Linkedin size={24} />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-blue-700 mb-2">Description</h2>
                <p className="text-blue-700">{student.description}</p>
              </div>

              {student.uploadedMedia && student.uploadedMedia.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-blue-700 mb-2">Uploaded Media</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {student.uploadedMedia.map((media, index) => (
                      <div key={index} className="relative h-40 rounded-lg overflow-hidden border border-blue-200">
                        <Image
                          src={media || "/placeholder.svg"}
                          alt={`Uploaded media ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
