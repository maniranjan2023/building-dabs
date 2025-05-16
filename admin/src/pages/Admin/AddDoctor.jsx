import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

  const [docImg,setDocImg] = useState(false)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setpassword] = useState('')
  const [experience,setexperience] = useState('1 year')
  const [fee,setFee] = useState('')
  const [about,setAbout] = useState('')
  const [speciality,setspeciality] = useState('General physician')
  const [degree,setdegree] = useState('')
  const [address1,setaddress1] = useState('')
  const [address2,setaddress2] = useState('')

const {backendUrl,aToken} = useContext(AdminContext)

  const onSubmitHandler = async (e)=>{
          e.preventDefault()

          try {
            if(!docImg){
              return toast.error('image not  selected')
            }

            const formData = new FormData();
            formData.append('image',docImg)
            formData.append('name',name)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('experience',experience)
            formData.append('fee',Number(fee))
            formData.append('about',about)
            formData.append('speciality',speciality)
            formData.append('degree',degree)
            formData.append('address',JSON.stringify({line1:address1,
              line2:address2
            }))
            console.log(aToken)


            // console log formdata
            formData.forEach((value,key)=>{
              console.log(` ${key} : ${value}`)

            })

            
            
            const { data } = await axios.post(
              backendUrl + '/api/admin/add-doctor', 
              formData, 
              { 
                headers: {
                  authorization: `Bearer ${aToken}`  // ✅ Correct format
                }
              }
            );
            
           console.log("data.message")
           toast.success(data.success)
           
            
            if(data.success){
              toast.success(data.success)
              setDocImg(false)
              setAbout('')
              setEmail('')
              setFee('')
              setName('')
              setaddress1('')
              setaddress2('')
              setdegree('')
              setexperience('')
              setspeciality('')

            }
            else{
              toast.error(data.message)
            }



            
          } 
          
          catch (error) {
            return error
          }




  }


  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>add doctor</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer ' src={docImg?URL.createObjectURL(docImg):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setDocImg(e.target.files[0])} type="file"  id='doc-img' hidden/>
          <p>Upload Doctor <br /> Picture</p>
        </div>


        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4 '>
            <div className='flex-1 flex flex-col gap-1'>
              <p>doctor name</p>
              <input value={name} onChange={(e)=>setName(e.target.value)} className='border rounded px-3 py-2' type="text" placeholder='enter doctor name' required/>
            
            
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>doctor email</p>
              <input value={email} onChange={(e)=>setEmail(e.target.value)}  className='border rounded px-3 py-2' type="email" placeholder='enter doctor email' required/>
            
            
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>doctor password</p>
              <input value={password} onChange={(e)=>setpassword(e.target.value)}  className='border rounded px-3 py-2' type="password" placeholder='enter doctor passsword' required/>
            
            
            </div>

            <div className='flex-1 flex flex-col gap-1'>
               <p>experience</p>
               <select value={experience} onChange={(e)=>setexperience(e.target.value)}  className='border rounded px-3 py-2' name="" id="">
                <option value="1 yr">1 year</option>
                <option value="2 yr">2 year</option>
                <option value="3 yr">3 year</option>
                <option value="4 yr">4 year</option>
                <option value="5 yr">5 year</option>
                <option value="6 yr">6 year</option>
                <option value="7 yr">7 year</option>
                <option value="8 yr">8 year</option>
                <option value="9 yr">9 year</option>
                <option value="10 yr">10 year</option>

               </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>fee</p>
              <input value={fee} onChange={(e)=>setFee(e.target.value)}  className='border rounded px-3 py-2' type="number" placeholder='enter the fees' required />

            </div>


          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4 '>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Specilaity</p>
              <select value={speciality} onChange={(e)=>setspeciality(e.target.value)}  className='border rounded px-3 py-2' name="" id="">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input value={degree} onChange={(e)=>setdegree(e.target.value)}  className='border rounded px-3 py-2' type="text" placeholder='enter the education' required />

            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>address</p>
              <input value={address1} onChange={(e)=>setaddress1(e.target.value)} className='border rounded px-3 py-2' type="text" placeholder='enter the address1' required />
              <input value={address2} onChange={(e)=> setaddress2(e.target.value)} className='border rounded px-3 py-2' type="text" placeholder='enter the address2' required />
            </div>



          </div>




        </div>

        <div >
              <p className='mt-4 mb-2'>About doctor</p>
              <textarea value={about} onChange={(e)=>setAbout(e.target.value)} className='w-full px-4 pt-2 border rounded'  placeholder='enter the about doctor' rows={5} required />

            </div>

            <button type='submit' className='bg-blue-500 px-10 py-3 mt-4 text-white rounded-full '>add doctor</button>

             



      </div>
    </form>
  )
}

export default AddDoctor