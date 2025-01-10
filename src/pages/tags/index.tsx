import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

// Initialize Supabase client. (Supabase 클라이언트를 초기화합니다.)
const supabase = createClient();

export default function Tag() {
    // Use React Query to fetch 'tags' from the database. (React Query를 사용해 데이터베이스에서 'tags'를 가져옵니다.)
    const { data: existingTags } = useQuery({
        queryKey: ["tags"], // Unique query key for React Query. (React Query의 고유 쿼리 키입니다.)
        queryFn: async () => {
            // Fetch the 'tags' field from the 'Post' table. ('Post' 테이블에서 'tags' 필드를 가져옵니다.)
            const { data } = await supabase.from("Post").select("tags");
            // Parse JSON, flatten nested arrays, and remove duplicates. (JSON을 파싱하고 중첩 배열을 평탄화하며 중복을 제거합니다.)
            return Array.from(
                new Set(data?.flatMap((d) => JSON.parse(d.tags)))
            );
        },
    });

    return (
        <div className="flex flex-col items-center gap-2 px-4 pb-24 pt-20">
            {/* Page title. */}
            <h1 className="mb-8 text-center text-2xl font-semibold">태그</h1>
            {/* Container for displaying tags. */}
            <div className="container mx-auto flex flex-wrap justify-center gap-2 px-10">
                {/* Render each tag as a clickable link. (각 태그를 클릭 가능한 링크로 렌더링합니다.) */}
                {existingTags?.map((tag) => (
                    // Display the tag name.
                    <Link
                        href={`/tags/${tag}`} // Navigate to a page for the specific tag. (특정 태그에 대한 페이지로 이동합니다.)
                        key={tag} // Unique key for each tag. (각 태그의 고유 키입니다.)
                        className="text-xl text-gray-500 underline hover:text-gray-700"
                    >
                        {tag}{" "}
                    </Link>
                ))}
            </div>
        </div>
    );
}
