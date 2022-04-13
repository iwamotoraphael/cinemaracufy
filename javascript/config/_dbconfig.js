const pg = require('pg')

const client = new pg.Client({
    user: 'qyjoglpsxqzaeg',
    host:'ec2-34-207-12-160.compute-1.amazonaws.com',
    database:'d6v8bbfqo6ct55',
    password:'4ad43a506309ce62d85a37a73ddef0e91f8ac1136c3538fc324f419099e71706',
    port:5432,
    ssl: {
        sslmode: 'require',
        rejectUnauthorized: false
    }
})

module.exports = client