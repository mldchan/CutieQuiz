import { GetServerSidePropsContext } from "next";
import { supabase } from "@/components/supabase";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";
import Feedback from "@/components/ui/Feedback";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    if (!ctx.params || !ctx.params.code) {
        return {
            notFound: true,
        };
    }

    const thing = await supabase
        .from("cuties")
        .select("username, sharecode")
        .eq("sharecode", ctx.params.code);

    if (!thing.data || thing.data.length == 0) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            username: thing.data[0].username,
            sharecode: thing.data[0].sharecode,
        },
    };
}

export default function Result(props: { username: string; sharecode: string }) {
    function copyLink() {
        (async () => {
            await navigator.clipboard.writeText(
                `${window.location.origin}/result/${props.sharecode}`
            );
        })();
    }

    function copyMessage() {
        async () => {
            await navigator.clipboard.writeText(
                `📢 I am certified to be cute! 👀 ${window.location.origin}/result/${props.sharecode}`
            );
        };
    }

    return (
        <main
            className={
                inter.className +
                " left-[50%] top-[50%] absolute -translate-x-1/2 -translate-y-1/2 text-center"
            }
        >
            <h1 className="text-3xl font-bold">
                Results for user {props.username}
            </h1>
            <p>You are 100% cute :3</p>
            <br />
            <h2 className="text-2xl w-full">Here are some other metrics :3</h2>
            <br />
            <table className="border-2 border-white mx-auto w-full">
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border-2 border-white">Fluffiness</td>
                        <td className="border-2 border-white">100%</td>
                    </tr>
                    <tr>
                        <td className="border-2 border-white">Adorability</td>
                        <td className="border-2 border-white">100%</td>
                    </tr>
                    <tr>
                        <td className="border-2 border-white">Softness</td>
                        <td className="border-2 border-white">100%</td>
                    </tr>
                    <tr>
                        <td className="border-2 border-white">Friendliness</td>
                        <td className="border-2 border-white">100%</td>
                    </tr>
                </tbody>
            </table>

            <br />

            <Link href="/">
                <motion.button
                    className="bg-blue-600 px-2 py-1 m-2 rounded-xl w-full"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    I wanna take the quiz ;3
                </motion.button>
            </Link>

            <br />

            <h2 className="text-2xl font-bold w-full">
                Share your cutie score with others:
            </h2>
            <div className="grid grid-cols-2">
                <motion.button
                    className="bg-blue-600 px-2 py-1 m-2 rounded-xl w-full"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyLink}
                >
                    Copy Link
                </motion.button>
                <motion.button
                    className="bg-gray-600 px-2 py-1 m-2 rounded-xl w-full"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyMessage}
                >
                    Copy Example Message
                </motion.button>
            </div>

            <p className="mt-8 text-gray-500 text-sm w-full">
                If you haven&apos;t already noticed, this Quiz is a joke, made
                in 2 hours. Please don&apos;t take anything shown here
                seriously, apart from the cuteness, flufiness, adorability,
                softness and friendliness.
            </p>

            <h2 className="mt-8 text-2xl font-bold">About the developer</h2>
            <a
                className="text-blue-600 text-sm"
                href="https://femboy.bio/mldkyt"
                target="_blank"
            >
                femboy.bio/mldkyt
            </a>

            <Feedback />
        </main>
    );
}
