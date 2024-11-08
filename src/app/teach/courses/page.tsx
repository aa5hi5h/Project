"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"



const TeacherHomePage = () => {

    const [courses,setCourses] = useState([])

    const router = useRouter()

    useEffect(() => {

        const fetchCourse = async() => {
            const response = await fetch("/api/teach/course")
            const data = await response.json()
            console.log("this si the data we are getting :::::",data)
            setCourses(data.data)
        }
        fetchCourse()
    },[])

    

    return (
        <div className="flex flex-col">
            <div className="flex gap-4 justify-end">
                <Button onClick={() => router.push("/teach/bio")} className="bg-purple-500 hover:bg-purple-500/75">Change Your Bio</Button>
                <Button onClick={() => router.push("/teach/courses/new")} className="bg-indigo-600 hover:bg-indigo-600/75">Create new course</Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 pt-8 gap-[32px] lg:grid-cols-4">
                {courses.map((course:any) => (
                    <div onClick={() => router.push(`/course/${course.id}`)} key={course.id} className="p-4 cursor-pointer border rounded shadow mb-4">
                    <h3 className="font-bold text-lg">{course.name}</h3>
                    <p>{course.description}</p>
                    <p><strong>Syllabus:</strong> {course.Syllabus}</p>
                    <p><strong>Content:</strong> {course.content}</p>
                    <p><strong>Category:</strong> {course.category || "Not specified"}</p>
                </div>
                ))}
            </div>
        </div>
    )
}

export default TeacherHomePage