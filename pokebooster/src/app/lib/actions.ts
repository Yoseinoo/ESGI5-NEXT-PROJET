"use server"

import { Card } from "./externalApi";

// Function used to pick a fixed number of objects in array randomly
function pickRandom<T>(arr: T[], count: number): T[] {
    return arr.sort(() => 0.5 - Math.random()).slice(0, count);
}

// Creates a booster of cards
export async function createBooster(cards: Array<Card>) {
    return pickRandom(cards, 10);
}