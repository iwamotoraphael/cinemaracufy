const express = require('express');
const db = require('./javascript/wrappers/dbwrapper');
const session = require('cookie-session');
const argon2 = require('argon2');
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

    maxAge: 1000*60*60*2 //2 horas
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

    res.render('busca',{itens: itens, busca: req.query.text})
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
    res.render('serie', {
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
   
    let bestMovies = db.getBestMovies()
    let popularMovies = db.getPopularMovies()
    let bestTV =  db.getBestTV()
    let popularTV = db.getPopularTV()
    let bestReviews = db.getBestReviews()
    let lastReviews = db.getLastReviews()
    let bestUsers = db.getPopularUsers()
    let bestGenres = db.getPopularGenres()

    let data = await Promise.all([lastReviews, bestMovies, popularMovies, bestReviews, bestTV, popularTV, bestUsers, bestGenres])
    
    res.render('estatisticas',{
        ultimasreviews: data[0],
        filmesmaisbemavaliados: data[1],
        filmesmaispopulares: data[2],
        reviewsmaispopulares: data[3],
        seriesmaisbemavaliadas: data[4],
        seriesmaispopulares: data[5],
        destaqueusuariostotal: data[6],
        generosmaispopulares: data[7]

    })

    
})

app.get("/perfil", async function(req, res){
    let userreviews = await db.getUserReviews(req.session.id)
    console.log(userreviews)
    console.log(req.session.id)
    res.render('perfil',{reviews: userreviews})
})

app.get('/register', async function(req, res){
    try{
        res.render('registrar')
    }
    catch(err){
        console.log(err)
    }
})

app.post('/register', async function(req, res){
    try{
        const hashSenha = await argon2.hash(req.body.senha)

        let db_response = await db.createUser(req.body.nome, 1, req.body.login, hashSenha)

        let msg
        switch(db_response){
            case 23505: 
                msg = 'Nome de usuário já utilizado.'
                break
            case 0:
                msg = 'Usuário cadastrado com sucesso.'
                break
            default:
                msg = 'Erro desconhecido.'
                break
        }

        res.render('registrar', {msg: msg})
    }
    catch(err){
        console.log(err)
    }
})

app.post('/login', async function(req, res){
    try{
        let test = await db.checkUserData(req.body.nome, req.body.senha)

        if(test.exists){
            req.session.id = test.id
            res.redirect('/busca')
        }
        else
            res.render('index', {msg: 'Usuário ou senha inválido'})
    }
    catch(err){
        console.log(err)
    }
})

app.listen(port, ()=>{console.info("servidor rodando na porta: "+port)})