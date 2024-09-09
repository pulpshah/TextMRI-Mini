import Image from 'next/image';

interface HeaderProps {
  currentSegment: number;
  speakerPurpose: string;
  targetAudience: string;
}

const Header: React.FC<HeaderProps> = ({ currentSegment, speakerPurpose, targetAudience }) => (
  <header className="p-4 bg-[#131214] border-b border-[#2F3133]">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold">Presidential Debate 9/10/24</h1>
      </div>
      <div className="flex justify-center items-center">
        <Image src="/profiles/logo1.png" alt="Logo" width={158} height={48} />
      </div>
      <div className="text-right space-y-2">
        <p>Segment: {currentSegment}</p>
        <p>Speaker Purpose: {speakerPurpose}</p>
        <p>Target Audience: {targetAudience}</p>
      </div>
    </div>
  </header>
);

export default Header;
