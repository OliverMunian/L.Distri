"use client";
//Extensions
import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
//Icons
import { FaGasPump } from "react-icons/fa6";
import { GiSpeedometer } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import { LuArrowUpRight } from "react-icons/lu";
//Components
import Form from "../../Components/Admin/NewAnnounce";
import CarouselTruck from "@/app/Components/CarouselTruck";

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const [announces, setAnnounces] = useState([]);
  const [loadingAnnounces, setLoadingAnnounces] = useState(true);
  const [newAnnounce, setNewAnnounce] = useState(false);
  const [editingAnnounce, setEditingAnnounce] = useState(null);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const isAuthed = localStorage.getItem("admin-auth");
    if (!isAuthed) {
      router.push("/admin");
    } else {
      fetchAnnounces();
    }
  }, []);

  useEffect(() => {
    if (editId && announces.length > 0) {
      const found = announces.find((a) => a._id === editId);
      if (found) {
        setEditingAnnounce(found);
        setNewAnnounce(true);
      }
    }
  }, [editId, announces]);

  const fetchAnnounces = async () => {
    setLoadingAnnounces(true);
    try {
      const res = await fetch("http://localhost:4000/announces");
      const data = await res.json();
      setAnnounces(data.data);
      setLoadingAnnounces(false);

      data.data.forEach((announce) => {
        router.prefetch(`/admin/details/${announce._id}`);
      });
    } catch (err) {
      console.error(err);
      setLoadingAnnounces(false);
    }
  };

  function disconnect() {
    localStorage.removeItem("admin-auth", "");
    toast.success("Vous êtes déconnecté", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: "#1E293B",
        color: "white",
        borderRadius: "10px",
        padding: "10px",
      },
    });
    router.push("/admin");
  }

  const formatPrice = (value) => new Intl.NumberFormat("fr-FR").format(value);

  const handleDelete = async (id) => {
    console.log("ligne 69 - id: ", id);
    const isConfirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette annonce ?"
    );
    if (!isConfirmed) return;

    const res = await fetch(`http://localhost:4000/announces/remove/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setAnnounces((prev) => prev.filter((a) => a._id !== id));
      toast.success("Annonce supprimée !", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: "#1E293B",
          color: "white",
          borderRadius: "10px",
          padding: "10px",
        },
      });
    } else {
      toast.error("Erreur lors de la suppression", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: "#1E293B",
          color: "white",
          borderRadius: "10px",
          padding: "10px",
        },
      });
    }
  };

  //border-zinc-400 border-[0.75px]
  const filteredAnnounces = announces.filter((a) => {
    const lower = search.toLowerCase();
    return (
      a.brand?.toLowerCase().includes(lower) ||
      a.model?.toLowerCase().includes(lower) ||
      a.informations?.serialNumber?.toLowerCase().includes(lower)
    );
  });

  const announcesToShow = search.trim() ? filteredAnnounces : announces;

  const announcesDisplay = announcesToShow.map((announce, i) => {
    return (
      <div
        className="w-full flex flex-col items-center justify-start md:h-[500px]"
        key={i}
      >
        <div className="w-full h-full">
          <CarouselTruck
            images={announce.images}
            limit={3}
            design={` h-full rounded-t-xl hover:cursor-pointer`}
          />
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center px-5 py-3 border-[#060b1f] border-[1px] border-t-0 rounded-b-xl">
          <div className="w-full">
            <h1 className="font-inter font-bold text-lg text-[#060b1f]">
              {announce.brand}
            </h1>
            <h3 className="font-inter font-medium text-sm text-[#060b1f]">
              {announce.model}
            </h3>
          </div>
          <div className="w-full flex flex-col items-center justify-center py-3 mt-3 border-y-[#060b1f] border-y-[0.75px]">
            <div className="w-full flex items-center justify-around max-md:flex-col ">
              <div className="flex items-center justify-center md:flex-col max-md:justify-between max-md:w-1/3 max-md:py-1">
                <GiSpeedometer className="text-[#060b1f] text-xl" />
                <h3 className="text-[#060b1f] text-xs font-inter mt-1">
                  {announce.informations.kms}
                </h3>
              </div>
              <div className="flex items-center justify-center md:flex-col max-md:justify-between max-md:w-1/3 max-md:py-1">
                <FaGasPump className="text-[#060b1f] text-xl" />
                <h3 className="text-[#060b1f] text-xs font-inter mt-1">
                  {announce.informations.motorization}
                </h3>
              </div>
              <div className="flex items-center justify-center md:flex-col max-md:justify-between max-md:w-1/3 max-md:py-1">
                <TbManualGearbox className="text-[#060b1f] text-xl" />
                <h3 className="text-[#060b1f] text-xs font-inter mt-1 max-md:text-right">
                  {announce.informations.gearbox}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mt-4 md:[flex-direction:column] max-lg:flex-col">
            <h1 className="font-inter font-bold text-lg text-[#060b1f]">
              {formatPrice(announce.informations.price)}€
            </h1>
            <div className="flex items-center hover:cursor-pointer">
              <Link
                href={`/admin/details/${announce._id}`}
                className="flex items-center"
              >
                <h1 className="text-indigo-600 hover:underline hover:cursor-pointer text-sm max-lg:text-xs">
                  Accéder aux détails
                </h1>
                <LuArrowUpRight className="text-indigo-600" />
              </Link>
            </div>
          </div>
          <div className="w-full flex items-center justify-around md:flex-col max-lg:mt-4 lg:flex-row">
            <button
              onClick={() => handleDelete(announce._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-inter font-bold hover:bg-red-700 hover:cursor-pointer max-lg:mb-3"
            >
              Supprimer
            </button>
            <button
              className="bg-orange-400 text-white px-3 py-1 rounded-md text-sm font-inter  hover:bg-orange-700 hover:cursor-pointer"
              onClick={() => {
                setEditingAnnounce(announce);
                setNewAnnounce(true);
              }}
            >
              Modifier
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <div className="w-full h-full min-h-screen bg-[#b6b6b6] p-10 max-lg:p-4">
        <div className="w-full flex flex-col items-center justify-between border-b-zinc-300 border-b-[0.75px] mb-5 py-4 max-lg:flex-col">
          <div className="w-full flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold mb-1 text-[#060b1f]">
                Panneau d'administration
              </h1>
              <Link href="/">
                <h4 className="text-md font-medium mb-3 text-indigo-600 hover:underline hover:cursor-pointer">
                  Retournez sur la page d'accueil
                </h4>
              </Link>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-indigo-600 p-4 rounded-xl hover:bg-indigo-800 mx-1"
                onClick={() => setNewAnnounce(true)}
              >
                <h1 className="text-lg font-inter font-bold text-white">
                  Nouvelle annonce
                </h1>
              </button>
              <button
                className="bg-red-600 p-4 rounded-xl hover:bg-red-800 mx-1"
                onClick={() => disconnect()}
              >
                <h1 className="text-lg font-inter font-bold text-white">
                  Deconnexion
                </h1>
              </button>
            </div>
          </div>

          <div className="w-full mt-6 flex">
            <input
              type="text"
              placeholder="Rechercher par marque, modèle ou N° de série..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 border border-white rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {newAnnounce ? (
          <Form
            onClose={() => {
              setNewAnnounce(false);
              setEditingAnnounce(null); // reset après fermeture
            }}
            onSuccess={fetchAnnounces}
            initialData={editingAnnounce}
          />
        ) : (
          <div className="w-full flex items-center justify-between b">
            {loadingAnnounces ? (
              <div className="w-full flex justify-center items-center">
                <h1 className="text-[#060b1f] font-inter font-bold text-2xl">
                  Chargement des annonces...
                </h1>
              </div>
            ) : announcesDisplay.length > 0 ? (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {announcesDisplay}
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center">
                <h1 className="text-[#060b1f] font-inter font-bold text-2xl">
                  Aucune annonce n'est en ligne pour le moment...
                </h1>
                <h4>
                  {" "}
                  Cliquez sur le bouton pour publier une nouvelle annonce{" "}
                </h4>
                <button
                  className="bg-indigo-600 p-4 rounded-xl hover:bg-indigo-800 mx-1"
                  onClick={() => setNewAnnounce(true)}
                >
                  <h1 className="text-lg font-inter font-bold text-white">
                    Nouvelle annonce
                  </h1>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Suspense>
  );
}
