import { useState } from "react";
import { motion } from "framer-motion";

export default function TakeQuiz() {
    const [stage, setStage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");

    const [error, setError] = useState("");

    const [resultURL, setResultURL] = useState("");

    function submit() {
        setLoading(true);
        fetch("/api/submitquiz", {
            method: "POST",
            body: JSON.stringify({
                username,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                setStage(2);

                setTimeout(() => {
                    setStage(3);
                }, 1000);
                setTimeout(() => {
                    setStage(4);
                }, 3000);
                setTimeout(() => {
                    setStage(5);
                }, 5000);
                setTimeout(() => {
                    setStage(6);
                }, 7000);

                setLoading(false);

                res.json().then((data) => {
                    setResultURL(data.url);
                });
            } else {
                setError("An error occurred. Please try again.");
                setLoading(false);
            }
        });
    }

    return (
        <main className="left-[50%] top-[50%] absolute -translate-x-1/2 -translate-y-1/2 text-center">
            {stage == 1 && (
                <>
                    <h1 className="text-3xl font-bold">
                        Take the Cutie Quiz now!
                    </h1>
                    <p>To take the Cutie Quiz, all we need is your username:</p>
                    <input
                        type="text"
                        className="bg-gray-900 p-2 px-4 rounded-lg border-2 border-gray-800 transition-all my-2 hover:border-blue-700 hover:transition-all"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <p>
                        That&apos;s it! You can begin the Quiz by clicking the
                        button!
                    </p>

                    <motion.button
                        className="bg-blue-600 p-2 rounded-md px-8"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={submit}
                        disabled={loading}
                    >
                        Begin Quiz
                    </motion.button>

                    {error && <p className="text-red-500">{error}</p>}
                </>
            )}
            {stage > 1 && stage < 6 && (
                <>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        Examining brain waves...
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: stage > 2 ? 1 : 0 }}
                    >
                        Checking for cuteness...
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: stage > 3 ? 1 : 0 }}
                    >
                        Calculating cuteness...
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: stage > 4 ? 1 : 0 }}
                    >
                        Almost there...
                    </motion.p>
                </>
            )}
            {stage == 6 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h1 className="text-3xl font-bold">Results are in!</h1>
                    <p className="my-2">
                        Click the button below to check out the results! Because
                        it looks like your results are good :3
                    </p>
                    <a href={resultURL}>
                        <button className="bg-blue-600 p-2 rounded-md px-8">
                            I wanna see those results :3
                        </button>
                    </a>
                </motion.div>
            )}
        </main>
    );
}
