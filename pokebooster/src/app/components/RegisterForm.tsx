"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
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
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-80 bg-white p-6 rounded-xl shadow-md flex flex-col gap-4"
            >
                <h1 className="text-2xl font-semibold text-center mb-2">
                    Register
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded-md"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded-md"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
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
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
}
