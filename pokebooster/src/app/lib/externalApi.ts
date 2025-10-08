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

// Fetch sets
export async function getSets(): Promise<[]> {
    if (!BASE_URL) throw new Error('Missing EXTERNAL_API_URL');

    return fetcher<[]>(`${BASE_URL}/sets`);
}