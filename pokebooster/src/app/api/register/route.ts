import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/app/lib/mongodb";
import { User } from "@/app/lib/models/User";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        // Basic validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );
    } catch (err) {
        console.error("Register Error:", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
