"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Toggle } from "./ui/toggle";
import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
    const pathname = usePathname();
    const router = useRouter();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search"


    return(
        <>
        {isSearchPage && (
            <div className="hidden md:block ">
                <SearchInput />
            </div>
        )}
        <div className="flex gap-x-2 ml-auto ">
                {isTeacherPage || isPlayerPage ?(
                <Link href="/">
                    

                    <Toggle>
                        <LogOut className="h-4 w-4 mr-2"/>
                        Exit
                    </Toggle>
                    </Link>
                ): (
                    <Link href="/teacher/courses">
                    <Toggle>
                        Monk Mode
                    </Toggle>
                    </Link>
                )}
            <UserButton
            afterSignOutUrl="/"
            />
        </div>
        </>
    )
}