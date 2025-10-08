import SetsContainer from "./components/SetsContainer";
import { getSets } from "./lib/externalApi";

export default async function Home() {
    console.log('EXTERNAL_API_URL:', process.env.EXTERNAL_API_URL);

    const sets = await getSets();

    return (
        <div>
            <SetsContainer sets={sets} />
        </div>
    );
}
