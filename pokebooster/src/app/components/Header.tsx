"use client";

import Link from "next/link";
import { useState } from "react";
import { UserIcon } from "./UserIcon";

export default function Header() {
    const [user, setUser] = useState<{ name: string } | null>(null);

    return (
        <header className="flex justify-between items-center bg-white/70 backdrop-blur-md shadow-md px-6 py-4">
            <Link href="/" className="text-2xl font-bold text-yellow-600">
                PokéBoosters
            </Link>

            <div className="flex items-center gap-4">
                {user && <UserIcon name={user.name} />}
            </div>

            {user && <Link href="/collection">Ma collection</Link>}
        </header>
    );
}
