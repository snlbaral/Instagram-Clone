import React, { useContext } from 'react'
import Logo from '../../assets/images/instagram.png'
import { withRouter } from 'react-router'
import avatarImg from '../../assets/images/avatar.png'
import Modal from '../Modal'
import { postContext } from './PostContext'

function Navbar(props) {
    const data = useContext(postContext)
    const {isModal, setIsModal, currentUser} = data


    return (
        <div className="px-3 py-3 relative shadow-sm border text-center sticky top-0 z-50 bg-white">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="md:hidden cursor-pointer" onClick={()=>setIsModal(!isModal)}>
                <i className="fa fa-camera-retro text-2xl" />
            </div>
            <div className="">
                <img className="h-7" src={Logo} alt="Logo" />
            </div>
            <div className="hidden md:inline-flex relative bg-gray-50 border border-gray-300 flex items-center text-gray-500">
                <i className="fa fa-search absolute left-2"></i>
                <input type="text" className="text-sm px-2 h-7 pl-8 outline-none" placeholder="Search" />
            </div>
            <div className="flex items-center space-x-4">
                <i className="fa fa-home hidden text-2xl md:inline-flex cursor-pointer"></i>
                <i className="fa fa-plus-square-o hidden text-2xl md:inline-flex cursor-pointer" title="Create Post" onClick={()=>setIsModal(!isModal)}></i>
                <i className="fa fa-comment-o text-2xl cursor-pointer mb-1"></i>
                <i className="fa fa-heart-o hidden text-2xl md:inline-flex cursor-pointer"></i>
                <img src={avatarImg} className="hidden text-2xl md:inline-flex cursor-pointer h-7 w-7 rounded-full" alt="cover" title={currentUser.username} />
            </div>
            </div>
            {isModal&&(<Modal />)}
        </div>
    )
}

export default withRouter(Navbar)
