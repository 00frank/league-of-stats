import React from 'react'
import { Grid, Placeholder, PlaceholderImage } from 'semantic-ui-react'
import '../ChampionItem/ChampionItem.css'

export default function ChampionItemPlaceholder() {
  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9,].map(i => (
        <Grid.Column className="champion-card" key={i}>
          <div className="champion-name">
            <span className="champion-name-tag">
              <Placeholder as="div" />
            </span>
          </div>
          <div className="champion-info">
            <div className="champion-info-lanes">
              <span className="champion-tag-placeholder">
                <Placeholder as="div" />
              </span>
              <span className="champion-tag-placeholder">
                <Placeholder as="div" />
              </span>
            </div>
            <div className="champion-info-image">
              <Placeholder>
                <PlaceholderImage as="div" />
              </Placeholder>
            </div>
          </div>

        </Grid.Column>
      ))}
    </>
  )
}
