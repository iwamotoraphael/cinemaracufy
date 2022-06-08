const db = require('../config/_dbconfig')

    async function createNetwork(nome, foto)
    {
        try{
            
            let id_emissora = await db.query(`INSERT INTO emissora(nome_emissora, logo_emissora) VALUES($1, $2) RETURNING id_emissora`, [nome, foto])
            return {code: 0, id: id_emissora}
            
        }
        catch(err)
        {
            return {code: err.code, id: null}
        }
    }

    async function createCast(nome, foto)
    {
        try{
            let id_pessoa = await db.query(`INSERT INTO pessoacast(nome_cast, foto_pessoa) VALUES($1, $2) RETURNING id_pessoa`, [nome, foto])
            return {code: 0, id: id_pessoa}
        }
        catch(err)
        {
            return {code: err.code, id: null}
        }
    }

    async function createGenre(nome)
    {
        try{
            let id_genero = await db.query(`INSERT INTO genero(nome_genero) VALUES($1) RETURNING id_genero`, [nome])
            return {code: 0, id: id_genero}
        }
        catch(err)
        {
            return {code: err.code, id: null}
        }
    }

    async function createCreator(nome, foto)
    {
        try{
            let id_genero = await db.query(`INSERT INTO criador(nome_criador, foto_criador) VALUES($1, $2)`, [nome, foto])
            return {code: 0, id: id_genero}
        }
        catch(err)
        {
            return {code: err.code, id: null}
        }
    }

    async function createProvider(nome, foto)
    {
        try{
            let id_plataforma = await db.query(`INSERT INTO plataforma(nome_plataforma, logo_plataforma) VALUES($1, $2) RETURNING id_plataforma`, [nome, foto])
            return {code: 0, id: id_plataforma}
        }
        catch(err)
        {
            return {code: err.code, id: null}
        }
    }

    async function createCompany(nome, foto)
    {
        try{
            let id_companhia = await db.query(`INSERT INTO companhia(nome_companhia, logo_companhia) VALUES($1, $2)`, [nome, foto])
            return {code: 0, id: id_companhia}
        }
        catch(err)
        {
            return {code: err.code, id: null}
        }
    }

    async function createUser(nome, id_avatar, login, hash_senha){
        try{
            await db.query(`INSERT INTO usuario(nome_usuario, hash_senha, id_avatar, login_usuario) VALUES($1, $2, $3, $4)`, [nome, hash_senha, id_avatar, login])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function createItem(nome_item, poster_item, tipo)
    {
        try{
            await db.query(`BEGIN`)
            let id = await db.query(`INSERT INTO itemsistema(nome_item, poster_item, tipo) VALUES($1, $2, $3) RETURNING id_item`, [nome_item,  poster_item, tipo])

            id_item = id.rows[0].id_item
            

            if(tipo)
                {
                    if(await createMovie(id_item) == 2)
                        return 2
                }
            else
                {
                    if(await createSerie(id_item) == 2)
                        return 2
                }
            
            await db.query('COMMIT')
            
            return {code: 0, id: id_item}
        }
        catch(err)
        {
            await db.query('ROLLBACK')
            return err.code
        }
    }

    async function createMovie(id)
    {
        try{
            await db.query(`INSERT INTO filme(id_item) VALUES($1)`, [id])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function createSerie(id)
    {
        try{
            await db.query(`INSERT INTO serie(id_item) VALUES($1)`, [id])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function createSeason(id_item, numero_temporada, titulo){
        try{
            await db.query(`INSERT INTO temporada VALUES($1,$2,$3)`, [numero_temporada, id_item, titulo])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function createList(id_usuario, nome_lista)
    {
        try{
            let id_lista = await db.query(`INSERT INTO lista(nome_lista, id_usuario) VALUES($1,$2) RETURNING id_lista`, [nome_lista, id_usuario])
            return {code: 0, id: id_lista}
        }
        catch(err)
        {
            return {code: 0, id: null}
        }
    }

    async function createReview(id_usuario, id_item, nota, comentario, data)
    {
        try{
            await db.query(`INSERT INTO avaliacao(id_usuario, id_item, nota, comentario, data) VALUES($1, $2, $3, $4, $5)`, [id_usuario, id_item, nota, comentario, data])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function like(id_usuario, id_avaliacao)
    {
        try{
            await db.query(`INSERT INTO curtidas(id_usuario, id_avaliacao) VALUES($1,$2)`, [id_usuario, id_avaliacao])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function unlike(id_usuario, id_avaliacao)
    {
        try{
            await db.query(`DELETE FROM curtidas WHERE id_usuario = $1 AND id_avaliacao = $2`, [id_usuario, id_avaliacao])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function linkItemPlataforma(id_plataforma, id_item)
    {
        try{
            await db.query(`INSERT INTO itemsistema_plataforma(id_plataforma, id_item) VALUES($1,$2)`, [id_plataforma, id_item])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function linkItemCast(id_pessoa, id_item)
    {
        try{
            await db.query(`INSERT INTO itemsistema_pessoacast(id_pessoa, id_item) VALUES($1,$2)`, [id_pessoa, id_item])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function linkItemGenero(id_genero, id_item)
    {
        try{
            await db.query(`INSERT INTO itemsistema_genero(id_genero, id_item) VALUES($1,$2)`, [id_genero, id_item])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function linkItemCompanhia(id_companhia, id_item)
    {
        try{
            await db.query(`INSERT INTO itemsistema_companhia(id_companhia, id_item) VALUES($1,$2)`, [id_companhia, id_item])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function linkItemList(id_lista, id_item)
    {
        try{
            await db.query(`INSERT INTO lista_item(id_lista, id_item) VALUES($1,$2)`, [id_lista, id_item])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function linkSerieEmissora(id_emissora, id_item)
    {
        try{
            await db.query(`INSERT INTO serie_emissora(id_emissora, id_item) VALUES($1,$2)`, [id_emissora, id_item])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function linkSerieCriador(id_criador, id_item)
    {
        try{
            await db.query(`INSERT INTO serie_criador(id_criador, id_item) VALUES($1,$2)`, [id_criador, id_item])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function removeOneLinkItemPlataforma(id_plataforma, id_item)
    {
        try{
            await db.query(`DELETE FROM itemsistema_plataforma WHERE id_plataforma = $1 AND id_item = $2`, [id_plataforma, id_item])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function removeOneLinkItemCast(id_pessoa, id_item)
    {
        try{
            await db.query(`DELETE FROM itemsistema_pessoacast WHERE id_pessoa = $1 AND id_item = $2`, [id_pessoa, id_item])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function removeOneLinkItemGenero(id_genero, id_item)
    {
        try{
            await db.query(`DELETE FROM itemsistema_genero WHERE id_genero = $1 AND id_item = $2`, [id_genero, id_item])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function removeOneLinkItemCompanhia(id_companhia, id_item)
    {
        try{
            await db.query(`DELETE FROM itemsistema_companhia WHERE id_plataforma = $1 AND id_item = $2`, [id_companhia, id_item])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function removeOneLinkItemList(id_lista, id_item)
    {
        try{
            await db.query(`DELETE FROM lista_item WHERE id_lista = $1 AND id_item = $2`, [id_lista, id_item])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function removeOneLinkSerieEmissora(id_emissora, id_item)
    {
        try{
            await db.query(`DELETE FROM serie_emissora WHERE id_emissora = $1 AND id_item = $2`, [id_emissora, id_item])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function removeOneLinkSerieCriador(id_criador, id_item)
    {
        try{
            await db.query(`DELETE FROM serie_criador WHERE id_criador = $1 AND id_item = $2`, [id_criador, id_item])
            return 0
        }
        catch(err)
        {
            return err.code
        }
    }

    async function search(query_text){
        let qt

        if(query_text.length === 0)
            return null
        else
            qt = query_text.replace(/ /g,"_")

        let data = await db.query(`SELECT nome_item, id_item, poster_item, tipo FROM itemsistema 
                            WHERE to_tsvector(unaccent(nome_item)) @@ to_tsquery(unaccent($1))`, [qt])

        return data.rows
    }
    
//implementar exclusões totais, consultas de estatísticas

module.exports = {
    createUser,
    createItem,
    createCast,
    createCompany,
    createCreator,
    createGenre,
    createNetwork,
    createProvider,
    createSeason,
    createList,
    createReview,
    like,
    unlike,
    linkItemPlataforma,
    linkItemCast,
    linkItemCompanhia,
    linkItemGenero,
    linkSerieEmissora,
    linkSerieCriador,
    linkItemList,
    removeOneLinkItemCast,
    removeOneLinkItemCompanhia,
    removeOneLinkItemGenero,
    removeOneLinkItemList,
    removeOneLinkItemPlataforma,
    removeOneLinkSerieCriador,
    removeOneLinkSerieEmissora,
    search,
}
