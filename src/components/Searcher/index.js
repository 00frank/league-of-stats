import React, { useState } from 'react'
import Logo from '../../assets/banner.png'
import { Grid, Search } from 'semantic-ui-react'
import retrieveListData from '../../utils/championsData'
import './Searcher.css'

export default function Searcher({ champions }) {
  let data = retrieveListData(champions);
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])
  const [value, setValue] = useState("")

  const handleChampionSearch = (e) => {
    setValue(e.target.value)
    setIsLoading(true)
    if (e.target.value === "") {
      setResults([])
      setIsLoading(false)
    } else {
      setTimeout(() => {
        let results = data.filter(c => c.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1).splice(0, 6)
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
            value={value}
            className="test"
            fluid
            />
        </div>
      </Grid.Column>
      <Grid.Column width={4}>
      </Grid.Column>
    </Grid>
  )
}

