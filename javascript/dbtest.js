const api = require('./wrappers/tmdbwrapper')
const dbw = require('./wrappers/dbwrapper')
const db = require('./config/_dbconfig')

async function main(){
    try{
        let filmes = [526896,530915, 118, 496243, 597]
        let series = []

        
        for(let i = 0; i<filmes.length; i++)
        {
            let resp = await api.getMovieDetails(filmes[i])
            let ret = await dbw.createItem(resp.data.title, 'https://image.tmdb.org/t/p/original'+resp.data.poster_path, resp.data.overview, resp.data.release_date, resp.data.episode_run_time == null, resp.data.budget, resp.data.revenue, resp.data.runtime, null)

            console.log(ret)
        
            let company = resp.data.production_companies
              
            for(let j = 0; j<company.length; j++)
            {
                let test = await db.query('SELECT id_companhia FROM companhia WHERE nome_companhia = $1', [company[j].name])

                if(test.rowCount == 0)
                {
                    let id_companhia = await (await dbw.createCompany(company[j].name, 'https://www.themoviedb.org/t/p/h15'+company[j].logo_path)).id
                    await dbw.linkItemCompanhia(id_companhia, ret.id)
                }
                else
                {
                    await dbw.linkItemCompanhia(test.rows[0].id_companhia, ret.id)
                } 
            }
            
            let cast = await (await api.getMovieCredits(filmes[i])).data.cast
            
            for(let j = 0; j<cast.length; j++)
            {
                let test = await db.query('SELECT id_pessoa FROM pessoacast WHERE nome_cast = $1', [cast[j].name])

                if(test.rowCount == 0)
                {
                    let id_pessoa = await (await dbw.createCast(cast[j].name, 'https://www.themoviedb.org/t/p/w138_and_h175_face'+cast[j].logo_path)).id
                    await dbw.linkItemCast(id_pessoa, ret.id)
                }
                else
                {
                    await dbw.linkItemCast(test.rows[0].id_pessoa, ret.id)
                } 
            }

            let genero = resp.data.genres

            for(let j = 0; j<genero.length; j++)
            {
                let test = await db.query('SELECT id_genero FROM genero WHERE nome_genero = $1', [genero[j].name])

                if(test.rowCount == 0)
                {
                    let id_genero = await (await dbw.createGenre(genero[j].name))
                    console.log(id_genero)
                    await dbw.linkItemGenero(id_genero.id, ret.id)
                }
                else
                {
                    await dbw.linkItemGenero(test.rows[0].id_genero, ret.id)
                } 
            }

            let providers = (await api.getMovieProviders(filmes[i])).data.results.BR.buy

            for(let j = 0; j<providers.length; j++)
            {
                let test = await db.query('SELECT id_plataforma FROM plataforma WHERE nome_plataforma = $1', [providers[j].provider_name])

                if(test.rowCount == 0)
                {
                    let id_plataforma = await (await dbw.createProvider(providers[j].provider_name, 'https://www.themoviedb.org/t/p/original'+providers[j].logo_path)).id
                    await dbw.linkItemPlataforma(id_plataforma, ret.id)
                }
                else
                {
                    await dbw.linkItemPlataforma(test.rows[0].id_plataforma, ret.id)
                } 
            }

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