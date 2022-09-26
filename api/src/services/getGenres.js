const axios = require("axios");
const {Genre} = require('../db');
require("dotenv").config(); // requiero las variables de entorno
const { API_KEY } = process.env;

const getGenres = async()=> {
  // buscamos la data en la api
  try {
    const genreApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genres = genreApi.data.results
    //console.log("GENEROS:", genres)

    //sacamos la info que queremos
    let genresMap = genres.map((atributo)=>{
      return{
        name: atributo.name,
      }
    })
    //console.log("GENEROS editados:", genresMap)

    //introduce la data a la tabla por cada elemento que tenemos en el array de arriba
    genresMap.forEach(element => {
      Genre.findOrCreate({
        where: {name: element.name}
      })
    });
    const allGenres = await Genre.findAll()
    return allGenres
  } catch (error) {
    throw error
  }
}

module.exports = {
  getGenres
}