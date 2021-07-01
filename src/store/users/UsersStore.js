import {flow, types} from "mobx-state-tree";
import Api from "../../Api/Api";

export const User = types.model('User', {
    id: types.identifier,
    name: types.string,
    avatar: types.string,
    createdAt: types.string
});


const ActiveUser = User.named('ActiveUser');




const UsersStore = types.model('UsersStore', {
    users: types.maybe(types.array(User)),
    me: types.maybe(ActiveUser)
}).actions((self) => {
    return {
        loadUsers: flow(function* () {
                self.users = yield Api.get('users');
                self.me = yield Api.get('me')
        }),
        afterCreate() {
            self.loadUsers()
        }
    }
})



export default UsersStore;