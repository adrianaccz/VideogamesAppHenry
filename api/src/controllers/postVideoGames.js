const { createVideoGames } = require("../services/postIDVideogames")


const createVideogames = async(req, res) =>{
  // traigo data del body
  let {name, description, date_launch, rating, plataforms, createdInDB, genre} = req.body

  try {
    console.log("atributos videogame post",req.body);
    if(!name || !description || !date_launch || !rating || !plataforms || !genre){
      return res.status(404).send('Ingresa todos los parametros rqueridos!!')
    }
    let videoGames = await createVideoGames(name, description, date_launch, rating, plataforms, createdInDB, genre)
    return res.status(200).send('Juego creado con exito!!')
      } catch (error) {
        console.log(error)
      throw res.status(404).send(error)
  }
}

module.exports={
  createVideogames
}