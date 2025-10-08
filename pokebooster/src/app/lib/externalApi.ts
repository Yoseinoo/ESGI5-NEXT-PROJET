import fetcher from "./fetcher";

const BASE_URL = process.env.EXTERNAL_API_URL;
const API_KEY = process.env.EXTERNAL_API_KEY;

// Fetch sets
export async function getSets(): Promise<[]> {
    if (!BASE_URL) throw new Error('Missing EXTERNAL_API_URL');

    return fetcher<[]>(`${BASE_URL}/sets`);
}