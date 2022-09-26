const axios = require("axios");
const { getAllGames } = require("./getAllgames");
require("dotenv").config(); // requiero las variables de entorno
const { API_KEY } = process.env;

const getVideogameById = async (id) => {
  const allVideogames = await getAllGames();
  console.log(allVideogames)
  //console.log("id", typeof id);
  try {
    // valido getAllVideogames
    if(allVideogames.length > 0){
      //valido ID de base de datos
      if (id.includes("-")) {
        const videogameID = await allVideogames.filter((e) => e.id === id);
        //console.log("videojuego por ID",videogameID)
        if(videogameID != 0) return videogameID[0];       // para que no me traiga un objeto [0:{id...}]
        return "Juego no existe en la Base de datos!!"
      }
    }

    let { data } = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    //console.log("DATA detail*****", data.detail);  // cuando id no existe devuelve un objeto con detail

    if(data){
      //si data existe retorno un objeto creado con la info de la data que necesito
      let videogameAPI = {
        id: data.id,
        name: data.name,
        date_launch: data.released,
        description: data.description_raw,
        img: data.background_image,
        rating: data.rating,
        plataforms: data.platforms.map((element) => {
          return element.platform.name;
        }),
        genres: data.genres.map((element) => {
          return element.name;
        }),
      };
      return videogameAPI;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getVideogameById,
};
