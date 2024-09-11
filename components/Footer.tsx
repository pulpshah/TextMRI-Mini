'use client'

import { useState, useRef, useCallback } from 'react'
import { TableOfContents, Target } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type FooterProps = {
  currentSegment: string;
  currentTopic: string; // Added currentTopic to FooterProps
  targetAudience: string;
}

export default function Footer({ currentSegment, currentTopic, targetAudience }: FooterProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback((tooltipId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveTooltip(tooltipId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveTooltip(null);
    }, 150);
  }, []);

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
        align="start" 
        className="z-50 bg-[#2F3133] text-white p-2 rounded-md shadow-lg"
        onMouseEnter={() => handleMouseEnter(id)}
        onMouseLeave={handleMouseLeave}
      >
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  ), [activeTooltip, handleMouseEnter, handleMouseLeave]);

  return (
    <TooltipProvider>
      <footer className="bg-[#131214] border-t border-[#2F3133] p-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start text-[13px] space-y-2">
            {/* Tooltip for Current Segment */}
            <TooltipWrapper id="segment" content="Current segment of the debate">
              <p className='flex items-center cursor-help'>
                <TableOfContents className="w-3 h-4 me-1" /> {currentSegment}
              </p>
            </TooltipWrapper>
            
            {/* Tooltip for Current Topic */}
            <TooltipWrapper id="topic" content="Topic of the current segment">
              <p className='cursor-help'>
                ? {currentTopic}
              </p>
            </TooltipWrapper>
            
            {/* Tooltip for Target Audience */}
            <TooltipWrapper id="audience" content="Target audience for the current statement">
              <p className='flex items-center cursor-help'>
                <Target className="w-3 h-4 me-1" /> {targetAudience}
              </p>
            </TooltipWrapper>
          </div>
        </div>
      </footer>
    </TooltipProvider>
  )
}
