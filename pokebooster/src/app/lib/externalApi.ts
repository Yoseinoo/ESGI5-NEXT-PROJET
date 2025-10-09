import fetcher from "./fetcher";

const BASE_URL = process.env.EXTERNAL_API_URL;

// Define a type for your sets
export interface PokemonSet {
    id: string;
    name: string;
    logo: string;
    cardCount: {
        total: number,
        official: number
    }
}

export interface TcgSet {
    id: string,
    logo: string,
    name: string,
    cards: []
}

export interface Card {
    id: string,
    image: string,
    name: string
}

// Fetch sets
export async function getSets(): Promise<[]> {
    if (!BASE_URL) throw new Error('Missing EXTERNAL_API_URL');

    return fetcher<[]>(`${BASE_URL}/sets`);
}

// Fetch infos for a single set with its setId
export async function getSet(setId: string): Promise<TcgSet> {
    if (!BASE_URL) throw new Error('Missing EXTERNAL_API_URL');

    return fetcher<TcgSet>(`${BASE_URL}/sets/${setId}`);
}