import Link from "next/link"
import Image from "next/image"
import { MoonIcon, SunIcon, Bell } from "lucide-react"
import { connectDB } from "@/dbConfig/db"
import Post from "@/models/post"  // importing the model from /models/post.ts
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { PostGrid } from "@/components/post-grid"

interface TalentMedia {
  public_id: string;
  secure_url: string;
  _id?: { toString(): string };
}

export default async function Home() {
  await connectDB();
  // Fetch students from database using the Post model
  const postsFromDB = await Post.find({}).lean();
  const posts = postsFromDB.map((post) => {
    // Convert nested talentMedia array objects
    const sanitizedTalentMedia = post.talentMedia?.map((media: TalentMedia) => ({
      public_id: media.public_id || '',
      secure_url: media.secure_url || '',
      id: media._id?.toString() || '', // Convert nested ObjectId
      // Remove MongoDB-specific fields from nested objects
      _id: undefined,
    })) || [];
  
    return {
      // Convert main document fields
      id: post._id?.toString() || '',
      name: post.name || '',
      enrollmentNo: post.enrollmentNo || '',
      department: post.department || '',
      batch: post.batch || '',
      contactNumber: post.contactNumber || '',
      category: post.category || '',
      githubLink: post.githubLink || '',
      linkedinLink: post.linkedinLink || '',
      instagramLink: post.instagramLink || '',
      youtubeLink: post.youtubeLink || '',
      facebookLink: post.facebookLink || '',
      postTitle: post.postTitle || '',
      description: post.description || '',
      
      // Convert studentPhoto object
      studentPhoto: {
        public_id: post.studentPhoto?.public_id || '',
        secure_url: post.studentPhoto?.secure_url || '',
        id: post.studentPhoto?._id?.toString() || ''
      },
      
      // Add sanitized talentMedia
      talentMedia: sanitizedTalentMedia,
      
      // Convert dates
      createdAt: post.createdAt?.toISOString() || '',
      updatedAt: post.updatedAt?.toISOString() || '',
      
      // Remove MongoDB-specific fields
      _id: undefined,
      __v: undefined,
      
      // Remove other MongoDB internal fields visible in your screenshot
      errorWarning: undefined,
      fifthkbitlen: undefined,
      fifndefinit: undefined,
      islanthield: undefined
    };
  });

  return (
    <div className="min-h-screen h- flex flex-col">
      {/* Header */}

<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div className="container flex h-16 items-center justify-center px-6 relative">
    <a href="https://www.mait.ac.in/" className="flex items-center gap-3 cursor-pointer group" target="_blank" rel="noopener noreferrer">
      <div className="relative">
        <Image
          src="/MaitLogoNew.png"
          alt="IT Department Logo"
          width={65}
          height={65}
          className="rounded text-primary dark:text-white transition-transform group-hover:scale-105"
        />
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
      </div>
      <div>
        <h1 className="text-lg font-bold text-primary dark:text-white group-hover:text-primary/80 transition-colors">
          IT Department Talent Portal
        </h1>
        <p className="text-xs text-muted-foreground">Showcasing Our Creative Side</p>
      </div>
    </a>
    
    {/* Floating notification badge */}
   
  </div>
</header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 relative">
        <div className="absolute inset-0 z-0">
          <Image src="/college.jpg" alt="IT Department Background" fill className="object-cover  opacity-50 dark:opacity-75 " priority />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-background/70 mix-blend-multiply dark:bg-gradient-to-r dark:from-primary/80 dark:to-background/90" />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary dark:text-white">
                Explore the talent of our IT Department!
              </h1>
              <p className="mx-auto max-w-[700px] text-primary dark:text-white md:text-xl">
                Discover amazing extracurricular activities and achievements from our talented students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Post Grid */}
      <section className="container py-8 px-12 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-primary dark:text-white tracking-tight">Student Showcase</h2>
        </div>
        <PostGrid posts={posts} />
      </section>

      

      {/* Footer */}
      <footer className="w-full border-t bg-background px-12 py-6 mt-auto">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
            <a href="https://www.mait.ac.in/" className="flex items-center gap-2 cursor-pointer" target="_blank" rel="noopener noreferrer">
              <Image src="/MaitLogoNew.png" alt="IT Department Logo" width={75} height={75} className="rounded" />
              </a>
              {/* <span className="text-lg font-semibold">IT Department</span> */}
            </div>
            <p className="text-sm text-muted-foreground">© 2024 College Name. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="https://www.linkedin.com/school/maharaja-agrasen-institute-of-technology/" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://www.instagram.com/maitdelhi/" className="text-muted-foreground hover:text-primary"target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">Built with ❤️ by IT Department</p>
        </div>
      </footer>
    </div>
  )
}
