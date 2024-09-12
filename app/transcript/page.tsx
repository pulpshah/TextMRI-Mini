'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronRight, Tv, Search, ChevronLeft, BarChart2, FileText, User, X, Target, Timer, TableOfContents, Maximize2, Volume2, Radio, Headphones, Video, FileText as ArticleIcon } from 'lucide-react'
import { motion } from 'framer-motion'

import Link from 'next/link'

import { Button } from "@/components/ui/button"
import JFile from "@/public/data/Trump_Harris_Annotated_Transcript.json"

import Header from '@/components/Header'
import Transcript from '@/components/Transcript'
import GraphsAndAnnotations from '@/components/GraphsAndAnnotations'
import RelatedMedia from '@/components/RelatedMedia'
import Footer from '@/components/Footer'
import TurnSlider from '@/components/TurnSlider'
import FloatingVotingModule from '@/components/FloatingVotingModule'
import SearchDialog from '@/components/SearchDialog'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent  } from '@radix-ui/react-tooltip'

export default function App() {
  const [isRelatedMediaOpen, setIsRelatedMediaOpen] = useState(true)
  const [currentTurn, setCurrentTurn] = useState(1)
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [currentSegment, setCurrentSegment] = useState('')
  const [currentTopic, setCurrentTopic] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null); 
  const transcriptRef = useRef<HTMLDivElement | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState('1')

  const constraintsRef = useRef(null)

  type DebateTurn = {
    speaker: string;
    startTime: number;
    endTime: number;
    cumulative_score: number;
    content: string;
    turn_score: number;
    Phase: string;
    Topic: string;
    target_audience: string;
    turn: number;
    speaking_time_per_turn: string;
    speaking_time_current_previous_speaker: string;
    speaking_time_cumulative_general: string;
  };
  
  const dataObj: DebateTurn[] = JFile.Data;

  const handleMouseEnter = (tooltip: string) => setActiveTooltip(tooltip);
  const handleMouseLeave = () => setActiveTooltip(null);

  const getKamalaTurn = () => {
    return dataObj.slice(0, currentTurn).filter(turn => turn.speaker === "Kamala Harris").length;
  };

  const getTrumpTurn = () => {
    return dataObj.slice(0, currentTurn).filter(turn => turn.speaker === "Donald Trump").length;
  };

  // Function to get speaking time for a specific speaker using new JSON field
  const getSpeakerTime = (speaker: string) => {
    const turns = dataObj.slice(0, currentTurn).filter(turn => turn.speaker === speaker);
    return turns.length > 0 ? turns[turns.length - 1].speaking_time_current_previous_speaker : '0:00';
  };
  
  // Functions to get speaking time for Kamala Harris and Donald Trump
  const getKamalaTime = () => getSpeakerTime("Kamala Harris");
  const getTrumpTime = () => getSpeakerTime("Donald Trump");

  // Function to get total debate time using new JSON field
  const getTotalTime = () => {
    return dataObj[currentTurn - 1]?.speaking_time_cumulative_general || '0:00';
  };

  // Function to get the cumulative score for a specific speaker
  const getSpeakerScore = (speaker: string) => {
    const turns = dataObj.slice(0, currentTurn + 1)
      .filter(turn => turn.speaker === speaker);
    return turns.length > 0 ? turns[turns.length - 1].cumulative_score : 0;
  };
  
  // Functions to get scores for Kamala Harris and Donald Trump
  const getKamalaScore = () => getSpeakerScore("Kamala Harris");
  const getTrumpScore = () => getSpeakerScore("Donald Trump");
  
  const transcriptData = dataObj.map((turn, index) => ({
    turn: index + 1,
    speaker: turn.speaker,
    content: turn.content,
    turn_score: turn.turn_score
  }));

  const updateCurrentSegment = () => {
    const currentTurnData = dataObj.find(turn => turn.turn === currentTurn);
    setCurrentSegment(currentTurnData ? currentTurnData.Phase : '');
  };

  const updateCurrentTopic = () => {
    const currentTurnData = dataObj.find(turn => turn.turn === currentTurn);
    setCurrentTopic(currentTurnData ? currentTurnData.Topic : '');
  };

  const updateTargetAudience = () => {
    const currentTurnData = dataObj.find(turn => turn.turn === currentTurn);
    setTargetAudience(currentTurnData ? currentTurnData.target_audience : '');
  };

  useEffect(() => {
    updateCurrentSegment();
    updateCurrentTopic();
    updateTargetAudience();
  }, [currentTurn]);

  const handleTurnChange = (newTurn: number) => {
    setCurrentTurn(Math.max(1, Math.min(newTurn, transcriptData.length)))
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen text-white bg-[#131214] max-minimum:hidden">
        {/* Header component with debate statistics */}
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
              {/* Transcript component */}
              <Transcript 
                transcriptData={transcriptData} 
                currentTurn={currentTurn} 
                handleTurnChange={handleTurnChange} 
              />
              {/* Graphs and annotations component */}
              <GraphsAndAnnotations />
            </div>
          </main>
          {/* Related media component */}
          <RelatedMedia isRelatedMediaOpen={isRelatedMediaOpen} currentTurn={currentTurn} />
          {/* Tooltip for related media toggle button */}
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
        {/* Footer component */}
        <Footer 
          currentSegment={currentSegment} 
          currentTopic={currentTopic} 
          targetAudience={targetAudience}
        />
        {/* Turn slider component */}
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
        {/* Fixed buttons for transcript view and search with tooltips */}
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
        {/* Floating voting module */}
        <div ref={constraintsRef} className="fixed flex justify-center items-center inset-0 pointer-events-none">
          <FloatingVotingModule constraintsRef={constraintsRef} />
        </div>
        {/* Search dialog component */}
        <SearchDialog isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      </div>
    </TooltipProvider>
  )
}
