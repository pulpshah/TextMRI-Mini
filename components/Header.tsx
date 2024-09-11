import Image from 'next/image'

type HeaderProps = {
  getTrumpTime: () => string;
  getTrumpTurn: () => number;
  getKamalaTime: () => string;
  getKamalaTurn: () => number;
  getTrumpScore: () => number;
  getKamalaScore: () => number;
}

export default function Header({ getTrumpTime, getTrumpTurn, getKamalaTime, getKamalaTurn, getTrumpScore, getKamalaScore }: HeaderProps) {
  return (
    <header className="p-4 bg-[#131214] border-b border-[#2F3133]">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full border-4 border-red-600"></div>
            <Image src="/profiles/trump.png" alt="Donald J. Trump" width={48} height={48} className="rounded-full" />
          </div>
          <div>
            <h3 className="font-semibold flex items-center">
              Donald J. Trump
              <Image src="/profiles/republicanIcon.svg" alt="Republican Party" width={18} height={16} className="ml-2" />
            </h3>
            <div className="flex items-center space-x-2 text-sm">
              <span>Talk Time: {getTrumpTime()} </span>
              <span>• Turns: {getTrumpTurn()}</span>
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
            <div className="text-4xl font-bold bg-gradient-to-r from-red-600 to-blue-600 text-transparent bg-clip-text animate-pulse">
              {getTrumpScore()} • {getKamalaScore()}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <h3 className="font-semibold flex items-center justify-end">
              <Image src="/profiles/democratIcon.svg" alt="Democratic Party" width={20} height={16} className="mr-2" />
              Kamala Harris
            </h3>
            <div className="flex items-center space-x-2 text-sm justify-end">
              <span>Talk Time: {getKamalaTime()} </span>
              <span>• Turns: {getKamalaTurn()}</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-full border-4 border-blue-600"></div>
            <Image src="/profiles/harris.png" alt="Kamala Harris" width={48} height={48} className="rounded-full" />
          </div>
        </div>
      </div>
    </header>
  )
}