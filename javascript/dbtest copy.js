const api = require('./wrappers/tmdbwrapper')
const dbw = require('./wrappers/dbwrapper')
const db = require('./config/_dbconfig')

async function main(){
    try{
        /*
        let atores = await db.query('SELECT nome_cast FROM pessoacast')
        for(let i = 0; i<atores.rowCount; i++)
        {
            let resp = await api.multiSearch(atores.rows[i].nome_cast)
            let link = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2'+resp.data.results[0].profile_path
            await db.query(`UPDATE pessoacast SET foto_pessoa = $1 WHERE nome_cast = $2`,[link, atores.rows[i].nome_cast])
        }
        
        
        */

        let data = await dbw.getItemReviews(124, 23)
        console.log(data)
    } 
    catch(err)
    {
        console.log(err.stack)
    }
}

main()