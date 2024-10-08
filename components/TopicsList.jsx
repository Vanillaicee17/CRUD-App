import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';


const getTopics = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`, {
            cache: "no-store", // Disables caching for fresh data
        });

        if (!res.ok) {
            throw new Error("Failed to fetch topics");
        }

        // Returning the JSON response directly
        return await res.json();
    } catch (error) {
        console.log("Error loading topics: ", error);
        return [];
    }
}

export default async function TopicsList() {
    const topics = await getTopics(); // Now we receive the topics array directly

    return (
        <>
            {topics.length > 0 ? (
                topics.map((t) => (
                    <div key={t._id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
                        <div>
                            <h2 className="font-bold text-2xl">{t.title}</h2>
                            <div>{t.description}</div>
                        </div>

                        <div className="flex gap-2">
                            <RemoveBtn id={t._id} /> {/* Passing the ID as `id` */}
                            <Link href={`/editTopic/${t._id}`}>
                                <HiPencilAlt size={24} />
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <p>No topics found.</p>
            )}
        </>
    );
}
