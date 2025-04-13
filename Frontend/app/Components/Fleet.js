"use client";
//Extensions
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
//Icons
import { FaGasPump } from "react-icons/fa6";
import { GiSpeedometer } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import { LuArrowUpRight } from "react-icons/lu";
//Component
import CarouselTruck from "./CarouselTruck";

export default function Fleet({ params, brand, chooseVehicle }) {
  console.log("ligne 16 - Fleet: ", chooseVehicle);
  const [camions, setCamions] = useState([]);
  const router = useRouter();
  const filteredAnnounces = useMemo(() => {
    if (!chooseVehicle) return camions; // ← on filtre sur les camions chargés
    return camions.filter((item) => item?.informations?.type === chooseVehicle);
  }, [camions, chooseVehicle]);

  useEffect(() => {
    async function loadData() {
      // Cas 1 : on m'a passé les params
      if (params && Array.isArray(params)) {
        setCamions(params);
        return;
      }

      // Cas 2 : je suis utilisé sans params => je fetch
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/announces`, {
        cache: "force-cache",
      });
      const data = await res.json();
      if (Array.isArray(data.data)) {
        setCamions(data.data);
        data.data.forEach((announce) => {
          router.prefetch(`/details/${announce._id}`);
        });
      }
    }

    loadData();
  }, [params, chooseVehicle]);

  const formatPrice = (value) => new Intl.NumberFormat("fr-FR").format(value);

  const camionsDisplay = camions.map((camion, i) => {
    return (
      <div className="h-auto flex flex-col items-center justify-start" key={i}>
        <div className="w-full h-full">
          <CarouselTruck
            images={camion.images}
            limit={3}
            design={` h-full rounded-t-xl hover:cursor-pointer hover:scale-[105%] transition`}
          />
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center px-5 py-3 border-zinc-300 border-[1px] border-t-0 rounded-b-xl">
          <div className="w-full">
            <h1 className="font-inter font-bold text-lg text-[#060b1f]">
              {camion.brand}
            </h1>
            <h3 className="font-inter font-medium text-sm text-[#060b1f]">
              {camion.model}
            </h3>
          </div>
          <div className="w-full flex flex-col items-center justify-center py-3 mt-3 border-y-zinc-300 border-y-[0.75px]">
            <div className="w-full flex items-center justify-around max-md:flex-col ">
              <div className="flex items-center justify-center md:flex-col max-md:justify-between max-md:w-1/3 max-md:py-1">
                <GiSpeedometer className="text-[#060b1f] text-xl" />
                <h3 className="text-[#060b1f] text-xs font-inter mt-1">
                  {camion.informations.kms}
                </h3>
              </div>
              <div className="flex items-center justify-center md:flex-col max-md:justify-between max-md:w-1/3 max-md:py-1">
                <FaGasPump className="text-[#060b1f] text-xl" />
                <h3 className="text-[#060b1f] text-xs font-inter mt-1">
                  {camion.informations.motorization}
                </h3>
              </div>
              <div className="flex items-center justify-center md:flex-col max-md:justify-between max-md:w-1/3 max-md:py-1">
                <TbManualGearbox className="text-[#060b1f] text-xl" />
                <h3 className="text-[#060b1f] text-xs font-inter mt-1 max-md:text-right">
                  {camion.informations.gearbox}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mt-4 md:[flex-direction:column] lg:flex-row">
            <h1 className="font-inter font-bold text-lg text-[#060b1f]">
              {formatPrice(camion.informations.price)}€
            </h1>
            <div className="flex items-center hover:cursor-pointer">
              <Link href={`/details/${camion._id}`}>
                <h2 className="font-medium text-indigo-600 text-sm hover:underline">
                  Plus d'infos{" "}
                </h2>
              </Link>
              <LuArrowUpRight className="text-indigo-600" />
            </div>
          </div>
        </div>
      </div>
    );
  });

  const camionsFiltered = filteredAnnounces.map((camion, i) => {
    return (
      <div className="h-auto flex flex-col items-center justify-start" key={i}>
        <div className="w-full h-full">
          <CarouselTruck
            images={camion.images}
            limit={3}
            design={` h-full rounded-t-xl hover:cursor-pointer hover:scale-[105%] transition`}
          />
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center px-5 py-3 border-zinc-300 border-[1px] border-t-0 rounded-b-xl">
          <div className="w-full">
            <h1 className="font-inter font-bold text-lg text-[#060b1f]">
              {camion.brand}
            </h1>
            <h3 className="font-inter font-medium text-sm text-[#060b1f]">
              {camion.model}
            </h3>
          </div>
          <div className="w-full flex flex-col items-center justify-center py-3 mt-3 border-y-zinc-300 border-y-[0.75px]">
            <div className="w-full flex items-center justify-around max-md:flex-col ">
              <div className="flex items-center justify-center md:flex-col max-md:justify-between max-md:w-1/3 max-md:py-1">
                <GiSpeedometer className="text-[#060b1f] text-xl" />
                <h3 className="text-[#060b1f] text-xs font-inter mt-1">
                  {camion.informations.kms}
                </h3>
              </div>
              <div className="flex items-center justify-center md:flex-col max-md:justify-between max-md:w-1/3 max-md:py-1">
                <FaGasPump className="text-[#060b1f] text-xl" />
                <h3 className="text-[#060b1f] text-xs font-inter mt-1">
                  {camion.informations.motorization}
                </h3>
              </div>
              <div className="flex items-center justify-center md:flex-col max-md:justify-between max-md:w-1/3 max-md:py-1">
                <TbManualGearbox className="text-[#060b1f] text-xl" />
                <h3 className="text-[#060b1f] text-xs font-inter mt-1 max-md:text-right">
                  {camion.informations.gearbox}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mt-4 md:[flex-direction:column] lg:flex-row">
            <h1 className="font-inter font-bold text-lg text-[#060b1f]">
              {formatPrice(camion.informations.price)}€
            </h1>
            <div className="flex items-center hover:cursor-pointer">
              <Link href={`/details/${camion._id}`}>
                <h2 className="font-medium text-indigo-600 text-sm hover:underline">
                  Plus d'infos{" "}
                </h2>
              </Link>
              <LuArrowUpRight className="text-indigo-600" />
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col w-full bg-[#fafbfd] z-20 px-28 py-6 max-xl:px-20 max-lg:px-10 max-sm:px-5">
      {!params && (
        <div className="w-full flex justify-between pb-5 border-b-zinc-300 border-b-[0.75px]">
          <h1 className="font-inter font-bold text-lg text-[#060b1f] hover:underline hover:cursor-pointer max-[460px]:text-[13px]">
            Explorer tous nos vehicules
          </h1>
          <div className="flex items-center">
            <Link href={`/all`}>
              <h3 className="font-inter font-bold text-base text-[#060b1f] hover:underline hover:cursor-pointer max-sm:text-[10px]">
                Tout voir
              </h3>
            </Link>
            <LuArrowUpRight className="text-[#060b1f] text-lg ml-3" />
          </div>
        </div>
      )}
      {params && camions.length > 0 && brand && (
        <div className="w-full flex justify-between py-10 border-b-zinc-300 border-b-[0.75px]">
          <h1 className="font-inter font-bold text-lg text-[#060b1f]">
            Tous nos véhicules de la marque: {camions[0].brand}
          </h1>

          <Link href={`/all`} className="flex items-center">
            <h1 className="font-inter font-bold text-lg text-[#060b1f] mr-2 hover:underline">
              {" "}
              Tout voir
            </h1>
            <LuArrowUpRight className="text-[#060b1f]" />
          </Link>
        </div>
      )}
      {params && camions.length > 0 && !brand && (
        <div className="w-full flex justify-between py-10 border-b-zinc-300 border-b-[0.75px]">
          <h1 className="font-inter font-bold text-lg text-[#060b1f]">
            Tous nos véhicules disponibles à la vente:
          </h1>
        </div>
      )}

      {camions.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center mt-10">
          <h1 className="font-inter font-medium text-2xl text-[#060b1f] text-center">
            Aucun véhicule disponible à la vente pour le moment...
          </h1>


          {/* <Link href={`/all`} className="flex items-center mt-5">
            <h1 className="font-inter font-bold text-lg text-[#060b1f] mr-2 hover:underline">
              {" "}
              Tout voir
            </h1>
            <LuArrowUpRight className="text-[#060b1f]" />
          </Link> */}
        </div>
      ) : chooseVehicle && filteredAnnounces.length === 0 ? (
        <div className="w-full flex flex-col justify-center items-center mt-10">
          <h1 className="font-inter font-medium text-2xl text-[#060b1f] text-center">
            Aucun véhicule de cette catégorie n'est disponible à la vente pour
            le moment...
          </h1>

          <Link href={`/all`} className="flex items-center mt-5">
            <h1 className="font-inter font-bold text-lg text-[#060b1f] mr-2 hover:underline">
              {" "}
              Tout voir
            </h1>
            <LuArrowUpRight className="text-[#060b1f]" />
          </Link>
        </div>
      ) : (
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          {chooseVehicle ? camionsFiltered : camionsDisplay}
        </div>
      )}
    </div>
  );
}
