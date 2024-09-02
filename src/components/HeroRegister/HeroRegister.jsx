import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../fairbase/fairbase.config';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";



const HeroRegister = () => {

    const [registerError, setRegisterError] = useState('');

    const [success, setSuccess] = useState('');

    const [showPassword, setShowPassword] = useState(false);



    const handleSubmit = e => {
        e.preventDefault()

        console.log("from submitted")
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const accepted =e.target.terms.checked;

        console.log(name, email, password,accepted);

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters ');
            return;
        }
        else if(!accepted){
            setRegisterError('please accept our terms and condition');
            return;
        }

        //reset error
        setRegisterError('');
        setSuccess('');
        //create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('addade successfully !!');

                 //update profile
                 updateProfile(result.user,{
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                 })
                 .then(()=>console.log('profile updated'))
                 .catch()

                //send verifaication email
                sendEmailVerification(result.user)
                .then(()=>{alert('Please check you email and verify your account')})

            })


            .catch(error => {

                console.log(error)
                setRegisterError(error.message)

            })


    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Regerster now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="your name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
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
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
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
                    <p>Already have an account? please <Link to='/login'>login </Link>  </p>

                </div>
            </div>
        </div>
    );
};

export default HeroRegister;