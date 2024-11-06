import { Button } from "@/components/ui/button"
import Link from "next/link"



const TeachingLanding = () => {

    return (
        <div className="flex flex-col p-4 md:p-16">
            <div className="text-8xl max-w-[150px] md:items-center flex flex-col font-bold md:max-w-4xl md:mx-auto tracking-tighter ">
               <div className="text-[#9252bc]">Teach. Earn.</div>
               <div className="text-7xl">Share. Publish.</div>
            </div>
            <div className="max-w-xl m-6 items-center text-center mx-auto">
                <p className="text-muted-foreground text-lg">&apos;&apos; Become a teacher in our platform to share your knowledge around the world alongside compensanating with your work. &apos;&apos;</p>
            </div>
            <div className="flex gap-4 items-center justify-center ">
                <Link href={"/teach/new"}>
                <Button className="bg-[#ea316a] flex items-center gap-2 hover:bg-[#ea316a]/75">
                    Publish
                </Button>
                </Link>
                <Link href={"/teach/register"}>
                <Button className="bg-[#c97f73] flex  items-center gap-2 hover:bg-[#c97f73]/75">
                <h3>Become a teacher</h3>
                </Button>
                </Link>
            </div>
        </div>
    )
}

export default TeachingLanding