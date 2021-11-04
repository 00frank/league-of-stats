import React, { useContext, useState } from 'react'
import Logo from '../../assets/banner.png'
import { Grid, Search } from 'semantic-ui-react'
import retrieveListData from '../../utils/championsData'
import ChampionsContext from '../../contexts/ChampionsContext'
import { Constants, replaceVersion } from '../../services/riot'
import { Types } from '../../reducers/portalReducer'
import './Searcher.css'

export default function Searcher() {
  const context = useContext(ChampionsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");

  const champions = retrieveListData(context.champions);
  const { portalDispatch } = context;

  const openChampionInfo = async (e, search) => {
    let champion = search.result;
    let resp = await fetch(replaceVersion(Constants.CHAMPION_INFO_URL, champion.version) + champion.id + '.json');
    let data = await resp.json();
    portalDispatch({ type: Types.OPEN_PORTAL, champion: {...data.data[champion.id], version: data.version } })
  }

  const handleChampionSearch = (e) => {
    setValue(e.target.value)
    setIsLoading(true)
    if (e.target.value === "") {
      setResults([])
      setIsLoading(false)
    } else {
      setTimeout(() => {
        let results = champions.filter(c => c.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1).splice(0, 6)
        setResults(results)
        setIsLoading(false);
      }, 300)
    }
  }

  return (
    <Grid className="searcher_box" stackable>
      <Grid.Column width={4}>
      </Grid.Column>
      <Grid.Column width={8}>
        <div className="banner">
          <img src={Logo} alt="Logo" />
          <h1 hidden>League Of Stats</h1>
          <Search
            minCharacters={2}
            loading={isLoading}
            onSearchChange={handleChampionSearch}
            results={results}
            noResultsMessage="No hay resultados 😥"
            onResultSelect={openChampionInfo}
            value={value}
            fluid
          />
        </div>
      </Grid.Column>
      <Grid.Column width={4}>
      </Grid.Column>
    </Grid>
  )
}

