const { useState, useEffect } = React

import { BugList } from "../cmps/BugList.jsx"
import { bugService } from "../services/bug.service.js"
import { userService } from "../services/user.service.js"

export function UserProfile() {

    const [user, setUser] = useState(userService.getLoggedinUser())
    const [bugsToShow, setBugsToShow] = useState([])

    useEffect(() => {
        loadUserBugs()
    }, [])

    function loadUserBugs() {
        bugService.query({ ownerId: user._id })
            .then((res) => {
                setBugsToShow(res.bugsToDisplay)
            })
    }

    console.log('bugsToShow', bugsToShow);
    return <section className="user-profile">
        <h1>Hello {user.fullname}</h1>
        <hr />
        <h2>Your bugs!</h2>
        {bugsToShow.length > 0 ? <BugList bugs={bugsToShow} /> : <p>No bugs yet</p>}

    </section>
}