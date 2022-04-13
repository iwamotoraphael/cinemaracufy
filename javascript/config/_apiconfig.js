const MovieDB = require('node-themoviedb')

const mdb = new MovieDB('ea4cc7cb695b647ac00387c80365a783');
mdb.setLanguage('pt-BR')

module.exports = mdb