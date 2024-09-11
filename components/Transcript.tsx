import { User } from 'lucide-react'
import { useRef, useEffect } from 'react'

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
  const transcriptRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (transcriptRef.current) {
      const turnElement = transcriptRef.current.querySelector(`[data-turn="${currentTurn}"]`)
      if (turnElement) {
        turnElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }, [currentTurn])

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

  return (
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
                  currentTurn === item.turn ? `border-2 ${getOutlineColor(item.speaker)}` : ''
                }`}
                onClick={() => handleTurnChange(item.turn)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#4a4a4a] rounded-full flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">{item.speaker}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Turn {item.turn}</span>
                    <span className="text-xs px-2 py-1 bg-[#2F3133] rounded-full">Score: {item.turn_score}</span>
                  </div>
                </div>
                <p className="text-gray-300">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}