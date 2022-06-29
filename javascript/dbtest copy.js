const api = require('./wrappers/tmdbwrapper')
const db = require('./wrappers/dbwrapper')
const dbw = require('./config/_dbconfig')
const argon = require('argon2')

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
    
        let bestMovies = db.getBestMovies()
        let popularMovies = db.getPopularMovies()
        let bestTV =  db.getBestTV()
        let popularTV = db.getPopularTV()
        let bestReviews = db.getBestReviews()
        let lastReviews = db.getLastReviews()
        let bestUsers = db.getPopularUsers()
        let bestGenres = db.getPopularGenres()
    
        let data = await Promise.all([lastReviews, bestMovies, popularMovies, bestReviews, bestTV, popularTV, bestUsers, bestGenres])

        console.log(data)
    } 
    catch(err)
    {
        console.log(err.stack)
    }
}

main()