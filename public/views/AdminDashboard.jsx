const { useState, useEffect } = React
import { userService } from '../services/user.service.js';
import { showErrorMsg } from '../services/event-bus.service.js'

export function AdminDashboard() {

    const [user, setUser] = useState(userService.getLoggedinUser())
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.query()
            .then(setUsers)
    }, [])

    function onRemoveUser(userId) {
        userService.remove(userId)
            .then(() => {
                const usersToUpdate = users.filter(user => user._id !== userId)
                setUsers(usersToUpdate)
                console.log('Removed successfully - user MSG YAY');
            })
            .catch((err) => {
                console.log('nn:')
                console.log('here is the msg from the server', err.response.data)
                console.log('Had issues removing the user')
                showErrorMsg('Cannot remove user')
            })
    }

    if (!user && !user.isAdmin) return <div>Now allowed habibi</div>
    return <section className="admin-dashboard">
        <h1>Heya mr admin - {user.userName}</h1>
        <hr />
        <h3>Here are the usersss</h3>

        {users.map(user => <div key={user._id} style={{ border: "1px solid black", padding: "15px", margin: "10px" }}>
            <h4>user name: {user.username}</h4>
            <h4>id: {user._id}</h4>
            <button onClick={() => onRemoveUser(user._id)}>Remove this user</button>
        </div>)}
    </section>
}