const express = require('express')
const db = require('./javascript/wrappers/dbwrapper')
const session = require('cookie-session')
const handlebars = require('express-handlebars');
const app = express()
const port = process.env.PORT || 5000

//Template Engine
const handlebarsconfig = handlebars.create({defaultLayout: 'main'})
app.engine('handlebars', handlebarsconfig.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')

handlebarsconfig.handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

//Body-Parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//static files
app.use("/css", express.static(__dirname+"/css"))
app.use("/handlebars", express.static(__dirname+"/handlebars"))
app.use(("/javascript"), express.static(__dirname+"/javascript"))
app.use("/img", express.static(__dirname+"/img"))

//Sessão
app.use(session({
    name: 'session',
    secret:'itsmorbintime',
    saveUnitialized: false,

    maxAge: 1000*60*60 //1 hora
    
}))

//Routes
app.get("/",function(req, res){
    res.render('index')
})

app.listen(port, ()=>{console.info("servidor rodando na porta: "+port)})