"use client";
//Extensions
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
//Icons
import { CiMobile3 } from "react-icons/ci";
import { Icon } from "@iconify/react";
import { CgArrowTopRight } from "react-icons/cg";
import { BsDisplay, BsPatchExclamationFill } from "react-icons/bs";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";

//Components
import Header from "./Components/Header";
import TypeVehicle from "./Components/TypeVehicle";
import Fleet from "./Components/Fleet";
import Footer from "./Components/Footer";
import Loader from "./Components/Loader";
import Team from "./Components/Team";
//Images
import Citroën from "../public/Logo/citroen.webp";
import Daf from "../public/Logo/daf.webp";
import Fiat from "../public/Logo/fiat.webp";
import Ford from "../public/Logo/ford.webp";
import Iveco from "../public/Logo/iveco.webp";
import Man from "../public/Logo/man.webp";
import MercedesBenz from "../public/Logo/mercedes.webp";
import Nissan from "../public/Logo/nissan.webp";
import Opel from "../public/Logo/opel.webp";
import Peugeot from "../public/Logo/peugeot.webp";
import Renault from "../public/Logo/renault.webp";
import Volvo from "../public/Logo/volvo.webp";
import VW from "../public/Logo/vw.webp";
import Logo from "../public/logo(1).png";
import Place from '../public/Place.jpg'

export default function Home() {
  const [loading, setLoading] = useState(true);
  const logos = [
    {
      brand: "Citroën",
      image: Citroën,
    },
    { brand: "Daf", image: Daf },
    { brand: "Fiat", image: Fiat },
    { brand: "Ford", image: Ford },
    { brand: "Iveco", image: Iveco },
    { brand: "Man", image: Man },
    { brand: "Mercedes-Benz", image: MercedesBenz },
    { brand: "Nissan", image: Nissan },
    { brand: "Opel", image: Opel },
    { brand: "Peugeot", image: Peugeot },
    { brand: "Renault", image: Renault },
    { brand: "Volvo", image: Volvo },
    { brand: "Volkswagen", image: VW },
  ];

  const displayLogo = logos.map((item, i) => (
    <div key={i} className="w-20 sm:w-24 md:w-28 lg:w-32 hover:cursor-pointer">
      <Link href={`/all?brand=${item.brand}`}>
        <Image
          src={item.image}
          alt={item.brand}
          width={100}
          height={100}
          className="object-contain w-full h-auto"
        />
      </Link>
    </div>
  ));

  return (
    <div className="min-h-screen size-full flex-col bg-white ">
      {loading && <Loader onFinish={() => setLoading(false)} />}
      {!loading && (
        <>
          <Header />
          {/* <TypeVehicle /> */}
          <Fleet className="-mt-64" />
          <div
            className="flex justify-center items-center z-10 max-xl:px-20 max-lg:px-10 bg-cover bg-center rounded-b-3xl overflow-hidden"
            // style={{ backgroundImage: `url(${Place.src})` }}
          >
            <div className="h-full relative flex overflow-hidden bg-cover bg-center backdrop-blur-[4px] py-10">
              <div className="absolute w-full top-0 h-[20px] bg-[#fafbfd] rounded-b-3xl z-10"></div>
              <div className="absolute w-full top-0 h-full bg-black opacity-45 rounded-b-3xl z-0"></div>
              <div className="flex flex-col items-center justify-center h-full p-10 z-10">
                <p className="font-inter text-left font-medium text-base text-white">
                  L.Distri est une entreprise française spécialisée dans la
                  vente de camions et véhicules utilitaires toutes catégories, à
                  destination des professionnels.
                  <br />
                  <br />
                  Implantés à Vannes (56), nous mettons à disposition une large
                  gamme de véhicules neufs et d’occasion, soigneusement
                  sélectionnés et préparés selon les standards les plus
                  exigeants. Notre réseau logistique nous permet d’assurer la
                  livraison sur l’ensemble du territoire national.
                  <br />
                  <br />
                  Réactivité, fiabilité et expertise terrain font de L.Distri un
                  acteur reconnu dans le secteur du véhicule professionnel. Nous
                  accompagnons nos clients dans leur développement avec des
                  solutions sur mesure, allant de la reprise à l’aménagement,
                  jusqu’à la livraison du véhicule prêt à l’emploi.
                  <br />
                  <br />
                  <br />
                </p>
                <div className="flex items-end">
                  <RiDoubleQuotesL className="text-white text-4xl" />
                  <p className="font-inter font-medium text-center text-base italic text-white">
                    Chez L.Distri, on ne vend pas simplement des camions, on
                    équipe ceux qui avancent.
                  </p>
                  <RiDoubleQuotesR className="text-white text-4xl" />
                </div>
              </div>
              <Image src={Place} alt="entrepot_Ldistri" className="w-1/3" />
            </div>
          </div>
          <div className="w-full flex flex-col justify-start px-40 py-8 max-xl:px-20 max-lg:px-10 max-sm:px-4 z-10 bg-white">
            <div className="mb-8">
              <h1 className="font-inter font-bold text-[#060b1f] text-2xl">
                Nos marques
              </h1>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-10 justify-center items-center">
              {displayLogo}
            </div>
          </div>
          <Team />
          <Footer className="-mt-10 -z-10" />
        </>
      )}
    </div>
  );
}
