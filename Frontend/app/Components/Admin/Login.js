"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connect/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });

        const data = await res.json();

        if (res.status === 200 && data.success) {
          localStorage.setItem("admin-auth", "true");
          toast.success("Vous êtes connecté !", {
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
          router.push("/vio/dashboard");
        } else {
          setError("Mot de passe incorrect");
        }
      } catch (err) {
        console.error("Erreur lors de la connexion :", err);
        setError("Une erreur est survenue.");
      }
    } else {
      setError("Veuillez entrer un mot de passe.");
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <h1 className="text-xl font-bold text-[#060b1f]">Accès admin</h1>
      <h1 className="text-[#060b1f] font-inter text-sm">
        Veuillez saisir le mot de passe
      </h1>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-center bg-[#b6b6b6]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4"
          >
            <input
              type="password"
              placeholder="Mot de passe"
              className="border p-2 rounded-md w-64 text-[#060b1f] placeholder:text-zinc-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 font-inter font-bold rounded-md hover:bg-zinc-700 hover:cursor-pointer"
            >
              Entrer
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
