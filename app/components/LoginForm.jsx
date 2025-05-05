"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "../actions";


const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState("");

  
async function onSubmit(e) {

    try{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const response = await login(formData)
   
        if(!!response.error){
           console.error(response.error)
        }else{
            router.push('/bookings')
        }
           
    }catch(err){
          console.log(err)
          setError(err)
    }
       
    }

    return (
        <>
            <div className="text-xl text-red-500">{error?.message}</div>
            <form className="login-form" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>

                <button type="submit" className="btn-primary w-1/4 mt-4 bg-amber-600 p-4 text-xl rounded-b-full ">
                    Login
                </button>
            </form>
        </>
    );
};

export default LoginForm;