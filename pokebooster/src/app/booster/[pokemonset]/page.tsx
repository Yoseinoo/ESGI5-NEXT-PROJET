"use server";

import BoosterOpener from "@/app/components/BoosterOpener";
import { getSet } from "@/app/lib/externalApi";
import Image from "next/image";

export default async function Booster({
    params,
}: {
    params: Promise<{ pokemonset: string }>;
}) {
    const { pokemonset } = await params;

    let set;
    // HANDLE ERRORS IN CASE NO SET FOUND IN API
    try {
        set = await getSet(pokemonset);
    } catch (error) {
        console.error(error);
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold text-red-600">
                    ❌ Set &quot;{pokemonset}&quot; does not exist
                </h1>
            </div>
        );
    }

    // IF NOT SET DISPLAY ERROR
    if (!set) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold text-red-600">
                    ❌ Set &quot;{pokemonset}&quot; does not exist
                </h1>
            </div>
        );
    }

    // RENDER IF SET IS FOUND
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Set: {set.name}</h1>
            {set.logo && (
                <Image
                    src={set.logo + ".webp"}
                    alt="set image"
                    width={500}
                    height={500}
                />
            )}
            <BoosterOpener cards={set.cards ?? []} />
        </div>
    );
}
