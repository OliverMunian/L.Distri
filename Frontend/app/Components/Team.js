//Extensions
import Image from "next/image";
//Image
import Lead from "../../public/Team/Lead.png";

// Ludovic Beauchamp - Chef d'atelier
// Dany Beauchamp - Préparateur
// Alexandre Dos Santos - Préparateur
// Romain Le Glaunec - Mécanicien
// Violaine Lognoné - Directrice Marketing et Commerciale
// Corinne Lognoné - Directrice Administrative et Financière
// Jean-Luc Lognoné - Directeur Général

export default function Team() {
  const team = [
    {
      name: "Jean-Luc Lognon",
      position: "Directeur Général",
      src: Lead,
      alt: "Directeur",
    },
    {
      name: "Corinne Lognoné",
      position: "Directrice Administrative et Financière",
      src: Lead,
      alt: "Directrice",
    },
    {
      name: "Violaine Lognoné",
      position: "Directrice Marketing et Commerciale",
      src: Lead,
      alt: "Employé",
    },
    {
      name: "Alexandre Dos Santos",
      position: "Préparateur",
      src: Lead,
      alt: "Employé",
    },
    {
      name: "Ludovic Beauchamp",
      position: "Chef d'atelier",
      src: Lead,
      alt: "Employé",
    },
    {
      name: "Dany Beauchamp",
      position: "Préparateur",
      src: Lead,
      alt: "Employé",
    },
    {
      name: "Romain Le Glaunec",
      position: "Mécanicien",
      src: Lead,
      alt: "Employé",
    },
  ];

  return (
    <div className="w-full overflow-x-auto scrollbar-hide px-10 py-5">
      <div className="flex gap-4 min-w-max">
        {team.map((employe, i) => (
          <div
            key={i}
            className={`relative min-w-[250px] flex-shrink-0 p-4 border border-gray-300 rounded-lg text-center overflow-hidden ${
              i % 2 ? "bg-[#fafbfd]" : "bg-white"
            }`}
          >
            <Image
              src={employe.src}
              alt={employe.alt}
              width={200}
              height={200}
              className="w-full object-cover mx-auto"
            />
            <div className="absolute left-0 w-full bottom-0 backdrop-blur-sm overflow-hidden py-2">
              <div className="absolute bg-black opacity-35 top-0 left-0 w-full h-full z-0"></div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="mt-2 font-inter font-semibold text-white z-10">
                  {employe.name}
                </h3>
                <p className="text-sm text-white z-10">{employe.position}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
