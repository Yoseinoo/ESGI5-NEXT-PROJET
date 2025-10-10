import Link from "next/link";

export default async function Home() {
    return (
        <div>
            <section className="text-center mt-10">
                <h1 className="text-4xl font-bold text-yellow-700 mb-4">
                    Bienvenue sur PokéBoosters!
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                    Ouvre des boosters de tes séries pokémon préférées et construit ta collection !
                </p>
                <Link href="/booster" className="px-6 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition">
                    Ouvrir un booster
                </Link>
            </section>
        </div>
    );
}
