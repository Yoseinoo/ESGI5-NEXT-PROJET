"use client";

import { useState } from "react";
import { authenticate } from "../lib/actions";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined);

    const { update, data: session } = useSession();
    const dispatch = useDispatch();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const error = await authenticate(undefined, formData);

        if (!error) {
            // Refresh NextAuth session so AuthSync updates
            await update();

            // Immediately dispatch to Redux (optional)
            if (session?.user) {
                dispatch(
                    setUser({
                        id: session.user.id ?? "",
                        name: session.user.name ?? "",
                        email: session.user.email ?? "",
                    })
                );
            }

            router.push("/");
        } else {
            setErrorMessage(error);
        }
    };

    return (
        <div className="flex justify-center items-center text-black">
            <form
                onSubmit={handleLogin}
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
                    className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Login
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
