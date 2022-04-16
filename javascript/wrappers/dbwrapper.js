const db = require('../config/_dbconfig')

async function createNetwork(id, nome)
{
    try{
        let check = await db.query(`SELECT EXISTS(SELECT id_emissora FROM emissora WHERE id_emissora = ${id})`)
        if(check.rows[0].exists)
            return 1
        else
        {
            await db.query(`BEGIN`)
            await db.query(`INSERT INTO emissora VALUES(${id}, '${nome}')`)
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

async function createCast(id, nome)
{
    try{
        let check = await db.query(`SELECT EXISTS(SELECT id_pessoa FROM pessoacast WHERE id_pessoa = ${id})`)
        if(check.rows[0].exists)
            return 1
        else
        {
            await db.query(`BEGIN`)
            await db.query(`INSERT INTO pessoacast VALUES(${id}, '${nome}')`)
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

async function createCreator(id, nome)
{
    try{
        let check = await db.query(`SELECT EXISTS(SELECT id_criador FROM criador WHERE id_criador = ${id})`)
        if(check.rows[0].exists)
            return 1
        else
        {
            await db.query(`BEGIN`)
            await db.query(`INSERT INTO criador VALUES(${id}, '${nome}')`)
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

async function createProvider(id, nome)
{
    try{
        let check = await db.query(`SELECT EXISTS(SELECT FROM plataforma WHERE id_plataforma = ${id})`)
        if(check.rows[0].exists)
            return 1
        else
        {
            await db.query(`BEGIN`)
            await db.query(`INSERT INTO plataforma VALUES(${id}, '${nome}')`)
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

async function createCompany(id, nome)
{
    try{
        let check = await db.query(`SELECT EXISTS(SELECT FROM companhia WHERE id_companhia = ${id})`)
        if(check.rows[0].exists)
            return 1
        else
        {
            await db.query(`BEGIN`)
            await db.query(`INSERT INTO companhia VALUES(${id}, '${nome}')`)
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
        console.log(err.stack)
        return 2
    }
}

async function createItem(id_item, lancamento, nome_item)
{
    try{
        let check = await db.query(`SELECT EXISTS(SELECT id_item FROM itemsistema WHERE id_item='${id_item}')`)
        if(check.rows[0].exists)
            return 1
        else
        {
            await db.query(`BEGIN`)
            await db.query(`INSERT INTO itemsistema VALUES(${id_item}, ${lancamento}, '${nome_item}')`)
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


//TO-DO
/* O json recebido no método deve ser o mesmo retornado pela API */
async function createMovie(jsaon)
{
    try{
        
    }
    catch(err)
    {
        await db.query('ROLLBACK')
        console.log(err.stack)
        return false
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
    createMovie
}