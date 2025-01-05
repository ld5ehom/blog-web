import { cn } from "@/utils/style";
import Link from "next/link";
import { FC } from "react";
import { AiFillGithub, AiFillLinkedin, AiOutlineClose } from "react-icons/ai";
import IconButton from "./IconButton";

// Open check
type SidebarProps = {
    close: () => void;
    isOpen: boolean;
};

// Left Sidebar menu 왼쪽 사이드바 메뉴
const Sidebar: FC<SidebarProps> = ({ close, isOpen }) => {
    return (
        <div
            className={cn(
                "absolute min-h-screen flex-col gap-6 border-r bg-white p-10 pr-6 text-base lg:relative",
                isOpen ? "flex" : "hidden"
            )}
        >
            <div className="flex justify-end lg:hidden">
                <IconButton icon={AiOutlineClose} onAbort={close} />
            </div>
            <Link
                href="/"
                className="w-48 font-medium text-uclaBlue hover:underline"
            >
                Home
            </Link>
            <Link
                href="/tag"
                className="w-48 font-medium text-gray-600 hover:underline"
            >
                Tags
            </Link>
            <Link
                href="/category/Web-Development"
                className="w-48 font-medium text-gray-600 hover:underline"
            >
                Development
            </Link>

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
