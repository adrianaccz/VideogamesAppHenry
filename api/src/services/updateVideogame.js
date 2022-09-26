const {Videogame, Genre} = require('../db');
const { getAllGames } = require('./getAllgames');

const videogameUpdate = async(id, name, description, platforms)=>{
  try {
    Videogame.update({
      name: name,
      description: description,
      platforms: platforms,
      
    }, { where: {id: id }
    });

    /* Genre.update({
      name: name
    }, {
      where: {name: genre}
    }); */
  } catch (error) {
    throw error
  }
}

module.exports={
  videogameUpdate
}