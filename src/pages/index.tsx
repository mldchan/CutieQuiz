import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
    return (
        <main className="left-[50%] top-[50%] absolute -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-3xl font-bold">Take the Cutie Quiz now!</h1>
            <p>See if you&apos;re a cutie by taking this quiz!</p>
            <br />
            <Link href="/take">
                <motion.button
                    className="bg-blue-600 p-2 rounded-md px-8"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Take Quiz
                </motion.button>
            </Link>
        </main>
    );
}
