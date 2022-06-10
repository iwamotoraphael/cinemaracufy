const api = require('./wrappers/tmdbwrapper')
const dbw = require('./wrappers/dbwrapper')
const db = require('./config/_dbconfig')

async function main(){
    try{
        let test = await db.query('SELECT id_companhia FROM companhia WHERE nome_companhia = $1', ["Columbia Pictures"])
        console.log(test.rows[0])
      
        let filmes = [526896]
        let series = []

        
        for(let i = 0; i<filmes.length; i++)
        {
            let resp = await api.getMovieDetails(filmes[i])
            let ret = await dbw.createItem(resp.data.title, 'https://image.tmdb.org/t/p/original'+resp.data.poster_path, resp.data.episode_run_time == null, resp.data.budget, resp.data.revenue, resp.data.runtime, null)
        
            //fazer todos os links
            let company = resp.data.production_companies
              
            for(let i = 0; i<company.length; i++)
            {
                let test = await db.query('SELECT id_companhia FROM companhia WHERE nome_companhia = $1', [company[i].name])

                if(test.rowCount == 0)
                {
                    let id_companhia = await (await dbw.createCompany(company[i].name, 'https://www.themoviedb.org/t/p/h15'+company[i].logo_path)).id
                    await dbw.linkItemCompanhia(id_companhia, id_item)
                }
                else
                {
                    await dbw.linkItemCompanhia(test.rows[0].id_companhia, id_item)
                } 
            }
            
            let cast = await api.getMovieCredits(filmes[i]).cast
        }
       /*   

        for(let i = 0; i<series.length; i++)
        {
            let resp = await api.getTVDetails(series[i])
            let ret = await dbw.createItem(resp.data.name, 'https://image.tmdb.org/t/p/original'+resp.data.poster_path, resp.data.episode_run_time == null)
            console.log(ret) 
        }

        
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