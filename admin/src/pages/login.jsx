import React, { useState } from "react";
import { assets } from "../assets/assets_admin/assets.js";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [state, setState] = useState("Admin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setAtoken, backendUrl } = useContext(AdminContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {

            if(state==='Admin'){
                  const {data} = await axios.post(backendUrl + '/api/admin/login' , {email, password} )

                  if(data.success){
                    localStorage.setItem('atoken',data.token)
                    setAtoken(data.token)
                  }

                  else{
                    toast.error(data.message)
                  }

                 
            }

          } 
        
        catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg ">
                <p className="text-2xl font-semibold m-auto ">
                    <span className="text-blue-500">{state}</span> Login
                </p>

                <div className="w-full">
                    <p>email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="border border-[#DADADA]  rounded w-full p-2 mt-1 "
                        type="email"
                        required
                    />
                </div>

                <div className="w-full">
                    <p>password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="border border-[#DADADA]  rounded w-full p-2 mt-1 "
                        type="password"
                        required
                    />
                </div>

                <button className="bg-blue-500 text-white w-full py-2 rounded-md text-base">Login</button>
                {state === "Admin" ? (
                    <p>
                        doctor login?
                        <span className="text-primary underline cursor-pointer " onClick={() => setState("Doctor")}>
                            {" "}
                            click here
                        </span>
                    </p>
                ) : (
                    <p>
                        admin login?{" "}
                        <span className="text-primary underline cursor-pointer" onClick={() => setState("Admin")}>
                            {" "}
                            Click Here
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;
