"use server";

import { AuthError } from "next-auth";
import { signIn } from "./auth";
import { Card } from "./externalApi";

// Function used to pick a fixed number of objects in array randomly
function pickRandom<T>(arr: T[], count: number): T[] {
    return arr.sort(() => 0.5 - Math.random()).slice(0, count);
}

// Creates a booster of cards
export async function createBooster(cards: Array<Card>) {
    return pickRandom(cards, 10);
}

// Function used to authenticate
export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    console.error(error);
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}
