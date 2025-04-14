"use client";
//Extensions
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
//Assets
import Banner from "../../public/Banner.webp";
import Logo from "../../public/logo.png";
//Icons
import { CiMobile3 } from "react-icons/ci";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircle } from "react-icons/io";

export default function Header({ className, contact, all }) {
  const [menu, setMenu] = useState(false);
  const [hover, setHover] = useState(false);
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
    <div className="w-full flex-col bg-white">
      <div
        className="w-full h-[450px] relative flex items-center overflow-hidden bg-center bg-cover"
        style={{ backgroundImage: `url(${Banner.src})` }}
      >
        {/* <Image
          src={Banner}
          alt="Bannière"
          fill
          className="object-cover"
          priority
        /> */}
        <div className="bg-black absolute top-0 size-full opacity-40 z-0"></div>
        <div
          className={`absolute bottom-0 w-full h-[20px] rounded-t-3xl z-0 ${
            contact || all ? "bg-white" : "bg-[#fafbfd]"
          }`}
        ></div>
        <div className="absolute flex items-start justify-between size-full h-1/6 top-0 z-10 p-5">
          <div className="w-full flex items-center justify-between">
            <div className="w-1/3 flex items-center md:justify-between max-md:w-full">
              <Link href={"/"} className="w-1/4">
                <Image src={Logo} alt="logo" />
              </Link>
            </div>
            <div className="w-1/3 flex items-center justify-center">
              <button
                className="min-md:hidden hover:cursor-pointer"
                onClick={() => setMenu(true)}
              >
                <GiHamburgerMenu className="text-white text-3xl" />
              </button>
              <Link href={"/"} className="mx-3 text-lg max-md:hidden">
                <h1 className="font-inter text-sm text-white hover:cursor-pointer hover:underline underline-offset-4">
                  Accueil
                </h1>
              </Link>
              <Link
                href={"/all"}
                className="mx-3 text-lg hover:cursor-pointer max-md:hidden"
              >
                <h1 className="font-inter text-sm text-white hover:cursor-pointer hover:underline underline-offset-4">
                  Annonces
                </h1>
              </Link>
              <Link href={"/contact"}  className="mx-3 text-lg hover:cursor-pointer max-md:hidden">
                <h1 className="font-inter text-sm text-white hover:cursor-pointer hover:underline underline-offset-4">
                  Contact
                </h1>{" "}
              </Link>
            </div>
            {menu && (
              <div className="fixed inset-0 w-full h-full z-[60] flex flex-col items-center justify-center">
                <div className="absolute bg-black opacity-45 w-full h-full"></div>
                <div className="backdrop-blur-lg w-full h-full flex flex-col items-center justify-center">
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
                {/* <button className="flex flex-col items-center justify-center hover:cursor-pointer">
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
                </Link> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
