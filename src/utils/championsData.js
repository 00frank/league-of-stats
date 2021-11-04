/**
 * @typedef {Object} ChampionMinData
 * @property {String} title - name of the champion
 * @property {String} description - little description of the champion
 * @property {String} image - file name of the champion's image
 */

import { Constants, replaceVersion } from '../services/riot'
import { Champion } from '../services/riot'; // eslint-disable-line no-unused-vars

/**
 * @param {Champion} champion
 * @returns {URL}
 */

function getChampionImageURL(champion) {
  let gameVersion = champion.version
  let championImageFile = champion.image.full
  return replaceVersion(Constants.CHAMPION_IMG_URL, gameVersion) + championImageFile
}

function getChampionLoadingImageURL(champion) {
  return Constants.CHAMPION_LOADING_IMG_URL + champion.id + '_0.jpg'
}

/**
 * @param {Champion[]} champions 
 * @returns {ChampionMinData[]}
 */
function retrieveListData(champions) {
  let data = []
  champions.forEach(c => {
    data.push({
      title: c.name,
      description: c.title.charAt(0).toUpperCase() + c.title.slice(1),
      image: getChampionImageURL(c),
      version: c.version,
      id: c.id
    })
  });
  return data
}

export { getChampionImageURL, getChampionLoadingImageURL }
export default retrieveListData