"use client";
//Extensions
import { useState, useEffect } from "react";
//Icons
import { Icon } from "@iconify/react";
import { BsPatchExclamationFill } from "react-icons/bs";

export default function TypeVehicle({ onSelect, defaultType }) {
  const [selected, setSelected] = useState(defaultType || false);

  useEffect(() => {
    if (defaultType) {
      setSelected(defaultType);
      onSelect?.(defaultType);
    }
  }, [defaultType]);

  function selectedType(params) {
    if (params === selected) {
      setSelected(false);
      onSelect?.(false); // ← désélection, on remonte "false"
    } else {
      setSelected(params);
      onSelect?.(params); // ← sélection, on remonte "params"
    }
  }

  const icons = [
    {
      title: "Utilitaire",
      model: (
        <Icon
          icon="mdi:van-utility"
          className={`text-[#060b1f] text-xl max-xl:text-3xl ${
            selected === "Utilitaire" ? "text-white" : "text-[#060b1f]"
          }`}
        />
      ),
    },
    {
      title: "Benne",
      model: (
        <Icon
          icon="mdi:dump-truck"
          className={`text-[#060b1f] text-xl max-xl:text-3xl ${
            selected === "Benne" ? "text-white" : "text-[#060b1f]"
          }`}
        />
      ),
    },
    {
      title: "Plateau",
      model: (
        <Icon
          icon="mdi:truck-flatbed-tow"
          className={`text-[#060b1f] text-xl max-xl:text-3xl ${
            selected === "Plateau" ? "text-white" : "text-[#060b1f]"
          }`}
        />
      ),
    },
    {
      title: "Remorques & Semis",
      model: (
        <Icon
          icon="game-icons:truck"
          className={`text-[#060b1f] text-xl max-xl:text-3xl ${
            selected === "Remorques & Semis" ? "text-white" : "text-[#060b1f]"
          }`}
        />
      ),
    },
    {
      title: "Spéciaux",
      model: (
        <BsPatchExclamationFill
          className={`text-[#060b1f] text-xl max-xl:text-3xl ${
            selected === "Spéciaux" ? "text-white" : "text-[#060b1f]"
          }`}
        />
      ),
    },
    {
      title: "Tracteurs",
      model: (
        <Icon
          icon="mdi:truck-remove"
          className={`text-[#060b1f] text-xl max-xl:text-3xl ${
            selected === "Tracteurs" ? "text-white" : "text-[#060b1f]"
          }`}
        />
      ),
    },
  ];

  const modelsTrucksDisplay = icons.map((icon, i) => {
    return (
      <div
        key={i}
        className="flex flex-col items-center justify-start  h-[220px]"
      >
        <div
          className={`flex flex-col items-center justify-center rounded-2xl size-[160px] flex-shrink-0 z-0  max-xl:size-[140px] max-lg:m-4 ${
            selected == icon.title
              ? "border-[#060b1f] border-[3px]"
              : "border-zinc-400 border-[0.75px]"
          } hover:cursor-pointer relative `}
          onClick={() => selectedType(icon.title)}
        >
          <div className="relative flex items-center justify-center">
            <div
              className={`absolute size-[60px] rounded-full pointer-events-none  ${
                selected == icon.title ? "bg-[#060b1f]" : "bg-[#f9f9f9]"
              }`}
            ></div>
            <div className="flex items-center justify-center z-10 ">
              {icon.model}
            </div>
          </div>
          <h1 className="font-inter text-[12px] mt-8 text-[#060b1f] font-semibold text-base  text-center max-xl:text-[10px]">
            {icon.title}
          </h1>
        </div>
      </div>
    );
  });
  return (
    <div className="w-full flex flex-col items-center bg-white py-5 px-40 max-xl:px-20 max-lg:px-5">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-black font-inter font-bold text-lg">
          Rechercher par type
        </h1>
      </div>

      <div className="w-full mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 place-items-center">
        {modelsTrucksDisplay}
      </div>
    </div>
  );
}
