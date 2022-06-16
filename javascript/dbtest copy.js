const api = require('./wrappers/tmdbwrapper')
const dbw = require('./wrappers/dbwrapper')
const db = require('./config/_dbconfig')

async function main(){
    try{

        let resp = await api.getMovieDetails(475)
        console.log(resp.data.title +"\n"+ 'https://image.tmdb.org/t/p/original'+resp.data.poster_path +"\n"+ resp.data.overview.substring(0,500) +"\n"+ resp.data.release_date+"\n"+"\n"+null+"\n"+null+"\n"+null+"\n"+resp.data.type)



    } 
    catch(err)
    {
        console.log(err.stack)
    }
}

main()