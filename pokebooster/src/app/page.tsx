import SetsContainer from "./components/SetsContainer";
import { getSets } from "./lib/externalApi";
import { User } from "./lib/models/User";
import { connectToDatabase } from "./lib/mongodb";

export default async function Home() {
    console.log('EXTERNAL_API_URL:', process.env.EXTERNAL_API_URL);

    const sets = await getSets();

    //Test db connection
    await connectToDatabase();
    const users = await User.find();
    console.log(users);

    return (
        <div>
            <SetsContainer sets={sets} />
        </div>
    );
}
