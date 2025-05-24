"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github, Instagram, Linkedin, Facebook, Youtube } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import type { Post } from "@/lib/data"

interface TalentMediaItem {
  public_id: string;
  secure_url: string;
  url: string;
}

interface StudentPhoto {
  public_id: string;
  secure_url: string;
}

interface Post {
  id: string;  // Will be string after conversion from ObjectId
  name: string;
  enrollmentNo: string;
  department: string;
  batch: string;
  contactNumber?: string;
  category: string;
  githubLink?: string;
  linkedinLink?: string;
  instagramLink?: string;
  youtubeLink?: string;
  facebookLink?: string;
  postTitle: string;
  description: string;
  studentPhoto: StudentPhoto;
  talentMedia: TalentMediaItem[];
  
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
}

interface PostGridProps {
  posts: Post[]
}

export function PostGrid({ posts }: PostGridProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [open, setOpen] = useState(false)

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
    setOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onClick={() => handlePostClick(post)} />
        ))}
      </div>

      {selectedPost && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-primary dark:text-white">{selectedPost.postTitle}</DialogTitle>
              <DialogDescription>
                <Badge variant="outline" className="bg-primary/10 text-primary dark:text-white">
                  {selectedPost.category}
                </Badge>
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex flex-col items-center gap-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage
                      src={selectedPost.studentPhoto.secure_url || "/placeholder.svg"}
                      alt={selectedPost.name}
                    />
                    <AvatarFallback>{selectedPost.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="text-center">
                    <h3 className="text-xl text-primary dark:text-white font-semibold">{selectedPost.name}</h3>
                    <p className="text-muted-foreground">{selectedPost.department}</p>
                    <p className="text-sm text-muted-foreground">Batch: {selectedPost.batch}</p>
                    <p className="text-sm text-muted-foreground">Enrollment: {selectedPost.enrollmentNo}</p>
                  </div>

                  <div className="flex gap-2">
                    {selectedPost.githubLink && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={selectedPost.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </a>
                      </Button>
                    )}
                    {selectedPost.linkedinLink && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={selectedPost.linkedinLink} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                          <span className="sr-only">LinkedIn</span>
                        </a>
                      </Button>
                    )}
                    {selectedPost.instagramLink && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={selectedPost.instagramLink} target="_blank" rel="noopener noreferrer">
                          <Instagram className="h-4 w-4" />
                          <span className="sr-only">Instagram</span>
                        </a>
                      </Button>
                    )}
                    {selectedPost.facebookLink && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={selectedPost.facebookLink} target="_blank" rel="noopener noreferrer">
                          <Facebook className="h-4 w-4" />
                          <span className="sr-only">Facebook</span>
                        </a>
                      </Button>
                    )}
                    {selectedPost.youtubeLink && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={`https://${selectedPost.youtubeLink}`} target="_blank" rel="noopener noreferrer">
                          <Youtube className="h-4 w-4" />
                          <span className="sr-only">YouTube</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <div className="md:w-2/3">
                  <h4 className="text-lg text-primary dark:text-white font-medium mb-2">Description</h4>
                  <p className="text-muted-foreground mb-6">{selectedPost.description}</p>

                  <h4 className="text-lg text-primary dark:text-white font-medium mb-2">Media Gallery</h4>
                  <Carousel className="w-full">
                    <CarouselContent>
                      {selectedPost.talentMedia.map((media, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <div className="overflow-hidden rounded-lg">
                              {isImage(media.secure_url) ? (
                                <Image
                                  src={media.secure_url || "/placeholder.svg?height=600&width=800"}
                                  alt={`Media ${index + 1}`}
                                  width={800}
                                  height={500}
                                  className="w-full object-cover aspect-video"
                                />
                              ) : (
                                <div className="relative aspect-video bg-muted/30 rounded-lg flex items-center justify-center">
                                  <video
                                    src={media.secure_url}
                                    controls
                                    autoPlay={true}
                                    loop={true}
                                    muted={true}
                                    className="w-full h-full"
                                    poster="/placeholder.svg?height=600&width=800&text=Video+Preview"
                                    onError={(e) => {
                                      const target = e.target as HTMLVideoElement
                                      target.onerror = null
                                      target.poster = "/placeholder.svg?height=600&width=800&text=Video+Unavailable"
                                    }}
                                  >
                                    Your browser does not support the video tag.
                                  </video>
                                </div>
                              )}
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

interface PostCardProps {
  post: Post
  onClick: () => void
}

function PostCard({ post, onClick }: PostCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true)
      if (videoRef.current) {
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.play()
          }
        }, 1000)
      }
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false)
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
        videoRef.current.load()
      }
    }
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg cursor-pointer group"
      whileHover={!isMobile ? { scale: 1.03 } : {}}
      transition={{ duration: 0.2 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        {post.talentMedia && post.talentMedia.length > 0 && post.talentMedia[0].secure_url ? (
          isImage(post.talentMedia[0].secure_url) ? (
            <Image
              src={post.talentMedia[0].secure_url}
              alt={post.postTitle}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <video
              ref={videoRef}
              src={post.talentMedia[0].secure_url}
              loop
              muted
              playsInline
              controls={false}
              autoPlay={isMobile ? true : false}
              preload="auto"
              width={800}
              height={600}
              poster={(post.talentMedia.find(media => isImage(media.secure_url))?.secure_url || "/placeholder.svg?height=600&width=800&text=Video+Preview")}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLVideoElement
                target.onerror = null
                target.poster = "/placeholder.svg?height=600&width=800&text=Video+Unavailable"
              }}
            >
              Your browser does not support the video tag.
            </video>
          )
        ) : (
          <Image
            src="/placeholder.svg"
            alt="No media available"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 flex flex-col justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMobile || isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Badge className="self-start mb-2 bg-accent text-white hover:bg-accent/90">{post.category}</Badge>
          <h3 className="text-lg font-bold text-white mb-1">{post.postTitle}</h3>
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={post.studentPhoto.secure_url || "/placeholder.svg"} alt={post.name} />
              <AvatarFallback>{post.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-sm text-white/90">{post.name}</p>
          </div>
          <p className="text-sm text-white/70 line-clamp-2">{post.description}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

function isImage(url: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
}
