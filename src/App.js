import './App.css';

import Searcher from './components/Searcher';
import ChampionsTable from './components/ChampionsTable';
import { ChampionsProvider } from './contexts/ChampionsContext';

function App() {
  return (
    <ChampionsProvider>
      <div id="LOS">
        <Searcher />
        <ChampionsTable />
      </div>
    </ChampionsProvider>
  );
}

export default App;
