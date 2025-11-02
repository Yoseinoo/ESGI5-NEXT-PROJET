"use client";

import Link from "next/link";
import { UserIcon } from "./UserIcon";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { signOut } from "next-auth/react";

export default function Header() {
    const user = useSelector((state: RootState) => state.user);

    // Show a minimal header while Redux (and session) sync is still loading
    if (user === undefined || user.isAuthenticated === undefined) {
        return (
            <header className="flex justify-between items-center bg-white/70 backdrop-blur-md shadow-md px-6 py-4">
                <Link href="/" className="text-2xl font-bold text-yellow-600">
                    PokéBoosters
                </Link>
            </header>
        );
    }

    return (
        <header className="flex justify-between items-center bg-white/70 backdrop-blur-md shadow-md px-6 py-4">
            <Link href="/" className="text-2xl font-bold text-yellow-600">
                PokéBoosters
            </Link>

            {user.isAuthenticated ? (
                <div className="flex items-center gap-4">
                    {user.name && <UserIcon name={user.name} />}
                    <Link href="/collection">Ma collection</Link>
                    <button onClick={() => signOut({ callbackUrl: "/" })}>Se déconnecter</button>
                </div>
            ) : (
                <Link href="/login">Se connecter</Link>
            )}
        </header>
    );
}
