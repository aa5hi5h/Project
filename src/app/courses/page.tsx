"use client"
import { Button } from "@/components/ui/button"
import { Course } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const CourseExplorePage = () => {

    const [courses,setCourses] = useState<Course[] | null>(null)
    const [isSaved, setIsSaved] = useState()

    const router = useRouter()

    useEffect(() => {

        const fetchCourse = async() => {
            const response = await fetch("/api/course")
            const data = await response.json()
            console.log("this si the data we are getting :::::",data)
            setCourses(data.data)
        }
        fetchCourse()
    },[])

    const handleSavedCourses = async(id: string) => {
        try{
            const response = await fetch(`/api/course/${id}/saved`,{
                method: "PATCH",
            })
            const result = await  response.json()
            if(response.ok){
                console.log("Course saved")
            }

            console.log("PROJECT DETAIL:::",result.data)
        }catch(error){
            console.log("Something went wrong..",error)
        }
    }


    if(!courses){
        return <div>Loading....</div>
    }

    

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-2 md:grid-cols-3 pt-8 gap-[32px] lg:grid-cols-4">
                {courses.map((course:Course) => (
                    <div onClick={() => router.push(`/course/${course.id}`)} key={course.id} className="p-4 cursor-pointer border rounded shadow mb-4">
                    <h3 className="font-bold text-lg">{course.name}</h3>
                    <p>{course.description}</p>
                    <p><strong>Syllabus:</strong> {course.Syllabus}</p>
                    <p><strong>Content:</strong> {course.content}</p>
                    <p><strong>Category:</strong> {course.category || "Not specified"}</p>
                    <div className="flex flex-col pt-2 space-y-1">
                    <Button className="bg-purple-700 hover:bg-purple-700/75">Buy Now</Button>
                    {course.saved ? <Button onClick={(e) => {
                        e.stopPropagation()
                        handleSavedCourses(course.id)
                    }} className="bg-indigo-700  hover:bg-indigo-700/75">UnSave</Button> : <Button onClick={(e) => { 
                        e.stopPropagation()
                        handleSavedCourses(course.id)
                        }} className="bg-indigo-700 hover:bg-indigo-700/75">Saved</Button> }
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}


export default CourseExplorePage