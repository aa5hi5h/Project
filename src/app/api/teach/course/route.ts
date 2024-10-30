import prisma from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function POST(request:Request){
    try{

        const session = await auth()

        if(!session.userId){
            return NextResponse.json({message:"Authrntication Required"},{status:401})
        }

        const tutorExist = await prisma.tutor.findUnique({
            where:{
                userId : session.userId
            }
        })

        if(!tutorExist){
            return NextResponse.json({message:"You need to first registered as tutor"},{status:401})
        }

        const {name,description,syllabus,content,category} = await request.json()

        if(!name || !syllabus || !content){
            return NextResponse.json({message:'missing required fields'},{status:401})
        }

        const newCourse = await prisma.course.create({
            data:{
                name,
                description,
                Syllabus: syllabus,
                content,
                category,
                userId: session.userId,
                TutorId: tutorExist.userId
            }
        })

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