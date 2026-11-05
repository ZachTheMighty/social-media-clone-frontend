import { motion } from "motion/react";
import { useTheme } from "../contexts/theme_context.jsx";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      onClick={toggleTheme}
      className={`rounded-full h-fit w-15 self-center p-1 flex ${theme === "light" ? "justify-start bg-[#f7df92]" : "justify-end bg-gray-800"} mr-1`}
    >
      <motion.div
        layout
        transition={{
          duration: 0.5,
          ease: "linear",
          type: "spring",
          bounce: 0.3,
        }}
        className={`${theme === "light" ? "bg-[#eeaa19]" : "bg-[#118ce5]"}  w-fit rounded-full p-1 text-white`}
      >
        {theme === "light" ? <Sun size={19} /> : <Moon size={19} />}
      </motion.div>
    </div>
  );
}
