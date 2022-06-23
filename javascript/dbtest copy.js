const api = require('./wrappers/tmdbwrapper')
const dbw = require('./wrappers/dbwrapper')
const db = require('./config/_dbconfig')

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

        let bestMovies = dbw.getBestMovies()
        let popularMovies = dbw.getPopularMovies()
        let bestTV =  dbw.getBestTV()
        let popularTV = dbw.getPopularTV()
        let bestReviews = dbw.getBestReviews()
        let popularGenres = dbw.getPopularGenres()
        let lastReviews = dbw.getLastReviews()
        let bestUsers = dbw.getPopularUsers()
        let bestGenres = dbw.getPopularGenres()
    
        let data = await Promise.all([bestGenres, bestMovies, popularMovies, bestTV, popularTV, bestReviews, popularGenres, lastReviews, bestUsers])

        console.log(data[0])
    } 
    catch(err)
    {
        console.log(err.stack)
    }
}

main()