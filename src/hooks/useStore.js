import { useContext } from 'react'
import {StoreContext} from "../index";


const useStore = () => {
    return useContext(StoreContext);
}

export default useStore;