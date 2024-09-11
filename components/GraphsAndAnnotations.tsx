"use client"

import { BarChart2 } from 'lucide-react'

export default function GraphsAndAnnotations() {
  return (
    // Main container: half width, column layout, scrollable with custom scrollbar
    <div className="w-1/2 flex flex-col space-y-4 overflow-y-auto pr-2 custom-scrollbar">
      {/* Graph 1 container */}
      <div className="flex-1 p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)]">
        <h2 className="text-xl font-semibold mb-2">Graph 1</h2>
        {/* Placeholder for actual graph, currently using BarChart2 icon */}
        <div className="h-64 bg-[#3a3a3a] rounded-md flex items-center justify-center">
          <BarChart2 className="w-full h-full p-4" />
        </div>
      </div>

      {/* Textual Annotation container */}
      <div className="flex-1 p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)]">
        <h2 className="text-xl font-semibold mb-2">Textual Annotation</h2>
        <p className="text-gray-300">This section provides detailed explanations and context for the debate topics and statements made by the candidates.</p>
      </div>

      {/* Graph 2 container */}
      <div className="flex-1 p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)]">
        <h2 className="text-xl font-semibold mb-2">Graph 2</h2>
        {/* Placeholder for actual graph, currently using BarChart2 icon */}
        <div className="h-64 bg-[#3a3a3a] rounded-md flex items-center justify-center">
          <BarChart2 className="w-full h-full p-4" />
        </div>
      </div>

      {/* Additional Annotation container */}
      <div className="flex-1 p-4 bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)]">
        <h2 className="text-xl font-semibold mb-2">Additional Annotation</h2>
        <p className="text-gray-300">This section provides further analysis and insights into the debate proceedings and candidate performances.</p>
      </div>
    </div>
  )
}