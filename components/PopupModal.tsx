// components/PopupModal.tsx
import { X, BarChart2 } from 'lucide-react'

type PopupModalProps = {
  activePopup: string;
  handlePopupClose: () => void;
}

export default function PopupModal({
  activePopup,
  handlePopupClose
}: PopupModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#131214] border border-[#2F3133] p-6 rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)] w-3/4 h-3/4 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {activePopup === 'graph1' && 'Graph 1'}
            {activePopup === 'graph2' && 'Graph 2'}
            {activePopup === 'annotation' && 'Textual Annotation'}
          </h2>
          <button onClick={handlePopupClose} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="h-full bg-[#3a3a3a] rounded-md p-4">
          {activePopup === 'graph1' && <BarChart2 className="w-full h-full" />}
          {activePopup === 'graph2' && <BarChart2 className="w-full h-full" />}
          {activePopup === 'annotation' && (
            <div className="h-full flex items-center justify-center">
              <p className="text-xl">Expanded view of the textual annotation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}