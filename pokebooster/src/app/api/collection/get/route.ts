import { auth } from "@/app/lib/auth";
import { Card } from "@/app/lib/models/Card";
import { User } from "@/app/lib/models/User";
import { connectToDatabase } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    
    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const cards = await Card.find({ Ouser: user._id });

    return NextResponse.json({ success: true, cards });
}
