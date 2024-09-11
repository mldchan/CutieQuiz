import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Button({ children }: { children: ReactNode }) {
    <motion.button
        className="bg-blue-600 p-2 rounded-md px-8"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        {children}
    </motion.button>;
}
