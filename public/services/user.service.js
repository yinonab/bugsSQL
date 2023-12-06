export const userService = {
    query,
    remove,
    login,
    signup,
    logout,
    getLoggedinUser,
    getEmptyCredentials
}
function query() {
    return axios.get('api/auth')
        .then(res => res.data)
}

function remove(userId) {
    return axios.delete(`/api/auth/${userId}`)
        .then(res => res.data)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedInUser'))
}


function login({ username, password }) {
    return axios.post('/api/auth/login', { username, password })
        .then(res => res.data)
        .then(user => {
            sessionStorage.setItem('loggedInUser', JSON.stringify(user))
            return user
        })
}

function signup({ username, password, fullname }) {
    return axios.post('/api/auth/signup', { username, password, fullname })
        .then(res => res.data)
        .then(user => {
            sessionStorage.setItem('loggedInUser', JSON.stringify(user))
            return user
        })
}

function logout() {
    return axios.post('/api/auth/logout')
        .then(() => {
            sessionStorage.removeItem('loggedInUser')
        })
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

