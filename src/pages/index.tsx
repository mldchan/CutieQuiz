import Deprecation from "@/components/ui/Deprecation";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [savedResults, setSavedResults] = useState(
        [] as { username: string; sharecode: string }[]
    );

    useEffect(() => {
        if (localStorage.getItem("savedResults")) {
            setSavedResults(
                JSON.parse(localStorage.getItem("savedResults")!) as {
                    username: string;
                    sharecode: string;
                }[]
            );
        }
    }, [setSavedResults]);

    return (
        <main
            className={
                inter.className +
                " left-[50%] top-[50%] absolute -translate-x-1/2 -translate-y-1/2 text-center"
            }
        >
            <Deprecation />
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

            {savedResults.length > 0 && (
                <>
                    <h2 className="text-2xl font-bold mt-8">
                        Past Tests Taken:{" "}
                    </h2>
                    {savedResults.map((result) => (
                        <Link
                            key={result.sharecode}
                            href={`/result/${result.sharecode}`}
                        >
                            <motion.button
                                className="bg-blue-600 p-2 rounded-md px-8 mt-2"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {result.username} ({result.sharecode})
                            </motion.button>
                        </Link>
                    ))}
                </>
            )}
        </main>
    );
}
