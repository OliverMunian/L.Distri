import { Suspense } from "react";
import Dashboardpage from "./Dashboardpage";
import Image from "next/image";
import ParisAir from '../../../public/ParisAir_logo.png'

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <Dashboardpage />
      <div className="w-full flex items-end justify-end">
          <Image src={ParisAir} alt='logo_ParisAir' className="w-1/12"/>
        </div>
    </Suspense>
  );
}