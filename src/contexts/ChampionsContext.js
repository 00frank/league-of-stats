import { createContext, useState, useEffect, useReducer } from 'react';
import { TransitionablePortal } from 'semantic-ui-react';
import ChampionInfo from '../components/ChampionInfo';
import { getChampions } from '../services/riot';
import portalReducer from '../reducers/portalReducer';

const ChampionsContext = createContext();

const initialChampionsState = []
const initialPortalState = { isOpen: false, champion: null }

function ChampionsProvider({ children }) {
  const [champions, setChampions] = useState(initialChampionsState)
  const [portal, portalDispatch] = useReducer(portalReducer, initialPortalState)

  useEffect(() => {
    async function fillData() {
      setTimeout(async () => {
        let champions = await getChampions();
        // console.log('champions:', champions);
        setChampions(champions);
      }, 200);
    }
    fillData();
  }, [])

  return (
    <ChampionsContext.Provider value={{ champions, portalDispatch }}>
      {children}
      <TransitionablePortal
        transition={{animation: "fly left", duration: 900}}
        open={portal.isOpen}>
        <div id="champion-portal">
          <ChampionInfo champion={portal.champion} />
        </div>
      </TransitionablePortal>
    </ChampionsContext.Provider>
  )
}

export { ChampionsProvider }
export default ChampionsContext

