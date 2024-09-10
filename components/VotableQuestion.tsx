// components/VotableQuestion.tsx
type VotableQuestionProps = {
    question: string;
  }
  
  export default function VotableQuestion({ question }: VotableQuestionProps) {
    return (
      <div className="h-auto p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)]">
        <h2 className="text-xl font-semibold mb-4 text-center">"{question}"</h2>
        <p className="mb-4 text-gray-400 text-center">How would you assess this statement—valid, invalid, or would you prefer to abstain from making a judgment?</p>
        <div className="flex space-x-2 mb-4 justify-center">
          <button className="px-4 py-2 bg-[#CA60ED] rounded-md hover:bg-purple-700 transition-colors">Invalid</button>
          <button className="px-4 py-2 bg-[#3a3a3a] rounded-md hover:bg-[#4a4a4a] transition-colors">Abstain</button>
          <button className="px-4 py-2 bg-[#3a3a3a] rounded-md hover:bg-[#4a4a4a] transition-colors">Valid</button>
        </div>
      </div>
    )
  }