import React, { useState, useContext, useEffect } from 'react'
import ChampionsContext from '../../contexts/ChampionsContext'
import { Types } from '../../reducers/portalReducer'
import { Header, Icon, Transition } from 'semantic-ui-react'
import { Constants, replaceVersion } from '../../services/riot'
import './ChampionInfo.css'
import { getChampionLoadingImageURL } from '../../utils/championsData'

/**
 * 
 * @param {Object} champion
 * @param {String} champion.championName
 * @param {String} champion.championVersion
 * @param {String[]} champion.championTags
 * @param {URL} champion.championImgURL
 * @returns {JSX.Element}
 */
export default function ChampionInfo({ champion }) {
  const { portalDispatch } = useContext(ChampionsContext)
  const [data, setData] = useState({})

  return (
    <div className="champion-info-portal">
      {champion &&
        <>
          <div className="champion-info-buttons">
            <Icon name="arrow left" onClick={() => portalDispatch({ type: Types.CLOSE_PORTAL })} />
            <Icon name="heart" color='red' />
          </div>
          <div className="champion-info-simple">
            <div className="champion-info-simple-principal">
              <Header size="huge" as="p">
                {champion.name}
              </Header>
              <Header size="medium" as="p">
                {"v" + champion.version}
              </Header>
            </div>
            <div className="champion-info-simple-tags">
              {champion.tags.map((tag, i) => <span className="champion-tag" key={i}>{tag}</span>)}
            </div>
            <Transition>
              <img style={{ alignSelf: "center" }} src={getChampionLoadingImageURL(champion)} alt={champion.name} />
            </Transition>
          </div>
          <div className="champion-info-stats">

          </div>
        </>}
    </div>
  )
}