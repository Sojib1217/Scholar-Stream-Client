import React from 'react';
import img from '../../../assets/graduation.jpg'
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import GoogleLogin from '../SocialLogin/GoogleLogin';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';

const Register = () => {
    const {registerUser,updateUserProfile}=useAuth()
    const {register,handleSubmit,formState:{errors}}=useForm()
    const location = useLocation()
    const navigate = useNavigate()
    const handleRegister=(data)=>{
    // console.log("after register",data)
    const profileImg=data.image[0]
    
    registerUser(data.email,data.password)
    .then(()=>{
        // console.log(result.user)
        // store the img in form data
        const formData=new FormData()
        formData.append('image',profileImg)
        // send the image to store and get the url
        const image_Api_Url=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_api}`
        axios.post(image_Api_Url,formData)
        .then(res=>{
            console.log('after image upload',res.data.data.url)
             const photoURL = res.data.data.url;
              const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        updateUserProfile(userProfile)
                        .then(()=>{
                            console.log('update user profile done' )
                            navigate(location.state || '/')
                        })
                        .catch()

        })
        .catch(err=>console.log(err))
    })
    .catch(err=>{
        console.log(err)
    })
    }
    return (
        <div className='mt-10'>
            <div className='text-center mb-10'>
                <h1 className='text-2xl md:text-4xl font-bold text-purple-500 '>Register Your Information</h1>
            <p className='mt-4 px-4'>Create your account and take the first step toward your scholarship.</p>
            </div>
            <div className='flex justify-start items-center md:mx-40' >
                {/* img */}
              <div className='flex-1 hidden md:block'>
                 <img className='w-100 h-145' src={img} alt="" />
              </div>
                {/* register form info */}
               <form className="card-body text-center flex-1 max-w-100 shadow-2xl" onSubmit={handleSubmit(handleRegister)} >
                <h1 className='text-2xl font-bold text-purple-500'>Register Here </h1>
                
                <fieldset className="fieldset">
                    {/* Name field */}
                    <label className="label">Name</label>
                    <input type="text" {...register('name',{required:true})} className="input w-full" placeholder="Your Name" />
                    {errors.name?.type === "required" && <p className='text-red-500'>Name is required</p>}

                    {/* photo image field */}
                    <label className="label">Image</label>
                    <input type="file" {...register('image',{required:true})}  className="file-input w-full" placeholder="Image" />
                    {errors.image?.type === "required" && <p className='text-red-500'>image is required</p>}
                   

                    {/* email field */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email',{required:true})} className="w-full input" placeholder="Email" />
                    {errors.email?.type === "required" && <p className='text-red-500'>Email is required</p>}
                     
                  

                    {/* password field */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/ })} className="input w-full" placeholder="Password" />
                    {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                    {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 character or longer</p>}
                    {errors.password?.type === "pattern" && <p className='text-red-500'>password must be includes one upperCase and one special character </p>}

                    <button className="btn bg-purple-500 text-white mt-4 ">Register</button>
                </fieldset>
                <p>Already Have an Account <Link className='text-blue-500 underline' state={location.state} to={'/login'}>Login</Link></p>
            <GoogleLogin></GoogleLogin>
            </form>
            
                
            </div>
        </div>
    );
};

export default Register;