'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronRight, ChevronLeft, BarChart2, FileText, User, X, Maximize2, Volume2, Radio } from 'lucide-react'
import Image from 'next/image'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function Component() {
  const [isRelatedMediaOpen, setIsRelatedMediaOpen] = useState(true)
  const [currentTurn, setCurrentTurn] = useState(1)
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [currentSegment, setCurrentSegment] = useState('Introduction')
  const [speakerPurpose, setSpeakerPurpose] = useState('To inform')
  const [targetAudience, setTargetAudience] = useState('Voters, Candidates')
  const transcriptRef = useRef<HTMLDivElement | null>(null);

  const transcriptData = [
    { turn: 1, speaker: 'Hasib', content: 'Good evening from Hofstra University in Hempstead, New York. I\'m Lester Holt, anchor of "NBC Nightly News." I want to welcome you to the first presidential debate.' },
    { turn: 2, speaker: 'Trump', content: 'Thank you, Lester. It\'s wonderful to be here.' },
    { turn: 3, speaker: 'Harris', content: 'Thank you. It\'s a pleasure to be here with you, Donald.' },
    { turn: 4, speaker: 'Hasib', content: 'Good evening from Hofstra University in Hempstead, New York. I\'m Lester Holt, anchor of "NBC Nightly News." I want to welcome you to the first presidential debate.' },
    { turn: 5, speaker: 'Trump', content: 'Thank you, Lester. It\'s wonderful to be here.' },
    { turn: 6, speaker: 'Harris', content: 'Thank you. It\'s a pleasure to be here with you, Donald.' },
  ]

  const votableQuestions = [
    "Because you'd be in jail.",
    "We're going to make America great again.",
    "I have a plan for that.",
    "It's a disaster, folks.",
    "We need to build bridges, not walls.",
    "I'm not a politician, I'm a businessman."
  ]

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  useEffect(() => {
    if (transcriptRef.current) {
      const turnElement = transcriptRef.current.querySelector(`[data-turn="${currentTurn}"]`)
      if (turnElement) {
        turnElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }, [currentTurn])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % votableQuestions.length)
    }, 10000) // Change question every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const handleTurnChange = (newTurn: number) => {
    setCurrentTurn(Math.max(1, Math.min(newTurn, transcriptData.length)))
  }

  const handlePopupOpen = (popupId: string) => {
    setActivePopup(popupId);
    document.body.style.overflow = 'hidden';
  };

  const handlePopupClose = () => {
    setActivePopup(null)
    document.body.style.overflow = 'auto'
  }

  return (
    <div className="flex flex-col h-screen text-white bg-[#131214] max-xl:hidden">
      <header className="p-4 bg-[#131214] border-b border-[#2F3133]">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image src="/profiles/trump.png" alt="Donald J. Trump" width={48} height={48} className="rounded-full" />
            <div>
              <h3 className="font-semibold">Donald J. Trump</h3>
              <div className="flex items-center space-x-2 text-sm">
                <span className="bg-red-600 px-2 py-1 rounded-full">Republican</span>
                <span>0:25 Talk Time </span>
                <span>• 1 Turns </span>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text animate-pulse">
                49 - 70
              </div>
              <div className="text-xl mt-2">Score</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <h3 className="font-semibold">Kamala Harris</h3>
              <div className="flex items-center space-x-2 text-sm justify-end">
                <span className="bg-blue-600 px-2 py-1 rounded-full">Democrat</span>
                <span>0:45 Talk Time</span>
                <span>• 2 Turns</span>
              </div>
            </div>
            <Image src="/profiles/harris.png" alt="Kamala Harris" width={48} height={48} className="rounded-full" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-4 overflow-hidden">
          <div className="flex h-full space-x-4">
            <div className="w-1/2 flex flex-col space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              <div 
                className="flex-1 p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)] cursor-pointer transform transition-all duration-300"
                onClick={() => handlePopupOpen('graph1')}
              >
                <h2 className="text-xl font-semibold mb-2">Graph or chart</h2>
                <div className="h-64 bg-[#3a3a3a] rounded-md"></div>
              </div>
              <div 
                className="flex-1 p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)] cursor-pointer transform transition-all duration-300"
                onClick={() => handlePopupOpen('annotation')}
              >
                <h2 className="text-xl font-semibold mb-2">Textual Annotation</h2>
                <p className="text-gray-300">Explain Stuff</p>
              </div>
              <div 
                className="flex-1 p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)] cursor-pointer transform transition-all duration-300"
                onClick={() => handlePopupOpen('graph2')}
              >
                <h2 className="text-xl font-semibold mb-2">Graph or chart</h2>
                <div className="h-64 bg-[#3a3a3a] rounded-md"></div>
              </div>
              
              <div 
                className="flex-1 p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)] cursor-pointer transform transition-all duration-300"
                onClick={() => handlePopupOpen('annotation')}
              >
                <h2 className="text-xl font-semibold mb-2">Textual Annotation</h2>
                <p className="text-gray-300">Explain Stuff</p>
              </div>
            </div>
            <div className="w-1/2 flex flex-col space-y-4">
              <div className="flex-1 p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)] overflow-hidden">
                <h2 className="text-xl font-semibold mb-2">Transcript</h2>
                <div ref={transcriptRef} className="h-[calc(100%-2rem)] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="space-y-4">
                    {transcriptData.map((item, index) => (
                      <div
                        key={index}
                        data-turn={item.turn}
                        className={`p-3 bg-[#3a3a3a] rounded-md transition-all duration-300 cursor-pointer ${
                          currentTurn === item.turn ? 'border-2 border-[#CA60ED]' : ''
                        }`}
                        onClick={() => handleTurnChange(item.turn)}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-8 h-8 bg-[#4a4a4a] rounded-full flex items-center justify-center">
                            <User className="w-5 h-5" />
                          </div>
                          <span className="font-semibold">{item.speaker}</span>
                          <span className="text-gray-400">Turn {item.turn}</span>
                        </div>
                        <p className="text-gray-300">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-auto p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)]">
                <h2 className="text-xl font-semibold mb-4 text-center">"{votableQuestions[currentQuestionIndex]}"</h2>
                <p className="mb-4 text-gray-400 text-center">How would you assess this statement—valid, invalid, or would you prefer to abstain from making a judgment?</p>
                <div className="flex space-x-2 mb-4 justify-center">
                  <button className="px-4 py-2 bg-[#CA60ED] rounded-md hover:bg-purple-700 transition-colors">Invalid</button>
                  <button className="px-4 py-2 bg-[#3a3a3a] rounded-md hover:bg-[#4a4a4a] transition-colors">Abstain</button>
                  <button className="px-4 py-2 bg-[#3a3a3a] rounded-md hover:bg-[#4a4a4a] transition-colors">Valid</button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <aside className={`bg-[#131214] border border-[#2F3133] transition-all duration-300 ease-in-out shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)] ${isRelatedMediaOpen ? 'w-80' : 'w-0'}`}>
          <div className="p-4 h-full overflow-y-auto custom-scrollbar">
            <h2 className="text-xl font-semibold mb-4">Related Media</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5,6,7].map((item) => (
                <div key={item} className="bg-[#3a3a3a] p-4 rounded-md hover:bg-[#4a4a4a] transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Image src={`/placeholder.svg?height=60&width=80`} alt={`Thumbnail ${item}`} width={80} height={60} className="rounded-md" />
                    <div>
                      <h3 className="font-semibold mb-1">Video Title {item}</h3>
                      <span className="text-gray-400 text-sm">Promoted</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#3a3a3a] p-2 rounded-l-md hover:bg-[#4a4a4a] transition-all duration-300"
          onClick={() => setIsRelatedMediaOpen(!isRelatedMediaOpen)}
        >
          {isRelatedMediaOpen ? <ChevronRight className="w-6 h-6" /> : <Radio className="w-6 h-6" />}
        </button>
      </div>

      <footer className="bg-[#131214] border-t border-[#2F3133] p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/profiles/hasib.jpg" />
              <AvatarFallback>Profile</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold">Presidential Debate</h1>
          </div>
          <div className="text-right space-y-2">
            <p>Segment: {currentSegment}</p>
            <p>Speaker Purpose: {speakerPurpose}</p>
            <p>Target Audience: {targetAudience}</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#131214] border border-[#2F3133] rounded-full p-2 flex items-center space-x-4 shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)]">
        <div className="flex items-center space-x-2">
          <button onClick={() => handleTurnChange(currentTurn - 1)} className="w-8 h-8 bg-[#3a3a3a] rounded-full flex items-center justify-center hover:bg-[#4a4a4a] transition-all duration-300">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 bg-[#CA60ED] rounded-full flex items-center justify-center text-2xl font-bold">
            {currentTurn}
          </div>
          <button onClick={() => handleTurnChange(currentTurn + 1)} className="w-8 h-8 bg-[#3a3a3a] rounded-full flex items-center justify-center hover:bg-[#4a4a4a] transition-all duration-300">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <input
          type="range"
          min="1"
          max={transcriptData.length}
          value={currentTurn}
          onChange={(e) => handleTurnChange(parseInt(e.target.value))}
          className="w-48 accent-[#CA60ED]"
        />
      </div>

      {activePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#131214] border border-[#2F3133] p-6 rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)] w-3/4 h-3/4 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {activePopup === 'graph1' && 'Graph 1'}
                {activePopup === 'graph2' && 'Graph 2'}
                {activePopup === 'annotation' && 'Textual Annotation'}
              </h2>
              <button onClick={handlePopupClose} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="h-full bg-[#3a3a3a] rounded-md p-4">
              {activePopup === 'graph1' && <BarChart2 className="w-full h-full" />}
              {activePopup === 'graph2' && <BarChart2 className="w-full h-full" />}
              {activePopup === 'annotation' && (
                <div className="h-full flex items-center justify-center">
                  <p className="text-xl">Expanded view of the textual annotation</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}