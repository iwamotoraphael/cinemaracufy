const db = require('../config/_dbconfig')

async function createNetwork(id, nome)
{
    try{
        let check = await db.query(`SELECT EXISTS(SELECT id_emissora FROM emissora WHERE id_emissora = ${id})`)
        if(check.rows[0].exists)
            return false
        else
        {
            await db.query(`BEGIN`)
            await db.query(`INSERT INTO emissora VALUES(${id}, '${nome}')`)
            await db.query('COMMIT')
            return true
        }
    }
    catch(err)
    {
        await db.query('ROLLBACK')
        console.log(err.stack)
        return false
    }
}

async function createCast(id, nome)
{
    try{
        let check = await db.query(`SELECT EXISTS(SELECT id_pessoa FROM pessoacast WHERE id_pessoa = ${id})`)
        if(check.rows[0].exists)
            return false
        else
        {
            await db.query(`BEGIN`)
            await db.query(`INSERT INTO pessoacast VALUES(${id}, '${nome}')`)
            await db.query('COMMIT')
            return true
        }
    }
    catch(err)
    {
        await db.query('ROLLBACK')
        console.log(err.stack)
        return false
    }
}

async function createGenre(id, nome)
{
    try{
        let check = await db.query(`SELECT EXISTS(SELECT id_genero FROM genero WHERE id_genero = ${id})`)
        if(check.rows[0].exists)
            return false
        else
        {
            await db.query(`BEGIN`)
            await db.query(`INSERT INTO genero VALUES(${id}, '${nome}')`)
            await db.query('COMMIT')
            return true
        }
    }
    catch(err)
    {
        await db.query('ROLLBACK')
        console.log(err.stack)
        return false
    }
}

async function createCreator(id, nome)
{
    try{
        let check = await db.query(`SELECT EXISTS(SELECT id_criador FROM criador WHERE id_criador = ${id})`)
        if(check.rows[0].exists)
            return false
        else
        {
            await db.query(`BEGIN`)
            await db.query(`INSERT INTO criador VALUES(${id}, '${nome}')`)
            await db.query('COMMIT')
            return true
        }
    }
    catch(err)
    {
        await db.query('ROLLBACK')
        console.log(err.stack)
        return false
    }
}

async function createProvider(id, nome)
{
    try{
        let check = await db.query(`SELECT EXISTS(SELECT FROM plataforma WHERE id_plataforma = ${id})`)
        if(check.rows[0].exists)
            return false
        else
        {
            await db.query(`BEGIN`)
            await db.query(`INSERT INTO plataforma VALUES(${id}, '${nome}')`)
            await db.query('COMMIT')
            return true
        }
    }
    catch(err)
    {
        await db.query('ROLLBACK')
        console.log(err.stack)
        return false
    }
}

async function createCompany(id, nome)
{
    try{
        let check = await db.query(`SELECT EXISTS(SELECT FROM companhia WHERE id_companhia = ${id})`)
        if(check.rows[0].exists)
            return false
        else
        {
            await db.query(`BEGIN`)
            await db.query(`INSERT INTO companhia VALUES(${id}, '${nome}')`)
            await db.query('COMMIT')
            return true
        }
    }
    catch(err)
    {
        await db.query('ROLLBACK')
        console.log(err.stack)
        return false
    }
}

async function createUser(nome, id_avatar, hash_senha){
    try{
        let check = await db.query(`SELECT EXISTS(SELECT nome_usuario FROM usuario WHERE nome_usuario='${nome}')`)
        if(check.rows[0].exists)
            return false
        else
        {
            await db.query(`BEGIN`)
            await db.query(`INSERT INTO usuario(nome_usuario, hash_senha, id_avatar) VALUES('${nome}', '${hash_senha}', '${id_avatar}')`)
            await db.query('COMMIT')
            return true
        }
    }
    catch(err)
    {
        await db.query('ROLLBACK')
        console.log(err.stack)
        return false
    }
}

async function createItem(id_item, lancamento, nome_item)
{
    try{
        let check = await db.query(`SELECT EXISTS(SELECT id_item FROM itemsistema WHERE id_item='${id_item}')`)
        if(check.rows[0].exists)
            return false
        else
        {
            await db.query(`BEGIN`)
            await db.query(`INSERT INTO itemsistema VALUES(${id_item}, ${lancamento}, '${nome_item}')`)
            await db.query('COMMIT')
            return true
        }
    }
    catch(err)
    {
        await db.query('ROLLBACK')
        console.log(err.stack)
        return false
    }
}



async function createMovie(id_item)
{
    try{
        let check = await db.query(`SELECT EXISTS(SELECT id_item FROM filme WHERE id_item='${id_item}')`)
        if(check.rows[0].exists)
            return false
        else
        {
          
        }
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
    createMovie
}