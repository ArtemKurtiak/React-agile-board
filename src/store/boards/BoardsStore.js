import {flow, getChildType, getParent, onSnapshot, types} from "mobx-state-tree";
import Api from "../../Api/Api";
import {User} from "../users/UsersStore";
import { v4 as uuidv4 } from 'uuid';

const Task = types.model('Task', {
    id: types.identifier,
    title: types.string,
    description: types.string,
    assignee: types.safeReference(User)
})

const BoardSection = types.model('Section', {
    id: types.identifier,
    title: types.string,
    tasks: types.array(Task)
}).actions((self) => {
    return {
        loadSections: flow(function* () {

            const {id} = getParent(self, 2);

            const {id: boardId} = self;

            const a = yield Api.get(`boards/${id}/tasks/${boardId}`);

            if (Array.isArray(a) || typeof a == 'object') {
                console.log('array', a)
            }


            self.tasks = a.tasks;
            onSnapshot(self, self.saveTask)
        }),
        afterCreate() {
            self.loadSections()
        },
        saveTask: flow(function* ({ tasks }) {
            const {id} = getParent(self, 2);

            console.log('tasochkas', tasks)

            const {id: boardId} = self;
            yield Api.put(`boards/${id}/tasks/${boardId}`, {tasks})
        }),


    }
})

const Board = types.model('Board', {
    id: types.identifier,
    title: types.string,
    sections: types.array(BoardSection)
}).actions((self) => {
    return {
        moveTask({taskId, source, destination}) {
            const fromSection = self.sections.find(section => section.id === source.droppableId);
            const toSection = self.sections.find(section => section.id === destination.droppableId);

            const taskToMoveIndex = fromSection.tasks.findIndex(task => task.id === taskId);
            const [task] = fromSection.tasks.splice(taskToMoveIndex, 1);

            toSection.tasks.splice(destination.index, 0, task.toJSON());

        },
        addTask(title, description, assignee) {
            const section = self.sections.find(section => section.id === 'OPEN');

            section.tasks.push({
                id: uuidv4(),
                title,
                description,
                assignee,
            });
        },

}
})

const BoardsStore = types.model('BoardsStore', {
    boards: types.array(Board),
    active: types.safeReference(Board)
}).views((self) => ({
    get list() {
        return self.boards.map(({id, title}) => {
            return {id, title}
        })
    }
})).actions((self) => {
    return {
        loadBoards: flow(function* () {
            self.boards = yield Api.get('boards');
            self.active = 'MAIN'
        }),
        afterCreate() {
            self.loadBoards()
        },
        selectBoard(id) {
            self.active = id;
            console.log('ID', id)
        },
        deleteTask(id, sectionId) {
            const fromSection = self.active.sections.find((el) => el.id == sectionId)
            fromSection.tasks = fromSection.tasks.filter(el => el.id !== id)
        }
    }
})

export default BoardsStore;