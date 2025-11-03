import Link from "next/link";
import CollectionContainer from "../components/CollectionContainer";

export default async function Collection() {
    return (
        <div className="flex flex-col gap-2.5 justify-center items-center">
            <div className="flex flex-col gap-2.5 justify-center items-center">
                <h1 className="title">Votre collection</h1>
                <Link href="/booster" className="px-6 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition">
                    Ouvrir un booster
                </Link>
            </div>
                
            <CollectionContainer />
        </div>
    );
}
