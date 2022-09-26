const axios = require("axios");
require("dotenv").config(); // requiero las variables de entorno
const { API_KEY } = process.env;

// llamado a la API para traer la info
const getApiInfo = async () => {
  try {
    let promises = [1, 2, 3, 4].map(
      async (e) =>
        await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page_size=25&page=${e}`
        )
    );

    let response = await Promise.all(promises);
    //console.log('RESponse***',response[data].results)
    // Se unen en un solo array
    response = response.reduce(
      (prev, curr) => {
        return prev.concat(curr.data.results);      //en el data.results esta cuardado cada arry con los 25 datos de cada pagina
      },
      [] // initial value: array vacio
    );

    // console.log("RESPUESTA--------",response)
    return response.map((atributo) => {
      return {
        id: atributo.id,
        name: atributo.name,
        date_launch: atributo.released,
        rating: atributo.rating,
        plataforms: atributo.platforms.map((element) => {
          return element.platform.name;
        }),
        genres: atributo.genres.map((element) => {
          return element.name;
        }),
        img: atributo.background_image,
      };
    });
    //console.log("prueba*************", prueba)
  } catch (error) {
    throw error
  }
};

module.exports = {
  getApiInfo,
};
