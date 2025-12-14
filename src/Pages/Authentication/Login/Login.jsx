import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import GoogleLogin from '../SocialLogin/GoogleLogin';

const Login = () => {

  const {register,handleSubmit,formState:{errors}}=useForm()
    const {signInUser}=useAuth()
    const location=useLocation()
    const navigate=useNavigate()

    const handleLogin=(data)=>{
        console.log(data)
        signInUser(data.email,data.password)
        .then(result=>{
            console.log(result.user)
            navigate(location?.state || '/')
        })
        .catch(error=>{
            console.log(error)
        })
    }
    return (
        <div className='mt-10'>
          <h1 className='text-4xl font-bold text-purple-500 text-center'>Login Your Account</h1>
          <form className="card-body text-center flex-1 max-w-100 shadow-2xl mt-10 mx-auto" onSubmit={handleSubmit(handleLogin)} >
                <h1 className='text-2xl font-bold'>Login Now</h1>
                
                <fieldset className="fieldset">
              
                    {/* email field */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email',{required:true})} className="w-full input" placeholder="Email" />
                    {errors.email?.type === "required" && <p className='text-red-500'>Email is required</p>}
                     
                  

                    {/* password field */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/ })} className="input w-full" placeholder="Password" />
                     {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                    {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 character or longer</p>}
                    
                     <div><a className="link link-hover text-left">Forgot password?</a></div>
                    <button className="btn bg-purple-500 text-white mt-4 ">Login</button>
                </fieldset>
                <p>New to <span className='text-purple-500'>ScholarStream</span> Please <Link className='text-blue-500 underline' state={location.state} to={'/register'}>Register</Link></p>
            <GoogleLogin></GoogleLogin>
            </form>
        </div>
    );
};

export default Login;