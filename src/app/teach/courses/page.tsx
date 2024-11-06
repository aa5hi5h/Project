"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"



const TeacherHomePage = () => {

    const router = useRouter()

    return (
        <div className="flex flex-col">
            <div className="flex gap-4 justify-end">
                <Button onClick={() => router.push("/teach/bio")} className="bg-purple-500 hover:bg-purple-500/75">Change Your Bio</Button>
                <Button onClick={() => router.push("/teach/courses/new")} className="bg-indigo-600 hover:bg-indigo-600/75">Create new course</Button>
            </div>
            <div>
                there will be courses here 
            </div>
        </div>
    )
}

export default TeacherHomePage