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

export default function App() {
  // State variables for managing various aspects of the application
  const [isRelatedMediaOpen, setIsRelatedMediaOpen] = useState(true)
  const [currentTurn, setCurrentTurn] = useState(1)
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [currentSegment, setCurrentSegment] = useState('')
  const [currentTopic, setCurrentTopic] = useState('')
  const [targetAudience, setTargetAudience] = useState('') // New state for targetAudience
  const transcriptRef = useRef<HTMLDivElement | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState('1')

  // Ref for constraining the floating voting module
  const constraintsRef = useRef(null)

  // Type definition for a debate turn
  type DebateTurn = {
    speaker: string;
    startTime: number;
    endTime: number;
    cumulative_score: number;
    content: string;
    turn_score: number;
    Phase: string; // Added Phase for segment
    Topic: string; // Added Topic for current topic
    target_audience: string; // Added target_audience for the target audience
  };
  
  // Load debate data from JSON file
  const dataObj: DebateTurn[] = JFile.Data;
  
  // Function to get the number of turns for Kamala Harris
  const getKamalaTurn = () => {
    return dataObj.slice(0, currentTurn).filter(turn => turn.speaker === "Kamala Harris").length;
  };

  // Function to get the number of turns for Donald Trump
  const getTrumpTurn = () => {
    return dataObj.slice(0, currentTurn).filter(turn => turn.speaker === "Donald Trump").length;
  };

  // Function to format time in minutes:seconds
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Function to get speaking time for a specific speaker
  const getSpeakerTime = (speaker: string) => {
    const seconds = dataObj
      .slice(0, currentTurn)
      .filter(turn => turn.speaker === speaker)
      .reduce((total, turn) => total + (turn.endTime - turn.startTime), 0);
    return formatTime(seconds);
  };
  
  // Functions to get speaking time for Kamala Harris and Donald Trump
  const getKamalaTime = () => getSpeakerTime("Kamala Harris");
  const getTrumpTime = () => getSpeakerTime("Donald Trump");

  // Function to get total debate time
  const getTotalTime = () => {
    const seconds = dataObj
      .slice(0, currentTurn)
      .filter(turn => turn.startTime)
      .reduce((total, turn) => total + (turn.endTime - turn.startTime), 0);
    return formatTime(seconds);
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
  
  // Prepare transcript data for rendering
  const transcriptData = dataObj.map((turn, index) => ({
    turn: index + 1,
    speaker: turn.speaker,
    content: turn.content,
    turn_score: turn.turn_score // {{ edit_1 }} Added turn_score property
  }));

  // Function to update current segment based on current turn
  const updateCurrentSegment = () => {
    const currentTurnData = dataObj.find(turn => turn.turn === currentTurn);
    setCurrentSegment(currentTurnData ? currentTurnData.Phase : '');
  };

  // Function to update current topic based on current turn
  const updateCurrentTopic = () => {
    const currentTurnData = dataObj.find(turn => turn.turn === currentTurn);
    setCurrentTopic(currentTurnData ? currentTurnData.Topic : '');
  };

  // Function to update target audience based on current turn
  const updateTargetAudience = () => {
    const currentTurnData = dataObj.find(turn => turn.turn === currentTurn);
    setTargetAudience(currentTurnData ? currentTurnData.target_audience : '');
  };

  // useEffect to update segment, topic, and target audience whenever currentTurn changes
  useEffect(() => {
    updateCurrentSegment();
    updateCurrentTopic();
    updateTargetAudience(); // Update target audience
  }, [currentTurn]);

  // Function to handle turn changes
  const handleTurnChange = (newTurn: number) => {
    setCurrentTurn(Math.max(1, Math.min(newTurn, transcriptData.length)))
  }

  return (
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
        {/* Toggle button for related media */}
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#3a3a3a] p-2 rounded-l-md hover:bg-[#4a4a4a] transition-all duration-300"
          onClick={() => setIsRelatedMediaOpen(!isRelatedMediaOpen)}
        >
          {isRelatedMediaOpen ? <ChevronRight className="w-6 h-6" /> : <Radio className="w-6 h-6" />}
        </button>
      </div>
      {/* Footer component */}
      <Footer 
        currentSegment={currentSegment} 
        currentTopic={currentTopic} 
        targetAudience={targetAudience} // Pass target audience to Footer
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
      {/* Fixed buttons for transcript view and search */}
      <div className="fixed bottom-4 right-4 flex space-x-2 items-center">
        <Link href="/highlights" passHref>
          <Button
            className="w-20 h-12 rounded-lg bg-[#3a3a3a] hover:bg-[#4a4a4a] transition-colors shadow-lg flex items-center justify-center"
          >
            <Tv className="w-8 h-6" />
            <span className="sr-only">Transcript View</span>
          </Button>
        </Link>
        <Button
          variant="default"
          size="icon"
          className="w-12 h-12 rounded-lg bg-[#CA60ED] hover:bg-[#d67ff3] transition-colors shadow-lg"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="w-6 h-6" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
      {/* Floating voting module */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none">
        <FloatingVotingModule constraintsRef={constraintsRef} />
      </div>
      {/* Search dialog component */}
      <SearchDialog isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
    </div>
  )
}
