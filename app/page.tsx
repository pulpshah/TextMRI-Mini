// App.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import Header from '@/components/Header'
import Transcript from '@/components/transcript'
import VotableQuestion from '@/components/VotableQuestion'
import GraphCard from '@/components/GraphCard'
import TextAnnotationCard from '@/components/TextAnnotationCard'
import RelatedMedia from '@/components/RelatedMedia'
import Footer from '@/components/Footer'
import TurnNavigator from '@/components/TurnNavigator'
import PopupModal from '@/components/PopupModal'
import JFile from "@/public/data/debate_analysis1.json"

export default function App() {
  const [isRelatedMediaOpen, setIsRelatedMediaOpen] = useState(true)
  const [currentTurn, setCurrentTurn] = useState(1)
  const [activePopup, setActivePopup] = useState<string | null>(null)
  const [currentSegment, setCurrentSegment] = useState('Introduction')
  const [speakerPurpose, setSpeakerPurpose] = useState('To inform')
  const [targetAudience, setTargetAudience] = useState('Voters, Candidates')
  const transcriptRef = useRef<HTMLDivElement | null>(null)

  type DebateTurn = {
    speaker: string;
    startTime: number;
    endTime: number;
    score: number;
    content: string;
  };
  
  const dataObj: DebateTurn[] = JFile.Data;

  // Utility functions
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

  const getSpeakerTurns = (speaker: string) => {
    return dataObj.slice(0, currentTurn + 1).filter(turn => turn.speaker === speaker).length;
  };

  const getSpeakerScore = (speaker: string) => {
    const turns = dataObj.slice(0, currentTurn + 1)
      .filter(turn => turn.speaker === speaker);
    return turns.length > 0 ? turns[turns.length - 1].score : 0;
  };

  const getTotalTime = () => {
    const seconds = dataObj
      .slice(0, currentTurn)
      .filter(turn => turn.startTime)
      .reduce((total, turn) => total + (turn.endTime - turn.startTime), 0);
    return formatTime(seconds);
  };

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
      <Header
        getTrumpTime={() => getSpeakerTime("Donald Trump")}
        getTrumpTurns={() => getSpeakerTurns("Donald Trump")}
        getKamalaTime={() => getSpeakerTime("Kamala Harris")}
        getKamalaTurns={() => getSpeakerTurns("Kamala Harris")}
        getTrumpScore={() => getSpeakerScore("Donald Trump")}
        getKamalaScore={() => getSpeakerScore("Kamala Harris")}
      />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-4 overflow-hidden">
          <div className="flex h-full space-x-4">
            <div className="w-1/2 flex flex-col space-y-4">
              <Transcript
                transcriptRef={transcriptRef}
                transcriptData={transcriptData}
                currentTurn={currentTurn}
                handleTurnChange={handleTurnChange}
              />
              <VotableQuestion
                question={votableQuestions[currentQuestionIndex]}
              />
            </div>
            <div className="w-1/2 flex flex-col space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              <GraphCard title="Graph 1" handlePopupOpen={() => handlePopupOpen('graph1')} />
              <TextAnnotationCard handlePopupOpen={() => handlePopupOpen('annotation')} />
              <GraphCard title="Graph 2" handlePopupOpen={() => handlePopupOpen('graph2')} />
              <TextAnnotationCard handlePopupOpen={() => handlePopupOpen('annotation')} />
            </div>
          </div>
        </main>
        <RelatedMedia
          isOpen={isRelatedMediaOpen}
          setIsOpen={setIsRelatedMediaOpen}
        />
      </div>
      <Footer
        getTotalTime={getTotalTime}
        currentSegment={currentSegment}
        speakerPurpose={speakerPurpose}
        targetAudience={targetAudience}
      />
      <TurnNavigator
        currentTurn={currentTurn}
        handleTurnChange={handleTurnChange}
        maxTurns={transcriptData.length}
      />
      {activePopup && (
        <PopupModal
          activePopup={activePopup}
          handlePopupClose={handlePopupClose}
        />
      )}
    </div>
  )
}