import { BriefcaseBusiness, CircleUserRound, Grid2X2, House, Sun, UserPen } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="sticky top-0 py-8 flex justify-around items-center">
            <div>
                logo
            </div>
            <div className="flex items-center gap-1 p-1 rounded-full
                  bg-black backdrop-blur-md border border-white/20">
                <Link href="#" className="rounded-full p-2 transition duration-300 hover:bg-gray-500/25">
                    <House className="w-4 h-4" />
                </Link>
                <div className="border-r border-gray-400/75 h-6"></div>

                <Link href="#" className="flex justify-center items-center gap-3 text-[15px] pl-2 pr-3 py-1 rounded-full transition duration-300 hover:bg-gray-500/25">
                    <CircleUserRound className="w-4 h-4" /> <span>About</span>
                </Link>
                <Link href="#" className="flex justify-center items-center gap-3 text-[15px] pl-2 pr-3 py-1 rounded-full transition duration-300 hover:bg-gray-500/25">
                    <Grid2X2 className="w-4 h-4" /> <span>Services</span>
                </Link>
                <Link href="#" className="flex justify-center items-center gap-3 text-[15px] pl-2 pr-3 py-1 rounded-full transition duration-300 hover:bg-gray-500/25">
                    <UserPen className="w-4 h-4" /> <span>Portfolio</span>
                </Link>
                <Link href="#" className="flex justify-center items-center gap-3 text-[15px] pl-2 pr-3 py-1 rounded-full transition duration-300 hover:bg-gray-500/25">
                    <BriefcaseBusiness className="w-4 h-4" /> <span>Contact</span>
                </Link>
                
                <div className="border-l border-gray-400/75 h-6"></div>
                <button className="p-2 rounded-full transition duration-300 hover:bg-gray-500/25">
                    <Sun className="w-4 h-4"/>
                </button>
            </div>
            <div>
                time
            </div>
        </nav>

    );
}