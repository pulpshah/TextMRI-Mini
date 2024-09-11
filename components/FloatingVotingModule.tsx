"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GripHorizontal, Minimize2, Vote } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

type FloatingVotingModuleProps = {
  constraintsRef: React.RefObject<HTMLDivElement>;
}

export default function FloatingVotingModule({ constraintsRef }: FloatingVotingModuleProps) {
  const [isMinimized, setIsMinimized] = useState(true)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [hasNewQuestion, setHasNewQuestion] = useState(false)
  const lastQuestionIndexRef = useRef(0)

  const votableQuestions = [
    "Because you'd be in jail.",
    "We're going to make America great again.",
    "I have a plan for that.",
    "It's a disaster, folks.",
    "We need to build bridges, not walls.",
    "I'm not a politician, I'm a businessman."
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestionIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % votableQuestions.length
        if (newIndex !== lastQuestionIndexRef.current) {
          setHasNewQuestion(true)
          lastQuestionIndexRef.current = newIndex
        }
        return newIndex
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleDragStart = () => setIsDragging(true)
  const handleDragEnd = () => setIsDragging(false)

  const handleClick = () => {
    if (!isDragging) {
      setIsMinimized(false)
      setHasNewQuestion(false)
    }
  }

  const shapeVariants = {
    minimized: { 
      width: 64, 
      height: 64, 
      borderRadius: 32,
      transition: { duration: 0.3, type: 'spring', stiffness: 500, damping: 30 }
    },
    expanded: { 
      width: 320, 
      height: 'auto', 
      borderRadius: 8,
      transition: { duration: 0.3, type: 'spring', stiffness: 500, damping: 30 }
    }
  }

  const contentVariants = {
    minimized: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 }
    },
    expanded: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, delay: 0.1 }
    }
  }

  return (
    <TooltipProvider>
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={constraintsRef}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        initial={position}
        animate={position}
        variants={shapeVariants}
        initial="minimized"
        animate={isMinimized ? "minimized" : "expanded"}
        style={{ originX: 0.5, originY: 0.5 }}
        className="absolute bg-[#131214] border border-[#2F3133] shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)] overflow-hidden pointer-events-auto"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isMinimized ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  key="minimized"
                  variants={contentVariants}
                  initial="minimized"
                  animate="expanded"
                  exit="minimized"
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                  onClick={handleClick}
                >
                  <div className="relative">
                    <Vote className="w-8 h-8 text-gray-400" />
                    {hasNewQuestion && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-4 h-4 bg-[#CA60ED] rounded-full"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                      />
                    )}
                  </div>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-[#2F3133] text-white p-2 rounded-md max-w-xs">
                <p className="text-sm">{votableQuestions[currentQuestionIndex]}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <motion.div
              key="expanded"
              variants={contentVariants}
              initial="minimized"
              animate="expanded"
              exit="minimized"
            >
              <div className="p-1 bg-[#2F3133] flex justify-between items-center cursor-move">
                <GripHorizontal className="w-4 h-4 text-gray-400 ml-2" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(true)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4 text-center text-white">
                  "{votableQuestions[currentQuestionIndex]}"
                </h2>
                <p className="mb-4 text-gray-400 text-center">
                  How would you assess this statement—valid, invalid, or would you prefer to abstain from making a judgment?
                </p>
                <div className="flex space-x-2 mb-4 justify-center">
                  <Button variant="destructive" className="bg-[#CA60ED] hover:bg-[#b74eda]">Invalid</Button>
                  <Button variant="secondary" className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white">Abstain</Button>
                  <Button variant="secondary" className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white">Valid</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </TooltipProvider>
  )
}