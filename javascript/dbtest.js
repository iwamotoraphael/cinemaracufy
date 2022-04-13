const db = require('./config/_dbconfig')
const api = require('./config/_apiconfig')
db.connect()

async function getDetails()
{
    let details = await api.movie.getDetails({
        pathParameters: {
          movie_id: 384018,
        },
      })
    return details
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

async function main(){
    let inserted = await createUser('usuario3', 1, 'hashseguro3')
    console.log(inserted)

    await db.end()    
}

main()