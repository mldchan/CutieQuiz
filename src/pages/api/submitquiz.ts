import { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "@/components/supabase";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: "Missing username" });
    }

    if (username.length < 3 || username.length > 20) {
        return res
            .status(400)
            .json({ error: "Username must be between 3 and 20 characters" });
    }

    const sharecode = genSharecode();

    await supabase.from("cuties").insert({
        username: req.body.username,
        sharecode,
    });

    res.status(200).json({ url: `/result/${sharecode}` });
}

function genSharecode() {
    return Math.random().toString(36).substring(2, 7);
}
