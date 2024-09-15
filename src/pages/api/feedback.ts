import { supabase } from "@/components/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { username, message, type } = req.body;
    if (!username || !message || !type) {
        return res.status(400).json({ error: "Missing data" });
    }
    if (username.length < 3 || username.length > 20) {
        return res
            .status(400)
            .json({ error: "Username must be between 3 and 20 characters" });
    }
    if (message.length < 3 || message.length > 500) {
        return res
            .status(400)
            .json({ error: "Message must be between 3 and 500 characters" });
    }

    if (type == "bug") {
        await supabase.from("feedbackBugReports").insert({
            username,
            message,
        });

        res.status(200).json({ success: true });
        return;
    }

    if (type == "feature") {
        await supabase.from("feedbackMessages").insert({
            username,
            message,
        });

        res.status(200).json({ success: true });
        return;
    }

    res.status(400).json({ error: "Invalid type" });
}
