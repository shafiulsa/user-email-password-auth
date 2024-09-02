import React, { useRef, useState } from 'react';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from "react-router-dom";
import auth from '../fairbase/fairbase.config';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";

const Login = () => {

    const [registerError, setRegisterError] = useState('');

    const [success, setSuccess] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const emailRef=useRef(null);

    const handleSubmit = e => {
        e.preventDefault();
        console.log("log in successfull !!");
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted =e.target.terms.checked;

     

        console.log(name, email, password,accepted);
                //reset error
                setRegisterError('');
                setSuccess('');

        //add validation
        signInWithEmailAndPassword(auth,email,password)
           .then(result => { 
            console.log(result.user);
            // setSuccess('log in successfully')
            if(result.user.emailVerified){
                setSuccess('log in successfully')
            }
            else{
                alert('Please verify your email address');
               //send verifaication email
               sendEmailVerification(result.user)
               .then(()=>{alert('Please check you email and verify your account')})
                
            }
        })
           .catch(error => {
            console.error("error is : ",error);
            setRegisterError(error.message);
           })

    }
    const handleForgetPassword = ()=>{
        // console.log('send reset password',emailRef.current.value);
        const email= emailRef.current.value;

        if(!email){
            console.log('please provide a valid email',emailRef.current.value);
            return;
        }
        else if(! /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            console.log('please enter valid email');
        }

        sendPasswordResetEmail(auth,email)
        .then(()=>{ alert('please cheque your email')})
        .catch(error => console.log(error))
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

                    <form className="card-body" onSubmit={handleSubmit}>
               
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"
                                     name='email'
                                     ref={emailRef}
                                     placeholder="email" 
                                     className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>

                            <div className="flex">
                                <input type={showPassword ? "text" : "password"}

                                    name='password' placeholder="password" className="input input-bordered" required />

                                <span className='bottom-3'  onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaRegEyeSlash /> : <FaRegEye />
                                    }
                                </span>
                            </div>
                            <br />

                             <div className="flex">
                             <input type="checkbox"  name='terms' id='terms'/>
                             <label htmlFor="terms">Accept out <a>term and condition</a> </label>
                             </div>

                            <label className="label">
                                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Regester</button>
                        </div>
                    </form>

                    {
                        registerError && <p className="text-red-600">{registerError} </p>
                    }
                    {
                        success && <p className="text-green-700"> {success}  </p>
                    }
                     <p>new to this website? please <Link to='/heriRegister'>Register </Link>  </p>

                </div>
            </div>
        </div>
    );
};

export default Login;