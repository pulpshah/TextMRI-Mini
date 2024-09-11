import { ChevronLeft, ChevronRight, Timer } from 'lucide-react'

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

  return (
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
  )
}