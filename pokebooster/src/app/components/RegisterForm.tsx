"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function RegisterForm() {
    const t = useTranslations();
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        setLoading(false);

        if (res.ok) {
            router.push("/login");
        } else {
            const data = await res.json();
            setError(data.error || "Registration failed");
        }
    };

    return (
        <div className="flex justify-center items-center text-black">
            <form
                onSubmit={handleSubmit}
                className="w-80 bg-white p-6 rounded-xl shadow-md flex flex-col gap-4"
            >
                <h1 className="text-2xl font-semibold text-center mb-2">
                    {t("register-title")}
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder={t("placeholder-name")}
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded-md"
                />
                <input
                    type="email"
                    name="email"
                    placeholder={t("placeholder-email")}
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded-md"
                />
                <input
                    type="password"
                    name="password"
                    placeholder={t("placeholder-password")}
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded-md"
                />

                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    {loading ? "Creating account..." : "Register"}
                </button>

                <p className="text-sm text-center">
                    {t("register-ask-login")} <br />
                    <a href="/login" className="text-blue-600 hover:underline">
                        {t("button-login")}
                    </a>
                </p>
            </form>
        </div>
    );
}
