const api = require('./wrappers/tmdbwrapper')
const db = require('./wrappers/dbwrapper')
const dbw = require('./config/_dbconfig')

async function main(){
    try{
        /*
        let atores = await dbw.query('SELECT nome_cast FROM pessoacast')
        for(let i = 0; i<atores.rowCount; i++)
        {
            let resp = await api.multiSearch(atores.rows[i].nome_cast)
            let link = 'https://www.themoviedbw.org/t/p/w600_and_h900_bestv2'+resp.data.results[0].profile_path
            await dbw.query(`UPDATE pessoacast SET foto_pessoa = $1 WHERE nome_cast = $2`,[link, atores.rows[i].nome_cast])
        }
        
        
        */
    
        let data = await dbw.query(`SELECT EXISTS(SELECT nome_usuario FROM usuario WHERE login_usuario = $1 AND hash_senha = $2)`, ['nobuaki', '$argon2i$v=19$m=4096,t=3,p=1$4kIge8L3ap6xjbKKKQ8D6A$c26CPyKdxw137FCnt0gu2pczurSCD1tRNJ0Q5K95h7k'])

        console.log(data.rows[0].exists)
    } 
    catch(err)
    {
        console.log(err.stack)
    }
}

main()