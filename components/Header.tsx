"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type HeaderProps = {
  getTrumpTime: () => string;
  getTrumpTurn: () => number;
  getKamalaTime: () => string;
  getKamalaTurn: () => number;
  getTrumpScore: () => number;
  getKamalaScore: () => number;
}

const quickTooltipOptions = { delayDuration: 100, skipDelayDuration: 300 }

export default function Header({ getTrumpTime, getTrumpTurn, getKamalaTime, getKamalaTurn, getTrumpScore, getKamalaScore }: HeaderProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const handleMouseEnter = (tooltipId: string) => {
    setActiveTooltip(tooltipId);
  };

  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

  return (
    <TooltipProvider delayDuration={100} skipDelayDuration={300}>
      <header className="p-4 bg-[#131214] border-b border-[#2F3133]">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Tooltip open={activeTooltip === 'trump-pfp'} {...quickTooltipOptions}>
              <TooltipTrigger asChild>
                <div 
                  className="relative cursor-help"
                  onMouseEnter={() => handleMouseEnter('trump-pfp')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="absolute inset-0 rounded-full border-4 border-red-600"></div>
                  <Image src="/profiles/trump.png" alt="Donald J. Trump" width={48} height={48} className="rounded-full" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="start" className="z-50 bg-[#2F3133] text-white p-2 rounded-md shadow-lg">
                <p>Donald J. Trump, 45th President of the United States</p>
              </TooltipContent>
            </Tooltip>
            <div>
              <h3 className="font-semibold flex items-center">
                <span 
                  className="cursor-help"
                  onMouseEnter={() => handleMouseEnter('trump-name')}
                  onMouseLeave={handleMouseLeave}
                >
                  Donald J. Trump
                </span>
                <Tooltip open={activeTooltip === 'republican'} {...quickTooltipOptions}>
                  <TooltipTrigger asChild>
                    <Image 
                      src="/profiles/republicanIcon.svg" 
                      alt="Republican Party" 
                      width={18} 
                      height={16} 
                      className="ml-2 cursor-help"
                      onMouseEnter={() => handleMouseEnter('republican')}
                      onMouseLeave={handleMouseLeave}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center" className="z-50 bg-[#2F3133] text-white p-2 rounded-md shadow-lg">
                    <p>Republican Party</p>
                  </TooltipContent>
                </Tooltip>
              </h3>
              <div className="flex items-center space-x-2 text-sm">
                <Tooltip open={activeTooltip === 'trump-time'} {...quickTooltipOptions}>
                  <TooltipTrigger asChild>
                    <span 
                      className="cursor-help"
                      onMouseEnter={() => handleMouseEnter('trump-time')}
                      onMouseLeave={handleMouseLeave}
                    >
                      Talk Time: {getTrumpTime()} 
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="start" className="z-50 bg-[#2F3133] text-white p-2 rounded-md shadow-lg">
                    <p>Total time Trump has spoken in the debate</p>
                  </TooltipContent>
                </Tooltip>
                <span>•</span>
                <Tooltip open={activeTooltip === 'trump-turns'} {...quickTooltipOptions}>
                  <TooltipTrigger asChild>
                    <span 
                      className="cursor-help"
                      onMouseEnter={() => handleMouseEnter('trump-turns')}
                      onMouseLeave={handleMouseLeave}
                    >
                      Turns: {getTrumpTurn()}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="start" className="z-50 bg-[#2F3133] text-white p-2 rounded-md shadow-lg">
                    <p>Number of times Trump has spoken</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text animate-pulse">
                
              </div>
              <div className="text-xl w-16 mx-auto mt-2 mb-2">
                <img src="profiles/logo.svg" alt="" />
              </div>
              <Tooltip open={activeTooltip === 'scores'} {...quickTooltipOptions}>
                <TooltipTrigger asChild>
                  <div 
                    className="text-4xl font-bold bg-gradient-to-r from-red-600 to-blue-600 text-transparent bg-clip-text animate-pulse cursor-help"
                    onMouseEnter={() => handleMouseEnter('scores')}
                    onMouseLeave={handleMouseLeave}
                  >
                    {getTrumpScore()} • {getKamalaScore()}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" align="center" className="z-50 bg-[#2F3133] text-white p-2 rounded-md shadow-lg">
                  <p>Debate scores: Trump's score • Harris's score</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <h3 className="font-semibold flex items-center justify-end">
                <Tooltip open={activeTooltip === 'democrat'} {...quickTooltipOptions}>
                  <TooltipTrigger asChild>
                    <Image 
                      src="/profiles/democratIcon.svg" 
                      alt="Democratic Party" 
                      width={20} 
                      height={16} 
                      className="mr-2 cursor-help"
                      onMouseEnter={() => handleMouseEnter('democrat')}
                      onMouseLeave={handleMouseLeave}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center" className="z-50 bg-[#2F3133] text-white p-2 rounded-md shadow-lg">
                    <p>Democratic Party</p>
                  </TooltipContent>
                </Tooltip>
                <span 
                  className="cursor-help"
                  onMouseEnter={() => handleMouseEnter('harris-name')}
                  onMouseLeave={handleMouseLeave}
                >
                  Kamala Harris
                </span>
              </h3>
              <div className="flex items-center space-x-2 text-sm justify-end">
                <Tooltip open={activeTooltip === 'harris-time'} {...quickTooltipOptions}>
                  <TooltipTrigger asChild>
                    <span 
                      className="cursor-help"
                      onMouseEnter={() => handleMouseEnter('harris-time')}
                      onMouseLeave={handleMouseLeave}
                    >
                      Talk Time: {getKamalaTime()} 
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="end" className="z-50 bg-[#2F3133] text-white p-2 rounded-md shadow-lg">
                    <p>Total time Harris has spoken in the debate</p>
                  </TooltipContent>
                </Tooltip>
                <span>•</span>
                <Tooltip open={activeTooltip === 'harris-turns'} {...quickTooltipOptions}>
                  <TooltipTrigger asChild>
                    <span 
                      className="cursor-help"
                      onMouseEnter={() => handleMouseEnter('harris-turns')}
                      onMouseLeave={handleMouseLeave}
                    >
                      Turns: {getKamalaTurn()}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="end" className="z-50 bg-[#2F3133] text-white p-2 rounded-md shadow-lg">
                    <p>Number of times Harris has spoken</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <Tooltip open={activeTooltip === 'harris-pfp'} {...quickTooltipOptions}>
              <TooltipTrigger asChild>
                <div 
                  className="relative cursor-help"
                  onMouseEnter={() => handleMouseEnter('harris-pfp')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="absolute inset-0 rounded-full border-4 border-blue-600"></div>
                  <Image src="/profiles/harris.png" alt="Kamala Harris" width={48} height={48} className="rounded-full" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="end" className="z-50 bg-[#2F3133] text-white p-2 rounded-md shadow-lg">
                <p>Kamala Harris, Vice President of the United States</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </header>
    </TooltipProvider>
  )
}