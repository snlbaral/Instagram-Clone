import React, { useEffect, useState } from 'react'
import faker from 'faker'

function Story() {
    const [rep, setRep] = useState([]);

    useEffect(() => {
        var stories = [];
        for(var i=0;i<15;i++) {
            stories.push(faker.helpers.contextualCard())
        }
        setRep(stories)
    }, [])
    return (
        <div className="flex space-x-1">
        {rep.map(r=>(
            <div className="w-20 h-20 cursor-pointer text-left mx-auto" key={r.name}>
                <img src={r.avatar} className="w-14 h-14 border-2 border-red-500 rounded-full object-cover p-1" alt="Story"/>
                <p className="text-xs text-black-100 truncate">{r.name}</p>
            </div>
        ))}
        </div>
    )
}

export default Story
