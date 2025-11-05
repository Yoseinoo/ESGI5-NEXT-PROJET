"use client";

import Link from "next/link";
import { UserIcon } from "./UserIcon";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { signOut } from "next-auth/react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function Header() {
    const t = useTranslations();
    const user = useSelector((state: RootState) => state.user);

    // Show a minimal header while Redux (and session) sync is still loading
    if (user === undefined || user.isAuthenticated === undefined) {
        return (
            <header className="flex justify-between items-center bg-white/70 backdrop-blur-md shadow-md px-6 py-4">
                <Link href="/" className="text-2xl font-bold text-yellow-600">
                    PokeBoosters
                </Link>

                <LanguageSwitcher />
            </header>
        );
    }

    return (
        <header className="flex justify-between items-center bg-white/70 backdrop-blur-md shadow-md px-6 py-4 text-black">
            <Link href="/" className="text-2xl font-bold text-yellow-600">
                PokeBoosters
            </Link>

            {user.isAuthenticated ? (
                <div className="flex items-center gap-4">
                    {user.name && <UserIcon name={user.name} />}
                    <Link href="/collection">{t("link-collection")}</Link>
                    <button id="btn-logout" onClick={() => signOut({ callbackUrl: "/" })}>{t("button-logout")}</button>
                    <LanguageSwitcher />
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <Link id="btn-login" href="/login">{t("button-login")}</Link>
                    <LanguageSwitcher />
                </div>
            )}
        </header>
    );
}
