import React, { useEffect, useState } from 'react'
import faker from 'faker'
import { withRouter } from 'react-router';
import jwt_decode from "jwt-decode";
import avatarImg from '../assets/images/avatar.png'

function Suggestion(props) {
    const [rep, setRep] = useState([]);
    const [currentUser, setCurrentUser] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            const user = jwt_decode(token)
            setCurrentUser(user)
        }
        var stories = [];
        for(var i=0;i<15;i++) {
            stories.push(faker.helpers.contextualCard())
        }
        setRep(stories)
    }, [])

    function Logout(e) {
        e.preventDefault()
        localStorage.removeItem('token')
        props.history.push("/")
    }


    return (<div className="px-5 py-7 ">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <img src={avatarImg} alt="cover" className="w-14 h-14 rounded-full border border-gray-500" />
                <div>
                    <p className="text-sm">{currentUser.username}</p>
                    <p className="text-gray-400 text-sm">{currentUser.name}</p>
                </div>
            </div>
            <div className="">
                <a href="/" className="text-xs font-bold sec-color" onClick={(e)=>Logout(e)}>Logout</a>
            </div>
        </div>


        <div className="flex items-center justify-between mt-5">
            <h4 className="text-gray-500 text-sm font-bold">Suggestions For You</h4>
            <p className="text-sm">See All</p>
        </div>

        <div className="mt-5">
        {rep.slice(0,4).map(r=>(
            <div className="flex items-center justify-between mb-3" key={r.name}>
                <div className="flex items-center space-x-2">
                    <img src={r.avatar} className="w-10 h-10 rounded-full border border-gray-500" alt="User Avatar" />
                    <div>
                        <p className="text-sm">{r.name.split(" ").join("").toLowerCase()}</p>
                        <p className="text-gray-400 text-xs">New to Instagram</p>
                    </div>
                </div>
                <div className="">
                    <a href="/" className="text-xs font-bold sec-color">Follow</a>
                </div> 
            </div>
            ))}
            <div className="flex items-center flex-wrap text-xs mt-10 space-x-2 text-gray-400">
                <span className="cursor-pointer">About</span>
                <span className="cursor-pointer">Help</span>
                <span className="cursor-pointer">Press</span>
                <span className="cursor-pointer">API</span>
                <span className="cursor-pointer">Jobs</span>
                <span className="cursor-pointer">Privacy</span>
                <span className="cursor-pointer">Terms</span>
                <span className="cursor-pointer">Locations</span>
            </div>
            <div className="flex items-center text-xs mt-1 space-x-2 text-gray-400">
                <span className="cursor-pointer">Top Accounts</span>
                <span className="cursor-pointer">Hashtags</span>
                <span className="cursor-pointer">Language</span>
            </div>
            <p className="text-gray-400 mt-5 text-xs">© 2021 INSTAGRAM FROM FACEBOOK</p>
        </div>
    </div>)
}

export default withRouter(Suggestion)