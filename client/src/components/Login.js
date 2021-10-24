import React, { useEffect, useState } from 'react'
import FirstImg from '../assets/images/first.jpg'
import SecondImg from '../assets/images/second.jpg'
import ThridImg from '../assets/images/third.jpg'
import FourthImg from '../assets/images/fourth.jpg'
import Logo from '../assets/images/instagram.png'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router'

function Login(props) {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const imgArr = ["first-img","second-img","third-img","fourth-img"]
        var handler = setInterval(() => {
            var position = Math.floor(Math.random()*4)
            $('.mob-img').css('opacity',0)
            $('.'+imgArr[position]).css("opacity",1)
        }, 3000)
        return () => {
           clearInterval(handler)
        }
    },[props])

    function submitForm(e) {
        e.preventDefault()
        $('.login-btn').prop('disabled',true)
        $('.login-btn').html("Logging In...")
        const data = {
            username,
            password
        }
        axios.post("/users/login", data).then(res=>{
            $('.login-btn').prop('disabled',false)
            $('.login-error').hide()
            localStorage.setItem('token', res.data)
            props.history.push("/")
        }).catch(err=>{
            $('.login-btn').prop('disabled',false)
            $('.login-error').show()
            setError(err.request.response)
        })
    }


    return (
        <div className="flex items-start justify-center mt-5 space-x-5 mb-5">
            <div className="img-container mb-5 mt-0 hidden lg:block">
                <img src={FirstImg} className="w-72 mob-img first-img transition-all" alt="cont" />
                <img src={SecondImg} className="w-72 mob-img second-img transition-all" alt="cont" />
                <img src={ThridImg} className="w-72 mob-img third-img transition-all" alt="cont" />
                <img src={FourthImg} className="w-72 mob-img fourth-img transition-all" alt="cont" />
            </div>
            <div className="">
                <div className="form-container h-full md:bg-white md:border rounded px-12 py-10 mt-10 bg-transparent border-0">
                    <img src={Logo} className="w-40 mx-auto" alt="Logo"/>
                    <div className="w-full max-w-xs">
                        <form className="mt-5 w-full" autoComplete="off" onSubmit={(e)=>submitForm(e)}>
                            <div className="mb-4">
                                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                            </div>
                            <div className="mb-6">
                                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="login-btn hover:bg-blue-500 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline w-full text-sm flex items-center justify-center" type="submit">
                                Log In
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
                    Don't have an account? <Link to="/register" className="login-page-link font-bold">Sign Up</Link>
                </p>
                </div>
                <div className="form-container bg-transparent md:bg-white md:border border-0 rounded px-12 py-5 mt-3 mx-auto">
                    <p className="text-sm text-gray-400">Dummy Account Info</p>
                    <p className="text-sm">
                        <span className="text-gray-400">Username: </span>insta <span className="text-gray-400 ml-3">Password: </span>insta123
                    </p>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)
