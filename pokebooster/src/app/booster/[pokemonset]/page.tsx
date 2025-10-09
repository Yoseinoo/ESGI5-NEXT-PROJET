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

    const set = await getSet(pokemonset);
    console.log(set.cards);

    // You can render cards or a button to open a booster
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Set: {set.name}</h1>
            <p>Image src = {set.logo}</p>
            <Image src={""/*set.logo + ".webp"*/} alt="set image" width={500} height={500} />
            <BoosterOpener cards={set.cards ?? []} />
        </div>
    );
}
