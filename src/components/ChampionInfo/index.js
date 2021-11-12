import React, { useState, useContext, useEffect } from 'react'
import ChampionsContext from '../../contexts/ChampionsContext'
import { Types } from '../../reducers/portalReducer'
import { Header, Icon, Transition } from 'semantic-ui-react'
import getTransitionProperties from '../../utils/getTransitionProperties'
import './ChampionInfo.css'

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
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
    setVisible(true);
    return () => {
      body.style.overflow = '';
      setVisible(false);
    }
  }, [])

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
            <Transition {...{ ...getTransitionProperties(), visible: visible }}>
              <img style={{ alignSelf: "center", width: "50%" }} src={require(`../../assets/champions/${champion.id}.png`).default} alt={champion.name} loading="lazy" />
            </Transition>
          </div>
          <div className="champion-info-stats">
          </div>
        </>}
    </div>
  )
}