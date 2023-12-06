const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM

import { bugService } from '../services/bug.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function BugDetails() {
  const [bug, setBug] = useState(null)
  const { bugId } = useParams()

  useEffect(() => {
    bugService.getById(bugId)
      .then(bug => setBug(bug))
      .catch(err => showErrorMsg('Cannot load bug'))
  }, [])

  if (!bug) return <h1>loadings....</h1>
  return (
    <div className="bug-details">
      <h3>Bug Details 🐛</h3>
      <h4>{bug.name}</h4>
      <p>
        created by: <span>{bug.creator.fullname}</span>
      </p>

      <p>
        Severity: <span>{bug.severity}</span>
      </p>
      <p>
        Description: <span>{bug.description}</span>
      </p>
      <button>
        <Link to="/bug">Back to List</Link>
      </button>
    </div>
  )
}
