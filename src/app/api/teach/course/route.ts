import prisma from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function POST(request:Request){
    try{

        const session = await auth();
console.log("Session:", session);
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

        const {name,description,Syllabus,content,category} = await request.json()

        if(!name || !Syllabus || !content){
            return NextResponse.json({message:'missing required fields'},{status:401})
        }

        console.log("Creating course with data:", {
            name,
            description,
            Syllabus,
            content,
            category,
            userId: session.userId,
            TutorId: tutorExist.userId
        });

        const newCourse = await prisma.course.create({
            data:{
                name,
                description,
                Syllabus,
                content,
                category,
                userId: session.userId,
                TutorId: tutorExist.userId
            }
        })

        console.log("NEW_COURSE",newCourse)

        return NextResponse.json({message:"new cpurse created "},{status:201})

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

        return courses

    }catch(error){
        console.log("ERROR:::::",error)
        return NextResponse.json({message:'Internal server error'},{status:500})
    }
}