const api = require('./wrappers/tmdbwrapper')
const dbw = require('./wrappers/dbwrapper')
const db = require('./config/_dbconfig')

async function main(){
    try{

        let filmes = [526896]
        let series = []

        
        for(let i = 0; i<filmes.length; i++)
        {
            let resp = await api.getMovieDetails(filmes[i])
            let ret = await dbw.createItem(resp.data.title, 'https://image.tmdb.org/t/p/original'+resp.data.poster_path, resp.data.overview, resp.data.release_date, resp.data.episode_run_time == null, resp.data.budget, resp.data.revenue, resp.data.runtime, null)

            console.log(ret)
        
            let company = resp.data.production_companies
              
            for(let i = 0; i<company.length; i++)
            {
                let test = await db.query('SELECT id_companhia FROM companhia WHERE nome_companhia = $1', [company[i].name])

                if(test.rowCount == 0)
                {
                    let id_companhia = await (await dbw.createCompany(company[i].name, 'https://www.themoviedb.org/t/p/h15'+company[i].logo_path)).id
                    await dbw.linkItemCompanhia(id_companhia, ret.id)
                }
                else
                {
                    await dbw.linkItemCompanhia(test.rows[0].id_companhia, ret.id)
                } 
            }
            
            let cast = await (await api.getMovieCredits(filmes[i])).data.cast
            
            for(let i = 0; i<cast.length; i++)
            {
                let test = await db.query('SELECT id_pessoa FROM pessoacast WHERE nome_cast = $1', [cast[i].name])

                if(test.rowCount == 0)
                {
                    let id_pessoa = await (await dbw.createCast(cast[i].name, 'https://www.themoviedb.org/t/p/w138_and_h175_face'+cast[i].logo_path)).id
                    await dbw.linkItemCast(id_pessoa, ret.id)
                }
                else
                {
                    await dbw.linkItemCast(test.rows[0].id_pessoa, ret.id)
                } 
            }

            let genero = resp.data.genres
            console.log(genero)

            for(let i = 0; i<genero.length; i++)
            {
                let test = await db.query('SELECT id_genero FROM genero WHERE nome_genero = $1', [genero[i].name])

                if(test.rowCount == 0)
                {
                    let id_genero = await (await dbw.createGenre(genero[i].name)).id
                    await dbw.linkItemGenero(id_genero, ret.id)
                }
                else
                {
                    await dbw.linkItemGenero(test.rows[0].id_genero, ret.id)
                } 
            }

            let providers = (await api.getMovieProviders(filmes[i])).data.results.BR.buy
            console.log(providers)

            for(let i = 0; i<providers.length; i++)
            {
                let test = await db.query('SELECT id_plataforma FROM plataforma WHERE nome_plataforma = $1', [providers[i].provider_name])

                if(test.rowCount == 0)
                {
                    let id_plataforma = await (await dbw.createProvider(providers[i].provider_name, 'https://www.themoviedb.org/t/p/original'+providers[i].logo_path)).id
                    await dbw.linkItemPlataforma(id_plataforma, ret.id)
                }
                else
                {
                    await dbw.linkItemPlataforma(test.rows[0].id_plataforma, ret.id)
                } 
            }

        }
        

    } 
    catch(err)
    {
        console.log(err.stack)
    }
}

main()