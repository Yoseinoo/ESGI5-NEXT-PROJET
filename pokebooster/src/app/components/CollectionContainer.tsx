"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { ICard } from "../lib/models/Card";
import Image from "next/image";

type SortOption = "nameAsc" | "nameDesc" | "quantityAsc" | "quantityDesc";

export default function CollectionContainer() {
    const [cards, setCards] = useState<ICard[]>([]);
    const [filteredCards, setFilteredCards] = useState<ICard[]>([]);
    const [selectedSet, setSelectedSet] = useState<string>("All");
    const [sortOption, setSortOption] = useState<SortOption>("nameAsc");

    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const fetchCards = async () => {
            if (!user.isAuthenticated) return;

            const res = await fetch('/api/collection/get');
            const data = await res.json();

            if (res.ok) {
                //console.log(data);
                setCards(data.cards);
            } else {
                console.error(data.error)
            }
        }

        fetchCards();
    }, [user.email, user.isAuthenticated]);

    // Filter and sort cards whenever selection changes
    useEffect(() => {
        let updated = [...cards];

        // Filter by set
        if (selectedSet !== "All") {
            updated = updated.filter((card) => card.setName === selectedSet);
        }

        // Sort cards
        updated.sort((a, b) => {
            switch (sortOption) {
                case "nameAsc":
                    return a.name.localeCompare(b.name);
                case "nameDesc":
                    return b.name.localeCompare(a.name);
                case "quantityAsc":
                    return a.quantity - b.quantity;
                case "quantityDesc":
                    return b.quantity - a.quantity;
                default:
                    return 0;
            }
        });

        setFilteredCards(updated);
    }, [cards, selectedSet, sortOption]);

    // Get all unique set names for dropdown
    const setNames = Array.from(new Set(cards.map((c) => c.setName)));

    return (
        <div>
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-4 justify-center items-center">
                <div>
                    <label className="mr-2 font-semibold">Filter by Set:</label>
                    <select
                        value={selectedSet}
                        onChange={(e) => setSelectedSet(e.target.value)}
                        className="border rounded p-1"
                    >
                        <option value="All">All</option>
                        {setNames.map((set) => (
                            <option key={set} value={set}>
                                {set}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mr-2 font-semibold">Sort by:</label>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as SortOption)}
                        className="border rounded p-1"
                    >
                        <option value="nameAsc">Name ↑</option>
                        <option value="nameDesc">Name ↓</option>
                        <option value="quantityAsc">Quantity ↑</option>
                        <option value="quantityDesc">Quantity ↓</option>
                    </select>
                </div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {filteredCards.map((card) => (
                    <div
                        key={card.cardId}
                        className="border rounded-xl shadow-md p-4 flex flex-col items-center bg-white"
                    >
                        {card.image ? (
                            <Image src={card.image + "/high.webp"} alt={card.name} className="h-full object-cover mb-2 rounded" width={250} height={250} />
                        ) : (
                            <div className="w-full h-32 bg-gray-200 mb-2 rounded flex items-center justify-center">
                                No Image
                            </div>
                        )}
                        <h3 className="font-semibold text-lg text-black">{card.name}</h3>
                        <p className="text-sm text-gray-500">{card.setName}</p>
                        <p className="text-sm text-gray-500">Quantity: {card.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
