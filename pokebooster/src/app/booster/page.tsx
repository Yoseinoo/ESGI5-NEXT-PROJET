import { getSets } from "../lib/externalApi";
import BoosterOpener from "../components/BoosterOpener";

export default async function Booster() {
    const sets = await getSets();

    return (
        <div>
            <BoosterOpener sets={sets} />
        </div>
    );
}
