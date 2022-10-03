const {Videogame, Genre} = require('../db');
const { getVideogameById } = require('./getIDVideogame');

const videogameUpdate = async(id, name, description, platforms, rating)=>{
  try {
    const updated = await Videogame.update({
      name: name,
      description: description,
      platforms: platforms,
      rating: rating
    }, { where: {id: id }
    });
    console.log('updated', updated)
    /* Genre.update({
      name: name
    }, {
      where: {name: genre}
    }); */
    return getVideogameById(id)
  } catch (error) {
    throw error
  }
}

module.exports={
  videogameUpdate
}