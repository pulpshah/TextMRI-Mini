"use client"
import { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Timer } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type TurnSliderProps = {
  currentTurn: number;
  handleTurnChange: (turn: number) => void;
  transcriptData: Array<any>;
  getTotalTime: () => string;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  editValue: string;
  setEditValue: (value: string) => void;
}

export default function TurnSlider({ 
  currentTurn, 
  handleTurnChange, 
  transcriptData, 
  getTotalTime,
  isEditing,
  setIsEditing,
  editValue,
  setEditValue
}: TurnSliderProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const handleMouseEnter = useCallback((tooltipId: string) => {
    setActiveTooltip(tooltipId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveTooltip(null);
  }, []);

  const handleEditStart = () => {
    setIsEditing(true);
    setEditValue('');
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value)
  }

  const handleEditComplete = () => {
    if (editValue === '') {
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

  const TooltipWrapper = useCallback(({ id, children, content }: { id: string; children: React.ReactNode; content: string }) => (
    <Tooltip open={activeTooltip === id}>
      <TooltipTrigger asChild>
        <div
          onMouseEnter={() => handleMouseEnter(id)}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent 
        side="top" 
        align="center" 
        className="z-50 bg-[#2F3133] text-white p-2 rounded-md shadow-lg"
      >
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  ), [activeTooltip, handleMouseEnter, handleMouseLeave]);

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#131214] border border-[#2F3133] rounded-xl p-2 flex items-center space-x-4 shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)]">
        <div className="flex items-center space-x-2">
          <TooltipWrapper id="prev-turn" content="Previous turn">
            <button onClick={() => handleTurnChange(currentTurn - 1)} className="w-8 h-8 bg-[#3a3a3a] rounded-full flex items-center justify-center hover:bg-[#4a4a4a] transition-all duration-300">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </TooltipWrapper>
          <TooltipWrapper id="current-turn" content="Click to editcurrent turn">
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
          </TooltipWrapper>
          <TooltipWrapper id="next-turn" content="Next turn">
            <button onClick={() => handleTurnChange(currentTurn + 1)} className="w-8 h-8 bg-[#3a3a3a] rounded-full flex items-center justify-center hover:bg-[#4a4a4a] transition-all duration-300">
              <ChevronRight className="w-5 h-5" />
            </button>
          </TooltipWrapper>
        </div>
        <TooltipWrapper id="turn-slider" content="Drag to navigate through turns">
          <input
            type="range"
            min="1"
            max={transcriptData.length}
            value={currentTurn}
            onChange={(e) => handleTurnChange(parseInt(e.target.value))}
            className="w-48 accent-[#CA60ED]"
          />
        </TooltipWrapper>
        <TooltipWrapper id="total-time" content="Total debate time">
          <div className="flex items-center space-x-1">
            <Timer className="w-6 h-6" />
            <span className="text-lg">{getTotalTime()}</span>
          </div>
        </TooltipWrapper>
      </div>
    </TooltipProvider>
  )
}