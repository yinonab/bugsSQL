import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bug_db',
    insecureAuth: true
})

connection.connect(err => {
    if (err) throw new Error('mySql failed connection')
    console.log('connected to SQL server')
})


export  function runSQL(sqlCommand) {
    return new Promise((resolve, reject) => {
        connection.query(sqlCommand, (error, results) => {
            if (error) reject(error)
            else resolve(results)
        })
    })
}

// connection.end()
// module.exports = {
//     runSQL // exporting the runSQL function
// };