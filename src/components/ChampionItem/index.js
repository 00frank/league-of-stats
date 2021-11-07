import React, { useContext, useEffect, useRef } from 'react'
import { Grid, Ref } from 'semantic-ui-react'
import { Champion, Constants, replaceVersion } from '../../services/riot' // eslint-disable-line no-unused-vars
import { getChampionImageURL } from '../../utils/championsData'
import ChampionsContext from '../../contexts/ChampionsContext'
import { Types } from '../../reducers/portalReducer'
import Fac from 'fast-average-color'
import './ChampionItem.css'

const FastAverageColor = new Fac();

/**
 * @param {Object} Object
 * @param {Champion} Object.champion
 * @returns {JSX.Element}
 */
export default function ChampionItem({ champion }) {
  const { portalDispatch } = useContext(ChampionsContext);
  const nameTag = useRef();
  const card = useRef();

  useEffect(() => {
    async function getColor() {
      nameTag.current.style.transition = "color 1s linear"
      let color = await FastAverageColor.getColorAsync(getChampionImageURL(champion))
      card.current.style.boxShadow = `${color.rgba} 0px 10px 50px 0px inset, rgba(0, 0, 0, 0.3) 10px 18px 36px -18px inset`;
    }
    getColor();
  }, [])


  const openChampionInfo = async () => {
    let resp = await fetch(replaceVersion(Constants.CHAMPION_INFO_URL, champion.version) + champion.id + ".json");
    let data = await resp.json();
    portalDispatch({
      type: Types.OPEN_PORTAL,
      champion: { ...data.data[champion.id], version: champion.version }
    })
  }

  return (
    <Ref innerRef={card}>
      <Grid.Column className="champion-card" onClick={openChampionInfo}>
        <div className="champion-name">
          <span className="champion-name-tag" ref={nameTag}>{champion.name}</span>
        </div>
        <div className="champion-info">
          <div className="champion-info-lanes">
            {champion.tags.map((tag, i) => <span className="champion-tag" key={i}>{tag}</span>)}
          </div>
          <div className="champion-info-image">
            <img src={getChampionImageURL(champion)} alt={champion.name} loading="lazy" />
          </div>
        </div>
      </Grid.Column>
    </Ref>
  )
}

