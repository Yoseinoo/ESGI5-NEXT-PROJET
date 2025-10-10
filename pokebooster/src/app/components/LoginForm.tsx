"use client";

import { useActionState, useState } from "react";
import { authenticate } from "../lib/actions";

export default function LoginForm() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <form
                action={formAction}
                className="w-80 bg-white p-6 rounded-xl shadow-md flex flex-col gap-4"
            >
                <h1 className="text-2xl font-semibold text-center mb-2">
                    Login
                </h1>

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

                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {errorMessage && (
                        <>
                            <p className="text-sm text-red-500">
                                {errorMessage}
                            </p>
                        </>
                    )}
                </div>

                <input type="hidden" name="redirectTo" value={"/"} />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-sm text-center">
                    Don’t have an account?{" "}
                    <a
                        href="/register"
                        className="text-blue-600 hover:underline"
                    >
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
}
