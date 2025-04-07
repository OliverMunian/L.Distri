"use client";
//Extensions
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
//Assets
import Banner from "../../public/Banner.jpg";
import Logo from "../../public/logo.png";
//Icons
import { CiMobile3 } from "react-icons/ci";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircle } from "react-icons/io";

export default function Header({ className }) {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    if (menu) {
      // Bloque le scroll
      document.body.style.overflow = "hidden";
    } else {
      // Réactive le scroll
      document.body.style.overflow = "";
    }

    // Nettoyage si un jour tu changes de page ou un bug
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);
  return (
    <div className="w-full flex-col bg-white ">
      <div className="w-full h-[500px] relative flex items-center overflow-hidden">
        <Image
          src={Banner}
          alt="Bannière"
          fill
          className="object-cover"
          priority
        />
        <div className="bg-black absolute top-0 size-full opacity-40 z-0"></div>
        <div className="absolute flex items-start justify-between size-full h-1/6 top-0 z-10 p-5 border-b-zinc-300 border-b-[0.55px]">
          <div className="w-full flex items-center justify-between">
            <div className="w-1/3 flex items-center md:justify-between max-md:w-full">
              <Link href={'/'} className="w-1/4" >
              <Image src={Logo} alt="logo" />
              </Link>
              {/* <div className="flex items-center justify-end w-3/4 max-md:w-full">
                <FaMagnifyingGlass className="text-white text-base mr-4" />
                <input
                  placeholder="Recherche Mercedes Sprinter"
                  className="placeholder-white outline-none text-lg placeholder:text-sm w-[70%]"
                />
              </div> */}
            </div>
            <div className="w-1/3 flex items-center justify-center">
              <button
                className="min-md:hidden hover:cursor-pointer"
                onClick={() => setMenu(true)}
              >
                <GiHamburgerMenu className="text-white text-3xl" />
              </button>
              <Link href={"/"} className="mx-3 text-lg max-md:hidden">
                <h1 className="font-inter text-white hover:cursor-pointer hover:underline underline-offset-4">
                  Accueil
                </h1>
              </Link>
              <Link
                href={"/all"}
                className="mx-3 text-lg hover:cursor-pointer max-md:hidden"
              >
                <h1 className="font-inter text-white hover:cursor-pointer hover:underline underline-offset-4">
                  Annonces
                </h1>
              </Link>
              <button className="mx-3 text-lg hover:cursor-pointer border-[0.75px] border-white p-2 rounded-xl transition hover:bg-white hover:text-black max-md:hidden">
                <Link href={"/contact"}>
                  <h1 className="font-inter text-white">Contact</h1>{" "}
                </Link>
              </button>
            </div>
            {menu && (
              <div className="fixed inset-0 w-full h-full z-[60] backdrop-blur-lg flex flex-col items-center justify-center">
                <button className="flex flex-col items-center justify-center hover:cursor-pointer">
                  <IoIosCloseCircle
                    className="text-white text-2xl"
                    onClick={() => setMenu(false)}
                  />
                  <h4 className="font-inter text-xs text-white">Fermer</h4>
                </button>
                <Link href={"/"}>
                  <h1 className="font-inter text-white text-4xl hover:font-bold py-2 hover:cursor-pointer">
                    Accueil
                  </h1>
                </Link>
                <Link href={"/all"}>
                  <h1 className="font-inter text-white text-4xl hover:font-bold py-2 hover:cursor-pointer">
                    Annonces
                  </h1>
                </Link>
                <Link href={"/contact"}>
                  <h1 className="font-inter text-white text-4xl hover:font-bold py-2 hover:cursor-pointer">
                    Contact
                  </h1>
                </Link>
              </div>
            )}

            {/* <div className="w-1/3 flex items-center justify-end">
              <CiMobile3 className="text-white text-3xl" />
              <div className="rounded-lg border-white border-[0.75px] p-2 ml-5">
                <h1 className="text-lg">+33 9 70 35 47 41</h1>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
