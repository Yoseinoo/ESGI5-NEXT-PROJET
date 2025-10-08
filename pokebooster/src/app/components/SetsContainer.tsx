"use client";

import { useEffect, useState } from "react";

export default function SetsContainer({ sets }: { sets: any[] }) {
    return (
        <ul>
            {sets.map((s) => (
                <li key={s.id}>{s.name}</li>
            ))}
        </ul>
    );
}
