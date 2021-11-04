/**
 * @typedef {Object} Champion
 * @property {String} version - version of the data retrieved to the champion
 * @property {String} id - champion's unique id
 * @property {String} key - a weird key for the champion
 * @property {String} name - champion's name
 * @property {String} title - champion's description
 * @property {String} blurb - little history about the champion
 * @property {Object} info - initial game stats
 * @property {Object} image - this is some cool string
 * @property {Array<String>} tags - the roles the champion is used to play
 * @property {String} partype - the resource the champion's spells use
 * @property {Object} stats - a complex object fulfiled with champion's stats
 */


const Constants = {
  VERSION_URL: "https://ddragon.leagueoflegends.com/api/versions.json",
  CHAMPIONS_URL: "https://ddragon.leagueoflegends.com/cdn/{version}/data/es_AR/champion.json",
  CHAMPION_LOADING_IMG_URL: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/",
  CHAMPION_IMG_URL: "https://ddragon.leagueoflegends.com/cdn/{version}/img/champion/",
  CHAMPION_INFO_URL: "https://ddragon.leagueoflegends.com/cdn/{version}/data/es_AR/champion/"
}

async function getGameVersion() {
  let resp = await fetch(Constants.VERSION_URL)
  let versions = await resp.json();
  return versions[0];
}

async function getChampionsURL(gameVersion) {
  return replaceVersion(Constants.CHAMPIONS_URL, gameVersion);
}

function replaceVersion(url, version) {
  return url.replace("{version}", version);
}

function parseChampionsToArray(championsObj) {
  let array = [];
  let keys = Object.keys(championsObj.data);
  keys.forEach(k => {
    array.push({ ...championsObj.data[k] })
  })
  return array;
}

/**
 * @returns {Promise<Champion[]>}
 */
async function getChampions() {
  let version = await getGameVersion();
  let url = await getChampionsURL(version);
  let resp = await fetch(url);
  let data = await resp.json();
  let champions = parseChampionsToArray(data);
  return champions;
}

export { Constants, getChampions, replaceVersion }