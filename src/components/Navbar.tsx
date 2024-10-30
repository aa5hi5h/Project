"use client"
import { UserButton, useSession } from "@clerk/nextjs"
import { Button } from "./ui/button"


const Navbar = () => {

    const session = useSession()

    return (
        <div className="flex justify-between border-b border-slate-200 mb-4 items-center p-4">
            <div>
                <h1 className="text-4xl font-bold ">Course-app</h1>
            </div>
            <ul className="flex gap-4">
                <li>
                    <Button  variant={"ghost"}>Explore</Button>
                </li>
                <li>
                    <Button className="bg-[#9252bc] hover:bg-[#9252bc]/80 hover:text-white text-white" variant={"outline"}>Create</Button>
                    </li>
                <li>
                    {session.isSignedIn ? (
                        <UserButton />
                    ) : (
                        <Button className="bg-[#c97f73] hover:bg-[#c97f73]/80">Sign in</Button>
                    )}
                </li>
            </ul>
        </div>
    )
}

export default Navbar