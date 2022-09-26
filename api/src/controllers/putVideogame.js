const { videogameUpdate } = require("../services/updateVideogame");

const putVideogame = async(req, res) => {
  const { name, description, platforms} = req.body
  const {id} = req.params

  try {
    let putVideogame = await videogameUpdate(id, name, description, platforms)
    res.status(200).send("Juego ha sido actualizado!!")
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports={
  putVideogame
}