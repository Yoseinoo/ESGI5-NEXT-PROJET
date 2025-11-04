import { NextRequest, NextResponse } from "next/server";
import { User } from "@/app/lib/models/User";
import { connectToDatabase } from "@/app/lib/mongodb";
import { Card } from "@/app/lib/models/Card";
import { auth } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { cards, set } = body;

    if (!cards || !set) {
        return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email: session.user.email });
    if (!user)
        return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Loop through incoming cards and add/update
    for (const card of cards) {
        const existingCard = await Card.findOne({
            Ouser: user._id,
            cardId: card.id,
        });

        if (existingCard) {
            // If card exists, increment quantity and save card
            existingCard.quantity += 1;
            await existingCard.save();
        } else {
            // Otherwise add new card
            const newCard = new Card({
                cardId: card.id,
                name: card.name,
                setId: set.id,
                setName: set.name,
                quantity: 1,
                image: card.image ?? "",
                Ouser: user._id,
            });
            await newCard.save();
        }
    }

    // Fetch updated cards for the user
    const updatedCards = await Card.find({ Ouser: user._id });

    return NextResponse.json({ success: true, cards: updatedCards });
}
