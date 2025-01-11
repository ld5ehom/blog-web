import { cn } from "@/utils/style";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { AiFillGithub, AiFillLinkedin, AiOutlineClose } from "react-icons/ai";
import IconButton from "./IconButton";

// Open check
type SidebarProps = {
    close: () => void;
    isOpen: boolean;
};

const supabase = createClient();

// Left Sidebar menu 왼쪽 사이드바 메뉴
const Sidebar: FC<SidebarProps> = ({ close, isOpen }) => {
    const { data: existingCategories } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data } = await supabase.from("Post").select("category");
            return Array.from(new Set(data?.map((d) => d.category)));
        },
    });

    return (
        <div
            className={cn(
                "absolute z-10 min-h-screen flex-col gap-6 border-r bg-white p-10 pr-6 text-base lg:relative",
                isOpen ? "flex" : "hidden"
            )}
        >
            <div className="flex justify-end lg:hidden">
                <IconButton icon={AiOutlineClose} onClick={close} />
            </div>

            {/* Home */}
            <Link
                href="/"
                className="w-48 font-medium text-uclaBlue hover:underline"
            >
                Home
            </Link>

            {/* Tags */}
            <Link
                href="/tags"
                className="w-48 font-medium text-gray-600 hover:underline"
            >
                Tags
            </Link>

            {/* category */}
            {existingCategories?.map((category) => (
                <Link
                    href={`/category/${category}`}
                    className="w-48 font-medium text-gray-600 hover:underline"
                    key={category}
                >
                    {category}
                </Link>
            ))}

            {/* LinkedIn Github Link */}
            <div className="mt-10 flex items-center gap-4">
                <IconButton
                    component={Link}
                    icon={AiFillLinkedin}
                    href="https://www.linkedin.com/in/ld5ehom"
                    target="_blank"
                />
                <IconButton
                    component={Link}
                    icon={AiFillGithub}
                    href="https://www.github.com/ld5ehom"
                    target="_blank"
                />
            </div>
        </div>
    );
};
export default Sidebar;
