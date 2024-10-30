import prisma from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function PATCH(request:Request,{params}:{params:{id:string}}){
    try{
        const session = await auth()

        if(!session.userId){
            return NextResponse.json({message:'not authenticated'},{status:401})
        }

        const isTutor = await prisma.tutor.findUnique({
            where:{
                userId: session.userId
            }
        })

        if(!isTutor){
            return NextResponse.json({message:'YOu are not owner of this content'},{status:401})
        }

        const {id} = params

        const courseExist = await prisma.course.findUnique({
            where:{
                id
            }
        })

        if(!courseExist){
            return NextResponse.json({message:'Course did not exist'},{status:401})
        }

        const {name,description,syllabus,content,category} = await request.json()

        if(!name || !content || !syllabus){
            return NextResponse.json({message:'Missing Required Fields'},{status:401})
        }

        const editCourse = await prisma.course.update({
            where:{
                id
            },
            data:{
                name,
                description,
                Syllabus: syllabus,
                content,
                category
            }
        })

        return NextResponse.json({message:"Course succes updated "},{status:201})


    }catch(error){
        console.log("ERROR:::::",error)
        return NextResponse.json({message:'intenrnal server error'},{status:500})
    }
}




export async function DELETE(request:Request,{params}:{params:{id:string}}){
    try{

        const session = await auth()

        if(!session.userId){
            return NextResponse.json({message:'Not authenitecated'},{status:401})
        }

        const isTutor = await prisma.tutor.findFirst({
            where:{
                userId: session.userId
            }
        })

        if(!isTutor){
            return NextResponse.json({message:'You are not the owner of this content'},{status:401})
        }

        const {id} = params

        const ExistedCourse = await prisma.course.findUnique({
            where:{
                id
            }
        })

        if(!ExistedCourse){
            return NextResponse.json({message:"Course does not exist"},{status:404})
        }

        const course = await prisma.course.delete({
            where:{
                id
            }
        })

        return NextResponse.json({message:'Course successfully deleted'},{status:201})

    }catch(error){
        return NextResponse.json({message:'Intenrnal server error'},{status:500})
    }
}