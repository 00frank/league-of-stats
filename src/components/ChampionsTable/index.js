import React, { useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import ChampionsContext from '../../contexts/ChampionsContext'
import ChampionItem from '../ChampionItem'
import ChampionsItemsPlaceholder from '../ChampionsItemsPlaceholder'
import './ChampionsTable.css'

export default function ChampionsTable() {
  const { champions } = useContext(ChampionsContext);
  return (
    <Grid doubling centered columns={5} className="champions-table">
      {champions.length === 0
        ? <ChampionsItemsPlaceholder />
        : champions.map(c => <ChampionItem champion={c} key={c.name} />)}
    </Grid>
  )
}
