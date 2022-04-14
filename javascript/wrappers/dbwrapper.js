const db = require('../config/_dbconfig')

let createUser = async function (nome, id_avatar, hash_senha){
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

let createItem = async function (id_item, lancamento, nome_item)
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

let createMovie = async function (id_item)
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