'use client';

import { useState, useRef } from 'react';
import Header from '@/components/Header';
import TranscriptSection from '@/components/TranscriptSection';
import GraphSection from '@/components/GraphSection';
import Footer from '@/components/Footer';
import Popup from '@/components/Popup';
import TurnSlider from '@/components/TurnSlider';
import RelatedMedia from '@/components/RelatedMedia';
import { ChevronRight, Radio } from 'lucide-react';

export default function Component() {
  const [currentTurn, setCurrentTurn] = useState(1);
  const [activePopup, setActivePopup] = useState(null);
  const [currentSegment, setCurrentSegment] = useState(1);
  const [speakerPurpose, setSpeakerPurpose] = useState('To inform');
  const [targetAudience, setTargetAudience] = useState('Voters, Candidates');
  const [isRelatedMediaOpen, setIsRelatedMediaOpen] = useState(true);
  const transcriptRef = useRef(null);

  const transcriptData = [
    { turn: 1, speaker: 'Muir', content: 'Good evening from Hofstra University in Hempstead, New York...' },
    { turn: 2, speaker: 'Trump', content: 'Thank you, Lester. It\'s wonderful to be here.' },
    { turn: 3, speaker: 'Clinton', content: 'Thank you. It\'s a pleasure to be here with you, Donald.' },
    // Add more transcript data...
  ];

  const handleTurnChange = (newTurn) => {
    setCurrentTurn(Math.max(1, Math.min(newTurn, transcriptData.length)));
  };

  const handlePopupOpen = (popupId) => setActivePopup(popupId);

  const handlePopupClose = () => setActivePopup(null);

  return (
    <div className="flex flex-col h-screen text-white bg-[#131214]">
      <Header currentSegment={currentSegment} speakerPurpose={speakerPurpose} targetAudience={targetAudience} />
      <div className="flex flex-1 overflow-hidden">
        <GraphSection handlePopupOpen={handlePopupOpen} />
        <TranscriptSection
          transcriptData={transcriptData}
          currentTurn={currentTurn}
          handleTurnChange={handleTurnChange}
          transcriptRef={transcriptRef}
        />
      </div>
      <TurnSlider currentTurn={currentTurn} handleTurnChange={handleTurnChange} transcriptDataLength={transcriptData.length} />
      <Footer />
      <Popup activePopup={activePopup} handlePopupClose={handlePopupClose} />
      <RelatedMedia isRelatedMediaOpen={isRelatedMediaOpen} />
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#3a3a3a] p-2 rounded-l-md hover:bg-[#4a4a4a] transition-all duration-300"
        onClick={() => setIsRelatedMediaOpen(!isRelatedMediaOpen)}
      >
        {isRelatedMediaOpen ? <ChevronRight className="w-6 h-6" /> : <Radio className="w-6 h-6" />}
      </button>
    </div>
  );
}
