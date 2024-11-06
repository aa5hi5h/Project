"use client"
import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client"
import { useRouter } from "next/navigation";
import { useState } from "react"


const categories = [
    { value: "webDev", label: "Web Development" },
    { value: "devops", label: "DevOps" },
    { value: "dsa", label: "Data Structures & Algorithms" },
    { value: "systemDesign", label: "System Design" },
    { value: "docker", label: "Docker" },
    { value: "kubernetes", label: "Kubernetes" },
    { value: "security", label: "Security" },
    { value: "web3", label: "Web3" },
    { value: "blockchain", label: "Blockchain" },
];


const CreateCourse = () => {

    const [input,setInput] = useState({
        name:'',
        description:'',
        Syllabus:'',
        content: '',
        category: ''
    })


    const router = useRouter()

    const HandleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const {name,value} = e.target

        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const HandleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!input.name || !input.content || !input.Syllabus){
            console.log("Missing required Fields")
        }

        try{

            const response = await fetch('/api/teach/course',{
                method: "POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify(input)
            }) 

            const result = await response.json()

            if(response.ok){
                console.log("COurse Created",result)
                router.push("/teach/courses")
            }else{
                console.log("Error creating the course")
            }

        }catch(error){
            console.log("ERROR::::",error)
        }
    }

    return (
        <div className="p-8 border max-w-sm flex  mx-auto rounded-md border-[#ea316a]">
            <div className="flex w-full flex-col space-y-4">
                <h1 className="text-2xl font-semibold leading-4">Course Detail</h1> 
            <form onSubmit={HandleSubmit}  className="flex w-full space-y-8 flex-col">
                <div className="flex w-full space-y-2 flex-col">
                    <label className="text-lg font-medium">Name</label>
                    <input
                    name="name"
                    value={input.name}
                    onChange={HandleInputChange} 
                    className="p-2 border rounded-md border-slate-400 hover:border-slate-600 focus:outline-none focus:border-[#ea316a]" placeholder="John doe" />
                </div>
                <div className="flex w-full space-y-2 flex-col">
                    <label>Description</label>
                    <input 
                    name="description"
                    value={input.description}
                    onChange={HandleInputChange}
                    className="p-2 border rounded-md border-slate-400 hover:border-slate-600 focus:outline-none focus:border-[#ea316a]" />
                </div>
                <div className="flex w-full space-y-2 flex-col">
                    <label>Syllabus</label>
                    <input
                    name="Syllabus"
                    value={input.Syllabus}
                    onChange={HandleInputChange}
                    className="p-2 border rounded-md border-slate-400 hover:border-slate-600 focus:outline-none focus:border-[#ea316a]"  />
                </div>
                <div className="flex w-full space-y-2 flex-col" >
                    <label>Content</label>
                    <input
                    name="content"
                    value={input.content}
                    onChange={HandleInputChange}
                    className="p-2 border rounded-md border-slate-400 hover:border-slate-600 focus:outline-none focus:border-[#ea316a]" />
                </div>
                <div className="flex w-full space-y-2 flex-col">
                    <label>Category</label>
                    <select
                    name="category"
                    value={input.category}
                    onChange={HandleInputChange}
                    className="p-2 border rounded-md border-slate-400 hover:border-slate-600 focus:outline-none focus:border-[#ea316a]"
                    >
                        {categories.map((options) => (
                            <option key={options.label} value={options.value} >
                                {options.value}
                            </option>
                        ))}
                    </select>
                </div>
                <Button>
                    Create Course
                </Button>
                </form>
                </div>
                </div>
    )
}

export default CreateCourse