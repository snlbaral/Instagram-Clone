import React from 'react'
import Feed from './Feed'
import Login from './Login'
import Story from './Story'
import Suggestion from './Suggestion'

function Home() {
    return (<>
    {localStorage.getItem('token') ?(
        <div className="max-w-4xl mt-5 mx-auto grid grid-cols-1 md:grid-cols-3 items-baseline">
            <section className="stories-feeds col-span-2">
                <div className="border border-gray-200 px-5 py-3 bg-white stories flex items-center overflow-x-auto overflow-y-hidden max-h-full">
                    <Story/>
                </div>
                <Feed/>
            </section>
            <section className="suggestions">
                <Suggestion/>
            </section>
        </div>
    ):
    (
        <Login/>
    )}
    </>)
}

export default Home
