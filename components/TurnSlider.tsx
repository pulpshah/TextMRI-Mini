import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TurnSliderProps {
  currentTurn: number;
  handleTurnChange: (turn: number) => void;
  transcriptDataLength: number;
}

const TurnSlider: React.FC<TurnSliderProps> = ({ currentTurn, handleTurnChange, transcriptDataLength }) => (
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
      max={transcriptDataLength}
      value={currentTurn}
      onChange={(e) => handleTurnChange(parseInt(e.target.value))}
      className="w-48 accent-[#CA60ED]"
    />
  </div>
);

export default TurnSlider;
