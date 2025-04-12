"use client";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
//Extensions
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Contact() {
  const router = useRouter();
  const [brandVehicule, setBrandVehicule] = useState("");
  const [modelVehicule, setModelVehicule] = useState("");
  const [serialNumberVehicule, setSerialNumberVehicule] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  useEffect(() => {
    if (router.isReady) {
      // Assure-toi que les paramètres de la route sont bien présents
      const { brand, model, serialNumber } = router.query;
      if (brand && model && serialNumber) {
        setBrandVehicule(brand);
        setModelVehicule(model);
        setSerialNumberVehicule(serialNumber);
        setSubject(`${brand} ${model} - ${serialNumber}`);
      } else {
        // Si aucun paramètre n'est présent, tu peux aussi le gérer ici.
        console.log('Les paramètres brand, model et serialNumber sont manquants.');
      }
    }
  }, [router.isReady, router.query]);

  // Mettre à jour le sujet quand les valeurs de brand, model, serialNumber changent
  useEffect(() => {
    if (brandVehicule && modelVehicule && serialNumberVehicule) {
      setSubject(`${brandVehicule} ${modelVehicule} - ${serialNumberVehicule}`);
    }
  }, [brandVehicule, modelVehicule, serialNumberVehicule]);


  useEffect(() => {
    const hasErrors =
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !emailRegex.test(email) ||
      !message.trim();

    setIsFormValid(!hasErrors);
  }, [firstName, lastName, email, message]);

  const validateFields = () => {
    const newErrors = {};

    if (!lastName.trim()) newErrors.lastName = "Veuillez saisir votre nom";
    if (!firstName.trim()) newErrors.firstName = "Veuillez saisir votre prénom";
    if (!email.trim()) newErrors.email = "Veuillez saisir votre email";
    else if (!emailRegex.test(email))
      newErrors.email = "Format d'email invalide";
    if (!message.trim()) newErrors.message = "Veuillez écrire un message";

    return newErrors;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Si le sujet est vide, on propose à l'utilisateur de continuer ou non
    if (!subject.trim()) {
      const confirm = window.confirm(
        "Le sujet du mail n'est pas rempli. Souhaitez-vous continuer ?"
      );
      if (!confirm) return;
    }

    setErrors({}); // Clear previous errors

    try {
      setIsSubmitting(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, subject, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'envoi du formulaire");
      }

      toast.success("Votre message a bien été envoyé", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: "#1E293B",
          color: "white",
          borderRadius: "10px",
          padding: "10px",
        },
      });

      setLastName("");
      setFirstName("");
      setSubject("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    } catch (err) {
      console.error("Erreur de soumission :", err.message);
      toast.error("Une erreur est survenue, veuillez réessayer", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: "#1E293B",
          color: "white",
          borderRadius: "10px",
          padding: "10px",
        },
      });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "lastName":
        setLastName(value);
        break;
      case "firstName":
        setFirstName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "subject":
        setSubject(value);
        break;
      case "message":
        setMessage(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Header />

      <main className="flex flex-col items-center justify-center px-10 py-16 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-[#060b1f] mb-8">
          Contactez-nous
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* NOM */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#060b1f] mb-1">
              Nom
            </label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              placeholder="Votre nom"
              className="border border-zinc-300 text-[#060b1f] rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs mt-1">
                {errors.lastName}
              </span>
            )}
          </div>

          {/* PRÉNOM */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#060b1f] mb-1">
              Prénom
            </label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              placeholder="Votre prénom"
              className="border border-zinc-300 text-[#060b1f] rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.firstName && (
              <span className="text-red-500 text-xs mt-1">
                {errors.firstName}
              </span>
            )}
          </div>

          {/* EMAIL */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-[#060b1f] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="adresse@mail.com"
              className="border border-zinc-300 text-[#060b1f] rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">{errors.email}</span>
            )}
          </div>

          {/* SUJET */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-[#060b1f] mb-1">
              Sujet
            </label>
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={handleChange}
              placeholder="Sujet de votre message (facultatif)"
              className="text-[#060b1f] border border-zinc-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* MESSAGE */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-[#060b1f] mb-1">
              Message
            </label>
            <textarea
              placeholder="Votre message..."
              name="message"
              value={message}
              onChange={handleChange}
              rows={10}
              className="text-[#060b1f] whitespace-pre-line border border-zinc-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            ></textarea>
            {errors.message && (
              <span className="text-red-500 text-xs mt-1">
                {errors.message}
              </span>
            )}
          </div>

          {/* BOUTON */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`px-6 py-2 rounded-lg flex items-center justify-center gap-2 transition ${
                isFormValid && !isSubmitting
                  ? "bg-indigo-600 hover:bg-indigo-800 text-white"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              {isSubmitting && (
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
              )}
              {isSubmitting ? "Envoi..." : "Envoyer"}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
