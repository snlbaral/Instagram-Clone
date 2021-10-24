import React, { useContext, useEffect, useState } from 'react'
import avatarImg from '../assets/images/avatar.png'
import {format} from 'timeago.js'
import { withRouter } from 'react-router'
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, setDoc } from '@firebase/firestore'
import { db } from './global/firebase'
import { postContext } from './global/PostContext'

function Post({post}) {
    const data = useContext(postContext)
    const {currentUser} = data

    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState(false)

    useEffect(() => {
        const unsubscribe1 = onSnapshot(query(collection(db, "posts", post.id , "comments")), snapshot=>{
            setComments(snapshot.docs)
        })
        const unsubscribe2 = onSnapshot(collection(db, "posts", post.id, "likes"), snapshot=>{
            setLikes(snapshot.docs)
        })
        return () =>{
            unsubscribe1()
            unsubscribe2()
        }
    }, [post])

    useEffect(() => {
        const like = likes.find(l=>l.id===currentUser.id)
        if(like) {
            setHasLiked(true)
        } else {
            setHasLiked(false)
        }
    }, [likes, currentUser])

    function convertDate(milliseconds) {
        const today = new Date(milliseconds)
        return format(today)
    }

    async function likePost(e) {
        if(!localStorage.getItem('token')) return false
        var target = e.currentTarget
        if(hasLiked) {
            await deleteDoc(doc(db, "posts", post.id, 'likes', currentUser.id))
        } else {
            target.style.animationName = 'scaleIt'
            setTimeout(()=>{
                target.style.animationName = ''
            },400)
            await setDoc(doc(db, 'posts', post.id, 'likes', currentUser.id), {
                username: currentUser.username
            })
        }
    }

    async function makeComment(e){
        e.preventDefault()
        if(!localStorage.getItem('token')) return false
        var commentToSend = comment
        setComment('')
        await addDoc(collection(db,"posts",post.id,"comments"), {
            username: currentUser.username,
            user_id: currentUser.id,
            avatar: null,
            comment: commentToSend,
            timestamp: serverTimestamp()
        })
    }
        
    return (
        <div className="bg-white shadow-sm border border-gray-200 h-full w-full mb-10 pb-3">
            <div className="flex items-center justify-between border-b px-3 py-2">
                <div className="flex items-center space-x-3 cursor-pointer">
                    <img src={avatarImg} className="w-10 h-10 rounded-full border-2 border-red-600 p-1" alt="profile"/>
                    <p className="">{post.data().username}</p>
                </div>
                <div className="cursor-pointer">
                    <i className="fa fa-ellipsis-h"></i>
                </div>
            </div>
            <div className="mx-auto object-contain">
                <img src={post.data().image} className="mx-auto" alt="posts"/>
            </div>
            <div className="flex items-center justify-between px-3 py-2 mt-5 text-2xl">
                <div className="flex items-center space-x-3">
                    {hasLiked ?(
                        <i className="fa fa-heart cursor-pointer text-red-600 transition-all btn-like" onClick={(e)=>likePost(e)}></i> 
                    ):(
                        <i className="btn-like fa fa-heart-o cursor-pointer hover:text-gray-500 transition-all" onClick={(e)=>likePost(e)}></i>
                    )}
                    <i className="fa fa-comment-o cursor-pointer hover:text-gray-500"></i>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 transform rotate-60 cursor-pointer hover:text-gray-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </div>
                <div className="cursor-pointer hover:text-gray-500">
                    <i className="fa fa-bookmark-o"></i>
                </div>
            </div>
            {likes && likes.length>0 &&(
                <p className="px-3 font-semibold text-sm">{likes.length} Likes</p>
            )}
            <div className="flex items-center px-3 pr-20 py-2 space-x-2">
                <div className="font-semibold text-sm">{post.data().username}</div>
                <div className="text-sm truncate">{post.data().caption}</div>
            </div>
            {comments && comments.length>0 &&(
                <p className="px-3 text-gray-400 font-semibold text-sm cursor-pointer">View all {comments.length} comments</p>
            )}
            {comments.map(com=>{
                return(
                    <div key={com.id} className="flex items-center px-3 pt-1 pr-10 justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="font-semibold text-sm">{com.data().username}</div>
                            <div className="text-sm truncate">{com.data().comment}</div>
                        </div>
                        <i className="fa fa-heart-o text-sm cursor-pointer"></i>
                    </div>
                )
            })}

            <p className="px-3 mt-2 text-gray-400 text-small font-semibold">{convertDate(post.data().timestamp.seconds*1000)}</p>
            <form className="border-t flex items-center mt-3 px-3 pt-3" onSubmit={(e)=>makeComment(e)}>
                <i className="fa fa-smile-o text-xl text-gray-700 cursor-pointer"></i>
                <input type="text" className="appearance-none rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline text-sm" placeholder="Add a Comment..." value={comment} onChange={(e)=>setComment(e.target.value)} required/>
                <button type="submit" disabled={!comment.trim()} className="font-semibold text-blue-300 text-sm comment-btn">Post</button>
            </form>
        </div>
    )
}

export default withRouter(Post)
