const client = require('./config/_dbconfig')
const api = require('./wrappers/tmdbwrapper')
client.connect()


async function main(){
    try{
    let resp = await api.getTVCredits(92749)
    console.log(resp.data)
      
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