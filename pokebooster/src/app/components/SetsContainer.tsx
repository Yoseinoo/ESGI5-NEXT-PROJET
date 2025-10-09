"use client";

import { TcgSet } from "../lib/externalApi";

export default function SetsContainer({ sets }: { sets: Array<TcgSet> }) {
    return (
        <ul>
            {sets.map((s) => (
                <li key={s.id}><a href={"/booster/" + s.id}>{s.name}</a></li>
            ))}
        </ul>
    );
}
