import { getSet } from "@/app/lib/externalApi";
import { NextResponse } from "next/server";

export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: "Missing set ID" }, { status: 400 });
    }

    try {
        const setData = await getSet(id); // use your helper
        return NextResponse.json(setData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || "Failed to fetch set" },
            { status: 500 }
        );
    }
}
