import useStore from "./hooks/useStore";
import { useEffect } from 'react'
import {StoreContext} from "./index";
import {observer} from "mobx-react-lite";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";

const App = observer((props => {
  return <div>
    <Header />
    <Dashboard />
  </div>
}))

export default App;