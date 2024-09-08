import OverviewComponent from "@/components/OverviewComponent";
import Image from "next/image";
import ReferenceBank from "@/components/ReferenceBank";
import TranscriptModule from "@/components/transcriptModule";
export default function Home() {
  return (
    <div className="mainLayout flex flex-row">
      <div className="content font-['Stolzl'] px-[40px] w-full h-full py-[40px]">
          <div className="main flex flex-col">
          <OverviewComponent />
          <TranscriptModule />
          </div>
      </div>
      
      <div className="references font-['Stolzl']">
        <ReferenceBank />
      </div>
    </div>
  );
}
