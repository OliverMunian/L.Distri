import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation"; // au lieu de useRouter
//Images
import Logo from '../../public/logo(1).png'

export default function Loader({ onFinish }) {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    let interval;

    const slowIncrement = () => {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 50);
    };

    const finishProgress = () => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setLoadingComplete(true);
        onFinish && onFinish();
      }, 300);
    };

    slowIncrement();
    finishProgress();

    return () => {
      clearInterval(interval);
    };
  }, [pathname]); // changement d'URL détecté avec usePathname

  if (loadingComplete) return null;

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <Image src={Logo} priority alt="Logo" width={150} height={150} />
      <div className="mt-4 w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#060b1f] transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
      <h1 className="font-inter text-[#060b1f]">Chargement...</h1>
      <div className="mt-2 text-gray-700 font-medium">{progress}%</div>
    </div>
  );
}
