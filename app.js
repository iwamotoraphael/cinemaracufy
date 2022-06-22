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
app.get("/",async function(req, res){
    res.render('index')
})

app.get("/busca",async function(req, res){
    let itens
    
    if(Object.keys(req.query).length === 0)
        itens = null
    else
        itens = await db.search(req.query.text)

    res.render('busca',{itens: itens})
})

app.get("/filme",async function(req, res){
    let data
    if(Object.keys(req.query).length === 0)
        id = null
    else
    {
        data = await db.getMovieData(req.query.id)
        reviews = await db.getItemReviews(req.query.id)
    }
        

    res.render('filme', {
        nome: data.nome_item,
        foto: data.poster_item,
        lancamento: data.lancamento.toLocaleString().split(' ')[0],
        orcamento: data.orcamento,
        arrecadacao: data.arrecadacao,
        duracao: data.duracao,
        generos: data.generos,
        plataformas: data.plataformas,
        companhias: data.companhias,
        cast: data.casts,
        sinopse: data.sinopse,
        analises: reviews
    })
})

app.get("/serie",async function(req, res){
    let data
    if(Object.keys(req.query).length === 0)
        id = null
    else
    {
        data = await db.getTVData(req.query.id)
        reviews = await db.getItemReviews(req.query.id)
    }
    res.render('series', {
        nome: data.nome_item,
        foto: data.poster_item,
        lancamento: data.lancamento.toLocaleString().split(' ')[0],
        generos: data.generos,
        plataformas: data.plataformas,
        companhias: data.companhias,
        cast: data.casts,
        emissoras: data.emissoras,
        categoria:data.categoria,
        criadores: data.criadores,
        sinopse: data.sinopse,
        analises: reviews
    })
})

app.get("/estatisticas", async function(req, res){
    res.render('estatisticas')
})

app.get("/perfil", async function(req, res){
    res.render('perfil')
})

app.listen(port, ()=>{console.info("servidor rodando na porta: "+port)})