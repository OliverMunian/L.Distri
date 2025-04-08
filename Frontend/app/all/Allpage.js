"use client";
//Extensions
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
//Component
import Fleet from "../Components/Fleet";
import TypeVehicle from "../Components/TypeVehicle";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
//icons
import { LuArrowUpRight } from "react-icons/lu";

export default function All() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const brand = searchParams.get("brand");
  const [announces, setAnnounces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    async function fetchAnnounces() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/announces`);
      const data = await res.json();

      // Filtrer par marque si brand est présent
      if (brand) {
        const filtered = data.data.filter((item) => item.brand === brand);
        setAnnounces(filtered);
        setLoading(false);
      } else {
        setAnnounces(data.data);
        setLoading(false);
      }
    }
    fetchAnnounces();
  }, [brand]);

  return (
    <div className="bg-white w-full min-h-screen">
      {loading ? (
        <div className="w-full min-h-screen h-full flex items-center justify-center">
          <h1 className="font-inter text-[#060b1f] text-3xl">Chargement...</h1>
        </div>
      ) : announces.length == 0 && brand ? (
        <div className="flex flex-col">
          <Header />
          <div className="flex flex-col items-center justify-center p-20 w-full">
            <h1 className="text-[#060b1f] text-center">
              Désolé, nous n'avons aucune annonce en ligne pour cette marque de
              voiture...
            </h1>
            <Link href={`/all`} className="flex items-center mt-5">
              <h1 className="font-inter font-bold text-lg text-[#060b1f] mr-2 hover:underline">
                {" "}
                Tout voir
              </h1>
              <LuArrowUpRight className="text-[#060b1f]" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <Header />
          <TypeVehicle onSelect={setSelected} defaultType={type} />
          <Fleet params={announces} brand={brand} chooseVehicle={selected} />
        </div>
      )}
      <Footer />
    </div>
  );
}
