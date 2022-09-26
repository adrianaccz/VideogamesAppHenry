const {Videogame, Genre} = require('../db');

const getDBInfo = async () => {

    try {

        const dbCall = await Videogame.findAll({
            include:{
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });

        return dbCall;
    } catch (error) {
        return error
    }
};

module.exports ={
    getDBInfo,
}