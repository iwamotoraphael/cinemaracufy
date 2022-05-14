const db = require('../config/_dbconfig')

    async function createNetwork(nome, foto)
    {
        try{
            
            await db.query(`INSERT INTO emissora(nome_emissora, logo_emissora) VALUES($1, $2)`, [nome, foto])
            return 0
            
        }
        catch(err)
        {
            //error code 23505 means primary key already exists
            if(err.code == 23505)
                return 1
            else
                return 2
        }
    }

    async function createCast(nome, foto)
    {
        try{
            await db.query(`INSERT INTO pessoacast(nome_cast, foto_pessoa) VALUES($1, $2)`, [nome, foto])
            return 0
        }
        catch(err)
        {
            return 2
        }
    }

    async function createGenre(nome)
    {
        try{
            await db.query(`INSERT INTO genero(nome_genero) VALUES($1)`, [nome])
            return 0
        }
        catch(err)
        {
            //error code 23505 means primary key already exists
            if(err.code == 23505)
                return 1
            else
                return 2
        }
    }

    async function createCreator(nome, foto)
    {
        try{
            await db.query(`INSERT INTO criador(nome_criador, foto_criador) VALUES($1, $2)`, [nome, foto])
            return 0
        }
        catch(err)
        {
            return 2
        }
    }

    async function createProvider(nome, foto)
    {
        try{
            await db.query(`INSERT INTO plataforma(nome_plataforma, logo_plataforma) VALUES($1, $2)`, [nome, foto])
            return 0
        }
        catch(err)
        {
            //error code 23505 means primary key already exists
            if(err.code == 23505)
                return 1
            else
                return 2
        }
    }

    async function createCompany(nome, foto)
    {
        try{
            await db.query(`INSERT INTO companhia(nome_companhia, logo_companhia) VALUES($1, $2)`, [nome, foto])
            return 0
        }
        catch(err)
        {
            //error code 23505 means primary key already exists
            if(err.code == 23505)
                return 1
            else
                return 2
        }
    }

    async function createUser(nome, id_avatar, hash_senha){
        try{
            await db.query(`INSERT INTO usuario(nome_usuario, hash_senha, id_avatar) VALUES($1, $2, $3)`, [nome, hash_senha, id_avatar])
            return 0
        }
        catch(err)
        {
            //error code 23505 means primary key already exists
            if(err.code == 23505)
                return 1
            else
                return 2
        }
    }

    async function createItem(nome_item, id_tmdb, poster_item, tipo)
    {
        try{
            await db.query(`BEGIN`)
            let id = await db.query(`INSERT INTO itemsistema(nome_item, id_tmdb, poster_item, tipo) VALUES($1, $2, $3, $4) RETURNING id_item`, [nome_item, id_tmdb, poster_item, tipo])

            id = id.rows[0].id_item
            

            if(tipo)
                {
                    if(await createMovie(id) == 2)
                        return 2
                }
            else
                {
                    if(await createSerie(id) == 2)
                        return 2
                }
            
            await db.query('COMMIT')
            
            return 0
        }
        catch(err)
        {
            await db.query('ROLLBACK')
            //error code 23505 means primary key already exists
            if(err.code == 23505)
                return 1
            else
                return 2
        }
    }

    async function createMovie(id)
    {
        try{
            await db.query(`INSERT INTO filme(id_item) VALUES($1)`, [id])
            return 0
        }
        catch(err)
        {
            //error code 23505 means primary key already exists
            if(err.code == 23505)
                return 1
            else
                return 2
        }
    }

    async function createSerie(id)
    {
        try{
            await db.query(`INSERT INTO serie(id_item) VALUES($1)`, [id])
            return 0
        }
        catch(err)
        {
            //error code 23505 means primary key already exists
            if(err.code == 23505)
                return 1
            else
                return 2
        }
    }

    async function createSeason(id_item, numero_temporada, titulo){
        try{
            await db.query(`INSERT INTO temporada VALUES($1,$2,$3)`, [numero_temporada, id_item, titulo])
            return 0
        }
        catch(err)
        {
            //error code 23505 means primary key already exists
            if(err.code == 23505)
                return 1
            else
                return 2
        }
    }

    async function createList(id_usuario, nome_lista)
    {
        try{
            await db.query(`INSERT INTO lista(nome_lista, id_usuario) VALUES($1,$2)`, [nome_lista, id_usuario])
            return 0
        }
        catch(err)
        {
            //error code 23505 means primary key already exists
            if(err.code == 23505)
                return 1
            else
                return 2
        }
    }

    async function createReview(id_usuario, id_item, nota, comentario, data)
    {
        try{
            await db.query(`INSERT INTO avaliacao(id_usuario, id_item, nota, comentario, data) VALUES($1,$2, $3, $4, $5)`, [id_usuario, id_item, nota, comentario, data])
            return 0
        }
        catch(err)
        {
            //error code 23505 means primary key already exists
            if(err.code == 23505)
                return 1
            else
                return 2
        }
    }

    async function like(id_usuario, id_avaliacao)
    {
        try{
            await db.query(`INSERT INTO curtidas(id_usuario, id_avaliacao) VALUES($1,$2)`, [id_usuario, id_avaliacao])
            return 0
        }
        catch(err)
        {
            return 2
        }
    }

    async function unlike(id_usuario, id_avaliacao)
    {
        try{
            await db.query(`DELETE FROM curtidas WHERE id_usuario = $1 AND id_avaliacao = $2`, [id_usuario, id_avaliacao])
            return 0
        }
        catch(err)
        {
            return 2
        }
    }

    async function linkItemPlataforma(id_plataforma, id_item)
    {
        try{
            await db.query(`INSERT INTO itemsistema_plataforma(id_plataforma, id_item) VALUES($1,$2)`, [id_plataforma, id_item])
            return 0
        }
        catch(err)
        {
            //error code 23505 means primary key already exists
            if(err.code == 23505)
                return 1
            else
                return 2
        }
    }

    async function linkItemCast(id_pessoa, id_item)
    {
        try{
            await db.query(`INSERT INTO itemsistema_pessoacast(id_pessoa, id_item) VALUES($1,$2)`, [id_pessoa, id_item])
            return 0
        }
        catch(err)
        {
            //error code 23505 means primary key already exists
            if(err.code == 23505)
                return 1
            else
                return 2
        }
    }

    async function linkItemGenero(id_genero, id_item)
    {
        try{
            await db.query(`INSERT INTO itemsistema_genero(id_genero, id_item) VALUES($1,$2)`, [id_genero, id_item])
            return 0
        }
        catch(err)
        {
            //error code 23505 means primary key already exists
            if(err.code == 23505)
                return 1
            else
                return 2
        }
    }

    async function linkItemCompanhia(id_companhia, id_item)
    {
        try{
            await db.query(`INSERT INTO itemsistema_companhia(id_companhia, id_item) VALUES($1,$2)`, [id_companhia, id_item])
            return 0
        }
        catch(err)
        {
            //error code 23505 means primary key already exists
            if(err.code == 23505)
                return 1
            else
                return 2
        }
    }

    async function linkSerieEmissora(id_emissora, id_item)
    {
        try{
            await db.query(`INSERT INTO serie_emissora(id_emissora, id_item) VALUES($1,$2)`, [id_emissora, id_item])
            return 0
        }
        catch(err)
        {
            //error code 23505 means primary key already exists
            if(err.code == 23505)
                return 1
            else
                return 2
        }
    }

    async function linkSerieCriador(id_criador, id_item)
    {
        try{
            await db.query(`INSERT INTO serie_criador(id_criador, id_item) VALUES($1,$2)`, [id_criador, id_item])
            return 0
        }
        catch(err)
        {
            //error code 23505 means primary key already exists
            if(err.code == 23505)
                return 1
            else
                return 2
        }
    }



module.exports = {
    createUser,
    createItem,
    createCast,
    createCompany,
    createCreator,
    createGenre,
    createNetwork,
    createProvider,
    createSeason,
    createList,
    createReview,
    like,
    unlike,
    linkItemPlataforma,
}
