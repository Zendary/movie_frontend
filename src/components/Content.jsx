import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import Home from "../routes/Home";
import About from "../routes/About";
import Shows from "../routes/Shows";
import AllShows from "../routes/AllShows";
import Festivals from "../routes/Festivals";

function Content({ user, loggedIn }) {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/about" element={<About user={user} />} />
                <Route path="/allshows" element={<AllShows user={user} />} />



                {
        loggedIn ?
            [ <>
                // add as many as you'd like here
                <Route path='/shows' element={<Shows user={user} />} />
                <Route path='/festivals' element={<Festivals user={user} />} />
            
                </>]
            :
            <>null</>
    }

    <Route path={"*"} element={ <Navigate replace to={ "/" }/> }/>

                </Routes>
        </div>
    )
}

export default Content
