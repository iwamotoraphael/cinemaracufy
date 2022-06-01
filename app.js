const express = require('express')
const db = require('./javascript/wrappers/dbwrapper')
const session = require('cookie-session')

const app = express()
const port = process.env.PORT || 5000

//static files
app.use("/css", express.static(__dirname+"/css"))
app.use("/handlebars", express.static(__dirname+"/handlebars"))
app.use(("/javascript"), express.static(__dirname+"/javascript"))

//Sessão
app.use(session({
    name: 'session',
    secret:'itsmorbintime',

    maxAge: 1000*60*60 //1 hora
    
}))

//Routes
app.get("/",function(req, res){
    res.render(__dirname + "/handlebars/index.handlebars")
})



app.listen(port, ()=>{console.info("servidor rodando na porta: "+port)})