import NextAuth from "next-auth";
import { authConfig } from "../auth.config";
import { z } from "zod";
import Credentials from "next-auth/providers/credentials";
import { connectToDatabase } from "./mongodb";
import { User } from "./models/User";
import bcrypt from "bcrypt";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(2),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    // Get the user
                    await connectToDatabase();
                    const user = await User.findOne({
                        email: credentials.email,
                    });
                    if (!user || !user.password) return null;

                    //Check password
                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (passwordsMatch) return user;
                }

                console.log("invalid credentials");
                return null;
            },
        }),
    ],
});
