const api = require('./wrappers/tmdbwrapper')
const dbw = require('./wrappers/dbwrapper')

async function main(){
    try{
        let filmes = []
        let series = []

        let rp = await api.getTVProviders(92749)
        console.log(rp.data.results.BR.flatrate)

        /*
        for(let i = 0; i<filmes.length; i++)
        {
            let resp = await api.getMovieDetails(filmes[i])
            let ret = await dbw.createItem(resp.data.title, 'https://image.tmdb.org/t/p/original'+resp.data.poster_path, resp.data.episode_run_time == null)
            console.log(ret)
            
            for
                await dbw.createCompany()
                await dbw.linkItemCompanhia()

            for 
                await dbw.createCast()
                await dbw.linkItemCast()

            
            await dbw.createProvider()
            await dbw.linkItemPlataforma()
            
        }

        for(let i = 0; i<series.length; i++)
        {
            let resp = await api.getTVDetails(series[i])
            let ret = await dbw.createItem(resp.data.name, 'https://image.tmdb.org/t/p/original'+resp.data.poster_path, resp.data.episode_run_time == null)
            console.log(ret) 
        }
        
        console.log(resp)
*/

        /*
        for(let j = 6 ; j < 8; j++)
        {
            for(let i = 13; i<18; i++)
            {
                let rawDate = new Date()
                let date = rawDate.getFullYear()+"-"+(parseInt(rawDate.getMonth())+1)+"-"+20
                let resp = await dbw.createReview(j,i,10-j, 'teste', date)
                console.log(resp)
            }
        }
             
            let rawDate = new Date()
            let date = rawDate.getFullYear()+"-"+(parseInt(rawDate.getMonth())+1)+"-"+rawDate.getDate()
            let resp = await dbw.createReview(4,17,10, '', date)
            console.log(resp)
            */
    } 
    catch(err)
    {
        console.log(err.stack)
    }
}

main()