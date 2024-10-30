import prisma from "@/lib/db"
import { NextResponse } from "next/server"



export async function GET(request:Request){
    try{

        const courses = await prisma.course.findMany({
            orderBy:{
               createdAt: "desc"
            }
        })

        return courses

    }catch(error){
        console.log(error)
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
}