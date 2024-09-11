import { GetServerSidePropsContext } from "next";
import { supabase } from "@/components/supabase";

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
        },
    };
}

export default function Result(props: { username: string }) {
    return (
        <main className="left-[50%] top-[50%] absolute -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-3xl font-bold">
                Results for user {props.username}
            </h1>
            <p>You are 100% cute :3</p>
            <br />
            <h2 className="text-2xl ">Here are some other metrics :3</h2>
            <br />
            <table className="w-[400px] border-2 border-white">
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
            <br />

            <p className="text-gray-500 text-sm">
                If you haven&apos;t already noticed, this Quiz is a joke, made
                in 2 hours. Please don&apos;t take anything shown here
                seriously, apart from the cuteness, flufiness, adorability,
                softness and friendliness.
            </p>
        </main>
    );
}
