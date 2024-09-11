import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Move, Maximize2, Minimize2 } from 'lucide-react'

type FloatingVotingModuleProps = {
  constraintsRef: React.RefObject<HTMLDivElement>;
}

export default function FloatingVotingModule({ constraintsRef }: FloatingVotingModuleProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

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
      setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % votableQuestions.length)
    }, 10000) // Change question every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const handleDragStart = () => setIsDragging(true)
  const handleDragEnd = () => setIsDragging(false)

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      initial={position}
      animate={position}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`absolute ${
        isMinimized ? 'w-12 h-12' : 'w-80 h-auto'
      } bg-[#131214] border border-[#2F3133] rounded-lg shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)] overflow-hidden pointer-events-auto`}
    >
      <div className="p-2 bg-[#2F3133] flex justify-between items-center cursor-move">
        <Move className="w-4 h-4 text-gray-400" />
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
        </button>
      </div>
      {!isMinimized && (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-center text-white">
            "{votableQuestions[currentQuestionIndex]}"
          </h2>
          <p className="mb-4 text-gray-400 text-center">
            How would you assess this statement—valid, invalid, or would you prefer to abstain from making a judgment?
          </p>
          <div className="flex space-x-2 mb-4 justify-center">
            <button className="px-4 py-2 bg-[#CA60ED] rounded-md hover:bg-[#b74eda] transition-colors text-white">
              Invalid
            </button>
            <button className="px-4 py-2 bg-[#3a3a3a] rounded-md hover:bg-[#4a4a4a] transition-colors text-white">
              Abstain
            </button>
            <button className="px-4 py-2 bg-[#3a3a3a] rounded-md hover:bg-[#4a4a4a] transition-colors text-white">
              Valid
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}