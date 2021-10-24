import React, { useContext, useEffect, useState } from 'react'
import $ from 'jquery'
import axios from 'axios'
import { postContext } from './global/PostContext'

function Modal(props) {
    const data = useContext(postContext)
    const {isModal, setIsModal} = data

    const [caption, setCaption] = useState(null)
    const [image, setImage] = useState(null)
    const [imageFile, setImageFile] = useState(null)


    useEffect(()=>{
        if(image && caption) {
            $('.submit-btn').prop('disabled', false)
        } else {
            $('.submit-btn').prop('disabled', true)
        }
    },[image, caption])

    function captionSet(e) {
        setCaption(e.target.value)
    }

    function fileChange(e) {
        setImageFile(e.target.files[0])
        const reader = new FileReader()
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (r) =>{
            setImage(r.target.result)
        }
    }

    function submitPost(e) {
        e.preventDefault()
        $('.submit-btn').prop('disabled',true)
        $('.submit-btn').css('background-color','#0095f6')
        $('.submit-btn').html("Uploading...")
        const data = new FormData()
        data.append('caption',caption)
        data.append('image',imageFile)
        const config = {
            headers: {
                x_access_token: localStorage.getItem('token')
            }
        }
        axios.post("/posts/create", data, config).then(response=>{
            setIsModal(!isModal)
        })
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={()=>props.setIsModal(!props.isModal)}></div>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle">
                    
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 min-w-full  mb-5">
                    <form  onSubmit={(e)=>submitPost(e)}>
                        <div className="uploader flex items-center justify-center py-5">
                            <input type="file" id="file" className="hidden" accept="image/png, image/gif, image/jpeg" onChange={(e)=>fileChange(e)} required/>
                            {image ? (
                                <label htmlFor="file" className="max-h-26">
                                    <img src={image} alt="upload" className="max-h-24 cursor-pointer" />
                                </label>
                            ):
                            (
                            <label htmlFor="file" className="cursor-pointer flex items-center justify-center mx-auto w-auto max-h-52">
                                <i className="fa fa-camera-retro uploader-retro text-2xl w-16 h-16 flex items-center justify-center bg-red-500 rounded-full text-white"></i>
                            </label>
                            )}
                        </div>
                        <div className="flex items-center justify-center py-5">
                            <textarea rows={3} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm resize-none" placeholder="Please enter caption..." onChange={(e)=>captionSet(e)} required></textarea>
                        </div>
                        <button type="submit" className="submit-btn hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-sm flex items-center justify-center" disabled>Upload Post</button>
                        <button type="button" className="mt-3 bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-sm flex items-center justify-center" onClick={()=>setIsModal(!isModal)}>Cancel Post</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
