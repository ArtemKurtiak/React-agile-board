import {Draggable} from "react-beautiful-dnd";
import {Box, Button, Card, CardContent, Typography} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import User from "../common/User";
import useStore from "../../hooks/useStore";
import DeleteIcon from '@material-ui/icons/Delete';

const getItemStyle = (style) => {
    return {
        padding: 8,
        marginBottom: 8,
        ...style
    }
}


const Column = observer(({section}) => {
    return section?.tasks.map((el, index) => {
        return <Draggable draggableId={el.id} key={el.id} index={index}>
            {(provided, snapshot) => {
                return <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        provided.draggableProps.style
                    )}
                >
                    <Task task={el} section={section} />
                </Card>
            }}
        </Draggable>
    })
})

const Task = observer(({task, section}) => {
    const {boards} = useStore();
    return <CardContent>
        <Typography style={{fontSize: 18}} color={'textPrimary'} gutterBottom>{task.title}</Typography>
        <Typography color={'textPrimary'} gutterBottom>{task.description}</Typography>
        <User user={task?.assignee} gutterBottom />
        <Box display={'flex'} justifyContent={'flex-end'} mt={3}  >
            <Button variant={'outlined'} color={'primary'} onClick={() => {
                boards.deleteTask(task.id, section.id)
            }}>Delete <DeleteIcon /></Button>
        </Box>
    </CardContent>
})

export default Column;