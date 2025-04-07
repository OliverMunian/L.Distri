import { Suspense } from "react";
import Dashboardpage from "../dashboard/Dashboardpage";

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <Dashboardpage />
    </Suspense>
  );
}