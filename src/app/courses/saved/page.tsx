"use client"
import { Button } from "@/components/ui/button"
import { Course } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const SavedPage = () => {

    const [courses,setCourse] = useState<Course[] | null>(null)

    const router = useRouter()

    useEffect(() => {

        const fetchSavedPost = async() => {
            const response = await fetch("/api/course/saved")
            const result = await response.json()

            if(response.ok){
                console.log("Fetched post saved successfully:::",result)
            }
            setCourse(result.data)
        }
        fetchSavedPost()
    },[])

    if(!courses){
        return <div>Loading....</div>
    }

    return (
        <div>
            {courses.map((course) => (
                <div onClick={() => router.push(`/course/${course.id}`)} key={course.id} className="p-4 cursor-pointer border rounded shadow mb-4">
                <h3 className="font-bold text-lg">{course.name}</h3>
                <p>{course.description}</p>
                <p><strong>Syllabus:</strong> {course.Syllabus}</p>
                <p><strong>Content:</strong> {course.content}</p>
                <p><strong>Category:</strong> {course.category || "Not specified"}</p>
                <div className="flex flex-col pt-2 space-y-1">
                <Button className="bg-purple-700 hover:bg-purple-700/75">Buy Now</Button>
                </div>
            </div>
            ))}
        </div>
    )
}

export default SavedPage