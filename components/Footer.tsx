import { TableOfContents, Target } from 'lucide-react'

type FooterProps = {
  currentSegment: string;
  currentTopic: string; // {{ edit_1 }} Added currentTopic to FooterProps
  targetAudience: string;
}

export default function Footer({ currentSegment, currentTopic, targetAudience }: FooterProps) {
  return (
    <footer className="bg-[#131214] border-t border-[#2F3133] p-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start text-[13px] space-y-2">
          <p className='flex items-center'>
            <TableOfContents className="w-3 h-4 me-1" /> {currentSegment}
          </p>
          <p>? {currentTopic}</p>
          <p className='flex items-center'>
            <Target className="w-3 h-4 me-1" /> {targetAudience}
          </p>
        </div>
      </div>
    </footer>
  )
}