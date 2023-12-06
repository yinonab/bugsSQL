import { userService } from "../services/user.service.js"

const { useState } = React

export function CredentialsForm({ onSubmit, isSignup }) {

    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onSubmit(credentials)
    }

    return (
        <form className="credentials-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
                autoFocus
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
            />
            {isSignup && <input
                type="text"
                name="fullname"
                placeholder="Full name"
                onChange={handleChange}
                required
            />}
            <button>{isSignup ? 'Signup' : 'Login'}</button>
        </form>
    )
}