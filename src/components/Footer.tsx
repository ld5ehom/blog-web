import Link from "next/link";
import { FC } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import IconButton from "./IconButton";

const Footer: FC = () => {
    return (
        <footer className="flex justify-between border-t p-4 font-medium">
            <div className="flex items-center gap-2 lg:gap-3">
                <div className="pr-1 text-sm lg:pr-2 lg:text-base">
                    ABOUT ME
                </div>
                <div className="text-md text-uclaBlue lg:text-sm">
                    Taewook Park
                </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
                <div className="pr-1 text-sm lg:pr-2 lg:text-base">ADMIN</div>
                <IconButton
                    icon={AiOutlineSetting}
                    component={Link}
                    href="/admin"
                    className="text-gray-500 hover:text-gray-600"
                />
                <IconButton
                    icon={BsPencilSquare}
                    component={Link}
                    href="/write"
                    className="text-gray-500 hover:text-gray-600"
                />
            </div>
        </footer>
    );
};

export default Footer;
