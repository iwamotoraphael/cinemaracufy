const api = require('./wrappers/tmdbwrapper')
const dbw = require('./wrappers/dbwrapper')
const db = require('./config/_dbconfig')

async function main(){
    try{
        
        let test = await dbw.search('x')
        console.log(test)
        
        /*
        let filmes = [526896]
        let series = []

        
        for(let i = 0; i<filmes.length; i++)
        {
            let resp = await api.getMovieDetails(filmes[i])
            let ret = await dbw.createItem(resp.data.title, 'https://image.tmdb.org/t/p/original'+resp.data.poster_path, resp.data.episode_run_time == null)
            console.log(ret)
        }*/
/*
            let company = resp.data.production_companies
            let cast = await api.getMovieCredits(filmes[i]).cast
            
            for(let i = 0; i<company.length; i++)
            {
                let test = await db.query('SELECT EXISTS(SELECT nome_companhia FROM companhia WHERE nome_companhia = $1)', [company[i].name])

                if(test.rows[0].exists == false)
                {
                    await dbw.createCompany(company[i].name, 'https://www.themoviedb.org/t/p/h15'+company[i].logo_path)
                    await dbw.linkItemCompanhia(id_companhia, id_item)
                }
            }
            
        }

        for(let i = 0; i<series.length; i++)
        {
            let resp = await api.getTVDetails(series[i])
            let ret = await dbw.createItem(resp.data.name, 'https://image.tmdb.org/t/p/original'+resp.data.poster_path, resp.data.episode_run_time == null)
            console.log(ret) 
        }
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