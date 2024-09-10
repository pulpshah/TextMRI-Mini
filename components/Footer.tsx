// components/Footer.tsx
import { Timer, TableOfContents, Target } from 'lucide-react'

type FooterProps = {
  getTotalTime: () => string;
  currentSegment: string;
  speakerPurpose: string;
  targetAudience: string;
}

export default function Footer({
  getTotalTime,
  currentSegment,
  speakerPurpose,
  targetAudience
}: FooterProps) {
  return (
    <footer className="bg-[#131214] border-t border-[#2F3133] p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-[30px] space-x-4">
          <span className='flex justify-center items-center gap-2'>
            <Timer className="w-8 h-8" /> {getTotalTime()} 
          </span>
        </div>
        <div className="flex flex-col items-end text-[13px] space-y-2">
          <p className='flex items-center'>
            <TableOfContents className="w-4 h-4 me-1" /> {currentSegment}
          </p>
          <p>?: {speakerPurpose}</p>
          <p className='flex items-center'>
            <Target className="w-4 h-4" /> : {targetAudience}
          </p>
        </div>
      </div>
    </footer>
  )
}