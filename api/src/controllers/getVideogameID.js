const { getVideogameById } = require("../services/getIDVideogame");

const videogameID = async(req, res)=>{
  const {id} = req.params
  const getvideogame = await getVideogameById(id)
  //console.log('videogameconroler', getvideogame)
  try {
    return res.status(200).json(getvideogame)
  } catch (error) {
    throw res.status(404).send('Juego no encontrado!!')
  }
}

module.exports={
  videogameID
}