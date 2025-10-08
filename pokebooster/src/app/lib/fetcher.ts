/** Function used to fetch */
export default async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, options);
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Fetch error: ${res.status} - ${errorText}`);
    }
    return res.json();
}
