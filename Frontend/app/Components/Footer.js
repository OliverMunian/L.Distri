//Extensions
import Link from "next/link";

export default function Footer() {
  const logos = ["Fiat", "Iveco", "Man", "Mercedes-Benz", "Renault"];
  const titles = [
    "Utilitaire",
    "Benne",
    "Plateau",
    "Remorques & Semis",
    "Spéciaux",
  ];
  return (
    <div className="w-full flex flex-col bg-[#060b20] px-40 py-10 max-lg:px-20 max-sm:px-4 max-md:py-5">
      <div className="w-full flex flex-col py-12 border-b-[0.75px] border-b-zinc-300">
        <h1 className="text-lg font-bold font-inter text-white">LDISTRI</h1>
        <p className="text-white font-inter text-xs">
          Des vehicules prêt à l'emploi
        </p>
      </div>
      <div className="w-full flex items-start justify-between mt-10">
        <div className="flex flex-col">
          <h1 className="font-inter text-white font-bold max-[460px]:text-[12px]">
            Type de vehicules
          </h1>
          {titles.map((title, i) => {
            return (
              <Link href={`/all?type=${title}`} key={i}>
                <h3 className="font-inter font-medium text-zinc-500 text-sm hover:text-white hover:cursor-pointer max-[460px]:text-[9px]">
                  {title}
                </h3>
              </Link>
            );
          })}
        </div>
        <div className="flex flex-col">
          <h1 className="font-inter text-white font-bold max-[460px]:text-[12px]">
            Nos marques
          </h1>
          {logos.map((logo, i) => {
            return (
              <Link href={`/all?brand=${logo}`} key={i}>
                <h3 className="font-inter font-medium text-zinc-500 text-sm hover:text-white hover:cursor-pointer max-[460px]:text-[9px]">
                  {logo}
                </h3>
              </Link>
            );
          })}
        </div>
        <div className="flex flex-col">
          <h1 className="font-inter text-white font-bold max-[460px]:text-[12px]">
            Nos horaires
          </h1>
          <h3 className="font-inter font-medium text-zinc-500 text-sm hover:text-white hover:cursor-pointer max-[460px]:text-[9px]">
            Lun-Ven: <br/>
            09:00 - 12:00 <br/>
            13:00 - 18:00
          </h3>
        </div>
      </div>
    </div>
  );
}
