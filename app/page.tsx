import OverviewComponent from "@/components/OverviewComponent";
import Image from "next/image";
import ReferenceBank from "@/components/ReferenceBank";
export default function Home() {
  return (
    <div className="mainLayout flex flex-row">
      <div className="content font-['Stolzl'] px-[40px] w-full h-full py-[40px]">
          <OverviewComponent />
      </div>
      <div className="references">
        <ReferenceBank />
      </div>
    </div>
  );
}
