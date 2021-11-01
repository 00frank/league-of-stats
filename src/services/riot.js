const Constants = {
  VERSION_URL: "https://ddragon.leagueoflegends.com/api/versions.json",
  CHAMPIONS_URL: "http://ddragon.leagueoflegends.com/cdn/{version}/data/es_AR/champion.json",
  CHAMPION_IMG_URL: "http://ddragon.leagueoflegends.com/cdn/{version}/img/champion/"
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
  return url.replace("{version}", version)
}

function parseChampionsToArray(championsObj) {
  let array = [];
  let keys = Object.keys(championsObj.data)
  keys.forEach(k => {
    array.push({ ...championsObj.data[k] })
  })
  return array;
}

async function getChampions() {
  let version = await getGameVersion();
  let url = await getChampionsURL(version);
  let resp = await fetch(url)
  let data = await resp.json()
  let champions = parseChampionsToArray(data)
  return champions;
}

export { Constants, getChampions, replaceVersion }