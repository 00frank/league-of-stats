import React from 'react'
import { Grid } from 'semantic-ui-react'
import { getChampionImageURL } from '../../utils/championsData'
import { Champion } from '../../services/riot' // eslint-disable-line no-unused-vars
import './ChampionItem.css'

/**
 * @param {Object} Object
 * @param {Champion} Object.champion
 * @returns {JSX.Element}
 */
export default function ChampionItem({ champion }) {
  return (
    <Grid.Column className="champion-card">
      <div className="champion-name">
        <span className="champion-name-tag">{champion.name}</span>
      </div>
      <div className="champion-info">
        <div className="champion-info-lanes">
          {champion.tags.map((tag, i) => <span className="champion-tag" key={i}>{tag}</span>)}
        </div>
        <div className="champion-info-image">
          <img src={getChampionImageURL(champion)} alt={champion.name} />
        </div>
      </div>
    </Grid.Column>
  )
}
