// "use client";
// //Extensions
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// //Icons
// import { CiMobile3 } from "react-icons/ci";
// import { Icon } from "@iconify/react";
// import { CgArrowTopRight } from "react-icons/cg";
// import { BsDisplay, BsPatchExclamationFill } from "react-icons/bs";
// //Components
// import Header from "./Components/Header";
// import TypeVehicle from "./Components/TypeVehicle";
// import Fleet from "./Components/Fleet";
// import Footer from "./Components/Footer";
// import Loader from "./Components/Loader";
// //Images
// import Citroën from "../public/Logo/Citroën.png";
// import Daf from "../public/Logo/Daf.png";
// import Fiat from "../public/Logo/Fiat.png";
// import Ford from "../public/Logo/Ford.png";
// import Iveco from "../public/Logo/Iveco.png";
// import Man from "../public/Logo/Man.png";
// import MercedesBenz from "../public/Logo/Mercedes_Benz.png";
// import Nissan from "../public/Logo/Nissan.png";
// import Opel from "../public/Logo/Opel.png";
// import Peugeot from "../public/Logo/Peugeot.png";
// import Renault from "../public/Logo/Renault.png";
// import Volvo from "../public/Logo/Volvo.png";
// import Logo from "../public/logo(1).png";

// export default function Home() {
//   const [loading, setLoading] = useState(true);
//   const logos = [
//     {
//       brand: "Citroën",
//       image: Citroën,
//     },
//     { brand: "Daf", image: Daf },
//     { brand: "Fiat", image: Fiat },
//     { brand: "Ford", image: Ford },
//     { brand: "Iveco", image: Iveco },
//     { brand: "Man", image: Man },
//     { brand: "Mercedes-Benz", image: MercedesBenz },
//     { brand: "Nissan", image: Nissan },
//     { brand: "Opel", image: Opel },
//     { brand: "Peugeot", image: Peugeot },
//     { brand: "Renault", image: Renault },
//     { brand: "Volvo", image: Volvo },
//   ];


//   const displayLogo = logos.map((item, i) => (
//     <div key={i} className="w-20 sm:w-24 md:w-28 lg:w-32 hover:cursor-pointer">
//       <Link href={`/all?brand=${item.brand}`}>
//         <Image
//           src={item.image}
//           alt={item.brand}
//           width={100}
//           height={100}
//           className="object-contain w-full h-auto"
//         />
//       </Link>
//     </div>
//   ));

//   return (
//     <div className="min-h-screen size-full flex-col bg-white ">
//       {loading && <Loader onFinish={() => setLoading(false)} />}
//       {!loading && (
//         <>
//           <Header />
//           {/* <TypeVehicle /> */}
//           <div className="flex flex-col items-center justify-center px-40 py-10 max-xl:px-20 max-lg:px-10">
//             <div className="w-1/4 max-lg:w-1/3 max-sm:w-1/2 mb-10">
//               <Image src={Logo} alt="Logo_Ldistri" />
//             </div>
//             <h1 className="font-inter font-bold text-2xl text-[#060b1f] text-center">
//               Le partenaire de confiance pour vos véhicules professionnels
//             </h1>
//             <br />
//             <p className="font-inter font-light text-[#060b1f] text-center text-sm">
//               Que vous soyez artisan, entrepreneur ou gestionnaire de flotte,
//               trouvez chez nous le véhicule qui répond parfaitement à vos
//               besoins. Utilitaires robustes, bennes fiables, plateaux
//               polyvalents, remorques & semi-remorques performants, véhicules
//               spéciaux ou encore camions tracteurs prêts à affronter tous les
//               chantiers : nous vous proposons un large choix de véhicules
//               adaptés à toutes les missions. Profitez de solutions sur-mesure,
//               d’un accompagnement personnalisé et de véhicules sélectionnés pour
//               leur qualité et leur fiabilité. Avec nous, roulez l’esprit
//               tranquille, vos projets roulent déjà.
//             </p>
//           </div>
//           <Fleet />
//           <div className="w-full flex flex-col justify-start px-40 py-4 max-xl:px-20 max-lg:px-10 max-sm:px-4">
//             <div className="mb-8">
//               <h1 className="font-inter font-bold text-[#060b1f] text-2xl">
//                 Nos marques
//               </h1>
//             </div>
//             <div className="flex flex-wrap gap-x-8 gap-y-10 justify-center items-center">
//               {displayLogo}
//             </div>
//           </div>
//           <Footer />
//         </>
//       )}
//     </div>
//   );
// }
