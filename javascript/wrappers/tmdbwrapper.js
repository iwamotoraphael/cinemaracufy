const api = require('../config/_apiconfig')

async function multiSearch(searchquery)
{
    let res = await api.search.multi({
      query:{
        query: searchquery
      }
    })
    return res
}

async function getMovieDetails(id)
{
    let details = await api.movie.getDetails({
        pathParameters: {
          movie_id: id,
        },
      })
    return details
}

async function getMovieCredits(id)
{
    let details = await api.movie.getCredits({
        pathParameters: {
          movie_id: id,
        },
      })
    return details
}

async function getTVDetails(id)
{
    let details = await api.tv.getDetails({
        pathParameters: {
          tv_id: id,
        },
      })
    return details
}

async function getTVCredits(id)
{
    let details = await api.tv.getCredits({
        pathParameters: {
          tv_id: id,
        },
      })
    return details
}

module.exports = {
  multiSearch,
  getMovieDetails,
  getMovieCredits,
  getTVDetails,
  getTVCredits
};