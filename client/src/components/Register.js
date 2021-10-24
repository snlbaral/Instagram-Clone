import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/images/instagram.png'
import $ from 'jquery'

function Register(props) {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)
    const [name, setName] = useState(null)
    const [error, setError] = useState(null)

    function submitForm(e) {
        e.preventDefault()
        $('.register-btn').prop('disabled',true)
        $('.register-btn').html("Signing Up...")
        const data = {
            username, password, email, name
        }
        axios.post("/users/create", data).then(response=>{
            $('.register-btn').prop('disabled',false)
            $('.login-error').hide()
            localStorage.setItem('token', response.data)
            props.history.push("/")
        }).catch(err=>{
            $('.register-btn').prop('disabled',false)
            $('.login-error').show()
            setError(err.request.response)
        })
    }

    return (
        <div className="flex items-start justify-center mt-5 space-x-5 mb-5">
            <div className="">
                <div className="form-container h-full md:bg-white md:border rounded px-12 py-10 mt-10 bg-transparent border-0">
                    <img src={Logo} className="w-40 mx-auto" alt="Logo"/>
                    <div className="w-full max-w-xs">
                        <form className="mt-5 w-full" autoComplete="off" onSubmit={(e)=>submitForm(e)}>
                            <div className="mb-4">
                                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className="mb-4">
                                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Full Name" onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="mb-4">
                                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                            </div>
                            <div className="mb-6">
                                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="login-btn register-btn hover:bg-blue-500 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline w-full text-sm flex items-center justify-center" type="submit">
                                Sign Up
                                </button>
                            </div>
                            <div className="flex items-center justify-between mt-3 text-sm">
                                <div className="line"></div>
                                <div className="mx-3 text-gray-400 font-semibold">OR</div>
                                <div className="line"></div>
                            </div>
                            <p className="mx-auto text-sm facebook_color font-semibold mt-5 text-center">
                                <i className="fa fa-facebook-official mr-3"></i> Login with Facebook
                            </p>
                            {error && (
                                <p className="mx-auto text-sm text-red-600 text-center mt-3">
                                {error}
                                </p>
                            )}
                            <p className="text-small mt-3 cursor-pointer facebook_color text-center mx-auto">Forgot Password?</p>
                        </form>
                    </div>
                </div>
                <div className="form-container bg-transparent md:bg-white md:border border-0 rounded px-12 py-5 mt-3 mx-auto">
                <p className="text-sm">
                    Have an account? <Link to="/" className="login-page-link font-bold">Log In</Link>
                </p>
                </div>
            </div>
        </div>
    )
}

export default Register
