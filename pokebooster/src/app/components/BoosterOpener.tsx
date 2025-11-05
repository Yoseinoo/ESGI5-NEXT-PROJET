"use client";

import { useEffect, useState } from "react";
import { createBooster } from "../lib/actions";
import Image from "next/image";
import { Card, TcgSet } from "../lib/externalApi";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

export default function BoosterOpener({ sets }: { sets: Array<TcgSet> }) {
    const t = useTranslations();
    const [booster, setBooster] = useState<Array<Card>>([]);
    const [displayedBooster, setDisplayedBooster] = useState<Array<Card>>([]);
    const [selectedSet, setSelectedSet] = useState<string>();
    const [cards, setCards] = useState<Array<Card>>([]);
    const [loading, setLoading] = useState(false);

    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const fetchSet = async () => {
            if (!selectedSet) return;
            setLoading(true);

            const res = await fetch(`/api/set/${selectedSet}`);
            const set = await res.json();

            if (set.cards) {
                setCards(set.cards);
            }

            setLoading(false);
        };

        fetchSet();
    }, [selectedSet]);

    async function handleOpenBooster() {
        setLoading(true);
        setDisplayedBooster([]);
        const newBooster = await createBooster(cards);
        // console.log(newBooster);

        const tcgSet = sets.find((set) => set.id === selectedSet);
        const res = await fetch("/api/collection/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cards: newBooster,
                set: tcgSet,
            }),
        });

        setLoading(false);

        if (res.ok) {
            setBooster(newBooster);

            // Reveal cards one by one
            newBooster.forEach((card, index) => {
                setTimeout(() => {
                    setDisplayedBooster((prev) => [...prev, card]);
                    // Stop loading after last card
                    if (index === newBooster.length - 1) {
                        setLoading(false);
                    }
                }, index * 500); // 500ms between cards
            });
        } else {
            const data = await res.json();
            console.error(data.error);
        }
    }

    useEffect(() => {
        console.log("Displayed booster updated:", displayedBooster);
    }, [displayedBooster]);

    return (
        <div className="flex flex-col gap-2.5">
            {!user.isAuthenticated && <p>{t("booster-opener-ask-auth")}</p>}
            <select
                id="setSelector"
                className="h-10"
                value={selectedSet}
                onChange={(e) => setSelectedSet(e.target.value)}
            >
                {sets.map((s) => (
                    <option key={s.id} value={s.id}>
                        {s.name}
                    </option>
                ))}
            </select>
            <button
                onClick={() => handleOpenBooster()}
                className="bg-blue-600 text-white px-4 py-2 rounded"
                disabled={loading || cards.length < 1 || !user.isAuthenticated}
            >
                {t("button-open-booster")}
            </button>
            <div className="mt-6 w-full flex flex-row flex-wrap justify-between gap-2.5">
                {displayedBooster.map((card) => (
                    <div
                        key={card.id}
                        className="rounded-lg shadow overflow-hidden"
                    >
                        {card.image ? (
                            <Image
                                src={card.image + "/high.webp"}
                                alt={card.name}
                                width={250}
                                height={250}
                                className="rounded-lg object-cover shadow"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold">
                                {card.name}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
