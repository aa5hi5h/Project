import prisma from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function POST(request:Request){
    try{

        const session = await auth();


if (!session || !session.userId) {
    return NextResponse.json({ message: "Authentication Required" }, { status: 401 });
}



        const tutorExist = await prisma.tutor.findUnique({
            where:{
                userId : session.userId
            }
        })

        if(!tutorExist){
            return NextResponse.json({message:"You need to first registered as tutor"},{status:401})
        }

        console.log("CODE REACHES PAHSE 1")

        const body = await request.json()

        console.log("BODY::::",body)

        const {name,description,Syllabus,content,category} = body

        if(!name || !Syllabus || !content){
            return NextResponse.json({message:'missing required fields'},{status:401})
        }

        console.log("CODE REACHES PHASE 2")

        console.log("Session User ID:", session.userId);
console.log("Tutor Existence Check:", tutorExist);
console.log("Course Payload:", { name, description, Syllabus, content, category });


        const newCourse = await prisma.course.create({
            data:{
                name,
                description,
                Syllabus,
                content,
                category: category || "webDev",
                userId: session.userId,
                TutorId: tutorExist.id
            }
        })

        console.log("NEW_COURSE",newCourse)

       return NextResponse.json({message:"COurse Created hahah "},{status:201})


    }catch(error){
        console.log("ERRROR:::",error)
        return NextResponse.json({message:"Internal server error "},{status:500})
    }
}


export async function GET(request:Request){
    try{

        const session = await auth()

        if(!session.userId){
            return NextResponse.json({message:'Not authenticated'},{status:401})
        }

        const courses = await prisma.course.findMany({
            where:{
                userId: session.userId
            }
        })

        return NextResponse.json({data:courses},{status:201})

    }catch(error){
        console.log("ERROR:::::",error)
        return NextResponse.json({message:'Internal server error'},{status:500})
    }
}