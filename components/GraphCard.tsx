// components/GraphCard.tsx
type GraphCardProps = {
    title: string;
    handlePopupOpen: () => void;
  }
  
  export default function GraphCard({ title, handlePopupOpen }: GraphCardProps) {
    return (
      <div 
        className="flex-1 p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)] cursor-pointer transform transition-all duration-300"
        onClick={handlePopupOpen}
      >
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className="h-64 bg-[#3a3a3a] rounded-md"></div>
      </div>
    )
  }