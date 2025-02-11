import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ProdLoad() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 size={60} className="text-blue-500 animate-spin" />
      </motion.div>
      <p className="mt-4 text-lg font-semibold">Fetching products{dots}</p>
      <p className="mt-2 text-sm text-gray-500">This may take up to 15 seconds.</p>
      <p className="mt-4 text-center text-gray-600 max-w-md">
        Please wait, we are loading products for you.
      </p>
    </div>
  );
}