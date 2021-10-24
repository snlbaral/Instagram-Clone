import { collection, onSnapshot, orderBy, query } from '@firebase/firestore'
import React, { createContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { db } from './firebase'
import jwt_decode from "jwt-decode";

export const postContext = createContext()

function PostContext(props) {
    const [posts, setPosts] = useState([])
    const [isModal, setIsModal] = useState(false)
    const [currentUser, setCurrentUser] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            const user = jwt_decode(token)
            setCurrentUser(user)
        }
    }, [props])

    useEffect(() => {
       const unsubscribe = onSnapshot(query(collection(db, "posts"), orderBy("timestamp","desc")), snapshot=>{
           setPosts(snapshot.docs)
       })
       return () => {
            unsubscribe()
       }
    }, [props])

    return (
        <postContext.Provider value={
            {posts,setPosts,isModal,setIsModal, currentUser}
            }>
            {props.children}
        </postContext.Provider>
    )
}

export default withRouter(PostContext)
