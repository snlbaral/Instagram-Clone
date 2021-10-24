import React, { useContext } from 'react'
import { postContext } from './global/PostContext'
import Post from './Post'

function Feed() {
    const data = useContext(postContext)
    const {posts} = data

    return (
        <div className="mt-5">
            {posts.map(post=>(
                <Post key={post.id} post={post} />
            ))}
        </div>
    )
}

export default Feed
