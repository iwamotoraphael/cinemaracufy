const db = require('../config/_dbconfig')

    async function createNetwork(nome, foto)
    {
        try{
            let check = await db.query(`SELECT EXISTS(SELECT nome_emissora FROM emissora WHERE nome_emissora = ${nome})`)
            if(check.rows[0].exists)
                return 1
            else
            {
                await db.query(`BEGIN`)
                await db.query(`INSERT INTO emissora(nome_emissora, logo_emissora) VALUES('${nome}', '${foto}')`)
                await db.query('COMMIT')
                return 0
            }
        }
        catch(err)
        {
            await db.query('ROLLBACK')
            return 2
        }
    }

    async function createCast(nome, foto)
    {
        try{
            await db.query(`BEGIN`)
            await db.query(`INSERT INTO pessoacast(nome_cast, foto_pessoa) VALUES('${nome}', '${foto}')`)
            await db.query('COMMIT')
            return 0
        }
        catch(err)
        {
            await db.query('ROLLBACK')
            return 2
        }
    }

    async function createGenre(id, nome)
    {
        try{
            let check = await db.query(`SELECT EXISTS(SELECT id_genero FROM genero WHERE id_genero = ${id})`)
            if(check.rows[0].exists)
                return 1
            else
            {
                await db.query(`BEGIN`)
                await db.query(`INSERT INTO genero VALUES(${id}, '${nome}')`)
                await db.query('COMMIT')
                return 0
            }
        }
        catch(err)
        {
            await db.query('ROLLBACK')
            return 2
        }
    }

    async function createCreator(nome, foto)
    {
        try{
            await db.query(`BEGIN`)
            await db.query(`INSERT INTO criador(nome_criador, foto_criador) VALUES('${nome}', '${foto}')`)
            await db.query('COMMIT')
            return 0
        }
        catch(err)
        {
            await db.query('ROLLBACK')
            return 2
        }
    }

    async function createProvider(nome, foto)
    {
        try{
            let check = await db.query(`SELECT EXISTS(SELECT nome_plataforma FROM plataforma WHERE nome_plataforma = ${nome})`)
            if(check.rows[0].exists)
                return 1
            else
            {
                await db.query(`BEGIN`)
                await db.query(`INSERT INTO plataforma(nome_plataforma, logo_plataforma) VALUES('${nome}', '${foto}')`)
                await db.query('COMMIT')
                return 0
            }
        }
        catch(err)
        {
            await db.query('ROLLBACK')
            return 2
        }
    }

    async function createCompany(nome, foto)
    {
        try{
            let check = await db.query(`SELECT EXISTS(SELECT FROM companhia WHERE nome_companhia = ${nome})`)
            if(check.rows[0].exists)
                return 1
            else
            {
                await db.query(`BEGIN`)
                await db.query(`INSERT INTO companhia(nome_companhia, logo_companhia) VALUES('${nome}', '${foto}')`)
                await db.query('COMMIT')
                return 0
            }
        }
        catch(err)
        {
            await db.query('ROLLBACK')
            return 2
        }
    }

    async function createUser(nome, id_avatar, hash_senha){
        try{
            let check = await db.query(`SELECT EXISTS(SELECT nome_usuario FROM usuario WHERE nome_usuario='${nome}')`)
            if(check.rows[0].exists)
                return 1
            else
            {
                await db.query(`BEGIN`)
                await db.query(`INSERT INTO usuario(nome_usuario, hash_senha, id_avatar) VALUES('${nome}', '${hash_senha}', '${id_avatar}')`)
                await db.query('COMMIT')
                return 0
            }
        }
        catch(err)
        {
            await db.query('ROLLBACK')
            return 2
        }
    }

    async function createItem(nome_item, id_tmdb, poster_item, tipo)
    {
        try{
            let check = await db.query(`SELECT EXISTS(SELECT id_tmdb FROM itemsistema WHERE id_tmdb=${id_tmdb})`)
            if(check.rows[0].exists)
                return 1
            else
            {
                await db.query(`BEGIN`)
                let id = await db.query(`INSERT INTO itemsistema(nome_item, id_tmdb, poster_item, tipo) VALUES('${nome_item}', ${id_tmdb}, '${poster_item}', ${tipo}) RETURNING id_item`)

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
        }
        catch(err)
        {
            await db.query('ROLLBACK')
            console.log(err.stack)
            return 2
        }
    }

    async function createMovie(id)
    {
        try{
            let check1 = await db.query(`SELECT EXISTS(SELECT id_item FROM filme WHERE id_item=${id})`)
            if(check1.rows[0].exists)
                return 1
            else
            {
                await db.query(`INSERT INTO filme(id_item) VALUES(${id})`)
                return 0
            }
        }
        catch(err)
        {
            console.log(err.stack)
            return 2
        }
    }

    async function createSerie(id)
    {
        try{
            let check1 = await db.query(`SELECT EXISTS(SELECT id_item FROM serie WHERE id_item=${id})`)
            if(check1.rows[0].exists)
                return 1
            else
            {
                await db.query(`INSERT INTO serie(id_item) VALUES(${id})`)
                return 0
            }
        }
        catch(err)
        {
            console.log(err.stack)
            return 2
        }
    }

    async function createSeason(id_item, numero_temporada, titulo){
        try{
            let check = await db.query(`SELECT EXISTS(SELECT id_item, numero_temporada FROM temporada WHERE id_item=${id_item} AND numero_temporada = ${numero_temporada})`)
            if(check.rows[0].exists)
                return 1
            else
            {
                await db.query(`BEGIN`)
                await db.query(`INSERT INTO temporada VALUES(${numero_temporada},${id_item},'${titulo}')`)
                await db.query('COMMIT')
                return 0
            }
        }
        catch(err)
        {
            await db.query('ROLLBACK')
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
    createSeason
}
