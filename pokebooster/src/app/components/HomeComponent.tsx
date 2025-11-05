"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HomeComponent() {

    const t = useTranslations();

    return (
        <div>
            <section className="text-center mt-10">
                <h1 className="text-4xl font-bold text-yellow-700 mb-4">
                    {t("home-title")}
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                    {t("home-subtitle")}
                </p>
                <Link href="/booster" className="px-6 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition">
                    {t("button-open-booster")}
                </Link>
            </section>
        </div>
    );
}