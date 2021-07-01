import {types} from "mobx-state-tree";
import BoardsStore from "./boards/BoardsStore";
import UsersStore from "./users/UsersStore";


const RootStore = types.model('RootStore', {
    boards: types.optional(BoardsStore, {}),
    users: types.optional(UsersStore, {})
})

export default RootStore;