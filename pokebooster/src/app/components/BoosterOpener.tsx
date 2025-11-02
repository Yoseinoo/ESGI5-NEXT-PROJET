"use client";

import { useEffect, useState } from "react";
import { createBooster } from "../lib/actions";
import Image from "next/image";
import { Card, TcgSet } from "../lib/externalApi";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

export default function BoosterOpener({ sets }: { sets: Array<TcgSet> }) {
    const [booster, setBooster] = useState<Array<Card>>([]);
    const [selectedSet, setSelectedSet] = useState<string>();
    const [cards, setCards] = useState<Array<Card>>([]);
    const [loading, setLoading] = useState(false);

    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const fetchSet = async() => {
            if (!selectedSet) return;
            setLoading(true);

            const res = await fetch(`/api/set/${selectedSet}`);
            const set = await res.json();

            if (set.cards) {
                setCards(set.cards);
            }

            setLoading(false);
        }

        fetchSet();
    }, [selectedSet]);

    async function handleOpenBooster() {
        const newBooster = await createBooster(cards);
        // console.log(newBooster);

        const tcgSet = sets.find(set => set.id === selectedSet);
        const res = await fetch("/api/collection/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "userEmail": user.email,
                "cards": newBooster,
                "set": tcgSet
            }),
        });

        setLoading(false);

        if (res.ok) {
            setBooster(newBooster);
        } else {
            const data = await res.json();
            console.error(data.error)
        }
    }

    return (
        <div>
            {!user.isAuthenticated && <p>Veuillez vous connecter pour ouvrir des boosters</p>}
            <select id="setSelector" value={selectedSet} onChange={(e) => setSelectedSet(e.target.value)}>
                {sets.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                ))}
            </select>
            <button
                onClick={() => handleOpenBooster()}
                className="bg-blue-600 text-white px-4 py-2 rounded"
                disabled={loading || cards.length < 1 || !user.isAuthenticated}
            >
                Open Booster
            </button>
            <div className="mt-6 w-full flex flex-row items-center flex-wrap justify-between gap-2.5">
                {booster.map((card) => (
                    <Image
                        key={card.id}
                        src={card.image ? card.image + "/high.webp" : ""}
                        alt={card.name}
                        width={250}
                        height={250}
                        className="rounded-lg object-cover shadow"
                    />
                ))}
            </div>
        </div>
    );
}
