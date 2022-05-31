const express = require('express')
const pool = require('./javascript/config/_dbconfig')
const db = require('./javascript/wrappers/dbwrapper')

const app = express()
const port = process.env.PORT || 5000


app.listen(port, ()=>{console.info("servidor rodando na porta: "+port)})

