import { Card } from "@/app/lib/models/Card";
import { User } from "@/app/lib/models/User";
import { connectToDatabase } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _req: NextRequest
) {
    const userEmail = _req.nextUrl.searchParams.get("email");

    if (!userEmail) {
        return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email: userEmail });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const cards = await Card.find({ Ouser: user._id });

    return NextResponse.json({ success: true, cards });
}
