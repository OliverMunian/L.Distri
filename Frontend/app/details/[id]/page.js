"use client"; // ⚠ obligatoire si tu fais du state ou du useEffect
//Extensions
import { use } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
//Components
import CarouselTruck from "../../Components/CarouselTruck";
//Icons
import { FaCircle } from "react-icons/fa6";
import { FaCar } from "react-icons/fa"; //voiture
import { GiSpeedometer } from "react-icons/gi"; //compteur
import { FaGasPump } from "react-icons/fa6"; // pompe a essence
import { TbManualGearbox } from "react-icons/tb"; // boite de vitesse
import { BsCalendarDate } from "react-icons/bs"; //calendrier
import { PiSeatbeltFill } from "react-icons/pi"; //siège
import { TiSortNumerically } from "react-icons/ti"; //numero
import { IoMdColorFill } from "react-icons/io"; //couleur
import { MdCo2 } from "react-icons/md"; //  logo co2
import { IoBookmarkOutline } from "react-icons/io5"; //marque-page
import { GiCarDoor } from "react-icons/gi"; //porte de voiture
import { GiCarWheel } from "react-icons/gi"; // Roue - Mise en circulation
import { SlBookOpen } from "react-icons/sl"; //brochure
import { FaCheck } from "react-icons/fa6"; //checkMark
import { RxCross2 } from "react-icons/rx";

export default function DetailsPageClient({ params }) {
  const { id } = use(params); // ✅ récupération de l'id dynamique de l'URL
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/announces/${id}`
        );
        if (!res.ok) throw new Error("Erreur lors du fetch");
        const data = await res.json();
        setItem(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router]);
  const formatPrice = (value) => new Intl.NumberFormat("fr-FR").format(value);

  if (loading)
    return (
      <div className="w-full h-full min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  if (error) return <p>Erreur : {error}</p>;

  // console.log("ligne 61:", item);

  const details = [
    {
      label: "Carrosserie",
      value: item.informations.carBody ?? "N/A",
      icon: <FaCar className="text-[#060b1f] mr-3" />,
    },
    {
      label: "Kilométrages",
      value: `${item.informations.kms} kms`,
      icon: <GiSpeedometer className="text-[#060b1f] mr-3" />,
    },
    {
      label: "Transmission",
      value: item.informations.gearbox ?? "N/A",
      icon: <TbManualGearbox className="text-[#060b1f] mr-3" />,
    },
    {
      label: "Motorisation",
      value: item.informations.motorization ?? "N/A",
      icon: <FaGasPump className="text-[#060b1f] mr-3" />,
    },
    {
      label: "Année",
      value: item.informations.year,
      icon: <BsCalendarDate className="text-[#060b1f] mr-3" />,
    },
    {
      label: "Mise en circulation",
      value: item.informations.dateCirculation,
      icon: <GiCarWheel className="text-[#060b1f] mr-3" />,
    },
    {
      label: "Places",
      value: item.informations.places ?? "N/A",
      icon: <PiSeatbeltFill className="text-[#060b1f] mr-3" />,
    },
    // {
    //   label: "N° Série",
    //   value: item.informations.serialNumber,
    //   icon: <TiSortNumerically className="text-[#060b1f] mr-3" />,
    // },
    {
      label: "Couleur",
      value: item.informations.color ?? "N/A",
      icon: <IoMdColorFill className="text-[#060b1f] mr-3" />,
    },
    {
      label: "Emissions (gCO₂/km)",
      value: item.informations.co2Emissions ?? "N/A",
      icon: <MdCo2 className="text-[#060b1f] mr-3" />,
    },
    {
      label: "Classe d'emission",
      value: item.informations.emissionsClass ?? "N/A",
      icon: <IoBookmarkOutline className="text-[#060b1f] mr-3" />,
    },
    {
      label: "Portes",
      value: item.informations.numberDoors ?? "N/A",
      icon: <GiCarDoor className="text-[#060b1f] mr-3" />,
    },
  ];

  const informationDisplay = details.map((info, i) => {
    return (
      <div
        key={i}
        className={`flex justify-between ${
          i !== 0 ? "border-t-[0.75px] border-t-zinc-400" : ""
        } py-3`}
      >
        <div className="flex items-center">
          {info.icon}
          <h4 className="font-inter font-normal text-[#060b1f] text-sm">
            {info.label}
          </h4>
        </div>
        <h4 className="font-inter font-bold text-[#060b1f] text-sm">
          {!isNaN(Number(info.value))
            ? formatPrice(Number(info.value))
            : info.value || "N/A"}
        </h4>
      </div>
    );
  });

  const featuresInterior = [
    {
      label: "Climatisation",
      value: Boolean(item?.features?.interior?.airConditioning),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Climatisation automatique",
      value: Boolean(item?.features?.interior?.automaticAirConditioning),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Vitres électriques",
      value: Boolean(item?.features?.interior?.electricWindows),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Rétroviseurs électriques",
      value: Boolean(item?.features?.interior?.electricRearviewMirrors),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Bluetooth",
      value: Boolean(item?.features?.interior?.bluetooth),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "CarPlay / Android Auto",
      value: Boolean(item?.features?.interior?.carplay),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Régulateur de vitesse",
      value: Boolean(item?.features?.interior?.cruiseControl),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Limiteur de vitesse",
      value: Boolean(item?.features?.interior?.speedLimiter),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Régulateur / Limiteur combiné",
      value: Boolean(item?.features?.interior?.cruiseLimiter),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Ordinateur de bord",
      value: Boolean(item?.features?.interior?.onboardComputer),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Commandes au volant",
      value: Boolean(item?.features?.interior?.steeringWheelControls),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Prise USB / 12V",
      value: Boolean(item?.features?.interior?.usb12vSocket),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Banquette avant",
      value: Boolean(item?.features?.interior?.frontBench),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Cloison de séparation",
      value: Boolean(item?.features?.interior?.partition),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Sellerie renforcée",
      value: Boolean(item?.features?.interior?.reinforcedUpholstery),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Siège suspendu",
      value: Boolean(item?.features?.interior?.suspendedSeat),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Siège chauffant",
      value: Boolean(item?.features?.interior?.heatedSeat),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "GPS intégré",
      value: Boolean(item?.features?.interior?.gps),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Tableau de bord digital",
      value: Boolean(item?.features?.interior?.digitalDashboard),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Cabine couchette",
      value: Boolean(item?.features?.interior?.sleeperCab),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Radio",
      value: Boolean(item?.features?.interior?.radio),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
  ];

  const featuresExterior = [
    {
      label: "Porte latérale coulissante",
      value: Boolean(item?.features?.exterior?.slidingSideDoor),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Double porte arrière battante",
      value: Boolean(item?.features?.exterior?.doubleRearDoor),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Capteurs de recul",
      value: Boolean(item?.features?.exterior?.parkingSensors),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Caméra de recul",
      value: Boolean(item?.features?.exterior?.rearCamera),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Barres de toit",
      value: Boolean(item?.features?.exterior?.roofBars),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Crochet d'attelage",
      value: Boolean(item?.features?.exterior?.towHook),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Projecteurs antibrouillard",
      value: Boolean(item?.features?.exterior?.fogLights),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Jantes en alliage",
      value: Boolean(item?.features?.exterior?.alloyWheels),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Jantes aluminium",
      value: Boolean(item?.features?.exterior?.aluminumWheels),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Suspension renforcée",
      value: Boolean(item?.features?.exterior?.reinforcedSuspension),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Benne basculante",
      value: Boolean(item?.features?.exterior?.tippingBed),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Grue auxiliaire",
      value: Boolean(item?.features?.exterior?.crane),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Attelage remorque",
      value: Boolean(item?.features?.exterior?.trailerHitch),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Ridelles aluminium",
      value: Boolean(item?.features?.exterior?.aluminumSideboards),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Projecteurs de travail",
      value: Boolean(item?.features?.exterior?.workLights),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Plateau avec ridelles",
      value: Boolean(item?.features?.exterior?.flatbedWithSideboards),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Treuil",
      value: Boolean(item?.features?.exterior?.winch),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Bâche",
      value: Boolean(item?.features?.exterior?.tarpaulin),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Spoiler de toit",
      value: Boolean(item?.features?.exterior?.roofSpoiler),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Gyrophare",
      value: Boolean(item?.features?.exterior?.beacon),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Prise hydraulique",
      value: Boolean(item?.features?.exterior?.hydraulicOutlet),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
    {
      label: "Attelage arrière pour remorque",
      value: Boolean(item?.features?.exterior?.trailerHitchRear),
      icon: <FaCheck className="text-indigo-600 text-[9px]" />,
    },
  ];

  const dimensions = [
    {
      label: "Longueur",
      value: item?.informations?.dimensions?.length
        ? `${item.informations.dimensions.length} mm`
        : "N/A",
    },
    {
      label: "Largeur",
      value: item?.informations?.dimensions?.width
        ? `${item.informations.dimensions.width} mm`
        : "N/A",
    },
    {
      label: "Hauteur",
      value: item?.informations?.dimensions?.height
        ? `${item.informations.dimensions.height} mm`
        : "N/A",
    },
    {
      label: "Volume",
      value: item?.informations?.dimensions?.volume
        ? `${item.informations.dimensions.volume} m³`
        : "N/A",
    },
    {
      label: "Empattement",
      value: item?.informations?.dimensions?.wheelBase
        ? `${item.informations.dimensions.wheelBase} mm`
        : "N/A",
    },
  ];

  const dimensionsDisplay = dimensions.map((dimension, i) => {
    return (
      <div key={i} className="flex items-center justify-between">
        <h3 className="font-inter text-[#060b1f]">{dimension.label}</h3>
        <p className="font-inter text-[#060b1f] font-semibold mx-2">
          {dimension.value}
        </p>
      </div>
    );
  });

  const featuresInteriorDisplay = featuresInterior
    .filter((feature) => feature.value) // ⚡ supprime les features nulles AVANT de map
    .map((feature, i) => {
      return (
        <div key={i} className="flex items-center py-2">
          <div className="flex items-center justify-center size-[20px] rounded-full bg-slate-200 mr-3">
            {feature.icon}
          </div>
          <h1 className="text-[#060b1f] font-inter">{feature.label}</h1>
        </div>
      );
    });

  const featuresExteriorDisplay = featuresExterior
    .filter((feature) => feature.value) // ⚡ supprime les features nulles AVANT de map
    .map((feature, i) => {
      return (
        <div key={i} className="flex items-center py-2">
          <div className="flex items-center justify-center size-[20px] rounded-full bg-slate-200 mr-3">
            {feature.icon}
          </div>
          <h1 className="text-[#060b1f] font-inter">{feature.label}</h1>
        </div>
      );
    });

  return (
    <div className="w-full h-full flex flex-col min-h-screen bg-white px-20 max-lg:px-4 max-xl:px-1 py-20 ">
      <div className="w-full flex items-start justify-between max-lg:flex-col">
        {/*IMAGE CAROUSEL*/}
        <div className="w-2/3 flex flex-col border-b-zinc-300 border-b-[0.75px] pb-10 mb-5 max-lg:w-full">
          <div className="w-full">
            <CarouselTruck
              images={item.images}
              design={`rounded-xl`}
              arrows={true}
            />
          </div>
          <div className="w-full flex flex-col ">
            <h1 className="font-inter font-semibold text-[#060b1f] text-2xl my-5">
              Description
            </h1>
            <p className="font-inter text-[#060b1f] font-light text-sm">
              {item.informations.description}
            </p>
            <button className="w-[35%] flex items-center justify-center rounded-lg p-3 mt-5 bg-slate-200 hover:bg-slate-400 hover:cursor-pointer max-sm:w-[45%]"
             onClick={() => alert('Indisponible pour le moment')}>
              <SlBookOpen className="text-[#060b1f] mr-2" />
              <h1 className="text-[#060b1f] text-base font-inter font-bold">
                Brochure PDF
              </h1>
            </button>
          </div>
        </div>

        {/*DIV DROITE AVEC INFORMATIONS*/}
        <div className="w-[30%] flex flex-col max-lg:w-full">
          <h1 className="font-inter font-bold text-4xl text-[#060b1f] ">
            {item.brand}
          </h1>
          <h3 className="font-inter font-semibold text-base text-[#060b1f] mt-2">
            {item.model}
          </h3>
          <div className="w-full flex items-center mt-2 ">
            <p className="text-xs font-inter text-[#060b1f]">
              {formatPrice(item.informations.kms)}kms
            </p>
            <div className="flex items-center ml-2">
              <FaCircle className="text-zinc-300 text-[5px]" />
              <p className="text-xs font-inter text-[#060b1f] ml-2">
                {item.informations.motorization}
              </p>
            </div>
            <div className="flex items-center ml-2">
              <FaCircle className="text-zinc-300 text-[5px]" />
              <p className="text-xs font-inter text-[#060b1f] ml-2">
                {item.informations.gearbox}
              </p>
            </div>
          </div>
          <h4 className="font-inter font-normal text-xs text-[#060b1f] mt-2">
            Notre prix
          </h4>
          <h1 className="font-inter font-bold text-4xl text-[#060b1f] ">
            {formatPrice(item.informations.price)}€
          </h1>
          <button className="bg-indigo-600 w-[75%] p-2 rounded-lg mt-5 flex items-center justify-center hover:bg-indigo-800 hover:cursor-pointer">
            <Link
              href={{
                pathname: "/contact", // La page vers laquelle on redirige
                query: {
                  brand: item.informations.brand,
                  model: item.informations.model,
                },
              }}
              passHref
            >
              <h1 className="font-inter font-normal text-white text-lg">
                Nous contacter
              </h1>
            </Link>
          </button>

          {/*ONGLET INFORMATIONS*/}
          <div className="bg-slate-50 flex flex-col p-5 w-full rounded-xl border-[0.75px] border-zinc-400 mt-5">
            <h1 className="font-inter font-semibold text-[#060b1f] mb-5">
              Informations
            </h1>
            {informationDisplay}
          </div>
        </div>
      </div>

      {/*OPTIONS DU VEHICULE*/}
      <div className="w-2/3 flex flex-col border-zinc-300 border-b-[0.75px] pb-5">
        <div className="w-full flex flex-col my-10">
          <h1 className="font-inter font-semibold text-2xl text-[#060b1f] mb-10">
            Options du vehicule
          </h1>
          <div className="flex gap-24">
            <div className="flex flex-col">
              <h1 className="text-[#060b1f] font-inter text-lg font-bold mb-5">
                Intérieur
              </h1>
              {featuresInteriorDisplay.length > 0 ? (
                featuresInteriorDisplay
              ) : (
                <div className="w-full items-center justify-center">
                  <h3 className="font-inter text-[#060b1f]">
                    {" "}
                    Aucune option à afficher pour le moment
                  </h3>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <h1 className="text-[#060b1f] font-inter text-lg font-bold mb-5">
                Extérieur
              </h1>
              {featuresExteriorDisplay.length > 0 ? (
                featuresExteriorDisplay
              ) : (
                <div className="w-full items-center justify-center">
                  <h3 className="font-inter text-[#060b1f]">
                    {" "}
                    Aucune option à afficher pour le moment
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*DIMENSIONS DU VEHICULE*/}
      <div className="w-2/3 flex flex-col border-zinc-300 border-b-[0.75px] pb-5">
        <div className="w-full flex flex-col my-5">
          <h1 className="font-inter font-semibold text-2xl text-[#060b1f] ">
            Dimensions
          </h1>
        </div>
        <div className="w-full flex flex-wrap gap-10">{dimensionsDisplay}</div>
      </div>
    </div>
  );
}
