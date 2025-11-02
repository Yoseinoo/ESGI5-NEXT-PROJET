import Link from "next/link";
import CollectionContainer from "../components/CollectionContainer";

export default async function Collection() {
    return (
        <div>
            Voici la collection
            <Link href="/booster" className="px-6 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition">
                Ouvrir un booster
            </Link>
                
            <CollectionContainer />
        </div>
    );
}
