import express from 'express'
import cookieParser from 'cookie-parser'

import { bugService } from './services/bug.service.js'
import { userService } from './services/user.service.js'


const app = express()

// App Configuration
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json()) // for req.body

// List
app.get('/api/bug', async (req, res) => {
  try {
    const { name, minSeverity, pageIdx, labels, sortType, sortDesc } = req.query
    const ownerId = req.query.ownerId
    const filterBy = { name, minSeverity, labels, pageIdx, ownerId }

    const sortBy = { type: sortType, desc: sortDesc }
    const data = await bugService.query(filterBy, sortBy)
    res.send(data)
  } catch (error) {
    res.status(500).send(error.message)
  }
})



// Add
app.post('/api/bug', async (req, res) => {
  // console.log('req:', req)
  try {
    
    
    const  bug  = req.body
    const savedBug = await bugService.save(bug)
    res.send(savedBug)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Edit
app.put('/api/bug/:bugId', async (req, res) => {
  try {
   
    
    const  bug  = req.body
    const savedBug = await bugService.save(bug)
    res.send(savedBug)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Read - getById
app.get('/api/bug/:bugId', async (req, res) => {
  try {
    const { bugId } = req.params
    const bug = await bugService.get(bugId)
    // Add your visitedBugsIds logic here...
    res.send(bug)
  } catch (error) {
    res.status(403).send(error.message)
  }
})


// Remove
app.delete('/api/bug/:bugId', async (req, res) => {
  try {
    

    const { bugId } = req.params
    const msg = await bugService.remove(bugId)
    res.send({ msg, bugId })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// **************** Users API:
app.get('/api/auth', (req, res) => {
  userService.query()
    .then(user => {
      res.send(user)
    })
})

app.post('/api/auth/login', (req, res) => {
  const credentials = req.body
  userService.checkLogin(credentials)
    .then(user => {
      const token = userService.getLoginToken(user)
      res.cookie('loginToken', token)
      res.send(user)
    })
    .catch(err => {
      res.status(401).send('Not you!')
    })
})

app.post('/api/auth/signup', (req, res) => {
  const credentials = req.body
  userService.save(credentials)
    .then(user => {
      const token = userService.getLoginToken(user)
      res.cookie('loginToken', token) // kjnds!@#dsjkd$9djkndsa4
      res.send(user)
    })
    .catch(err => {
      console.log(err)
      res.status(401).send('Nope!')
    })
})

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('loginToken')
  res.send('logged-out!')
})

app.get('/api/auth/:userId', (req, res) => {
  const { userId } = req.params
  userService.getById(userId)
    .then(user => res.send(user))
})

app.delete('/api/auth/:userId', (req, res) => {
  const loggedInUser = userService.validateToken(req.cookies.loginToken)
  if (!loggedInUser || !loggedInUser.isAdmin) return res.status(401).send('not available')
  const { userId } = req.params
  userService.remove(userId)
    .then(() => {
      res.send('User Deleted')
    })
    .catch((err) => {
      res.status(401).send(err)
    })
})


const PORT = 3030
app.listen(PORT, () => console.log(`Server ready at port ${PORT}! http://localhost:${PORT}`))
