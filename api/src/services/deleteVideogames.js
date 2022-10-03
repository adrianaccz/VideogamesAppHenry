const {Videogame} = require('../db');
const { getAllGames } = require('./getAllgames');

const deleteVideogame = async(id) => {
  let allVideogames = await getAllGames()
  //console.log("id",id)
  try {
    Videogame.destroy({
      where: {id: id}
    })

    return allVideogames
  } catch (error) {
    throw error
  }
}

module.exports={
  deleteVideogame
}