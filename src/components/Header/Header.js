import {observer} from "mobx-react-lite";
import {AppBar, Box, Button, FormControl, Grid, MenuItem, Select, Toolbar, Typography} from "@material-ui/core";
import useStore from "../../hooks/useStore";
import User from "../common/User";
import {useState} from "react";
import NewTaskModal from "../Dashboard/NewTaskModal";


const Header = () => {

    const [isOpen, setOpen] = useState(false)

    const {boards, users} = useStore();
    return <AppBar position={'static'}>
        <Toolbar variant={'dense'}>
            <Grid container justify={'space-between'} alignItems={'center'}>
                <Grid item>
                    <Box display={'flex'} alignItems={'center'}></Box>
                    <Typography variant={'h6'}>Dashboard:</Typography>
                    <FormControl variant={'outlined'}>
                        <Select style={{backgroundColor: '#fff', marginLeft: 10}} defaultValue={boards?.active?.id}
                                value={boards?.active?.id}
                                native
                                onChange={(e) => {
                                    const {value} = e.target;
                                    console.log('aydrigiday', value)
                                    boards.selectBoard(value)
                                }}>
                            <option value={''} disabled>-</option>
                            {boards.list.map((el) => {
                                return <option key={el.id} value={el.id}>{el.title}</option>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button variant={'outlined'} color={'contained'} onClick={() => {
                        setOpen(true)
                    }
                    } >Add task +</Button>
                </Grid>
                <Grid item>
                    <User user={users.me}/>
                </Grid>
            </Grid>
        </Toolbar>
        <NewTaskModal open={isOpen} setOpen={setOpen} />
    </AppBar>
}


export default observer(Header);