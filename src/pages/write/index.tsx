import Input from "@/components/Input";
import { MarkdownEditor } from "@/components/Markdown";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import ReactSelect from "react-select/creatable";

const supabase = createClient();

export default function Write() {
    const router = useRouter();

    const titleRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const { data: existingCategories } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data } = await supabase.from("Post").select("category");
            return Array.from(new Set(data?.map((d) => d.category)));
        },
    });
    const { data: existingTags } = useQuery({
        queryKey: ["tags"],
        queryFn: async () => {
            const { data } = await supabase.from("Post").select("tags");
            return Array.from(
                new Set(data?.flatMap((d) => JSON.parse(d.tags)))
            );
        },
    });

    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [content, setContent] = useState("");

    // Summit
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate form inputs (입력값 검증)
        if (!titleRef.current?.value || titleRef.current.value.length === 0)
            return alert("Please enter a title.");
        if (category.length === 0) return alert("Please select a category.");
        if (tags.length === 0) return alert("Please select tags.");
        if (content.length === 0) return alert("Please enter the content.");

        const formData = new FormData();

        formData.append("title", titleRef.current?.value ?? "");
        formData.append("category", category);
        formData.append("tags", tags);
        formData.append("content", content);

        // Add file if provided (파일이 제공된 경우 추가)
        if (fileRef.current?.files?.[0]) {
            formData.append("preview_image", fileRef.current.files[0]);
        }

        // Send data to the server (서버로 데이터 전송)
        const response = await fetch("/api/posts", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        // Redirect to the new post (새로운 글로 이동)
        if (data.id) router.push(`/posts/${data.id}`);
    };

    return (
        <div className="container mx-auto flex flex-col px-4 pb-20 pt-12">
            <h1 className="mb-8 text-2xl font-medium">New Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3">
                    {/* Title input field (제목 입력 필드) */}
                    <Input type="text" placeholder="Title" ref={titleRef} />

                    {/* File input for preview image (미리보기 이미지 업로드 필드) */}
                    <Input type="file" accept="image/*" ref={fileRef} />

                    {/* Dropdown for categories (카테고리 선택 드롭다운) */}
                    <ReactSelect
                        options={(existingCategories ?? []).map((category) => ({
                            label: category,
                            value: category,
                        }))}
                        placeholder="Category"
                        onChange={(e) => {
                            if (e?.value) {
                                setCategory(e.value); // e.value가 string일 때만 상태를 업데이트
                            }
                        }}
                        isMulti={false}
                    />

                    {/* Multi-select for tags (태그 다중 선택 드롭다운) */}
                    <ReactSelect
                        options={(existingTags ?? []).map((tag) => ({
                            label: tag,
                            value: tag,
                        }))}
                        onChange={(e) =>
                            e && setTags(JSON.stringify(e.map((e) => e.value)))
                        }
                        placeholder="Tags"
                        isMulti
                    />

                    {/* Markdown editor for content (내용 작성용 Markdown 에디터) */}
                    <MarkdownEditor
                        height={500}
                        value={content}
                        onChange={(s) => setContent(s ?? "")}
                    />
                </div>

                {/* Submit button (제출 버튼) */}
                <button
                    type="submit"
                    className="mt-4 w-full rounded-md bg-uclaBlue py-2 text-white"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
