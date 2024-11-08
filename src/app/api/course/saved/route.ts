import prisma from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function GET(request:Request){

    try{

        const session = await auth()

        if(!session.userId){
            return NextResponse.json({message:"Authentication Required"})
        }

        const savedCourse = await prisma.course.findMany({
            where:{
                saved: true
            },
            orderBy:{
                "createdAt": "desc"
            }
        })

        return NextResponse.json({message:"Saved Courses found", data:savedCourse},{status:201})

    }catch(error){
        console.log("ERROR::::",error)
        return NextResponse.json({message:"internal server error"},{status:500})
    }
}