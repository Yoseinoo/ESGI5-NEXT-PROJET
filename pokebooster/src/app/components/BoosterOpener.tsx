"use client";

import { useState } from "react";
import { createBooster } from "../lib/actions";
import Image from "next/image";
import { Card } from "../lib/externalApi";

export default function BoosterOpener({ cards }: { cards: [] }) {
    const [booster, setBooster] = useState<Array<Card>>([]);

    async function handleOpenBooster() {
        const newBooster = await createBooster(cards);
        // console.log(newBooster);
        setBooster(newBooster);
    }

    return (
        <div>
            <button
                onClick={() => handleOpenBooster()}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Open Booster
            </button>
            <div className="mt-6 w-full flex flex-row items-center flex-wrap justify-between gap-2.5">
                {booster.map((card) => (
                    <Image key={card.id} src={card.image + "/high.webp"} alt={card.name} width={250} height={250} className="rounded-lg object-cover shadow" />
                ))}
            </div>
        </div>
    );
}
