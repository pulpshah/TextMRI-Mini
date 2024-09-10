'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronRight, ChevronLeft, BarChart2, FileText, User } from 'lucide-react'
import Image from 'next/image'

const HighlightRow = ({ title, items }) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollContainerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setScrollPosition(container.scrollLeft + scrollAmount)
    }
  }

  const onMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const onMouseUp = () => {
    setIsDragging(false)
  }

  const onMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
    setScrollPosition(scrollContainerRef.current.scrollLeft)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('mousedown', onMouseDown)
      container.addEventListener('mouseup', onMouseUp)
      container.addEventListener('mousemove', onMouseMove)
      container.addEventListener('mouseleave', onMouseUp)

      return () => {
        container.removeEventListener('mousedown', onMouseDown)
        container.removeEventListener('mouseup', onMouseUp)
        container.removeEventListener('mousemove', onMouseMove)
        container.removeEventListener('mouseleave', onMouseUp)
      }
    }
  }, [isDragging, startX, scrollLeft])

  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold mb-4 px-4">{title}</h2>
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#3a3a3a] p-2 rounded-full z-10 hover:bg-[#4a4a4a] transition-all duration-300"
          style={{ display: scrollPosition > 0 ? 'block' : 'none' }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 py-4 px-4 no-scrollbar"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-none w-72 bg-[#131214] border border-[#2F3133] rounded-lg p-4 shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)] hover:bg-[#1a1a1c] transition-all duration-300 transform hover:scale-105 cursor-pointer relative"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[#CA60ED] rounded-t-lg"></div>
              <div className="flex items-center space-x-3 mb-2">
                {item.icon}
                <h3 className="font-semibold">{item.title}</h3>
              </div>
              <div className="mb-2 overflow-hidden rounded-md">
                <Image 
                  src={item.image || '/placeholder.svg?height=157&width=280'} 
                  alt={item.title} 
                  width={280} 
                  height={157} 
                  className="object-cover w-full h-auto"
                />
              </div>
              <p className="text-sm text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#3a3a3a] p-2 rounded-full z-10 hover:bg-[#4a4a4a] transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default function DebateHighlights() {
  const segments = [
    { title: 'Introduction', icon: <User className="w-5 h-5" />, description: 'Opening statements and introductions', image: '/placeholder.svg?height=157&width=280' },
    { title: 'Questions', icon: <FileText className="w-5 h-5" />, description: 'Key questions posed during the debate', image: '/placeholder.svg?height=157&width=280' },
    { title: 'Responses', icon: <User className="w-5 h-5" />, description: 'Candidates\' answers to important issues', image: '/placeholder.svg?height=157&width=280' },
    { title: 'Rebuttals', icon: <User className="w-5 h-5" />, description: 'Counter-arguments and clarifications', image: '/placeholder.svg?height=157&width=280' },
    { title: 'Closing', icon: <User className="w-5 h-5" />, description: 'Final remarks and conclusions', image: '/placeholder.svg?height=157&width=280' },
  ]

  const topics = [
    { title: 'Healthcare', icon: <BarChart2 className="w-5 h-5" />, description: 'Discussion on healthcare policies', image: '/placeholder.svg?height=157&width=280' },
    { title: 'Gun Control', icon: <BarChart2 className="w-5 h-5" />, description: 'Debate on gun control measures', image: '/placeholder.svg?height=157&width=280' },
    { title: 'Economy', icon: <BarChart2 className="w-5 h-5" />, description: 'Economic policies and plans', image: '/placeholder.svg?height=157&width=280' },
    { title: 'Taxes', icon: <BarChart2 className="w-5 h-5" />, description: 'Tax reform proposals', image: '/placeholder.svg?height=157&width=280' },
    { title: 'Foreign Policy', icon: <BarChart2 className="w-5 h-5" />, description: 'International relations and diplomacy', image: '/placeholder.svg?height=157&width=280' },
  ]

  const flags = [
    { title: 'Interruptions', icon: <User className="w-5 h-5" />, description: 'Moments of significant interruptions', image: '/placeholder.svg?height=157&width=280' },
    { title: 'Dramatic', icon: <User className="w-5 h-5" />, description: 'Highly charged or emotional exchanges', image: '/placeholder.svg?height=157&width=280' },
    { title: 'Emotional', icon: <User className="w-5 h-5" />, description: 'Displays of strong emotions', image: '/placeholder.svg?height=157&width=280' },
    { title: 'Weak Points', icon: <User className="w-5 h-5" />, description: 'Identified weaknesses in arguments', image: '/placeholder.svg?height=157&width=280' },
    { title: 'Fact Checks', icon: <User className="w-5 h-5" />, description: 'Verification of claims made during debate', image: '/placeholder.svg?height=157&width=280' },
  ]

  return (
    <div className="min-h-screen bg-[#131214] text-white p-8">
      <style jsx global>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <h1 className="text-4xl font-bold mb-8 px-4">Debate Highlights</h1>
      <HighlightRow title="Segments" items={segments} />
      <HighlightRow title="Topics" items={topics} />
      <HighlightRow title="Flags" items={flags} />
    </div>
  )
}