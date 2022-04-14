const client = require('./config/_dbconfig')
const api = require('./wrappers/tmdbwrapper')
client.connect()


async function main(){
    try{
    let resp = await api.multiSearch('Nicolas Cage')
    console.log(resp.data.results)
      
    } 
    catch(err)
    {
        console.log(err.stack)
    }
    finally
    {
        await client.end() 
    }
}

main()