"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function RemoveBtn({ id }) {
    const router = useRouter();

    const removeTopic = async () => {
        const confirmed = confirm('Are you sure you want to remove this?');
        if (confirmed) {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics?id=${id}`, {
                    method: 'DELETE',
                });

                if (res.ok) {
                    router.refresh(); // Refresh the page or data after deletion
                } else {
                    throw new Error("Failed to delete the topic");
                }
            } catch (error) {
                console.error("Error removing topic: ", error);
            }
        }
    };

    return (
        <button onClick={removeTopic} className="text-red-400">
            <HiOutlineTrash size={24} />
        </button>
    );
}
