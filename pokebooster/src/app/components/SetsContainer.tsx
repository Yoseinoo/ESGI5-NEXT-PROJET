"use client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SetsContainer({ sets }: { sets: any[] }) {
    return (
        <ul>
            {sets.map((s) => (
                <li key={s.id}><a href={"/booster/" + s.id}>{s.name}</a></li>
            ))}
        </ul>
    );
}
