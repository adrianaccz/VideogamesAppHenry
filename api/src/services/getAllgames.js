const { getApiInfo } = require("./getApiInfo");
const { getDBInfo } = require("./getDBInfo");

const getAllGames = async () => {
  try {
    const api = await getApiInfo();
    const db = await getDBInfo();
    //console.log("db********", db)

    let apiAndBD = db.concat(api);

    return apiAndBD;

  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllGames
}