import mongoose, { Schema, Model } from "mongoose";

export interface ICard {
    cardId: string;
    name: string;
    setId: string;
    setName: string;
    quantity: number;
    image: string;
    Ouser: string;
}

const CardSchema: Schema<ICard> = new Schema({
    cardId: { type: String, required: true },
    name: { type: String, required: true },
    setId: { type: String, required: true },
    setName: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    image: { type: String, default: "" },
    Ouser: { type: String, required: true },
});

// Avoid model overwrite issues in dev (Next.js reloads)
export const Card: Model<ICard> = mongoose.models.Card || mongoose.model<ICard>("Card", CardSchema);
