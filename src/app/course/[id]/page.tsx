"use client"

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { Course } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CoursePage = () => {
    const [course, setCourse] = useState<Course | null>(null); 
    const [isOwner, setIsOwner] = useState(false);

    
    const { userId } = useAuth();

    
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        if (id) {
            const fetchCourse = async () => {
                const response = await fetch(`/api/course/${id}`);
                const data = await response.json();
                setCourse(data.data);
            };

            fetchCourse();
        }
    }, [id]);

    
    
    useEffect(() => {
        if (course && userId) {
            setIsOwner(course.userId === userId);
        }
    }, [course, userId]); 

    
    if (!course) {
        return <div>Loading.....</div>;
    }

    return (
        <div className="flex flex-col space-y-8">
            {isOwner && (
                <div className="flex justify-end gap-4">
                    <Button>Edit</Button>
                    <Button className="bg-red-600 hover:bg-red-400">Delete</Button>
                </div>
            )}
            <div>
                <p>{course.name}</p>
                <p>{course.description}</p>
                <p>{course.category}</p>
                <p>{course.TutorId}</p>
                <div className="flex gap-4 pt-4">
                <Button className="bg-purple-700 hover:bg-purple-700/75">Buy now</Button>
                <Button className="bg-indigo-700 hover:bg-indigo-700/75">Saved</Button>
                </div>
            </div>
        </div>
    );
};

export default CoursePage;
