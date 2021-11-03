import { createContext } from "react";
import { useState, useEffect } from 'react';
import { getChampions } from '../services/riot';

const ChampionsContext = createContext();

const initialState = []
function ChampionsProvider({ children }) {
  const [champions, setChampions] = useState(initialState)

  useEffect(() => {
    async function fillData() {
      setTimeout(async () => {
        let champions = await getChampions();
        setChampions(champions);
        console.log(champions);
      }, 20);
    }
    fillData();
  }, [])

  return (
    <ChampionsContext.Provider value={{champions}}>
      {children}
    </ChampionsContext.Provider>
  )
}

export { ChampionsProvider }
export default ChampionsContext