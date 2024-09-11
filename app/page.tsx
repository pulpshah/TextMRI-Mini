'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronRight, ChevronLeft, BarChart2, FileText, User, X,Target, Timer, TableOfContents, Maximize2, Volume2, Radio, Headphones, Video, FileText as ArticleIcon } from 'lucide-react'
import Image from 'next/image'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import JFile from "@/public/data/debate_analysis.json"

type MediaItem = {
  type: string;
  title: string;
  url: string;
  icon: React.ComponentType;
  image: string | null;
}

type JsonTurnData = {
  turn: number;
  speaker: string;
  startTime: number;
  endTime: number;
  content: string;
  claim_of_facts_abstractive_claim: string;
  claim_of_facts_extractive_supporting_quotes_claim: string[];
  score: number;
  facts_topic_ref?: [string, string, { IMAGES?: string[] }][];
  value_topic_ref?: [string, string, { IMAGES?: string[] }][];
  policy_topic_ref?: [string, string, { IMAGES?: string[] }][];
  [key: string]: any;
}

export default function Component() {
  const [isRelatedMediaOpen, setIsRelatedMediaOpen] = useState(true)
  const [currentTurn, setCurrentTurn] = useState(1)
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [currentSegment, setCurrentSegment] = useState('Introduction')
  const [speakerPurpose, setSpeakerPurpose] = useState('To inform')
  const [targetAudience, setTargetAudience] = useState('Voters, Candidates')
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const [relatedMedia, setRelatedMedia] = useState<MediaItem[]>([])

  useEffect(() => {
    updateRelatedMedia(currentTurn)
  }, [currentTurn])

  const updateRelatedMedia = (turn: number) => {
    const turnData = (JFile.Data as JsonTurnData[]).find(item => item.turn === turn)
    if (!turnData) return

    const media: MediaItem[] = []

    const addMedia = (references: [string, string, { IMAGES?: string[] }][] | undefined, topicType: string) => {
      if (!references) return
      references.forEach(([type, url, mediaInfo]) => {
        let icon: React.ComponentType
        switch (type) {
          case 'ARTICLE':
            icon = ArticleIcon
            break
          case 'DISCUSSION':
            icon = MessageCircle
            break
          case 'VIDEO':
            icon = Video
            break
          case 'PODCAST':
            icon = Headphones
            break
          default:
            icon = FileText
        }

        media.push({
          type,
          title: `${topicType}: ${type}`,
          url,
          icon,
          image: mediaInfo?.IMAGES?.[0] || null
        })
      })
    }

    addMedia(turnData.facts_topic_ref, 'Fact')
    addMedia(turnData.value_topic_ref, 'Value')
    addMedia(turnData.policy_topic_ref, 'Policy')

    setRelatedMedia(media)
  }

  type DebateTurn = {
    speaker: string;
    startTime: number;
    endTime: number;
    cumulative_score: number;
    content: string;
  };
  
  const dataObj = JFile.Data;
  
  // Function to dynamically calculate Kamala's turn (using Biden for now) count based on the turnNumber
  const getKamalaTurn = () => {
    return dataObj.slice(0, currentTurn + 1).filter(turn => turn.speaker === "Kamala Harris").length;
  };
  
  // Function to dynamically calculate Trump's turn count based on the turnNumber
  const getTrumpTurn = () => {
    return dataObj.slice(0, currentTurn + 1).filter(turn => turn.speaker === "Donald Trump").length;
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Generic function to dynamically calculate total talk time for a given speaker up to the currentTurn
  const getSpeakerTime = (speaker: string) => {
    const seconds = dataObj
      .slice(0, currentTurn)
      .filter(turn => turn.speaker === speaker)
      .reduce((total, turn) => total + (turn.endTime - turn.startTime), 0);
    return formatTime(seconds);
  };
  
  // Usage for Kamala Harris
  const getKamalaTime = () => getSpeakerTime("Kamala Harris");
  
  // Usage for Donald Trump
  const getTrumpTime = () => getSpeakerTime("Donald Trump");
  
  // Function to calculate total time regardless of the speaker
  const getTotalTime = () => {
    const seconds = dataObj
      .slice(0, currentTurn)
      .filter(turn => turn.startTime)
      .reduce((total, turn) => total + (turn.endTime - turn.startTime), 0);
    return formatTime(seconds);
  };

  const getSpeakerScore = (speaker: string) => {
    const turns = dataObj.slice(0, currentTurn + 1)
      .filter(turn => turn.speaker === speaker);
    return turns.length > 0 ? turns[turns.length - 1].cumulative_score : 0;
  };
  
  // Usage for Kamala Harris
  const getKamalaScore = () => getSpeakerScore("Kamala Harris");
  const getTrumpScore = () => getSpeakerScore("Donald Trump");
  
  const transcriptData = dataObj.map((turn, index) => ({
    turn: index + 1,
    speaker: turn.speaker,
    content: turn.content
  }));

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
    <div className="flex flex-col h-screen text-white bg-[#131214]">
      <header className="p-4 bg-[#131214] border-b border-[#2F3133]">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full border-4 border-red-600"></div>
              <Image src="/profiles/trump.png" alt="Donald J. Trump" width={48} height={48} className="rounded-full" />
            </div>
            <div>
              <h3 className="font-semibold flex items-center">
                Donald J. Trump
                <Image src="/profiles/republicanIcon.svg" alt="Republican Party" width={18} height={16} className="ml-2" />
              </h3>
              <div className="flex items-center space-x-2 text-sm">
                <span>Talk Time: {getTrumpTime()} </span>
                <span>• Turns: {getTrumpTurn()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text animate-pulse">
                
              </div>
              <div className="text-xl w-16 mx-auto mt-2 mb-2">
                <img src="profiles/logo.svg" alt="" />
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text animate-pulse">
                {getTrumpScore()} • {getKamalaScore()}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <h3 className="font-semibold flex items-center justify-end">
                <Image src="/profiles/democratIcon.svg" alt="Democratic Party" width={20} height={16} className="mr-2" />
                Kamala Harris
              </h3>
              <div className="flex items-center space-x-2 text-sm justify-end">
                <span>Talk Time: {getKamalaTime()} </span>
                <span>• Turns: {getKamalaTurn()}</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-full border-4 border-blue-600"></div>
              <Image src="/profiles/harris.png" alt="Kamala Harris" width={48} height={48} className="rounded-full" />
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-4 overflow-hidden">
          <div className="flex h-full space-x-4">
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
          </div>
        </main>

        <aside className={`bg-[#131214] border border-[#2F3133] transition-all duration-300 ease-in-out shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)] ${isRelatedMediaOpen ? 'w-80' : 'w-0'}`}>
        <div className="p-4 h-full overflow-y-auto custom-scrollbar">
          <h2 className="text-xl font-semibold mb-4">Related Media</h2>
          <div className="space-y-4">
            {relatedMedia.map((item, index) => (
              <div key={index} className="bg-[#3a3a3a] p-4 rounded-md hover:bg-[#4a4a4a] transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <div className="flex items-center space-x-3">
                  {item.image ? (
                    <Image src={item.image} alt={item.title} width={64} height={64} className="w-16 h-16 object-cover rounded-md" />
                  ) : (
                    <div className="w-16 h-16 bg-[#2F3133] rounded-md flex items-center justify-center">
                      <item.icon className="w-8 h-8" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">View Source</a>
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
          <div className="flex items-center text-[30px] space-x-4">
            <span className='flex justify-center items-center gap-2'>
              <Timer className="w-8 h-8" /> {getTotalTime()} 
            </span>
          </div>
          <div className="flex flex-col items-end text-[13px] space-y-2">
            <p className='flex items-center'> <TableOfContents 
            className="w-4 h-4 me-1" />       {currentSegment}
            </p>
            <p>?: {speakerPurpose}</p>
            <p className='flex items-center'><Target className="w-4 h-4" />  : {targetAudience}</p>
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