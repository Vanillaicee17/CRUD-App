import EditTopicForm from "@/components/EditTopicForm";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const getTopicById = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics/${id}`,{
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch topic");
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export default async function EditTopic({params}) {
    const {id} = params;
    const topic = await getTopicById(id);
    const { title, description } = topic;
    console.log(id);
    return <EditTopicForm id={id} title={title} description={description}/>
}