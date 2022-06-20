const api = require('./wrappers/tmdbwrapper')
const dbw = require('./wrappers/dbwrapper')
const db = require('./config/_dbconfig')

async function main(){
    try{

        let resp = await dbw.getMovieData(110)
        console.log(resp)

    } 
    catch(err)
    {
        console.log(err.stack)
    }
}

main()