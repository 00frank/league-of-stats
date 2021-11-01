import { Constants, replaceVersion } from '../services/riot'

function getChampionImageURL(gameVersion, championImageFile) {
  return replaceVersion(Constants.CHAMPION_IMG_URL, gameVersion) + championImageFile
}

function retrieveListData(champions) {
  let data = []
  champions.forEach(c => {
    getChampionImageURL(c.version, c.image.full)
    data.push({
      title: c.name,
      description: c.title.charAt(0).toUpperCase() + c.title.slice(1),
      image: getChampionImageURL(c.version, c.image.full)
    })
  });
  return data
}

export default retrieveListData