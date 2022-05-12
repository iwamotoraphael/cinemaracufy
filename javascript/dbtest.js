const api = require('./wrappers/tmdbwrapper')
const dbw = require('./wrappers/dbwrapper')

async function main(){
    try{
        
        let resp = await api.getTVDetails(92749)
        let ret = await dbw.createItem(resp.data.name, resp.data.id, 'https://image.tmdb.org/t/p/original'+resp.data.poster_path, false)
        console.log(ret) 
    } 
    catch(err)
    {
        console.log(err.stack)
    }
}

main()