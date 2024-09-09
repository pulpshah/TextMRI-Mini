interface GraphProps {
  handlePopupOpen: (popupId: string) => void;
}

const GraphSection: React.FC<GraphProps> = ({ handlePopupOpen }) => (
  <div className="w-1/2 flex flex-col space-y-4 overflow-y-auto pr-2 custom-scrollbar">
    <div
      className="flex-1 p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)] cursor-pointer transform transition-all duration-300"
      onClick={() => handlePopupOpen('graph1')}
    >
      <h2 className="text-xl font-semibold mb-2">Graph or chart</h2>
      <div className="h-64 bg-[#3a3a3a] rounded-md"></div>
    </div>
    <div
      className="flex-1 p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)] cursor-pointer transform transition-all duration-300"
      onClick={() => handlePopupOpen('annotation')}
    >
      <h2 className="text-xl font-semibold mb-2">Textual Annotation</h2>
      <p className="text-gray-300">Explain Stuff</p>
    </div>
  </div>
);

export default GraphSection;
