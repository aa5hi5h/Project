"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { MouseEventHandler, ReactHTMLElement, useEffect, useState } from "react"


const TeacherRegisterPage = () => {


    const [input,setInput] = useState({
        name: '',
        email: '',
        password: '',
        confirmPass: ''
    })

    const router = useRouter()



    const HandleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {

        const {name,value} = e.target

        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    const HandleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        if(!input.email || !input.name || !input.password || !input.confirmPass){
           console.log("Missing fields")
           return null
        }

        if(input.password !== input.confirmPass){
            console.log("Password doesn't match")
            return null
        }


        try{

        const response = await fetch("/api/teach/register",{
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify(input)
        })


        const result = await response.json()

        if(response.ok){
        console.log("User Registered")
        router.push("/teach/courses")
        }else{
            console.log("Failed to regiter user!!!")
        }
        

    }catch(error){
        console.log("Error submiting fields:",error)
    }
        
        
    }    



    

    return (
        <div className="p-8 border max-w-sm flex  mx-auto rounded-md border-[#ea316a]">
            <div className="flex w-full flex-col space-y-4">
                <h1 className="text-2xl font-semibold leading-4">Become a Teacher</h1> 
            <form onSubmit={HandleSubmit}  className="flex w-full space-y-8 flex-col">
                <div className="flex w-full space-y-2 flex-col">
                    <label className="text-lg font-medium">Username</label>
                    <input
                    name="name"
                    value={input.name}
                    onChange={HandleInputChange} 
                    className="p-2 border rounded-md border-slate-400 hover:border-slate-600 focus:outline-none focus:border-[#ea316a]" placeholder="John doe" />
                </div>
                <div className="flex space-y-2 flex-col">
                    <label className="text-lg font-medium">Email</label>
                    <input
                    name="email"
                    value= {input.email}
                    onChange={HandleInputChange} 
                    className="p-2 border rounded-md border-slate-400 hover:border-slate-600 focus:outline-none focus:border-[#ea316a]" placeholder="abc@gmail.com" />
                </div>
                <div className="flex space-y-2 flex-col">
                  <label className="text-lg font-medium">Password</label>
                  <input
                  name="password"
                  value={input.password}
                  onChange={HandleInputChange} 
                  className="p-2 border rounded-md border-slate-400 hover:border-slate-600 focus:outline-none focus:border-[#ea316a]" placeholder="******" />
                </div>
                <div className="flex space-y-2 flex-col">
                    <label className="text-lg font-medium">Confirm Password</label>
                    <input
                    name="confirmPass"
                    value={input.confirmPass}
                    onChange={HandleInputChange}
                    placeholder="*******" 
                    className="p-2 border rounded-md border-slate-400 hover:border-slate-600 focus:border-[#ea316a] focus:outline-none" />
                </div>
                <Button type="submit">
                Register
                </Button>
            </form>
            </div>
        </div>
    )
}

export default TeacherRegisterPage