import { Headphones, Video, FileText as ArticleIcon } from 'lucide-react'

// Define the props type for the RelatedMedia component
type RelatedMediaProps = {
  isRelatedMediaOpen: boolean;
}

export default function RelatedMedia({ isRelatedMediaOpen }: RelatedMediaProps) {
  // Array of related media items with their properties
  const relatedMedia = [
    { type: 'podcast', title: 'Debate Analysis Podcast', Icon: Headphones },
    { type: 'video', title: 'Key Moments Breakdown', Icon: Video },
    { type: 'article', title: 'Fact-Checking the Debate', Icon: ArticleIcon },
    { type: 'podcast', title: 'Expert Commentary', Icon: Headphones },
    { type: 'video', title: 'Candidate Highlights', Icon: Video },
    { type: 'article', title: 'Policy Comparison', Icon: ArticleIcon },
    { type: 'podcast', title: 'Voter Reactions', Icon: Headphones },
  ];

  return (
    // Aside element with dynamic width based on isRelatedMediaOpen prop
    <aside className={`bg-[#131214] border border-[#2F3133] transition-all duration-300 ease-in-out shadow-[0_0_22.8px_9px_rgba(0,0,0,0.37)] ${isRelatedMediaOpen ? 'w-80' : 'w-0'}`}>
      {/* Container for the content with scrolling */}
      <div className="p-4 h-full overflow-y-auto custom-scrollbar">
        <h2 className="text-xl font-semibold mb-4">Related Media</h2>
        {/* Container for media items */}
        <div className="space-y-4">
          {/* Map through relatedMedia array to render each item */}
          {relatedMedia.map((item, index) => (
            <div key={index} className="bg-[#3a3a3a] p-4 rounded-md hover:bg-[#4a4a4a] transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex items-center space-x-3">
                {/* Icon container */}
                <div className="w-16 h-16 bg-[#2F3133] rounded-md flex items-center justify-center">
                  <item.Icon className="w-8 h-8" />
                </div>
                {/* Title and type container */}
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <span className="text-gray-400 text-sm capitalize">{item.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}