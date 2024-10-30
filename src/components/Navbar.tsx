"use client"
import { UserButton, useSession } from "@clerk/nextjs"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"


const Navbar = () => {

    const session = useSession()
    const router = useRouter()

    return (
        <div className="flex justify-between border-b border-slate-200 mb-4 items-center p-4">
            <div onClick={() => router.push("/")}>
                <h1 className="text-4xl font-bold ">Course-app</h1>
            </div>
            <ul className="flex gap-4">
                <li>
                    <Button onClick={() => router.push("/courses")}  variant={"ghost"}>Explore</Button>
                </li>
                <li>
                    <Button onClick={() => router.push("/teach")} className="bg-[#9252bc] hover:bg-[#9252bc]/80 hover:text-white text-white" variant={"outline"}>Create</Button>
                    </li>
                <li>
                    {session.isSignedIn ? (
                        <UserButton />
                    ) : (
                        <Button onClick={() => router.push("/sign-in")} className="bg-[#c97f73] hover:bg-[#c97f73]/80">Sign in</Button>
                    )}
                </li>
            </ul>
        </div>
    )
}

export default Navbar