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
        reviews = await db.getItemReviews(req.query.id, req.session.id)
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
        analises: reviews,
        id: req.query.id
    })
})

app.get("/serie",async function(req, res){
    let data
    if(Object.keys(req.query).length === 0)
        id = null
    else
    {
        data = await db.getTVData(req.query.id)
        reviews = await db.getItemReviews(req.query.id, req.session.id)
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
        analises: reviews,
        id: req.query.id
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
    let userdata = await db.getUserData(req.session.id)
    let userlists = await db.getUserLists(req.session.id)

    res.render('perfil',{reviews: userreviews, nome: userdata[0].nome_usuario, link_avatar: userdata[0].link_avatar, listas:userlists})
})

app.get('/register', async function(req, res){
    try{
        res.render('registrar')
    }
    catch(err){
        console.log(err)
    }
})

app.post('/linkitem', async function(req, res){
    console.log(req.body.id_lista+' '+req.body.id_item)
    await db.linkItemList(req.body.id_lista, req.body.id_item)

    res.redirect('/perfil')
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

app.post('/like', async function(req, res){
    await db.like(req.session.id, req.body.idr)
    res.send("<script>window.close();</script>")
})

app.post('/unlike', async function(req, res){
    await db.unlike(req.session.id, req.body.idr)
    res.send("<script>window.close();</script>")
})

app.post('/filme', async function(req, res){
    await db.createReview(req.session.id, req.query.id, req.body.nota, req.body.comentario, new Date())
    res.redirect('/filme/?id='+req.query.id)
})

app.post('/serie', async function(req, res){
    await db.createReview(req.session.id, req.query.id, req.body.nota, req.body.comentario, new Date())
    res.redirect('/serie/?id='+req.query.id)
})

app.post('/lista', async function(req, res){
    let msg = await db.createList(req.session.id, req.body.nome)

    res.redirect('/perfil')
})

app.post('/listas', async function(req, res){
    let lists = await db.getUserLists(req.session.id)

    for(i in lists){
        lists[i].id_item = req.body.id_item
    }

    res.render('listas', {
        listas: lists,
        nome: req.body.nome,
        lancamento: req.body.lancamento,
        sinopse: req.body.sinopse,
        foto: req.body.foto
    })
})

app.listen(port, ()=>{console.info("servidor rodando na porta: "+port)})