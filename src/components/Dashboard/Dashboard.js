import {observer} from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import {Box, Grid, Paper, Typography} from "@material-ui/core";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import Column from "./Column";
import {useCallback} from "react";

const getListStyle = (isDragging) => {
    return {
        backgroundColor: isDragging ? 'lightblue' : 'lightgrey',
        padding: 8,
        minHeight: 500
    }
}

const Dashboard = () => {

    const {boards} = useStore();

    const onDragEnd = useCallback(event => {
        const {source, destination, draggableId: taskId} = event;

        console.log('taskId',taskId)
        console.log('draggableId', source);
        console.log('destination', destination)

        boards.active.moveTask({taskId, source, destination});
    }, [boards]);

    return <Box p={2}>
        <DragDropContext onDragEnd={onDragEnd}>
            <Grid container spacing={3} >
                {
                    boards.active?.sections.map(((section) => {
                        return <Grid item key={section.id} xs >
                            <Paper>
                                <Box p={1} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                    <Typography variant={'h5'}>{section.title}</Typography>
                                </Box>
                                <Droppable droppableId={section.id} key={section.id} >
                                    {(provided, snapshot) => {
                                        return <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}>
                                            <Column section={section}/>
                                            {provided.placeholder}
                                        </div>
                                    }}
                                </Droppable>
                            </Paper>
                        </Grid>
                    }))
                }
            </Grid>

        </DragDropContext>
    </Box>
}

export default observer(Dashboard);