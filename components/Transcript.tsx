"use client"

import { User } from 'lucide-react'
import { useRef, useEffect } from 'react'
import Image from 'next/image'

// Define the props type for the Transcript component
type TranscriptProps = {
  transcriptData: Array<{
    turn: number;
    speaker: string;
    content: string;
    turn_score: number;
  }>;
  currentTurn: number;
  handleTurnChange: (turn: number) => void;
}

export default function Transcript({ transcriptData, currentTurn, handleTurnChange }: TranscriptProps) {
  // Create a ref to the transcript container div
  const transcriptRef = useRef<HTMLDivElement | null>(null);

  // Effect to scroll to the current turn when it changes
  useEffect(() => {
    if (transcriptRef.current) {
      const turnElement = transcriptRef.current.querySelector(`[data-turn="${currentTurn}"]`)
      if (turnElement) {
        turnElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }, [currentTurn])

  // Function to determine the outline color based on the speaker
  const getOutlineColor = (speaker: string) => {
    switch (speaker) {
      case "Donald Trump":
        return "border-red-600";
      case "Kamala Harris":
        return "border-blue-600";
      default:
        return "border-[#CA60ED]";
    }
  };

  // Function to get the speaker's image URL
  const getSpeakerImage = (speaker: string) => {
    switch (speaker) {
      case "Donald Trump":
        return "/profiles/trump.png";
      case "Kamala Harris":
        return "/profiles/harris.png";
      case "Linsey Davis":
        return "/profiles/davis.jpg";
      case "David Muir":
        return "/profiles/muir.jpg";
      default:
        return "";
    }
  };

  return (
    <div className="w-1/2 flex flex-col space-y-4">
      <div className="flex-1 p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)] overflow-hidden">
        <h2 className="text-xl font-semibold mb-2">Transcript</h2>
        {/* Transcript container with custom scrollbar */}
        <div ref={transcriptRef} className="h-[calc(100%-2rem)] overflow-y-auto pr-2 custom-scrollbar">
          <div className="space-y-4">
            {/* Map through transcript data and render each turn */}
            {transcriptData.map((item, index) => (
              <div
                key={index}
                data-turn={item.turn}
                className={`p-3 bg-[#3a3a3a] rounded-md transition-all duration-300 cursor-pointer ${
                  currentTurn === item.turn ? `border-2 ${getOutlineColor(item.speaker)}` : ''
                }`}
                onClick={() => handleTurnChange(item.turn)}
              >
                <div className="flex items-center justify-between mb-2">
                  {/* Speaker information */}
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#4a4a4a] rounded-full flex items-center justify-center overflow-hidden">
                      {getSpeakerImage(item.speaker) ? (
                        <Image
                          src={getSpeakerImage(item.speaker)}
                          alt={item.speaker}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>
                    <span className="font-semibold">{item.speaker}</span>
                  </div>
                  {/* Turn number and score */}
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Turn {item.turn}</span>
                    <span className="text-xs px-2 py-1 bg-[#2F3133] rounded-full">Score: {item.turn_score}</span>
                  </div>
                </div>
                {/* Turn content */}
                <p className="text-gray-300">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}