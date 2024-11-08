import prisma from "@/lib/db"
import { useParams } from "next/navigation"
import { NextResponse } from "next/server"



export async function GET(request:Request,ctx:{params:{id:string}}){
    try{

        const {id} = await ctx.params

        console.log("ID:::::",id)
        

        const course = await prisma.course.findUnique({
            where:{
                id
            },
            include:{
                Tutor: true
            }
        })

        console.log(course)

        return NextResponse.json({message:'course found',data:course},{status:201})


    }catch(error){

        console.log("ERROR::::",error)
        return NextResponse.json({message:"Internal server error"},{status:500})

    }
}