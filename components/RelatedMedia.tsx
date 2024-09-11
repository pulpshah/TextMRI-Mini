import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FileText, MessageCircle, Video, Headphones } from 'lucide-react'
import JFile from "@/public/data/Trump_Harris_Annotated_Transcript.json"
import React from 'react'

type MediaItem = {
  type: string;
  title: string;
  url: string;
  icon: React.ComponentType;
  image: string | null;
  referenceType: string;
}

type JsonTurnData = {
  turn: number;
  speaker: string;
  startTime: number;
  endTime: number;
  content: string;
  claim_of_facts_abstractive_claim: string;
  claim_of_facts_extractive_supporting_quotes_claim: string[];
  score: number;
  facts_topic_ref?: [string, string, { IMAGES?: string[] }][];
  value_topic_ref?: [string, string, { IMAGES?: string[] }][];
  policy_topic_ref?: [string, string, { IMAGES?: string[] }][];
  YT_ref?: [string, string, string][];
  [key: string]: any;
}

interface RelatedMediaProps {
  isRelatedMediaOpen: boolean;
  currentTurn: number;
}

export default function RelatedMedia({ isRelatedMediaOpen, currentTurn }: RelatedMediaProps) {
  const [relatedMedia, setRelatedMedia] = useState<MediaItem[]>([])

  useEffect(() => {
    updateRelatedMedia(currentTurn)
  }, [currentTurn])

  const updateRelatedMedia = (turn: number) => {
    const turnData = (JFile.Data as unknown as JsonTurnData[]).find(item => item.turn === turn)
    if (!turnData) return

    const media: MediaItem[] = []

    const addMedia = (references: [string, string, { IMAGES?: string[] }][] | undefined, topicType: string) => {
      if (!references) return
      references.forEach(([type, url, mediaInfo]) => {
        let icon: React.ComponentType
        switch (type) {
          case 'ARTICLE':
            icon = FileText
            break
          case 'DISCUSSION':
            icon = MessageCircle
            break
          case 'VIDEO':
            icon = Video
            break
          case 'PODCAST':
            icon = Headphones
            break
          default:
            icon = FileText
        }
    
        // Truncate the URL to the first 30 characters if it's too long
        const truncatedUrl = url.length > 10 ? `${url.slice(0, 10)}...` : url;
    
        media.push({
          type,
          title: mediaInfo?.IMAGES?.[0] || truncatedUrl,  // Use truncated URL as the title if no specific title is provided
          url,
          icon,
          image: mediaInfo?.IMAGES?.[0] || null,
          referenceType: topicType,
        })
      })
    }
    
    

    // Process each type of reference
    addMedia(turnData.facts_topic_ref, 'Facts Topic Reference')
    addMedia(turnData.value_topic_ref, 'Value Topic Reference')
    addMedia(turnData.policy_topic_ref, 'Policy Topic Reference')
    if (turnData.YT_ref) {
      turnData.YT_ref.forEach(([url, title, thumbnail]) => {
        media.push({
          type: "YouTube",
          title,
          url,
          icon: Video,
          image: thumbnail || null,
          referenceType: "YouTube Reference"
        });
      });
    }

    setRelatedMedia(media)
  }

  return (
    // Aside element with dynamic width based on isRelatedMediaOpen prop
    <aside className={`bg-[#131214] border border-[#2F3133] transition-all duration-300 ease-in-out shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)] ${isRelatedMediaOpen ? 'w-80' : 'w-0'}`}>
      {/* Container for the content with scrolling */}
      <div className="p-4 h-full overflow-y-auto custom-scrollbar">
        <h2 className="text-xl font-semibold mb-4">Related Media</h2>
        {/* Container for media items */}
        <div className="space-y-4">
          {relatedMedia.map((item, index) => (
            <div key={index} className="bg-[#3a3a3a] p-4 rounded-md hover:bg-[#4a4a4a] transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex items-center space-x-3">
                {item.image ? (
                  <img src={item.image} alt={item.title} width={64} height={64} className="w-16 h-16 object-cover rounded-md" />
                ) : (
                  <div className="w-16 h-16 bg-[#2F3133] rounded-md flex items-center justify-center">
                    {React.createElement(item.icon as React.ComponentType<{ className?: string }>, { className: "w-8 h-8" })} 
                  </div>
                )}
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-1">{item.referenceType}</p> {/* Subheading for reference type */}
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">View Source</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
