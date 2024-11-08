import prisma from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"



export async function PATCH(request:Request , ctx:{params:{id:string}}){
    try{

        const session = await auth()

        if(!session.userId){
            return NextResponse.json({message:'Authentication required'},{status:401})
        }

        const {id} = ctx.params

        const course = await prisma.course.findUnique({
            where:{
                id
            }
        })

        if(!course){
            return NextResponse.json({message:'Course did not exist'},{status:404})
        }

        if(course.saved){
            await prisma.course.update({
                where:{
                    id
                },
                data:{
                    saved: false
                }
            })
        }else{
            await prisma.course.update({
                where:{
                    id
                },
                data:{
                    saved: true
                }
            })
        }

        return NextResponse.json({message:"Saved post action completed",data:course},{status:201})


    }catch(error){
        console.log("ERROR::::",error)
        return NextResponse.json({message:'Intenral server error'},{status:500})
    }
}