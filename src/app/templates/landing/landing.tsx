import { Button } from "@/components/ui/button"
import { GraduationCap, Shapes } from "lucide-react"
import Link from "next/link"

const LandingPage = () => {

    

    return (
        <div className="flex flex-col p-4 md:p-16">
            <div className="text-8xl max-w-[150px] md:items-center flex flex-col font-bold md:max-w-4xl md:mx-auto tracking-tighter ">
               <div className="text-[#9252bc]">Learn. Build.</div>
               <div className="text-7xl">Contribute. Repeat.</div>
            </div>
            <div className="max-w-xl m-6 items-center text-center mx-auto">
                <p className="text-muted-foreground text-lg">"" Learn from the best resources and  educator from all across the world through thier interactive live seesions , assignment and many more "</p>
            </div>
            <div className="flex gap-4 items-center justify-center ">
                <Link href={"/courses"}>
                <Button className="bg-[#ea316a] flex items-center gap-2 hover:bg-[#ea316a]/75">
                <h3>Explore Courses</h3>
                <Shapes size={32} />
                </Button>
                </Link>
                <Link href={"/teach"}>
                <Button className="bg-[#c97f73] flex items-center gap-2 hover:bg-[#c97f73]/75">
                <h3>Start Teaching</h3>
                <GraduationCap size={64} /></Button>
                </Link>
            </div>
        </div>
    )
}


export default LandingPage