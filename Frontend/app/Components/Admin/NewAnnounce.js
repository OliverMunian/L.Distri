"use client";
//Extensions
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
//Icons
import { GoXCircleFill } from "react-icons/go";

export default function NewAnnounce({
  onClose,
  onSuccess,
  initialData = null,
}) {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    informations: {
      dateCirculation: "",
      carBody: "",
      type: "",
      horsePower: "",
      year: "",
      kms: "",
      price: "",
      gearbox: "",
      motorization: "",
      co2Emissions: "",
      emissionsClass: "",
      numberDoors: "",
      places: "",
      ptc: "",
      ptr: "",
      payload: "",
      dimensions: {
        length: "",
        width: "",
        height: "",
        volume: "",
        wheelBase: "",
      },
      color: "",
      description: "",
    },
    features: {
      interior: {
        airConditioning: false,
        automaticAirConditioning: false,
        electricWindows: false,
        electricRearviewMirrors: false,
        bluetooth: false,
        carplay: false,
        cruiseControl: false,
        speedLimiter: false,
        cruiseLimiter: false,
        onboardComputer: false,
        steeringWheelControls: false,
        usb12vSocket: false,
        frontBench: false,
        partition: false,
        reinforcedUpholstery: false,
        suspendedSeat: false,
        heatedSeat: false,
        gps: false,
        digitalDashboard: false,
        sleeperCab: false,
        radio: false,
      },
      exterior: {
        slidingSideDoor: false,
        doubleRearDoor: false,
        parkingSensors: false,
        rearCamera: false,
        roofBars: false,
        towHook: false,
        fogLights: false,
        alloyWheels: false,
        aluminumWheels: false,
        reinforcedSuspension: false,
        tippingBed: false,
        crane: false,
        trailerHitch: false,
        aluminumSideboards: false,
        workLights: false,
        flatbedWithSideboards: false,
        winch: false,
        tarpaulin: false,
        roofSpoiler: false,
        beacon: false,
        hydraulicOutlet: false,
        trailerHitchRear: false,
      },
    },
    images: [],
  });
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const [deletedImages, setDeletedImages] = useState([]);
  const numericFields = [
    "price",
    "kms",
    "year",
    "horsePower",
    "co2Emissions",
    "emissionsClass",
    "numberDoors",
    "places",
    "ptc",
    "ptr",
    "payload",
  ];
  const utilitaires = [
    {
      category: "Intérieur",
      title: "interior",
      options: [
        { label: "Climatisation", value: "airConditioning" },
        { label: "Vitres électriques", value: "electricWindows" },
        { label: "Rétroviseurs électriques", value: "electricRearviewMirrors" },
        { label: "Système audio Bluetooth", value: "bluetooth" },
        { label: "Système CarPlay / Android Auto", value: "carplay" },
        { label: "Régulateur de vitesse", value: "cruiseControl" },
        { label: "Limiteur de vitesse", value: "speedLimiter" },
        { label: "Ordinateur de bord", value: "onboardComputer" },
        { label: "Commandes au volant", value: "steeringWheelControls" },
        { label: "Prise USB / 12V", value: "usb12vSocket" },
        { label: "Banquette 2 ou 3 places avant", value: "frontBench" },
        { label: "Cloison de séparation", value: "partition" },
        { label: "Sellerie renforcée", value: "reinforcedUpholstery" },
      ],
    },
    {
      category: "Extérieur",
      title: "exterior",
      options: [
        { label: "Porte latérale coulissante", value: "slidingSideDoor" },
        { label: "Double porte arrière battante", value: "doubleRearDoor" },
        { label: "Capteur de recul", value: "parkingSensors" },
        { label: "Caméra de recul", value: "rearCamera" },
        { label: "Barres de toit", value: "roofBars" },
        { label: "Crochet d'attelage", value: "towHook" },
        { label: "Projecteurs antibrouillard", value: "fogLights" },
        { label: "Jantes acier ou alliage", value: "alloyWheels" },
        { label: "Suspension renforcée", value: "reinforcedSuspension" },
      ],
    },
  ];

  const bennes = [
    {
      category: "Intérieur",
      title: "interior",
      options: [
        { label: "Climatisation", value: "airConditioning" },
        { label: "Régulateur de vitesse", value: "cruiseControl" },
        { label: "Bluetooth", value: "bluetooth" },
        { label: "Ordinateur de bord", value: "onboardComputer" },
        { label: "Siège suspendu", value: "suspendedSeat" },
        { label: "Radio CD / USB", value: "radio" },
      ],
    },
    {
      category: "Extérieur",
      title: "exterior",
      options: [
        { label: "Benne basculante", value: "tippingBed" },
        { label: "Grue auxiliaire", value: "crane" },
        { label: "Crochet d'attelage", value: "trailerHitch" },
        { label: "Ridelles aluminium", value: "aluminumSideboards" },
        { label: "Projecteurs de travail", value: "workLights" },
        { label: "Porte latérale", value: "slidingSideDoor" },
      ],
    },
  ];

  const plateaux = [
    {
      category: "Intérieur",
      title: "interior",
      options: [
        { label: "Climatisation", value: "airConditioning" },
        { label: "Radio Bluetooth", value: "bluetooth" },
        { label: "Régulateur de vitesse", value: "cruiseControl" },
        { label: "Ordinateur de bord", value: "onboardComputer" },
        { label: "Siège suspendu", value: "suspendedSeat" },
      ],
    },
    {
      category: "Extérieur",
      title: "exterior",
      options: [
        { label: "Plateau ridelles", value: "flatbedWithSideboards" },
        { label: "Grue auxiliaire", value: "crane" },
        { label: "Crochet d'attelage", value: "trailerHitch" },
        { label: "Treuil", value: "winch" },
        { label: "Bâche ou rehausses", value: "tarpaulin" },
      ],
    },
  ];

  const tracteurs = [
    {
      category: "Intérieur",
      title: "interior",
      options: [
        {
          label: "Climatisation automatique",
          value: "automaticAirConditioning",
        },
        { label: "Siège chauffant", value: "heatedSeat" },
        { label: "Bluetooth", value: "bluetooth" },
        { label: "Régulateur / Limiteur", value: "cruiseLimiter" },
        { label: "GPS intégré", value: "gps" },
        { label: "Tableau de bord digital", value: "digitalDashboard" },
        { label: "Cabine couchette", value: "sleeperCab" },
      ],
    },
    {
      category: "Extérieur",
      title: "exterior",
      options: [
        { label: "Spoiler de toit", value: "roofSpoiler" },
        { label: "Jantes aluminium", value: "aluminumWheels" },
        { label: "Gyrophare", value: "beacon" },
        { label: "Prise hydraulique", value: "hydraulicOutlet" },
        { label: "Attelage remorque", value: "trailerHitchRear" },
      ],
    },
  ];

  const optionsByType = {
    Utilitaire: utilitaires,
    Benne: bennes,
    Plateau: plateaux,
    Tracteur: tracteurs,
  };

  const displayOptions = optionsByType[form.informations.type] || [];

  const [errors, setErrors] = useState({});

  //Pour la modification
  useEffect(() => {
    if (initialData) {
      setForm(initialData);

      //Images dans le preview :
      const imagePreviews = initialData.images?.map((imgPath) => ({
        file: null,
        preview: `${process.env.NEXT_PUBLIC_API_URL}/${imgPath}`,
        uploaded: true, // pour savoir que ce n’est pas une nouvelle image
      }));
      setImages(imagePreviews);
    }
  }, [initialData]);

  //Les champs informations de type numérique sont bien convertis en Number
  const sanitizeForm = (form) => {
    return {
      ...form,
      informations: {
        ...form.informations,
        ...Object.keys(form.informations).reduce((acc, key) => {
          if (numericFields.includes(key)) {
            acc[key] = Number(form.informations[key]) || undefined; // fallback à 0 si vide
          } else {
            acc[key] = form.informations[key];
          }
          return acc;
        }, {}),
      },
    };
  };

  const handleChange = (e) => {
    const { name, value, type, checked, dataset } = e.target;
    const keys = name.split(".");

    if (type === "checkbox" && dataset.category) {
      setForm((prev) => ({
        ...prev,
        features: {
          ...prev.features,
          [dataset.category]: {
            ...prev.features[dataset.category],
            [value]: checked,
          },
        },
      }));
      return;
    }

    if (keys[0] === "informations" && keys[1] === "dimensions") {
      const dimensionField = keys[2]; // eg: length
      setForm((prev) => ({
        ...prev,
        informations: {
          ...prev.informations,
          dimensions: {
            ...prev.informations.dimensions,
            [dimensionField]: value,
          },
        },
      }));
    } else if (name.startsWith("informations.")) {
      const field = keys[1];
      setForm((prev) => ({
        ...prev,
        informations: {
          ...prev.informations,
          [field]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  //Ajoute de l'image dans l'état images ([])
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  //Modifie l'état images ([])
  const removeImage = (index) => {
    const imgToRemove = form.images[index];

    // Si c'est une image existante (string), on la track
    if (typeof imgToRemove === "string") {
      setDeletedImages((prev) => [...prev, imgToRemove]);
    }

    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));

    if (images[index] && images[index].preview) {
      URL.revokeObjectURL(images[index].preview);
    }

    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.informations.dateCirculation && form.informations.year) {
      const circulationYear = new Date(
        form.informations.dateCirculation
      ).getFullYear();
      if (circulationYear < form.informations.year) {
        setErrors((prev) => ({
          ...prev,
          "informations.year":
            "L'année du véhicule ne peut pas être supérieure à la date de mise en circulation",
        }));
        toast.error("Erreur : vérifiez l'année du véhicule.", {
          position: "top-center",
          autoClose: 3000,
          style: {
            background: "#1E293B",
            color: "white",
            borderRadius: "10px",
            padding: "10px",
            textAlign: "center",
          },
        });
        return;
      }
    }

    const formData = new FormData();

    const sanitized = sanitizeForm({
      ...form,
      images: form.images.filter((img) => typeof img === "string"),
    });

    formData.append("data", JSON.stringify(sanitized));
    formData.append("deletedImages", JSON.stringify(deletedImages));
    images.forEach((img) => {
      if (img.file) {
        formData.append("images", img.file);
      }
    });
    const isEditing = Boolean(initialData?._id);
    const endpoint = isEditing
      ? `${process.env.NEXT_PUBLIC_API_URL}/announces/modify/${initialData._id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/announces/publish`;

    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      console.log("Ligne 177: ", data.errors);
      setErrors(data.errors);
      toast.error(
        "Erreur lors de la publication, veuillez compléter les champs requis",
        {
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
            textAlign: "center",
          },
        }
      ); // en cas d'erreur
    } else {
      setErrors({});
      onClose();
      onSuccess?.();
      if (isEditing) {
        toast.success("Annonce modifiée avec succès !", {
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
            textAlign: "center",
          },
        });
      } else {
        toast.success("Annonce publiée avec succès !", {
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
            textAlign: "center",
          },
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="fixed top-5 left-5 z-50 bg-white/80 backdrop-blur px-3 py-2 rounded-xl shadow-md">
        <h1
          className="font-inter text-black hover:underline hover:cursor-pointer"
          onClick={() => onClose()}
        >
          Fermer
        </h1>
      </div>
      <h1 className="text-[#060b1f] font-inter font-medium text-lg text-center">
        Compléter les champs ci-dessous pour mettre votre annonce en ligne
      </h1>
      <p className="font-inter italic text-[9px] text-[#060b1f]">
        Les champs marqués d'un astérix * sont obligatoire
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-1/2 max-lg:w-[70%] max-md:w-[85%] max-sm:w-[100%] mx-auto p-4 max-sm:p-2"
      >
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Marque*
          </label>
          <select
            value={form.brand}
            name="brand"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          >
            <option value="">-- Choisissez un type --</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Renault">Renault</option>
            <option value="Fiat">Fiat</option>
            <option value="Iveco">Iveco</option>
            <option value="Man">Man</option>
            <option value="Citroën">Citroën</option>
            <option value="Opel">Opel</option>
            <option value="Peugeot">Peugeot</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Daf">Daf</option>
            <option value="Ford">Ford</option>
            <option value="Nissan">Nissan</option>
            <option value="Volvo">Volvo</option>
          </select>
          {errors.brand && <p className="text-red-500">{errors.brand}</p>}
        </div>
        <div>
          <label className="text-[#060b1f] font-inter">Modèle*</label>
          <input
            type="text"
            name="model"
            placeholder="Ex:Sprinter,Krafter..."
            value={form.model}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
          {errors.model && <p className="text-red-500">{errors.model}</p>}
        </div>
        <div>
          <label className="text-[#060b1f] font-inter">
            Date de mise en circulation*
          </label>
          <input
            type="date"
            max={new Date().toISOString().split("T")[0]}
            name="informations.dateCirculation"
            placeholder="Format JJ/MM/AAAA"
            value={form.informations.dateCirculation}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
          {errors["informations.dateCirculation"] && (
            <p className="text-red-500">
              {errors["informations.dateCirculation"]}
            </p>
          )}
        </div>
        <div>
          <label className="text-[#060b1f] font-inter">
            Année du véhicule*
          </label>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            name="informations.year"
            placeholder="Format AAAA"
            value={form.informations.year}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
          {(errors["informations.year"] ||
            (form.informations.dateCirculation &&
              form.informations.year &&
              new Date(form.informations.dateCirculation).getFullYear() <
                form.informations.year)) && (
            <p className="text-red-500">
              {form.informations.dateCirculation &&
              form.informations.year &&
              new Date(form.informations.dateCirculation).getFullYear() <
                form.informations.year
                ? "L'année du véhicule ne peut pas être supérieure à la date de mise en circulation"
                : errors["informations.year"]}
            </p>
          )}
        </div>
        <div>
          <label className="text-[#060b1f] font-inter">Kilométrage*</label>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            name="informations.kms"
            placeholder="Indiquer le kilométrage"
            value={form.informations.kms}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
          {errors["informations.kms"] && (
            <p className="text-red-500">{errors["informations.kms"]}</p>
          )}
        </div>
        <div>
          <label className="text-[#060b1f] font-inter">Prix(€)*</label>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            name="informations.price"
            placeholder="Indiquer le prix de vente"
            value={form.informations.price}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
          {errors["informations.price"] && (
            <p className="text-red-500">{errors["informations.price"]}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Type de véhicule*
          </label>
          <select
            value={form.informations.type}
            name="informations.type"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          >
            <option value="">-- Choisissez un type --</option>
            <option value="Utilitaire">Utilitaire</option>
            <option value="Benne">Benne</option>
            <option value="Plateau">Plateau</option>
            <option value="Remorque & Semi">Remorque & Semi</option>
            <option value="Spéciaux">Spéciaux</option>
            <option value="Tracteur">Tracteur</option>
          </select>
          {errors["informations.type"] && (
            <p className="text-red-500">{errors["informations.type"]}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Boite de vitesse
          </label>
          <select
            value={form.informations.gearbox}
            name="informations.gearbox"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          >
            <option value="">-- Choisissez un type --</option>
            <option value="Manuelle">Manuelle</option>
            <option value="Automatique">Automatique</option>
            <option value="Semi-automatique">Semi-automatique</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Motorisation
          </label>
          <select
            value={form.informations.motorization}
            name="informations.motorization"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          >
            <option value="">-- Choisissez un type --</option>
            <option value="Diesel">Diesel</option>
            <option value="Essence">Essence</option>
            <option value="GPL">GPL</option>
            <option value="GNV">GNV</option>
            <option value="100% électrique">100% électrique</option>
            <option value="Hybride simple">Hybride simple</option>
            <option value="Hybride rechargeable">Hybride rechargeable</option>
            <option value="Bioéthanol">Bioéthanol</option>
            <option value="Hydrogène">Hydrogène</option>
          </select>
        </div>
        <div>
          <label className="text-[#060b1f] font-inter">
            Emissions(gCO₂/km)
          </label>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            name="informations.co2Emissions"
            placeholder="Indiquer le taux"
            value={form.informations.co2Emissions}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
        </div>
        <div>
          <label className="text-[#060b1f] font-inter">Classe d'émission</label>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            name="informations.emissionsClass"
            placeholder="Indiquer la classe d'émission"
            value={form.informations.emissionsClass}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
        </div>
        <div>
          <label className="text-[#060b1f] font-inter">Carosserie</label>
          <input
            type="text"
            name="informations.carBody"
            placeholder="Ex: Camionette, Fourgon..."
            value={form.informations.carBody}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
        </div>
        <div>
          <label className="text-[#060b1f] font-inter">
            Nombre de chevaux(DIN)
          </label>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            name="informations.horsePower"
            placeholder="Indiquer la puissance du vehicule"
            value={form.informations.horsePower}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
        </div>
        <div>
          <label className="text-[#060b1f] font-inter">Nombre de porte</label>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            name="informations.numberDoors"
            placeholder="Indiquer le nombre de porte"
            value={form.informations.numberDoors}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
        </div>
        <div>
          <label className="text-[#060b1f] font-inter">Nombre de places</label>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            name="informations.places"
            placeholder="Indiquer le nombre de place"
            value={form.informations.places}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
        </div>
        <div>
          <label className="text-[#060b1f] font-inter">
            Poids Total en Charge (PTC en kg)
          </label>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            name="informations.ptc"
            placeholder="Indiquer poids total autorisé en charge"
            value={form.informations.ptc}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
        </div>
        <div>
          <label className="text-[#060b1f] font-inter">
            Poids Total Roulant (PTR en Kg)
          </label>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            name="informations.ptr"
            placeholder="Indiquer poids total en roulant"
            value={form.informations.ptr}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
        </div>
        <div>
          <label className="text-[#060b1f] font-inter">Couleur</label>
          <input
            type="text"
            autoCapitalize="sentences"
            name="informations.color"
            placeholder="Couleur du véhicule"
            value={form.informations.color}
            onChange={handleChange}
            className="capitalize w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
        </div>
        <h1 className="font-inter text-[#060b1f] text-2xl font-bold ">
          Dimensions du véhicule
        </h1>
        <div>
          <label className="text-[#060b1f] font-inter">Longueur (mm)</label>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            name="informations.dimensions.length"
            placeholder="Longueur en mm"
            value={form.informations.dimensions.length || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
        </div>
        <div>
          <label className="text-[#060b1f] font-inter">Largeur (mm)</label>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            name="informations.dimensions.width"
            placeholder="Largeur en mm"
            value={form.informations.dimensions.width || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
        </div>
        <div>
          <label className="text-[#060b1f] font-inter">Hauteur (mm)</label>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            name="informations.dimensions.height"
            placeholder="Largeur en mm"
            value={form.informations.dimensions.height}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
        </div>
        <div>
          <label className="text-[#060b1f] font-inter">Volume (mm³)</label>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            name="informations.dimensions.volume"
            placeholder="Volume en mm³"
            value={form.informations.dimensions.volume || ""}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
        </div>
        <h1 className="font-inter text-[#060b1f] text-2xl font-bold ">
          Options du véhicule
        </h1>
        <div>
          {form.informations.type ? (
            ""
          ) : (
            <h1 className="font-inter text-center text-[#060b1f] text-base ">
              Pour afficher les options veuillez d'abord sélectionner un type de
              véhicule*
            </h1>
          )}
          {displayOptions.map((category) => (
            <div key={category.category} className="flex flex-col">
              <h3 className="font-inter text-[#060b1f] text-lg font-bold">
                {category.category}
              </h3>
              {category.options.map((opt) => (
                <label key={opt.value}>
                  <input
                    type="checkbox"
                    checked={form.features[category.title][opt.value] || false}
                    onChange={handleChange}
                    value={opt.value}
                    data-category={category.title} // astuce pour le handleChange
                  />{" "}
                  {opt.label}
                </label>
              ))}
            </div>
          ))}
        </div>

        <div>
          <label className="text-[#060b1f] font-inter">Description</label>
          <textarea
            type="text"
            name="informations.description"
            placeholder="Veuillez saisir une description pour votre annonce"
            value={form.informations.description}
            onChange={handleChange}
            className="w-full p-3 whitespace-pre-line rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
        </div>
        <div>
          <label className="text-[#060b1f] font-inter">Images*</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-200 shadow-sm"
          />
          <div className="flex flex-wrap gap-4 mt-2">
            {images.map((img, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={img.preview}
                  alt="preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 rounded-full w-5 h-5 flex items-center justify-center text-xs hover:cursor-pointer "
                >
                  <GoXCircleFill className="text-red-500 text-lg" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-green-800 w-1/3"
          >
            Publier
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-red-800 w-1/3"
            onClick={() => onClose()}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
