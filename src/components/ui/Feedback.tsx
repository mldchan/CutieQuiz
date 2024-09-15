import { motion } from "framer-motion";
import { useState } from "react";

export default function Feedback() {
    const [type, setType] = useState("bug");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");

    function send() {
        (async () => {
            setDisabled(true);
            fetch("/api/feedback", {
                method: "POST",
                body: JSON.stringify({
                    username: name,
                    message,
                    type,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                if (res.ok) {
                    setError("");
                    setDisabled(false);

                    setType("bug");
                    setName("");
                    setMessage("");
                } else {
                    res.json().then((data) => {
                        setError(data.error);
                        setDisabled(false);
                    });
                }
            });
        })();
    }

    return (
        <>
            <h2 className="text-2xl mt-8 font-bold">Got any feedback?</h2>
            <select
                className="bg-gray-900 px-2 py-1 rounded-md border-[1px] m-1 w-full"
                name="type"
                id="type"
                onChange={(e) => setType(e.currentTarget.value)}
                value={type}
                disabled={disabled}
            >
                <option value="bug">Bug</option>
                <option value="feature">Feature</option>
            </select>
            <br />
            <input
                className="bg-gray-900 p-2 rounded-md border-[1px] m-1 w-full"
                type="name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                placeholder="Username"
                disabled={disabled}
            />
            <br />
            <textarea
                className="bg-gray-900 p-2 rounded-md border-[1px] m-1 w-full"
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
                placeholder="Message..."
                disabled={disabled}
            />
            <br />
            <motion.button
                className="bg-blue-600 p-2 rounded-md px-8 disabled:bg-gray-600 w-full"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={disabled}
                onClick={send}
            >
                Send!
            </motion.button>
            <br />
            {error.length > 0 && <p className="text-red-500">{error}</p>}
        </>
    );
}
