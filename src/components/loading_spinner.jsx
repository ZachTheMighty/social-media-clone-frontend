import { motion } from "motion/react";

export default function LoadingSpinner() {
  return (
    <motion.div
      className="w-6 h-6 rounded-full border-3 border-white/10 border-t-white"
      animate={{ transform: "rotate(360deg)" }}
      transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
    />
  );
}
