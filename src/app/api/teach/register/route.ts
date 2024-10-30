import prisma from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function POST(request:Request){
    try{
        const session = await auth()

        if (!session.userId){
            return NextResponse.json({message:'Not Authenticated'},{status:401})
        }

        const Registeredtutor = await prisma.tutor.findUnique({
            where:{
                userId: session.userId
            }
        }) 

        if(Registeredtutor){
            return NextResponse.json({message:'Tutor Already Registered'},{status:401})
        }

        const {name ,bio } = await request.json()

        if(!name){
            return NextResponse.json({message:"Missign required field"},{status:403})
        }

        const newTutor = await prisma.tutor.create({
            data:{
                name,
                userId:session.userId,
                bio
            }
        })

        return NextResponse.json({message:'Tutor Registered '},{status:201})
    }catch(error){
        console.log("ERROR:::::",error)
        return NextResponse.json({message:'Internal server error'},{status:500})
    }
}