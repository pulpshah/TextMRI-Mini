import Image from 'next/image';

const Footer: React.FC = () => (
  <footer className="bg-[#131214] border-t border-[#2F3133] p-4">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Image src="/profiles/trump.png" alt="Donald J. Trump" width={48} height={48} className="rounded-full" />
        <div>
          <h3 className="font-semibold">Donald J. Trump</h3>
          <div className="flex items-center space-x-2 text-sm">
            <span className="bg-red-600 px-2 py-1 mt-1 rounded-full">Republican</span>
            <span>0:25 Talk Time</span>
            <span>1 Turns</span>
            <span>49 Score</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <h3 className="font-semibold">Kamala Harris</h3>
          <div className="flex items-center space-x-2 text-sm justify-end">
            <span className="bg-blue-600 px-2 py-1 mt-1 rounded-full">Democrat</span>
            <span>0:45 Talk Time</span>
            <span>2 Turns</span>
            <span>70 Score</span>
          </div>
        </div>
        <Image src="/profiles/harris.png" alt="Kamala Harris" width={48} height={48} className="rounded-full" />
      </div>
    </div>
  </footer>
);

export default Footer;
