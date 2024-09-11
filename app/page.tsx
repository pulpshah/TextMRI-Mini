'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronRight, Tv, Search, ChevronLeft, BarChart2, FileText, User, X, Target, Timer, TableOfContents, Maximize2, Volume2, Radio, Headphones, Video, FileText as ArticleIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import JFile from "@/public/data/Trump_Harris_Annotated_Transcript.json"

import Header from '@/components/Header'
import Transcript from '@/components/Transcript'
import GraphsAndAnnotations from '@/components/GraphsAndAnnotations'
import RelatedMedia from '@/components/RelatedMedia'
import Footer from '@/components/Footer'
import TurnSlider from '@/components/TurnSlider'
import FloatingVotingModule from '@/components/FloatingVotingModule'
import SearchDialog from '@/components/SearchDialog'

export default function App() {
  const [isRelatedMediaOpen, setIsRelatedMediaOpen] = useState(true)
  const [currentTurn, setCurrentTurn] = useState(1)
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [currentSegment, setCurrentSegment] = useState('Introduction')
  const [speakerPurpose, setSpeakerPurpose] = useState('To inform')
  const [targetAudience, setTargetAudience] = useState('Voters, Candidates')
  const transcriptRef = useRef<HTMLDivElement | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState('1')
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  const constraintsRef = useRef(null)

  type DebateTurn = {
    speaker: string;
    startTime: number;
    endTime: number;
    cumulative_score: number;
    content: string;
    turn_score: number;
  };
  
  const dataObj = JFile.Data;
  
  const getKamalaTurn = () => {
    return dataObj.slice(0, currentTurn).filter(turn => turn.speaker === "Kamala Harris").length;
  };

  const getTrumpTurn = () => {
    return dataObj.slice(0, currentTurn).filter(turn => turn.speaker === "Donald Trump").length;
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
    return turns.length > 0 ? turns[turns.length - 1].cumulative_score : 0;
  };
  
  const getKamalaScore = () => getSpeakerScore("Kamala Harris");
  const getTrumpScore = () => getSpeakerScore("Donald Trump");
  
  const transcriptData = dataObj.map((turn, index) => ({
    turn: index + 1,
    speaker: turn.speaker,
    content: turn.content,
    turn_score: turn.turn_score
  }));

  const handleTurnChange = (newTurn: number) => {
    setCurrentTurn(Math.max(1, Math.min(newTurn, transcriptData.length)))
  }

  const handleMouseEnter = (tooltipId: string) => {
    setActiveTooltip(tooltipId);
  };

  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen text-white bg-[#131214] max-minimum:hidden">
        <Header 
          getTrumpTime={getTrumpTime} 
          getTrumpTurn={getTrumpTurn} 
          getKamalaTime={getKamalaTime} 
          getKamalaTurn={getKamalaTurn}
          getTrumpScore={getTrumpScore}
          getKamalaScore={getKamalaScore}
        />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 p-4 overflow-hidden">
            <div className="flex h-full space-x-4">
              <Transcript 
                transcriptData={transcriptData} 
                currentTurn={currentTurn} 
                handleTurnChange={handleTurnChange} 
              />
              <GraphsAndAnnotations />
            </div>
          </main>
          <RelatedMedia isRelatedMediaOpen={isRelatedMediaOpen} currentTurn={currentTurn} />
          <Tooltip open={activeTooltip === 'related-media'}>
            <TooltipTrigger asChild>
              <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#3a3a3a] p-2 rounded-l-md hover:bg-[#4a4a4a] transition-all duration-300"
                onClick={() => setIsRelatedMediaOpen(!isRelatedMediaOpen)}
                onMouseEnter={() => handleMouseEnter('related-media')}
                onMouseLeave={handleMouseLeave}
              >
                {isRelatedMediaOpen ? <ChevronRight className="w-6 h-6" /> : <Radio className="w-6 h-6" />}
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" className="z-50 bg-[#2F3133] text-white p-2 rounded-md shadow-lg">
              {isRelatedMediaOpen ? 'Hide Related Media' : 'Show Related Media'}
            </TooltipContent>
          </Tooltip>
        </div>
        <Footer 
          currentSegment={currentSegment} 
          speakerPurpose={speakerPurpose} 
          targetAudience={targetAudience} 
        />
        <TurnSlider 
          currentTurn={currentTurn} 
          handleTurnChange={handleTurnChange} 
          transcriptData={transcriptData}
          getTotalTime={getTotalTime}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editValue={editValue}
          setEditValue={setEditValue}
        />
        <div className="fixed bottom-4 right-4 flex space-x-2 items-center">
          <Tooltip open={activeTooltip === 'highlights'}>
            <TooltipTrigger asChild>
              <Link href="/highlights" passHref>
                <Button
                  className="w-20 h-12 rounded-lg bg-[#3a3a3a] hover:bg-[#4a4a4a] transition-colors shadow-lg flex items-center justify-center"
                  onMouseEnter={() => handleMouseEnter('highlights')}
                  onMouseLeave={handleMouseLeave}
                >
                  <Tv className="w-8 h-6" />
                  <span className="sr-only">Transcript View</span>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top" className="z-50 bg-[#2F3133] text-white p-2 rounded-md shadow-lg">
              View Highlights
            </TooltipContent>
          </Tooltip>
          <Tooltip open={activeTooltip === 'search'}>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="w-12 h-12 rounded-lg bg-[#CA60ED] hover:bg-[#d67ff3] transition-colors shadow-lg"
                onClick={() => setIsSearchOpen(true)}
                onMouseEnter={() => handleMouseEnter('search')}
                onMouseLeave={handleMouseLeave}
              >
                <Search className="w-6 h-6" />
                <span className="sr-only">Search</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="z-50 bg-[#2F3133] text-white p-2 rounded-md shadow-lg">
              Search
            </TooltipContent>
          </Tooltip>
        </div>
        <div ref={constraintsRef} className="fixed flex justify-center items-center inset-0 pointer-events-none">
          <FloatingVotingModule constraintsRef={constraintsRef} />
        </div>
        <SearchDialog isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      </div>
    </TooltipProvider>
  )
}