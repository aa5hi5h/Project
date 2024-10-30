import prisma from "@/lib/db"
import { NextResponse } from "next/server"



export async function GET(request:Request,{params}:{params:{id:string}}){
    try{

        const {id} = params

        const course = await prisma.course.findUnique({
            where:{
                id
            },
            include:{
                Tutor: true
            }
        })

        return course


    }catch(error){

        console.log("ERROR::::",error)
        return NextResponse.json({message:"Internal server error"},{status:500})

    }
}