import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
export const AdminContext = createContext();


const AdminContextProvider = (props)=>{

    const [aToken, setAtoken] = useState(localStorage.getItem('atoken') ? localStorage.getItem('atoken'): '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const [appointments,setappointment] =useState([])
    const getAllDoctors = async ()=>{
        try {
           console.log("token",aToken)
           const {data} = await axios.post(backendUrl + '/api/admin/all-doctors',{} , { 
            headers: {
              authorization: `Bearer ${aToken}`  // ✅ Correct format
            }
          })
             if(data.success){
               setDoctors(data.doctors)
               console.log(data.doctors)
             }

             else{
               toast.error(data.message)
             }
        } 
        catch (error) {
         toast.error("error.message")
         
        }
    }


    const changeAvailability = async (docId)=>{

      try {
        const { data } = await axios.post(backendUrl + '/api/admin/change-availability', {docId}, 
         { headers: {
            authorization: `Bearer ${aToken}`  // ✅ Correct format
          }
        }
        )

        if(data.success){
            toast.success(data.message)
            getAllDoctors()
        }

        else{
          toast.error(data.message)
        }
        
      } 
      
      catch (error) {
        toast.error(error.message)
        
      }

    }


    const getAllappointment = async (req,res)=>{
         try {
          const {data}= await axios.get(backendUrl+'/api/admin/appointment', {
            headers: {
                authorization: `Bearer ${aToken}`, // ✅ Correct header format
            },
        })

        if(data.success){
          setappointment(data.appointments)
        }
        else{
          toast.error(data.message)
        }
          
         } 
         
         catch (error) {
          toast.error(error.message)
          
         }
    }







     
    const value = {
      aToken, setAtoken, backendUrl,doctors, getAllDoctors,changeAvailability,getAllappointment,setappointment
    }

   return (
      <AdminContext.Provider value={value}>
           {props.children}
      </AdminContext.Provider>
   )  
         
}

export default AdminContextProvider