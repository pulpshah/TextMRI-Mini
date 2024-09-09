import { User } from 'lucide-react';

interface TranscriptProps {
  transcriptData: any[];
  currentTurn: number;
  handleTurnChange: (turn: number) => void;
  transcriptRef: any;
}

const TranscriptSection: React.FC<TranscriptProps> = ({ transcriptData, currentTurn, handleTurnChange, transcriptRef }) => (
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
);

export default TranscriptSection;
