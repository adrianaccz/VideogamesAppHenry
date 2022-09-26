const axios = require("axios");
require("dotenv").config(); // requiero las variables de entorno
const { API_KEY } = process.env;

const getPlataforms = async()=> {
  // buscamos la data en la api
  try {
    const plataformsApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    const plataforms = plataformsApi.data.results
    //console.log("plataforms:", plataforms)

    //sacamos la info que queremos
    let plataformsMap = plataforms.map((atributo)=>{
      return{
        name: atributo.name,
      }
    })
    //console.log("plataforms editados:", plataformsMap)


    return plataformsMap
  } catch (error) {
    throw error
  }
}

module.exports = {
  getPlataforms
}