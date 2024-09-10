// components/TextAnnotationCard.tsx
type TextAnnotationCardProps = {
    handlePopupOpen: () => void;
  }
  
  export default function TextAnnotationCard({ handlePopupOpen }: TextAnnotationCardProps) {
    return (
      <div 
        className="flex-1 p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)] cursor-pointer transform transition-all duration-300"
        onClick={handlePopupOpen}
      >
        <h2 className="text-xl font-semibold mb-2">Textual Annotation</h2>
        <p className="text-gray-300">Explain Stuff</p>
      </div>
    )
  }