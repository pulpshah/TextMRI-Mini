'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronRight, ChevronLeft, BarChart2, FileText, User, Target, Timer, TableOfContents, Radio, Headphones, Video, FileText as ArticleIcon, Search } from 'lucide-react'
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
import JFile from "@/public/data/debate_analysis1.json"

export default function Component() {
  const [isRelatedMediaOpen, setIsRelatedMediaOpen] = useState(true)
  const [currentTurn, setCurrentTurn] = useState(1)
  const [currentSegment, setCurrentSegment] = useState('Introduction')
  const [speakerPurpose, setSpeakerPurpose] = useState('To inform')
  const [targetAudience, setTargetAudience] = useState('Voters, Candidates')
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState('1')

  type DebateTurn = {
    speaker: string;
    startTime: number;
    endTime: number;
    score: number;
    content: string;
  };
  
  const dataObj: DebateTurn[] = JFile.Data;
  
  const getKamalaTurn = () => {
    return dataObj.slice(0, currentTurn + 1).filter(turn => turn.speaker === "Kamala Harris").length;
  };
  
  const getTrumpTurn = () => {
    return dataObj.slice(0, currentTurn + 1).filter(turn => turn.speaker === "Donald Trump").length;
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getSpeakerTime = (speaker: string) => {
    const seconds = dataObj
      .slice(0, currentTurn)
      .filter(turn => turn.speaker === speaker)
      .reduce((total, turn) => total + (turn.endTime - turn.startTime), 0);
    return formatTime(seconds);
  };
  
  const getKamalaTime = () => getSpeakerTime("Kamala Harris");
  const getTrumpTime = () => getSpeakerTime("Donald Trump");
  
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
    return turns.length > 0 ? turns[turns.length - 1].score : 0;
  };
  
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

  const handleEditStart = () => {
    setIsEditing(true);
    setEditValue('');  // Clear the field when clicked
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value)
  }

  const handleEditComplete = () => {
    if (editValue === '') {
      // If they don't input anything, revert to the current turn value
      setEditValue(currentTurn.toString());
      setIsEditing(false);
    } else {
      const newTurn = parseInt(editValue, 10);
      if (!isNaN(newTurn)) {
        handleTurnChange(newTurn);
      }
      setIsEditing(false);
    }
  };
  

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditComplete()
    }
  }

  const relatedMedia = [
    { type: 'podcast', title: 'Debate Analysis Podcast', Icon: Headphones },
    { type: 'video', title: 'Key Moments Breakdown', Icon: Video },
    { type: 'article', title: 'Fact-Checking the Debate', Icon: ArticleIcon },
    { type: 'podcast', title: 'Expert Commentary', Icon: Headphones },
    { type: 'video', title: 'Candidate Highlights', Icon: Video },
    { type: 'article', title: 'Policy Comparison', Icon: ArticleIcon },
    { type: 'podcast', title: 'Voter Reactions', Icon: Headphones },
  ];

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
              <div className="text-4xl font-bold bg-gradient-to-r from-red-600 to-blue-600 text-transparent bg-clip-text animate-pulse">
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
              <div className="flex-1 p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)]">
                <h2 className="text-xl font-semibold mb-2">Graph 1</h2>
                <div className="h-64 bg-[#3a3a3a] rounded-md flex items-center justify-center">
                  <BarChart2 className="w-full h-full p-4" />
                </div>
              </div>
              <div className="flex-1 p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)]">
                <h2 className="text-xl font-semibold mb-2">Textual Annotation</h2>
                <p className="text-gray-300">This section provides detailed explanations and context for the debate topics and statements made by the candidates.</p>
              </div>
              <div className="flex-1 p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)]">
                <h2 className="text-xl font-semibold mb-2">Graph 2</h2>
                <div className="h-64 bg-[#3a3a3a] rounded-md flex items-center justify-center">
                  <BarChart2 className="w-full h-full p-4" />
                </div>
              </div>
              <div className="flex-1 p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)]">
                <h2 className="text-xl font-semibold mb-2">Additional Annotation</h2>
                <p className="text-gray-300">This section provides further analysis and insights into the debate proceedings and candidate performances.</p>
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
                    <div className="w-16 h-16 bg-[#2F3133] rounded-md flex items-center justify-center">
                      <item.Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <span className="text-gray-400 text-sm capitalize">{item.type}</span>
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
          <div className="flex flex-col items-start text-[13px] space-y-2">
            <p className='flex items-center'>
              <TableOfContents className="w-4 h-4 me-1" /> {currentSegment}
            </p>
            <p>?: {speakerPurpose}</p>
            <p className='flex items-center'>
              <Target className="w-4 h-4 me-1" /> : {targetAudience}
            </p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#131214] border border-[#2F3133] rounded-xl p-2 flex items-center space-x-4 shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)]">
        <div className="flex items-center space-x-2">
          <button onClick={() => handleTurnChange(currentTurn - 1)} className="w-8 h-8 bg-[#3a3a3a] rounded-full flex items-center justify-center hover:bg-[#4a4a4a] transition-all duration-300">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div 
            className="w-12 h-12 bg-[#CA60ED] rounded-xl flex items-center justify-center text-2xl font-bold cursor-pointer"
            onClick={handleEditStart}
          >
            {isEditing ? (
              <input
                type="text"
                value={editValue}
                onChange={handleEditChange}
                onBlur={handleEditComplete}
                onKeyDown={handleKeyDown}
                className="w-full h-full bg-transparent text-center text-2xl font-bold focus:outline-none"
                autoFocus
              />
            ) : (
              currentTurn
            )}
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
        <div className="flex items-center space-x-1">
          <Timer className="w-6 h-6" />
          <span className="text-lg">{getTotalTime()}</span>
        </div>
      </div>

      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-12 h-12 bg-[#CA60ED] rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors shadow-lg"
        >
          <Search className="w-6 h-6" />
        </button>
      </div>

      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Search Transcript</CommandItem>
            <CommandItem>Find Speaker</CommandItem>
            <CommandItem>Jump to Turn</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Change Theme</CommandItem>
            <CommandItem>Adjust Volume</CommandItem>
            <CommandItem>Toggle Related Media</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-40" onClick={() => setIsSearchOpen(false)}></div>
      )}
    </div>
  )
}