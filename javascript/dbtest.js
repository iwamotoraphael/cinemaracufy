const api = require('./wrappers/tmdbwrapper')
const dbw = require('./wrappers/dbwrapper')
const db = require('./config/_dbconfig')
const { json } = require('express')

async function movies(filmes){
    for(let i = 0; i<filmes.length; i++)
        {
            let resp = await api.getMovieDetails(filmes[i])
            let ret = await dbw.createItem(resp.data.title, 'https://image.tmdb.org/t/p/original'+resp.data.poster_path, resp.data.overview.substring(0,500), resp.data.release_date, resp.data.episode_run_time == null, resp.data.budget, resp.data.revenue, resp.data.runtime, null)

            console.log(ret)
            if(ret.code != 0)
                return
        
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

            for(let j = 0; j<Math.min(cast.length, 20); j++)
            {
                let test = await db.query('SELECT id_pessoa FROM pessoacast WHERE nome_cast = $1', [cast[j].name])

                if(test.rowCount == 0)
                {
                    let id_pessoa = await (await dbw.createCast(cast[j].name, 'https://www.themoviedb.org/t/p/w138_and_h175_face'+cast[j].profile_path)).id
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

            let providers = (await api.getMovieProviders(filmes[i])).data.results.BR

            if(providers != undefined)
            {
                if(providers.buy != undefined)
                {
                    for(let j = 0; j<providers.buy.length; j++)
                    {
                        let test = await db.query('SELECT id_plataforma FROM plataforma WHERE nome_plataforma = $1', [providers.buy[j].provider_name])

                        if(test.rowCount == 0)
                        {
                            let id_plataforma = await (await dbw.createProvider(providers.buy[j].provider_name, 'https://www.themoviedb.org/t/p/original'+providers.buy[j].logo_path)).id
                            await dbw.linkItemPlataforma(id_plataforma, ret.id)
                        }
                        else
                        {
                            await dbw.linkItemPlataforma(test.rows[0].id_plataforma, ret.id)
                        } 
                    }
                }

                if(providers.flatrate != undefined)
                {
                    for(let j = 0; j<providers.flatrate.length; j++)
                    {
                        let test = await db.query('SELECT id_plataforma FROM plataforma WHERE nome_plataforma = $1', [providers.flatrate[j].provider_name])

                        if(test.rowCount == 0)
                        {
                            let id_plataforma = await (await dbw.createProvider(providers.flatrate[j].provider_name, 'https://www.themoviedb.org/t/p/original'+providers.flatrate[j].logo_path)).id
                            await dbw.linkItemPlataforma(id_plataforma, ret.id)
                        }
                        else
                        {
                            await dbw.linkItemPlataforma(test.rows[0].id_plataforma, ret.id)
                        } 
                    }
                }
            }

        }
}

async function tv(series){
    for(let i = 0; i<series.length; i++)
        {
            let resp = await api.getTVDetails(series[i])
            let ret = await dbw.createItem(resp.data.name, 'https://image.tmdb.org/t/p/original'+resp.data.poster_path, resp.data.overview.substring(0,500), resp.data.first_air_date, resp.data.episode_run_time == null, null, null, null, resp.data.type)

            console.log(ret)
            if(ret.code != 0)
                return
        
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
            
            let cast = await (await api.getTVCredits(series[i])).data.cast
            
            for(let j = 0; j<Math.min(cast.length, 20); j++)
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

            let providers = (await api.getTVProviders(series[i])).data.results.BR

            if(providers != undefined)
            {
                if(providers.buy != undefined)
                {
                    for(let j = 0; j<providers.buy.length; j++)
                    {
                        let test = await db.query('SELECT id_plataforma FROM plataforma WHERE nome_plataforma = $1', [providers.buy[j].provider_name])

                        if(test.rowCount == 0)
                        {
                            let id_plataforma = await (await dbw.createProvider(providers.buy[j].provider_name, 'https://www.themoviedb.org/t/p/original'+providers.buy[j].logo_path)).id
                            await dbw.linkItemPlataforma(id_plataforma, ret.id)
                        }
                        else
                        {
                            await dbw.linkItemPlataforma(test.rows[0].id_plataforma, ret.id)
                        } 
                    }
                }

                if(providers.flatrate != undefined)
                {
                    for(let j = 0; j<providers.flatrate.length; j++)
                    {
                        let test = await db.query('SELECT id_plataforma FROM plataforma WHERE nome_plataforma = $1', [providers.flatrate[j].provider_name])

                        if(test.rowCount == 0)
                        {
                            let id_plataforma = await (await dbw.createProvider(providers.flatrate[j].provider_name, 'https://www.themoviedb.org/t/p/original'+providers.flatrate[j].logo_path)).id
                            await dbw.linkItemPlataforma(id_plataforma, ret.id)
                        }
                        else
                        {
                            await dbw.linkItemPlataforma(test.rows[0].id_plataforma, ret.id)
                        } 
                    }
                }
            }

            let networks = resp.data.networks

            if(networks != undefined)
            {
                for(let j = 0; j<networks.length; j++)
                {
                    let test = await db.query(`SELECT id_emissora FROM emissora WHERE nome_emissora = $1`,[networks[j]])
                    if(test.rowCount == 0)
                    {
                        let id_emissora = await (await dbw.createNetwork(networks[j].name, 'https://www.themoviedb.org/t/p/h30/'+networks[j].logo_path)).id
                        await dbw.linkSerieEmissora(id_emissora, ret.id)
                    }
                    else
                    {
                        await dbw.linkSerieEmissora(test.rows[0].id_emissora, ret.id)
                    } 
                }
            }

            let creators = resp.data.created_by

            if(creators != undefined)
            {
                for(let j = 0; j<creators.length; j++)
                {
                    let test = await db.query(`SELECT id_criador FROM criador WHERE nome_criador = $1`,[creators[j]])
                    if(test.rowCount == 0)
                    {
                        let id_criador = await (await dbw.createCreator(creators[j].name, 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/'+creators[j].profile_path)).id
                        await dbw.linkSerieCriador(id_criador, ret.id)
                    }
                    else
                    {
                        await dbw.linkSerieEmissora(test.rows[0].id_criador, ret.id)
                    } 
                }
            }
        }
}

async function users(n){
    let curnum = await (await db.query(`SELECT MAX(id_usuario) FROM usuario`)).rows[0].max
    for(let i = 1; i<=n; i++)
    {
        await dbw.createUser('usuario'+(curnum+i),1,'login'+(curnum+i),'argonhash'+(curnum+i))
    }
}

async function generateReviews(){
    let user_ids = await db.query('SELECT id_usuario FROM usuario EXCEPT (SELECT id_usuario from avaliacao GROUP BY id_usuario) ')
    let item_ids = await db.query('SELECT id_item FROM itemsistema EXCEPT (SELECT id_item from avaliacao GROUP BY id_item) ')
    let rawDate = new Date()
    let date = rawDate.getFullYear()+"-"+(parseInt(rawDate.getMonth())+1)+"-"+rawDate.getDate()

    for(let j = 0; j<item_ids.rowCount; j++)
    {
        for(let i = 0; i<user_ids.rowCount; i++)
        {
            await dbw.createReview(user_ids.rows[i].id_usuario, item_ids.rows[j].id_item, Math.trunc(Math.random()*10), 'comentario', date)
        }
    }

    
}

async function generateLikes(){
    let user_ids = await db.query('SELECT id_usuario FROM usuario')
    let review_ids = await (await db.query('SELECT id_avaliacao FROM avaliacao')).rows
    let size = Math.ceil(review_ids.length/60)
    for(let i = 0; i<user_ids.rowCount; i++)
    {
        let start = (Math.ceil(Math.random()*(review_ids.length-size)))
        for(let j = start; j<(start+size); j++)
        {
            await dbw.like(user_ids.rows[i].id_usuario, review_ids[j].id_avaliacao)
        }
    }

}

async function main(){
    try{ 
        let filmes = []
        let series = []    
        let n = 0      

        //await movies(filmes)
        //await tv(series)

        //await users(n)

        //await generateReviews()

        //await generateLikes()
        
        let resp = await api.getMovieDetails(526896)
        let cast = await (await api.getMovieCredits(526896)).data.cast
        console.log(resp.data.production_companies)
    } 
    catch(err)
    {
        console.log(err.stack)
    }
}

main()