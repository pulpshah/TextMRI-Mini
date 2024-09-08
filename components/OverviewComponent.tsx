import React from 'react'
import styles from '@/css/index.module.css'
import Image from 'next/image'
const OverviewComponent = () => {
  return (
	<div className='flex overview w-full h-fit flex-row items-center mx-1'>
		<div className="title flex-col justify-center items-center px-[20px] py-[2px] w-full h-fit bg-clip-content">
			<h1 className={styles.primaryTitle}>Presidental Debate</h1>
			<div className="selector w-full gap-[10px] flex flex-row">
				<div className="transcript px-[15px] py-[4px] hover:scale-105 transition-transform duration-200 bg-[#CA60ED] bg-opacity-50 rounded-[8px]">
					<h1 className='text-[25px] w-full'>Transcript</h1>
				</div>
				<div className="highlights px-[15px] py-[4px] bg-none bg-opacity-50 rounded-[8px]">
					<h1 className='text-[25px]'>Highlights</h1>
				</div>
			</div>
		</div>

		<div className="speakers gap-[10px] px-[20px] bg-[#131214] py-[10px] border border-[#2F3133] rounded-[8px] items-center justify-between">
			<div className="flex flex-col padding h-full gap-[5px]">
				<div className="trump flex items-center flex-row w-full h-full gap-[20px]">
					<div className="speaker flex flex-row items-center p-[10px] justify-center gap-[10px]">
						<div className="speaker flex-shrink-0 justify-start rounded-[8px] hover:scale-105 transition-transform duration-200">
						<Image src="/profiles/trump.png" width={38} height={38} alt="Profile image of Trump" />

						</div>
						<div className="name-container flex flex-row 
						text-white gap[10px] py-5 w-[162px] h-[full]">
							<h1 className={styles.name}>Donald J. Trump</h1>
						</div>


					</div>
					<div className="flex flex-none flex-row items-center justify-center affiliation py-[8px] gap-[10px] px-[8px] w-[90px] h-full bg-republican rounded-[2px] hover:scale-105 transition-transform duration-200">
							<div className="talk-time flex flex-col items-center gap-[1px] text-[15px]">
								<img src="/profiles/republican.svg" alt="" />
								<div className="whitespace-nowrap "> Republican</div>
							</div>

					</div>
					<div className="flex flex-none flex-row items-center justify-center affiliation py-[8px] gap-[10px] px-[8px] w-[90px] h-full bg-secondary rounded-[2px] hover:scale-105 transition-transform duration-200">
							<div className="talk-time flex flex-col items-center gap-[1px] text-[15px]">
								<div className="whitespace-nowrap font-bold h-[20px] w-full px-15 gap-[10px] text-center">0:25</div>
								<div className="whitespace-nowrap ">Talk Time</div>
							</div>

					</div>
					<div className="flex flex-none flex-row items-center justify-center affiliation py-[8px] text-[15px] gap-[10px] px-[8px] w-[90px] h-full bg-secondary rounded-[2px] hover:scale-105 transition-transform duration-200">
							<div className="talk-time flex flex-col items-center gap-[1px]">
								<div className="whitespace-nowrap font-bold h-[20px] w-full px-15 gap-[10px] text-center">2</div>
								<div className="whitespace-nowrap">Turns</div>
							</div>

					</div>
					<div className="flex flex-none flex-row items-center justify-center affiliation py-[8px] text-[15px] gap-[10px] px-[8px] w-[90px] h-full bg-secondary rounded-[2px] hover:scale-105 transition-transform duration-200">
							<div className="talk-time flex flex-col items-center gap-[1px] ">
								<div className="whitespace-nowrap font-bold h-[20px] w-full px-15 gap-[10px] text-center
								">69</div>
								<div className="whitespace-nowrap flex flex-row justify-center items-center gap-1">
									<div className="">Score</div>
									</div>
							</div>

					</div>

					
				</div>
			</div>
			<div className="flex flex-col padding w-full h-full gap-[5px]">
				<div className="trump flex items-center flex-row w-full h-full gap-[20px]">
					<div className="speaker flex flex-row items-center p-[10px] justify-center gap-[10px]">
						<div className="speaker flex-shrink-0 justify-start rounded-[8px] hover:scale-105 transition-transform duration-200">
						<Image src="/profiles/harris.png" width={38} height={38} alt="Profile image of Harris" />

						</div>
						<div className="name-container flex flex-row 
						text-white gap-[10px] py-5 w-[162px] h-[full]">
							<h1 className={styles.name}>Kamala Harris</h1>
						</div>


					</div>
					<div className="flex flex-none flex-row items-center justify-center affiliation py-[8px] gap-[10px] px-[8px] w-[90px] h-full bg-democrat rounded-[2px] hover:scale-105 transition-transform duration-200">
							<div className="talk-time flex flex-col items-center gap-[1px] text-[15px]">
								<img src="/profiles/democrat.svg" alt="" />
								<div className="whitespace-nowrap "> Democrat</div>
							</div>

					</div>
					<div className="flex flex-none flex-row items-center justify-center affiliation py-[8px] gap-[10px] px-[8px] w-[90px] h-full bg-secondary rounded-[2px] hover:scale-105 transition-transform duration-200">
							<div className="talk-time flex flex-col items-center gap-[1px] text-[15px]">
								<div className="whitespace-nowrap font-bold h-[20px] w-full px-15 gap-[10px] text-center">0:45</div>
								<div className="whitespace-nowrap ">Talk Time</div>
							</div>

					</div>
					<div className="flex flex-none flex-row items-center justify-center affiliation py-[8px] text-[15px] gap-[10px] px-[8px] w-[90px] h-full bg-secondary rounded-[2px] hover:scale-105 transition-transform duration-200">
							<div className="talk-time flex flex-col items-center gap-[1px]">
								<div className="whitespace-nowrap font-bold h-[20px] w-full px-15 gap-[10px] text-center">3</div>
								<div className="whitespace-nowrap">Turns</div>
							</div>

					</div>
					<div className="flex flex-none flex-row items-center justify-center affiliation py-[8px] text-[15px] gap-[10px] px-[8px] w-[90px] h-full bg-secondary rounded-[2px] hover:scale-105 transition-transform duration-200">
							<div className="talk-time flex flex-col items-center gap-[1px] ">
								<div className="whitespace-nowrap font-bold h-[20px] w-full px-15 gap-[10px] text-center
								">7</div>
								<div className="whitespace-nowrap flex flex-row justify-center items-center gap-1">
									<div className="">Score</div>
									</div>
							</div>

					</div>

					
				</div>
			</div>
		</div>
	</div>
  )
}

export default OverviewComponent