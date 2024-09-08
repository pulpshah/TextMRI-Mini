"use client";

import { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; 

const TranscriptModule = () => {
  const [data, setData] = useState(null);
  const [selectedTurn, setSelectedTurn] = useState(1);

  // Fetch the JSON data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/annotated_transcript.json');
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  const currentTurn = data[selectedTurn];

  return (
    <div style={{ boxShadow: '0px 0px 22.8px 9px rgba(0, 0, 0, 0.37)' }} className='w-full border-[#2F3133] rounded-[8px] bg-[#131214] border border-[#2F3133] px-[20px] py-[10px] mt-[40px] flex flex-row'>
      <div className='flex flex-col w-full'>
        {/* Div for the little box on top */}
        <div style={{ boxShadow: '0px 0px 22.8px 9px rgba(0, 0, 0, 0.37)' }} className='border border-[#2F3133] p-[16px] w-full rounded-[8px] flex flex-row gap-[16px] justify-around'>
          <div className='flex flex-row gap-[16px]'>
            <div className='flex flex-col gap-[8px] justify-center items-center'>
              <p>Conversation Phase</p>
              <p>{/* Insert dynamic data here based on the phase */}</p>
            </div>
            <div className='flex flex-col gap-[8px] justify-center items-center'>
              <p>Speaker Purpose</p>
              <p>{currentTurn.claim_of_value_abstractive_argument}</p> {/* Example dynamic value */}
            </div>
          </div>
          <div className='flex flex-row gap-[16px]'>
            <div className='flex flex-col gap-[8px] justify-center items-center'>
              <p>Clarity</p>
              <p>{currentTurn.clarity * 100}</p> {/* Clarity percentage */}
            </div>
            <div className='flex flex-col gap-[8px] justify-center items-center'>
              <p>Target</p>
              <p>{currentTurn.claim_of_value_impacted_groups_populations.join(', ')}</p> {/* Target groups */}
            </div>
          </div>
        </div>

        {/* Main content section */}
        <div className='rounded-[8px] w-full h-full flex flex-row mt-4'>
          <div className='flex flex-col w-full'>
            <div className='rounded-[2px] bg-[#2F3133] w-full px-[8px] py-[4px] justify-between'>
              <p>{currentTurn.speaker}</p> {/* Speaker Name */}
              <p>0:00</p>
            </div>
            <div className='mt-4'>
              <p>{currentTurn.content}</p> {/* Transcript content */}
            </div>
          </div>
        </div>
      </div>

      {/* Div for slider */}
      <div className='ml-4'>
        <Slider
          vertical
          min={1}
          max={Object.keys(data).length}
          value={selectedTurn}
          onChange={(value) => setSelectedTurn(value)}
          style={{ height: '300px' }} // Adjust height as needed
        />
      </div>
    </div>
  );
};

export default TranscriptModule;
