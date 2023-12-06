import fs from 'fs'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'

import { runSQL } from './db.service.js' 
const PAGE_SIZE = 5

async function query(filterBy = {}, sortBy) {
  console.log('filterBy', filterBy)
  const whereClauses = []

  if (filterBy.name) {
      whereClauses.push(`(bug.name LIKE '%${filterBy.name}%' OR bug.description LIKE '%${filterBy.name}%')`)
  }

  if (filterBy.minSeverity) {
      whereClauses.push(`bug.severity >= ${filterBy.minSeverity}`)
  }

  if (filterBy.ownerId) {
      whereClauses.push(`bug.creator_id = ${filterBy.ownerId}`)
  }

  let whereQuery = ''
  if (whereClauses.length > 0) {
      whereQuery = 'WHERE ' + whereClauses.join(' AND ')
  }

  const query = `SELECT * FROM bug ${whereQuery}`
  // Add sorting if required

  const bugs = await runSQL(query)
  const pageCount = Math.ceil(bugs.length / PAGE_SIZE)

  // Implement pagination here

  const data = { bugsToDisplay: bugs, pageCount }
  return data
}


async function get(bugId) {
  const query = `SELECT * FROM bug WHERE bug._id = ${bugId}`
  const bugs = await runSQL(query)
  if (bugs.length === 1) return bugs[0]
  throw new Error(`bug id ${bugId} not found`)
}


async function remove(bugId, loggedinUser) {
  const query = `SELECT * FROM bug WHERE bug._id = ${bugId}`
  const bugs = await runSQL(query)
  if (bugs.length !== 1) throw new Error('No such bug')

  const bug = bugs[0]

  // const user = await userService.getById(loggedinUser._id)
  // if (bug.creator_id !== user._id && !user.isAdmin) throw new Error('Not your bug')

  const deleteQuery = `DELETE FROM bug WHERE bug._id = ${bugId}`
  const deletedBug = await runSQL(deleteQuery)
  // Additional operations if required
  return deletedBug
}

async function save(bug) {
  console.log("hellow",bug);
  if (bug._id) {
      const query = `SELECT * FROM bug WHERE bug._id = ${bug._id}`
      const bugs = await runSQL(query)
      if (bugs.length !== 1) throw new Error('No such bug')

      const updateQuery = `UPDATE bug SET 
                          name = "${bug.name}",
                          severity = ${bug.severity},
                          description = "${bug.description}"
                          WHERE bug._id = ${bug._id}`

      await runSQL(updateQuery)
      return bug
  } else {
      // const newBugId = utilService.makeId()
      const insertQuery = `INSERT INTO bug ( name, severity, description) 
                          VALUES ( 
                                  "${bug.name}", 
                                  ${bug.severity}, 
                                  "${bug.description}")`

      const newBug=await runSQL(insertQuery)
      console.log('newBug:', newBug)
      // bug._id = newBugId
      return bug
  }
}



function getSortedBugs(bugsToDisplay, sortBy) {
  bugsToDisplay.sort(
    (b1, b2) => sortBy.desc * (b2[sortBy.type] - b1[sortBy.type])
  )
  return bugsToDisplay
}


// function _saveBugsToFile() {
//   return new Promise((resolve, reject) => {
//     const bugsStr = JSON.stringify(gBugs, null, 2)
//     fs.writeFile('data/bug.json', bugsStr, err => {
//       if (err) {
//         return console.log(err)
//       }
//       console.log('The file was saved!')
//       resolve()
//     })
//   })
// }

export const bugService = {
  query,
  get,
  remove,
  save,
}
