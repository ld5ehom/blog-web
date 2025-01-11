import { useTags } from "@/utils/hooks";
import Link from "next/link";

export default function Tag() {
    const { data: existingTags } = useTags();

    return (
        <div className="flex flex-col items-center gap-2 px-4 pb-24 pt-20">
            {/* Page title. */}
            <h1 className="mb-8 text-center text-2xl font-semibold">Tag</h1>
            {/* Container for displaying tags. */}
            <div className="container flex flex-wrap justify-center gap-2 ">
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
